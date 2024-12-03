import React from "react";
import { View, Image, Platform } from 'react-native'
import Logotype from '../images/Logo.png'

const Logo = () => {
    return (
        <View style={{alignSelf: 'center', height: 64, width: 194, flexDirection: 'row', marginTop: Platform.OS === 'android'? 40 : 0}}>
            <Image source={Logotype} style={{width: '100%', height: '100%'}}/>
        </View>
    )
}

export default Logo;