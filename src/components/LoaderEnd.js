import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Dimensions, TouchableOpacity, Text, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

const LoaderEnd = ({ text }) => {

    const navigation = useNavigation()

    return (
        <View>
            {text === 'We have matched activities that fit your child!' && 
            <TouchableOpacity onPress={() => navigation.navigate('EnableNotificationsScreen')} style={{position: 'absolute', top: height * (800 / 932),  backgroundColor: '#504297', width: width * (312 / 360), height: height * (56 / 800), borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#FFFFFF', fontSize: Platform.isPad? height * (10 / 800) : height * (14 / 800), fontWeight: '600', textAlign: 'center', lineHeight: 24}}>Continue</Text>
            </TouchableOpacity>}
        </View>
    )
}

export default LoaderEnd;