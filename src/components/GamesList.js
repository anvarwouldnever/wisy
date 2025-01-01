import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
    const navigation = useNavigation()

    const collections = store.categories[activeCategory]?.collections

    const handleGameCompletion = (id, earnedStars) => {
        const complete = (id, earnedStars) => {
            setSubCollections((prevSubCollections) =>
                prevSubCollections.map((subCollection) =>
                    subCollection.id === id
                        ? {
                              ...subCollection,
                              current_task_id: null,
                              stars: {
                                  ...subCollection.stars,
                                  earned: earnedStars, // Обновляем значение earned
                              },
                          }
                        : subCollection
                )
            );
        };
        complete(id, earnedStars);
        store.completeGame(activeCategory, id, earnedStars);
    };

    const renderCollections = ({ item, index }) => {

        return (
            <Animated.View entering={FadeInRight.duration(600).easing(Easing.out(Easing.cubic))} exiting={FadeOutLeft.duration(100)} style={{width: 'auto', height: 'auto'}}>
                    <TouchableOpacity onPress={() => {
                        setSubCollections(item.sub_collections)
                        setName(item.name)
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

    const renderSubCollections = ({ item, onComplete }) => {
        const { image } = item;
        const isSvg = typeof image === 'string' && image.endsWith('.svg');

        const taskIndex = item?.tasks?.findIndex(task => task.id === item.current_task_id);
        const tasks = taskIndex !== -1 ? item.tasks.slice(taskIndex) : null;

        return (
            <Animated.View entering={FadeInRight.duration(600).easing(Easing.out(Easing.exp))} style={{ width: 'auto', height: 'auto' }}>
                <TouchableOpacity 
                    onPress={tasks != null 
                        ? () => navigation.navigate('GameScreen', { tasks: tasks, onComplete: (earnedStars) => onComplete(item.id, earnedStars) }) 
                        : () => {}}
                    style={{
                        backgroundColor: '#D8F6FF33', 
                        borderRadius: 12, 
                        width: Platform.isPad? windowWidth * (306 / 1194) :  windowWidth * (136 / 800), height: Platform.isPad? windowHeight * (402 / 834) : windowHeight * (160 / 360), 
                        marginRight: 20,  
                        borderWidth: 1, 
                        borderColor: '#FFFFFF1F'
                    }}
                >
                    {
                        tasks === null? 
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
                    }
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
                                top: Platform.isPad? windowHeight * (0 / 800) : windowHeight * (35 / 360),
                                resizeMode: 'contain'
                            }}
                        />
                    ) : (
                        <Image 
                            source={{ uri: image }} 
                            style={{ 
                                width: Platform.isPad? windowWidth * (256 / 1194) : windowWidth * (135 / 800), height: Platform.isPad? windowWidth * (224 / 1194) : windowHeight * (82 / 360), alignSelf: 'center', position: 'absolute', top: Platform.isPad? windowHeight * (70 / 800) : windowHeight * (35 / 360), 
                                resizeMode: 'contain'
                            }}
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
                </TouchableOpacity>
            </Animated.View>
        );
    };
    

    return (
        <FlatList
            horizontal
            key={collections}
            data={subCollections || collections}
            renderItem={subCollections ? (props) => renderSubCollections({ ...props, onComplete: handleGameCompletion }) : renderCollections}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
        />
    )
}

export default observer(GamesCollections);