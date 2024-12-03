import React from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";
import lock from '../images/lock.png'

const SubscriptionState = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    return (
        <View style={{width: windowWidth * (312 / 360), height: windowHeight * (168 / 800), borderRadius: 12, padding: windowHeight * (16 / 800), gap: windowHeight * (16 / 800), flexDirection: 'row'}}>
            {/* <Image source={lock} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
            <View style={{width: windowWidth * (240 / 360), height: windowHeight * (136 / 800), alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{width: windowWidth * (240 / 360), height: windowHeight * (44 / 800), flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: '600', fontSize: windowHeight * (14 / 800), lineHeight: windowHeight * (20 / 800), color: '#222222'}}>Your subscription is active</Text>
                    <Text style={{fontWeight: '400', fontSize: windowHeight * (12 / 800), lineHeight: windowHeight * (20 / 800), color: '#555555'}}>Renews on March 1, 2024</Text>
                </View>
                <View style={{width: windowWidth * (240 / 360), height: windowHeight * (28 / 800), flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text style={{fontWeight: '600', fontSize: windowHeight * (20 / 800), lineHeight: windowHeight * (28 / 800)}}>€6,99</Text>
                    <Text style={{lineHeight: windowHeight * (24 / 800), fontSize: windowHeight * (12 / 800), marginLeft: 4}}>per month</Text>
                </View>
                <Text style={{width: windowWidth * (240 / 360), height: windowHeight * (40 / 800), color: '#555555', lineHeight: windowHeight * (20 / 800), fontSize: windowHeight * (12 / 800)}}>
                    You can manage subscription in Apple ID settings
                </Text>
            </View> */}
        </View>
    )
}

export default SubscriptionState;

// backgroundColor: '#C4DF84'