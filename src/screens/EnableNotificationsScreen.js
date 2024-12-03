import React from "react";
import { SafeAreaView, View, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import image from '../images/noti-img 2.png'
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const EnableNotificationsScreen = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-end'}}>
            <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: width * (312 / 360), height: height * (356 / 800)}}>
                <Image source={image} style={{width: width * (244 / 360), height: height * (244 / 800), aspectRatio: 1 / 1}}/>
                <View style={{width: width * (312 / 360), height: height * (88 / 800), justifyContent: 'space-between', flexDirection: 'column'}}>
                    <Text style={{width: width * (312 / 360), color: '#222222', fontWeight: '600', fontSize: height * (20 / 800), lineHeight: height * (28 / 800), textAlign: 'center', height: height * (28 / 800)}}>Turn on notifications?</Text>
                    <Text style={{width: width * (312 / 360), color: '#555555', fontWeight: '400', fontSize: height * (14 / 800), lineHeight: height * (24 / 800), height: height * (48 / 800), textAlign: 'center'}}>We’ll remind you of the activities that you haven’t finished based on your preferences</Text>
                </View>
            </View>
            <View style={{marginTop: 50, marginBottom: 30, width: width * (312 / 360), height: height * (124 / 800), justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('ChoosePlayerScreen')} style={{backgroundColor: '#504297', borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: width * (312 / 360), height: height * (56 / 800)}}>
                    <Text style={{color: '#FFFFFF', fontWeight: '600', fontSize: height * (14 / 800), lineHeight: height * (24 / 800)}}>Enable Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ParentsCaptchaScreen')} style={{justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: '#E5E5E5', orderRadius: 100, alignItems: 'center', width: width * (312 / 360), height: height * (56 / 800), }}>
                    <Text style={{color: '#504297', fontWeight: '600', fontSize: height * (14 / 800), lineHeight: height * (24 / 800)}}>Set up later</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default EnableNotificationsScreen;