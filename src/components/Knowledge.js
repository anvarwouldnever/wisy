import React from "react";
import { View, FlatList, useWindowDimensions, TouchableOpacity, Text, Image } from "react-native";
import language from '../images/Language.png'
import naturalscience from '../images/Natural-sciences 1.png'
import numbers from '../images/Numbers.png'
import narrowright from '../images/narrowright.png'
import { useNavigation } from "@react-navigation/native";

const Knowledge = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const navigation = useNavigation()

    const subjects = [
        {name: 'Language', level: '1-4', image: language, progress: 'started to learn'},
        {name: 'Natural Sciences', level: '1-4', image: naturalscience, progress: 'started to learn'},
        {name: 'Mathematics', level: '1-4', image: numbers, progress: 'started to learn'},
        {name: 'Technology', level: '1-4', image: numbers, progress: 'started to learn'}
    ]

    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ParentsSegments')} style={{width: windowWidth * (312 / 360), height: windowHeight * (76 / 800), borderRadius: 10, padding: windowWidth * (16 / 360), backgroundColor: '#F8F8F8', flexDirection: 'row', gap: windowWidth * (16 / 360), alignItems: 'center'}}>
                <Image source={item.image} style={{width: windowHeight * (48 / 800), height: windowHeight * (48 / 800), aspectRatio: 40 / 40}}/>
                <View style={{width: windowWidth * (184 / 360), height: windowHeight * (44 / 800), flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Text style={{color: '#222222', fontWeight: '600', lineHeight: windowHeight * (20 / 800), fontSize: windowHeight * (14 / 800)}}>{item.name}</Text>
                    <Text style={{lineHeight: windowHeight * (20 / 800), color: '#555555', fontWeight: '400', fontSize: windowHeight * (12 / 800)}}>level {item.level} : {item.progress}</Text>
                </View>
                <View style={{width: windowWidth * (24 / 360), justifyContent: 'center', alignItems: 'center', height: windowHeight * (24 / 800)}}>
                    <Image source={narrowright} style={{width: windowWidth * (24 / 360), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                </View>
            </TouchableOpacity>
        )
    }

    return  <FlatList 
            data={subjects}
            keyExtractor={item => item.name}
            renderItem={renderItem}
            contentContainerStyle={{gap: 16}}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />
}

export default Knowledge;