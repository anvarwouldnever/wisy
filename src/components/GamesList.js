import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList, useWindowDimensions, Text, Platform, TouchableOpacity, Image, View } from "react-native";
import store from "../store/store";
import { SvgUri } from "react-native-svg";
import Animated, { FadeInRight, FadeOutLeft, Easing } from "react-native-reanimated";
import star from '../images/tabler_star-filled.png';
import { BlurView } from 'expo-blur';
import lock from '../images/zamok.png'
import filledStar from '../images/filledStar.png'
import emptyStar from '../images/emptyStar.png'
import { observer } from "mobx-react-lite";

const GamesCollections = ({ setSubCollections, subCollections, setName, activeCategory }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [collectionIndex, setCollectionIndex] = useState(0);
    const navigation = useNavigation();

    const collections = store.categories[activeCategory]?.collections
    const availableSubCollections = collections? collections[collectionIndex]?.available_sub_collections : [];

    const handleGameCompletion = (id, starId, earnedStars) => {
        const complete = (starId, earnedStars) => {
            setSubCollections((prevSubCollections) =>
                prevSubCollections.map((subCollection) =>
                    subCollection.id === starId
                        ? {
                              ...subCollection,
                              stars: {
                                  ...subCollection.stars,
                                  earned: earnedStars,
                              },
                          }
                        : subCollection
                )
            );
        };
        complete(starId, earnedStars);
        store.completeGame(activeCategory, id, starId, earnedStars, collectionIndex);
    };

    const handleTaskCompletion = (id, nextTaskId) => {
        const completeTask = (id, nextTaskId) => {
            const collection = subCollections.find(item => item.id === id);
    
            if (collection) {
                if (nextTaskId !== null) {
                    collection.current_task_id = nextTaskId;
                } else {
                    collection.current_task_id = collection.tasks[0]?.id
                }
            }
        };
    
        completeTask(id, nextTaskId);
    };
    

    const renderCollections = ({ item, index }) => {

        return (
            <Animated.View entering={FadeInRight.duration(600).easing(Easing.out(Easing.cubic))} exiting={FadeOutLeft.duration(100)} style={{width: 'auto', height: 'auto'}}>
                    <TouchableOpacity onPress={() => {
                        setCollectionIndex(index);
                        setSubCollections(item.sub_collections);
                        setName(item.name);
                    }} style={{backgroundColor: 'white', borderRadius: 12, width: Platform.isPad? windowWidth * (306 / 1194) :  windowWidth * (136 / 800), height: Platform.isPad? windowHeight * (402 / 834) : windowHeight * (160 / 360), marginRight: 20, borderWidth: 1, borderColor: '#FFFFFF1F'}}>
                        <Text style={{fontWeight: '600', fontSize: Platform.isPad? windowWidth * (20 / 1194) : windowHeight * (12 / 360), textAlign: 'center', width: '100%', height: 'auto', color: 'black', position: 'absolute', top: Platform.isPad? windowHeight * (12 / 360) : 12}}>{item.name}</Text>
                        <View style={{width: '100%', position: 'absolute', borderColor: 'white', borderWidth: 1, opacity: 0.12, top: 35}}/>
                        <Image source={{uri: item.image.url}} style={{width: Platform.isPad? windowWidth * (256 / 1194) : windowWidth * (135 / 800), height: Platform.isPad? windowWidth * (224 / 1194) : windowHeight * (82 / 360), alignSelf: 'center', position: 'absolute', top: Platform.isPad? windowHeight * (70 / 800) : windowHeight * (35 / 360), resizeMode: 'contain'}} resizeMode='contain' resizeMethod='scale' />
                        <View style={{width: '100%', position: 'absolute', borderColor: 'white', borderWidth: 1, opacity: 0.12, bottom: 40}}/>
                        <View style={{width: '100%', height: Platform.isPad? windowHeight * (76 / 834) : windowHeight * (35 / 360), bottom: 0, position: 'absolute', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                            <View style={{width: windowWidth * (53 / 800), height: windowHeight * (20 / 360), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Image source={star} style={{width: windowWidth * (14 / 800), height: windowHeight * (14 / 360)}} resizeMode='contain' />
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '600', fontSize: windowWidth * (12 / 800), color: 'black'}}>{item.stars.earned} </Text>
                                    <Text style={{fontWeight: '600', fontSize: windowWidth * (12 / 800), color: '#B4B4B4'}}>/ {item.stars.total}</Text>
                                </View>
                            </View>
                        </View>
                        {index > 1 && <BlurView intensity={10} tint="light" style={{flex: 1, borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={lock} style={{width: windowWidth * (24 / 800), height: windowHeight * (24 / 360)}} resizeMode='contain' />
                        </BlurView>}
                    </TouchableOpacity>
            </Animated.View>
        )
    }

    const renderSubCollections = ({ item, onComplete, onCompleteTask }) => {
        
        
        const { image } = item;
        const isSvg = typeof image === 'string' && image.endsWith('.svg');

        const task = 
            Array.isArray(availableSubCollections) && availableSubCollections.includes(item.id)
                ? item.id
            : null;

            // console.log(item.current_task_id)

            const prepareTasksArray = (itemId) => {
                const tasksArray = subCollections
                    .filter(item => item.tasks?.length > 0) // Фильтруем только те, у которых есть задачи
                    .map(item => {
                        // console.log(item.current_task_id)
                        const startIndex = item.tasks.findIndex(task => task.id === item.current_task_id);
                        const tasksWithoutNextId = startIndex !== -1 ? item.tasks.slice(startIndex) : [];
            
                        const tasks = tasksWithoutNextId.map((task, index) => ({
                            ...task,
                            next_task_id: tasksWithoutNextId[index + 1]?.id || null, // Следующий ID или null для последнего объекта
                        }));
            
                        return {
                            tasks,
                            id: item.id,
                        };
                    });
            
                const clickedIndex = tasksArray.findIndex(obj => obj.id === itemId);
                return tasksArray.slice(clickedIndex);
            };
            
        
        return ( 
            <Animated.View entering={FadeInRight.duration(600).easing(Easing.out(Easing.exp))} style={{ width: 'auto', height: 'auto' }}>
                <TouchableOpacity 
                    onPress={(task != null && item.tasks.length > 0)
                        ? () => {
                            const filteredTasksArray = prepareTasksArray(item.id);
                            navigation.navigate('GameScreen', { tasks: filteredTasksArray, onComplete: (id, starId, earnedStars) => onComplete(id, starId, earnedStars), onCompleteTask: (id, newTaskId) => onCompleteTask(id, newTaskId) });
                            
                        } 
                        : () => {}}
                    style={{
                        backgroundColor: '#D8F6FF33', 
                        borderRadius: 12, 
                        width: Platform.isPad? windowWidth * (306 / 1194) :  windowWidth * (136 / 800), height: Platform.isPad? windowHeight * (402 / 834) : windowHeight * (160 / 360), 
                        marginRight: 20,  
                        borderWidth: 1, 
                        borderColor: '#FFFFFF1F',
                        flexDirection: 'column'
                    }}
                >
                    {
                        (task != null && item.tasks.length > 0) &&
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: Platform.isPad? 8 : 8 }}>
                            {[...Array(item.stars.total)].map((_, index) => {
                                const starImage = index < item.stars.earned ? filledStar : emptyStar;
                                return (
                                    <Image
                                        key={index}
                                        source={starImage}
                                        style={{
                                            width: Platform.isPad? windowWidth * (22 / 800) : windowWidth * (16 / 800),
                                            height: Platform.isPad? windowHeight * (22 / 360) : windowHeight * (16 / 360),
                                            marginHorizontal: 2,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                );
                            })}
                        </View>
                    }
                    {/* {
                        task === null? 
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: Platform.isPad? windowHeight * (12 / 360) : 8 }}>
                            {[...Array(item.stars.total)].map((_, index) => {
                                const starImage = index < item.stars.earned ? filledStar : emptyStar;
                                return (
                                    <Image
                                        key={index}
                                        source={starImage}
                                        style={{
                                            width: windowWidth * (16 / 800),
                                            height: windowHeight * (16 / 360),
                                            marginHorizontal: 2,
                                        }}
                                    />
                                );
                            })}
                        </View>
                        :
                        <Text 
                            style={{
                                fontWeight: '600', 
                                fontSize: Platform.isPad? windowWidth * (20 / 1194) : windowHeight * (12 / 360),
                                lineHeight: 20, 
                                textAlign: 'center', 
                                width: '100%', 
                                height: 'auto', 
                                color: 'white', 
                                position: 'absolute', 
                                top: Platform.isPad? windowHeight * (12 / 360) : 8
                            }}
                        >
                            Tap to play
                        </Text>
                    } */}
                    <View 
                        style={{
                            width: '100%', 
                            position: 'absolute', 
                            borderColor: 'white', 
                            borderWidth: 1, 
                            opacity: 0.12, 
                            top: Platform.isPad? windowHeight * (60 / 800) : 35
                        }} 
                    />
                    {isSvg ? (
                        <SvgUri 
                            uri={image} 
                            width={Platform.isPad? windowWidth * (256 / 1194) : windowWidth * (135 / 800)} 
                            height={Platform.isPad? windowWidth * (224 / 1194) : windowHeight * (82 / 360)} 
                            style={{
                                alignSelf: 'center', 
                                position: 'absolute', 
                                top: Platform.isPad? windowHeight * (90 / 800) : windowHeight * (35 / 360),
                                resizeMode: 'contain'
                            }}
                        />
                    ) : (
                        <Image 
                            source={{ uri: image }} 
                            style={{ 
                                width: Platform.isPad? windowWidth * (256 / 1194) : windowWidth * (135 / 800), height: Platform.isPad? windowWidth * (224 / 1194) : windowHeight * (82 / 360), alignSelf: 'center', resizeMode: 'contain' , position: 'absolute', aspectRatio: 1 / 1, top: Platform.isPad? windowHeight * (90 / 800) : windowHeight * (35 / 360), 
                            }}
                            resizeMethod='auto'
                        />
                    )}
                    <View 
                        style={{
                            width: '100%', 
                            position: 'absolute', 
                            borderColor: 'white', 
                            borderWidth: 1, 
                            opacity: 0.12, 
                            bottom: Platform.isPad? windowHeight * (30 / 360) : 40
                        }} 
                    />
                    <View 
                        style={{
                            width: '100%', 
                            height: windowHeight * (35 / 360), 
                            bottom: 0, 
                            position: 'absolute', 
                            alignItems: 'center', 
                            flexDirection: 'row', 
                            alignSelf: 'center', 
                            justifyContent: 'center'
                        }}
                    >
                        {item.skills && item.skills.length > 0 && item.skills.map((image, index) => (
                            <Image 
                                key={index}
                                source={image}
                                style={{
                                    resizeMode: 'contain', 
                                    width: windowWidth * (24 / 800), 
                                    height: windowHeight * (24 / 360), 
                                    marginHorizontal: 5
                                }} 
                            />
                        ))}
                    </View>
                    {(task === null || item.tasks.length <= 0) && <BlurView intensity={10} tint="light" style={{flex: 1, borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={lock} style={{width: windowWidth * (24 / 800), height: windowHeight * (24 / 360)}} resizeMode='contain' />
                        </BlurView>}
                </TouchableOpacity>
            </Animated.View>
        );
    };
    

    return (
        <FlatList
            horizontal
            key={store.categories}
            data={subCollections || collections}
            renderItem={subCollections ? (props) => renderSubCollections({ ...props, onComplete: handleGameCompletion, onCompleteTask: handleTaskCompletion }) : renderCollections}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
        />
    )
}

export default observer(GamesCollections);

// const tasksArray = subCollections
            //     .filter(item => item.tasks?.length > 0) // Фильтруем только те, у которых есть задачи
            //     .map(item => {
            //         const startIndex = item.tasks.findIndex(task => task.id === item.current_task_id);
            //         const tasksWithoutNextId = startIndex !== -1 ? item.tasks.slice(startIndex) : [];

            //         const tasks = tasksWithoutNextId.map((task, index) => ({
            //             ...task,
            //             next_task_id: tasksWithoutNextId[index + 1]?.id || null, // Следующий ID или null для последнего объекта
            //         }));

            //         return {
            //             tasks: tasks,
            //             id: item.id,
            //         };
            //     });

                // console.log(tasksArray[tasksArray.length - 1].tasks)

        // if (item.current_task_id === 150) {
        //     for (let index = 0; index < item.tasks.length; index++) {
        //         console.log(item.tasks[index])
        //     }
        // }
        // const startIndex = item.tasks.findIndex(task => task.id === item.current_task_id);
        // const tasks = startIndex !== -1 ? item.tasks.slice(startIndex) : [];
        // console.log(tasks)