import React, { useState } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

const ChildEngagementTime = ({ options, setOptions }) => {

    return (
        <Animated.View entering={SlideInRight} style={{width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
            <View style={{width: width * 0.8666, height: height * (272 / 800), justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}}>
                <View style={{width: width * 0.8666, height: height * (56 / 800)}}>
                    <Text style={{color: '#222222', fontWeight: '600', fontSize: height * (20 / 800), lineHeight: height * (28 / 800), textAlign: 'center'}}>What's your child's typical engagement time?</Text>
                </View>
                <TouchableOpacity onPress={() => 
                    setOptions(prevOptions => ({
                        ...prevOptions,
                        engagement_time: 30
                    }))
                } 
                style={{backgroundColor: options.engagement_time === 30? '#504297' : 'white', justifyContent: 'center', alignItems: 'center', width: width * 0.8666, height: height * (56 / 800), borderRadius: 100, borderWidth: 1, borderColor: '#E5E5E5'}}>
                    <Text style={{fontWeight: '600', fontSize: height * (14 / 800), textAlign: 'center', color: options.engagement_time === 30? 'white' : '#222222'}}>30 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => 
                    setOptions(prevOptions => ({
                        ...prevOptions,
                        engagement_time: 45
                    }))
                } 
                style={{backgroundColor: options.engagement_time === 45? '#504297' : 'white', justifyContent: 'center', alignItems: 'center', width: width * 0.8666, height: height * (56 / 800), borderRadius: 100, borderWidth: 1, borderColor: '#E5E5E5'}}>
                    <Text style={{fontWeight: '600', fontSize: height * (14 / 800), textAlign: 'center', color: options.engagement_time === 45? 'white' : '#222222'}}>45 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => 
                    setOptions(prevOptions => ({
                        ...prevOptions,
                        engagement_time: 60
                    }))
                } 
                style={{backgroundColor: options.engagement_time === 60? '#504297' : 'white', justifyContent: 'center', alignItems: 'center', width: width * 0.8666, height: height * (56 / 800), borderRadius: 100, borderWidth: 1, borderColor: '#E5E5E5'}}>
                    <Text style={{fontWeight: '600', fontSize: height * (14 / 800), textAlign: 'center', color: options.engagement_time === 60? 'white' : '#222222'}}>1 hour</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontWeight: '500', fontSize: height * (14 / 800), textAlign: 'center', lineHeight: height * (20 / 800), color: '#555555'}}>Wisy will monitor the child's performance and suggest taking breaks as needed</Text>
        </Animated.View>
    )
}

export default ChildEngagementTime;