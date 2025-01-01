import React, { useState, useCallback} from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../components/Logo";
import SlideShow from "../components/SlideShow";
import { useNavigation } from "@react-navigation/native";
import * as Linking from 'expo-linking';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            }
            changeScreenOrientation();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <Logo />
            <View style={styles.slideShowContainer}>
                <SlideShow onPageChange={setCurrentIndex}/>
            </View>
            <View style={styles.paginationContainer}>
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <View
                        key={index}
                        style={[styles.paginationDot, {backgroundColor: currentIndex === index ? '#504297' : '#E5E5E5'}]}
                    />
                ))}
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AuthScreen', {authOption: 'signup'})}
                    style={styles.signUpButton}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AuthScreen', {authOption: 'login'})}
                    style={styles.logInButton}
                >
                    <Text style={styles.logInButtonText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
    },
    slideShowContainer: {
        height: height * (402 / 800),
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: 132,
        height: 12,
    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 100,
        opacity: 0.9,
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: width * 0.8666,
        height: height * 0.155,
        alignSelf: 'center',
        marginBottom: 20
    },
    signUpButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#504297',
        width: width * 0.8666,
        height: height * 0.07,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
    },
    logInButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8666,
        height: height * 0.07,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    buttonText: {
        fontWeight: '600',
        fontSize: height * (14 / 800),
        color: '#FFFFFF',
    },
    logInButtonText: {
        fontWeight: '600',
        fontSize: height * (14 / 800),
        color: '#504297',
    },
});

export default WelcomeScreen;