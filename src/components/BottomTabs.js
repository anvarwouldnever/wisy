import React from "react";
import { View, TouchableOpacity, Image, useWindowDimensions, Text } from "react-native";
import brain from '../images/brain.png';
import brainActive from '../images/brainActive.png';
import skills from '../images/skills.png';
import skillsActive from '../images/skillsActive.png';
import heart from '../images/heart.png';
import heartActive from '../images/heartActive.png';
import settings from '../images/settings.png';
import settingsActive from '../images/settingsActive.png';
import chat from '../images/chat.png';
import { useNavigation } from "@react-navigation/native";

const BottomTabs = ({ screen, setScreen }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const navigation = useNavigation();

    return (
        <View style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{width: windowWidth * (188 / 360), height: windowHeight * (56 / 800), justifyContent: 'space-between', padding: 8, alignItems: 'center', flexDirection: 'row', backgroundColor: '#F8F8F8', borderRadius: 100}}>
                <TouchableOpacity activeOpacity={1} onPress={() => setScreen('Knowledge')} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800), alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={screen === 'Knowledge'? brainActive : brain} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800), aspectRatio: 40 / 40}}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => setScreen('Skills')} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800)}}>
                    <Image source={screen === 'Skills'? skillsActive : skills} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800), aspectRatio: 40 / 40}}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => setScreen('Attitudes & Values')} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800)}}>
                    <Image source={screen === 'Attitudes & Values'? heartActive : heart} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800), aspectRatio: 40 / 40}}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => setScreen('Settings')} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800)}}>
                    <Image source={screen === 'Settings'? settingsActive : settings} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800), aspectRatio: 40 / 40}}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} style={{width: windowWidth * (112 / 360), height: windowHeight * (56 / 800), gap: windowHeight * (8 / 800), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 100}}>
                <Image source={chat} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                <Text style={{fontWeight: '600', fontSize: windowHeight * (12 / 800), lineHeight: windowHeight * (24 / 800), color: '#504297'}}>Chat</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BottomTabs;