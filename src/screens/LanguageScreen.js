import { View, Text, SafeAreaView, useWindowDimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import Logo from '../components/Logo';
import { observer } from 'mobx-react-lite';
import translations from '../../localization';
import store from '../store/store';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';

const LanguageScreen = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [chosenLang, setChosenLang] = useState(null);
    const navigation = useNavigation();

    // const setLanguage = (language, tag) => {
    //     setChosenLang(language);
    // };

    const func = async() => {
        await store.setLanguage(chosenLang?.tag)
        navigation.navigate("WelcomeScreen")
    }

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            }
            changeScreenOrientation();
        }, [])
    );

    const langs = [
        { name: "English", tag: "en" },
        { name: "Latvian", tag: "lv" }
    ];

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => setChosenLang(item)} style={{borderWidth: 1, opacity: chosenLang === null? 1 : chosenLang.name === item.name? 1 : 0.5, borderColor: chosenLang === null? '#E5E5E5' : chosenLang.name === item.name? '#22222' : '#E5E5E5', width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 100}}>
                <Text style={{fontSize: windowWidth * (14 / 360), color: '#222222', fontWeight: '600'}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Logo />
            <View style={{ width: windowWidth * (312 / 360), height: windowHeight * (618 / 800), alignSelf: 'center', marginTop: 30, justifyContent: 'space-between'}}>
                <View style={{width: windowWidth * (312 / 360), height: windowHeight * (24 / 800), alignSelf: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: '400', fontSize: 14, textAlign: 'center', color: "#555555"}}>Select language to proceed</Text>
                </View>
                <View style={{width: windowWidth * (312 / 360), height: windowHeight * (490 / 800), alignSelf: 'center', alignItems: 'center'}}>
                    <FlatList 
                        data={langs}
                        renderItem={renderItem}
                        scrollEnabled={false}
                        contentContainerStyle={{alignSelf: 'center', gap: windowHeight * (12 / 800)}}
                    />
                </View>
                <TouchableOpacity onPress={chosenLang === null? () => {return} : () => func()} style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), alignSelf: 'center', borderRadius: 100, opacity: chosenLang === null? 0.5 : 1, backgroundColor: '#504297', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: windowWidth * (14 / 360), color: 'white', fontWeight: '600'}}>{translations[chosenLang?.tag]?.continue ?? "Continue"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default observer(LanguageScreen);