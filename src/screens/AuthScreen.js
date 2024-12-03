import React, { useState } from "react";
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import Logo from "../components/Logo";
import AuthSignup from "../components/AuthSignup";
import AuthLogin from "../components/AuthLogin";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = ({ route }) => {

    const [authOption, setAuthOption] = useState(route.params.authOption)
    const navigation = useNavigation()
    const proceed = () => {
        
        navigation.navigate('EmailConfirmScreen')
    }

    const playersScreen = (players) => {
        navigation.navigate('ChoosePlayerScreen', {players: players})
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                <Logo />
                {authOption === 'signup'? <AuthSignup proceed={proceed} toggleOption={setAuthOption}/> : <AuthLogin playersScreen={playersScreen} proceed={proceed} toggleOption={setAuthOption}/>}       
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default AuthScreen;