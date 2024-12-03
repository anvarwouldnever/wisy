import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import Knowledge from "./Knowledge";
import Skills from "./Skills";
import AttitudesValues from "./AttitudesValues";
import winkingWisy from '../images/Winking.png';

const ParentsComponents = ({ screen }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    return (
        <View style={{width: windowWidth * (312 / 360), height: windowHeight * (502 / 800), justifyContent: 'space-between'}}>
            <Text style={{fontSize: windowHeight * (16 / 800), lineHeight: windowHeight * (24 / 800), fontWeight: '600', height: windowHeight * (24 / 800), marginBottom: 7}}>{screen}</Text>
            <ScrollView contentContainerStyle={{justifyContent: 'space-between', gap: windowWidth * (16 / 360)}} showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor: '#C4DF84', flexDirection: 'row', gap: windowWidth * (16 / 360), padding: windowHeight * (16 / 800), alignSelf: 'center', borderRadius: 12, width: windowWidth * (312 / 360), height: windowHeight * (152 / 800)}}>
                    <Image source={winkingWisy} style={{width: windowHeight * (40 / 800), height: windowHeight * (40 / 800), aspectRatio: 40 / 40}}/>
                    <View style={{width: windowWidth * (224 / 360), height: windowHeight * (120 / 800), justifyContent: 'space-between'}}>
                        <View style={{width: windowWidth * (224 / 360), height: windowHeight * (64 / 800), alignSelf: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: '600', fontSize: windowHeight * (14 / 800), lineHeight: windowHeight * (20 / 800), height: windowHeight * (20 / 800)}}>Get to know your child</Text>
                            <Text style={{fontWeight: '600', color: '#555555', fontSize: windowHeight * (12 / 800), lineHeight: windowHeight * (20 / 800), height: windowHeight * (40 / 800)}}>10 insights from your child’s activity in the last 7 days</Text>
                        </View>
                        <TouchableOpacity style={{width: windowWidth * (96 / 360), height: windowHeight * (40 / 800), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 100}}>
                            <Text style={{color: '#504297', fontWeight: '600', fontSize: windowHeight * (12 / 800)}}>Open chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: windowWidth * (312 / 360), height: 'auto'}}>
                    {screen === 'Knowledge'? <Knowledge /> : screen === 'Skills'? <Skills /> : screen === 'Attitudes & Values' && <AttitudesValues />}
                </View>
            </ScrollView>
        </View>
    )
}

export default ParentsComponents;