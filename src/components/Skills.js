import React from "react";
import { View, FlatList, useWindowDimensions, TouchableOpacity, Text, Image } from "react-native";
import cognitive from '../images/cognitive.png'
import emotional from '../images/emotional.png'
import physical from '../images/physical.png'
import narrowright from '../images/narrowright.png'
import { useNavigation } from "@react-navigation/native";

const Skills = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const navigation = useNavigation()

    const subjects = [
        {name: 'Cognitive', level: '1-4', image: cognitive, progress: 'started to learn'},
        {name: 'Social & Emotional', level: '1-4', image: emotional, progress: 'started to learn'},
        {name: 'Practical & Physical', level: '1-4', image: physical, progress: 'started to learn'},
    ]

    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ParentsSegments')} style={{width: windowWidth * (312 / 360), height: windowHeight * (76 / 800), borderRadius: 10, padding: windowWidth * (16 / 360), backgroundColor: '#F8F8F8', flexDirection: 'row', gap: windowWidth * (16 / 360), alignItems: 'center'}}>
                <Image source={item.image} style={{width: windowHeight * (48 / 800), height: windowHeight * (40 / 800), aspectRatio: 40 / 40}}/>
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

export default Skills;