import React, { useState } from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

const ChildGender = ({ setOptions, options }) => {

    return (
        <Animated.View entering={SlideInRight} style={{width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
            <View style={{width: width * 0.8666, height: height * (28 / 800)}}>
                <Text style={{color: '#222222', fontWeight: '600', fontSize: height * (20 / 800), lineHeight: height * (28 / 800), textAlign: 'center'}}>What is your child’s gender?</Text>
            </View>
            <TouchableOpacity onPress={() => 
                {
                setOptions(prevOptions => ({
                    ...prevOptions,
                    gender: 0
                }))
                }} 
                style={{backgroundColor: options.gender === 0? '#504297' : 'white', justifyContent: 'center', alignItems: 'center', width: width * 0.8666, height: height * (56 / 800), borderRadius: 100, borderWidth: 1, borderColor: '#E5E5E5'}}>
                <Text style={{fontWeight: '600', fontSize: height * (14 / 800), textAlign: 'center', color: options.gender === 0? 'white' : '#222222'}}>Boy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => 
                {
                setOptions(prevOptions => ({
                    ...prevOptions,
                    gender: 1
                }))
                }} style={{backgroundColor: options.gender === 1? '#504297' : 'white', justifyContent: 'center', alignItems: 'center', width: width * 0.8666, height: height * (56 / 800), borderRadius: 100, borderWidth: 1, borderColor: '#E5E5E5'}}>
                <Text style={{fontWeight: '600', fontSize: height * (14 / 800), textAlign: 'center', color: options.gender === 1? 'white' : '#222222'}}>Girl</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => 
                {
                setOptions(prevOptions => ({
                    ...prevOptions,
                    gender: 2
                }))
                }} style={{backgroundColor: options.gender === 2? '#504297' : 'white', justifyContent: 'center', alignItems: 'center', width: width * 0.8666, height: height * (56 / 800), borderRadius: 100, borderWidth: 1, borderColor: '#E5E5E5'}}>
                <Text style={{fontWeight: '600', fontSize: height * (14 / 800), textAlign: 'center', color: options.gender === 2? 'white' : '#222222'}}>Prefer not to say</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default ChildGender;