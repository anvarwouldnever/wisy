import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View, useWindowDimensions, Text, TouchableOpacity, Image, FlatList, Platform } from "react-native";
import lockimage from '../images/Rotate.png'
import backspace from '../images/tabler_backspace.png'
import ParentsCancel from "../components/ParentsCancel";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';
import translations from "../../localization";
import store from "../store/store";
import { observer } from "mobx-react-lite";

const numberToText = (num, lang) => {
    const numberMap = {
        en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
        lv: ['nulle', 'viens', 'divi', 'trīs', 'četri', 'pieci', 'seši', 'septiņi', 'astoņi', 'deviņi'],
        es: ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'],
        fr: ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'],
        ru: ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
    };

    return numberMap[lang] ? numberMap[lang][num] : numberMap['en'][num]; // По умолчанию использовать английский, если язык не найден
};

const generateRandomNumbers = () => {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
}

const ParentsCaptcha = () => {

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            }
            changeScreenOrientation();
            setAnswer([])
            setError(false)
        }, [])
    );

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    
    const [generatedNumbers, setGeneratedNumbers] = useState<number[]>(generateRandomNumbers());
    const [answer, setAnswer] = useState<number[]>([]);
    const [error, setError] = useState(false)
    
    useEffect(() => {
        if (answer.length === 4 && JSON.stringify(answer) === JSON.stringify(generatedNumbers)) {
            navigation.navigate('ParentsScreen')
        } else if (answer.length === 4 && JSON.stringify(answer) != JSON.stringify(generatedNumbers)) {
            setError(true)
        }
    }, [answer, generatedNumbers]);

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];

    const Pad = ({ onPress }) => {
        return (
            <FlatList
                data={numbers}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        onPress={() => { onPress(item) }}
                        style={{
                            backgroundColor: index === 9 || index === 11 ? 'white' : '#F8F8F8',
                            width: windowWidth * (96 / 360),
                            height: windowHeight * (48 / 800),
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {item === 'del'
                            ? <Image source={backspace} style={{ width: windowWidth * (24 / 360), height: windowHeight * (24 / 800), aspectRatio: 24 / 24 }} />
                            : <Text style={{ fontWeight: '600', fontSize: windowHeight * (24 / 800), lineHeight: windowHeight * (40 / 800), textAlign: 'center' }}>{item}</Text>
                        }
                    </TouchableOpacity>
                )}
                numColumns={3}
                columnWrapperStyle={{ gap: windowHeight * (10 / 800) }}
                contentContainerStyle={{ gap: windowHeight * (10 / 800) }}
                scrollEnabled={false}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', flexDirection: 'column', paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
            <ParentsCancel />
            <Image source={lockimage} style={{ marginVertical: windowHeight * (15 / 800), width: windowWidth * (244 / 360), height: windowHeight * (244 / 800), aspectRatio: 1 / 1 }} />
            <View style={{justifyContent: 'space-evenly', alignItems: 'center', width: windowWidth * (312 / 360), height: windowHeight * (166 / 800) }}>
                <Text style={{ fontWeight: '600', marginBottom: windowHeight * (15 / 800), fontSize: windowHeight * (24 / 800), lineHeight: windowHeight * (24 / 800), textAlign: 'center' }}>{translations[store.language]?.enterTheCode ?? "Enter the code"}</Text>
                <Text style={{ fontWeight: '600', fontSize: windowHeight * (14 / 800) }}>
                    {generatedNumbers.map(num => numberToText(num, store.language)).join(' ')}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: windowWidth * (216 / 360), height: windowHeight * (48 / 800), backgroundColor: 'white' }}>
                    {Array(4).fill(0).map((_, idx) => (
                        <Text key={idx} style={{
                            width: windowWidth * (45 / 360),
                            fontWeight: '600',
                            fontSize: windowHeight * (24 / 800),
                            lineHeight: windowHeight * (45 / 800),
                            color: '#222222',
                            height: windowHeight * (48 / 800),
                            borderRadius: 4,
                            backgroundColor: '#F8F8F8',
                            borderWidth: 1,
                            borderColor: error? 'red' : '#F1F1F1',
                            textAlign: 'center'
                        }}>
                            {answer[idx] !== undefined ? answer[idx] : ''}
                        </Text>
                    ))}
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: windowHeight * (50 / 932) }}>
                <Pad onPress={(item: any) => {
                    if (item === 'del') {
                        setAnswer(prev => prev.slice(0, prev.length - 1));
                    } else if (typeof item === 'number') {
                        setAnswer(prev => prev.length < 4 ? [...prev, item] : prev);
                    }
                }} />
            </View>
        </SafeAreaView>
    );
};

export default observer(ParentsCaptcha);
