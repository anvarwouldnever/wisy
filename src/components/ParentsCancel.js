import React from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import x from '../images/x.png'
import { useNavigation } from "@react-navigation/native";

const ParentsCancel = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const navigation = useNavigation()
    
    return (
        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: windowWidth * (312 / 360), height: windowHeight * (28 / 800)}}>
            <Text style={{fontWeight: '600', fontSize: windowHeight * (20 / 800), lineHeight: windowHeight * (28 / 800)}}>Parents</Text>
            <TouchableOpacity onPress={() => navigation.navigate('GamesScreen')} style={{justifyContent: 'center', alignItems: 'center', width: windowWidth * (24 / 360), height: windowHeight * (24 / 800)}}>
                <Image source={x} style={{width: windowWidth * (18 / 360), height: windowHeight * (18 / 800), aspectRatio: 18 / 18}}/>
            </TouchableOpacity>
        </View>
    )
}

export default ParentsCancel;