import { View, Text, SafeAreaView, useWindowDimensions, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Logo from './Logo';
import { useNavigation } from '@react-navigation/native';
import api from '../api/api';
import store from '../store/store';
import translations from '../../localization';

const ForgotPassword = () => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const navigation = useNavigation();

    const [email, setEmail] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [error, setError] = useState<string>('')

    // anvartashpulatov2@gmail.com

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setIsValidEmail(validateEmail(text));
    };

    const resetPassword = async () => {
        try {
            const response = await api.forgotPassword(email);
            if (response.is_success) {
                await store.setHoldEmail(email);
                navigation.navigate("EmailConfirmScreen")
            } else {
                setError(response)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ alignSelf: 'flex-start' }}>
                <Logo />
            </View>
            <View style={{ gap: windowHeight * (20 / 800), position: 'absolute', alignSelf: 'center' }}>
                <View style={{ width: windowWidth * (312 / 360), height: windowHeight * (88 / 800), justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '600', color: '#222222', fontSize: windowHeight * (20 / 800), textAlign: 'center' }}>{translations?.[store.language]?.forgotUrPassword}?</Text>
                    <Text style={{ fontWeight: '400', color: '#555555', fontSize: windowHeight * (14 / 800), textAlign: 'center', lineHeight: windowHeight * (24 / 800) }}>
                        {translations?.[store.language]?.enterYourEmailAddressAnd}
                    </Text>
                </View>
                <TextInput
                    onChangeText={handleEmailChange}
                    placeholderTextColor={"#B1B1B1"}
                    placeholder={translations?.[store.language]?.emailAddress}
                    style={{
                        borderWidth: 1,
                        fontSize: windowHeight * (14 / 800),
                        fontWeight: '600',
                        marginTop: 30,
                        borderColor: error != ''? 'red' : '#E5E5E5',
                        width: windowWidth * (312 / 360),
                        height: windowHeight * (56 / 800),
                        borderRadius: 100,
                        paddingHorizontal: 16
                    }}
                />
                {error != '' && <Text style={{textAlign: 'center', fontWeight: '600', color: 'red'}}>{error}</Text>}
                <TouchableOpacity
                    onPress={isValidEmail ? () => resetPassword() : () => navigation.navigate("ResetPassword")} // Блокируем вызов функции, если email невалидный
                    style={{
                        backgroundColor: '#504297',
                        width: windowWidth * (312 / 360),
                        height: windowHeight * (56 / 800),
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isValidEmail ? 1 : 0.5 // Меняем прозрачность в зависимости от валидности email
                    }}
                >
                    <Text style={{ fontWeight: '600', color: '#FFFFFF', fontSize: windowHeight * (14 / 800), textAlign: 'center' }}>
                        {translations?.[store.language]?.send}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: windowWidth * (312 / 360), height: windowHeight * (20 / 800), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <Text style={{ color: '#555555', fontWeight: '600', fontSize: windowHeight * (12 / 800), textAlign: 'center' }}>{translations?.[store.language]?.backTo}</Text>
                    <Text onPress={() => navigation.goBack()} style={{ color: '#504297', fontWeight: '600', fontSize: windowHeight * (12 / 800), textAlign: 'center' }}>{translations?.[store.language]?.login}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;
