import React, { useState } from "react";
import { View, Dimensions, Text, TouchableOpacity, TextInput, Image, ActivityIndicator } from "react-native";
import google from '../images/google.png'
import apple from '../images/apple.png'
import facebook from '../images/facebook.png'
import Animated, { FadeInRight } from "react-native-reanimated";
import api from '../api/api'
import store from "../store/store";
import { observer } from 'mobx-react-lite'

const { width, height } = Dimensions.get('window');

const AuthLogin = ({ proceed, toggleOption, playersScreen }) => {

    // igor.khegay@avtech.uz

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const signIn = async() => {
        try {
            setLoading(true)
            const requestStatus = await api.signIn(email, password)
            if (requestStatus === 'The email field must be a valid email address.') {
                setError('email')
            } else if (requestStatus === 'The password field must be at least 8 characters.') {
                setError('password')
            } else if (requestStatus === 'Invalid Credentials') {
                setError('invalid')
            } else if (requestStatus.token && requestStatus.children) {
                store.setChildren(requestStatus.children.data)
                store.setToken(requestStatus.token)
                // playersScreen(requestStatus)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
            <Animated.View entering={FadeInRight} style={{justifyContent: 'space-between', marginTop: 30, alignSelf: 'center', width: width * 0.8666, height: height * 0.7725}}>
                <View style={{justifyContent: 'center', alignItems: 'center', width: width * 0.8666, height: height * (28 / 800)}}>
                    <Text style={{textAlign: 'center', color: '#222222', fontWeight: '600', fontSize: height * (20 / 800), lineHeight: height * (28 / 800)}}>Hello!</Text>
                </View>
                <View behavior='height' style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', width: width * 0.8666, height: 'auto', gap: height * (12 / 800)}}>
                    <TextInput onChangeText={(text) => setEmail(text)} keyboardType='email-address' style={{fontWeight: '600', fontSize: height * (14 / 800), padding: height * (16 / 800), borderRadius: 100, borderWidth: 1, borderColor: error === 'email' || error === 'invalid'? '#D83636' : '#E5E5E5', borderStyle: 'solid', width: width * 0.8666, height: height * (56 / 800)}} placeholderTextColor={'#B1B1B1'} placeholder="Email"/>
                        {error === 'email' 
                        && 
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Text style={{width: width * (280 / 360), fontWeight: '600', fontSize: height * (12 / 800), alignItems: 'center', color: '#D83636'}}>The email field must be a valid email address</Text>
                        </View>
                        }
                    <TextInput onChangeText={(text) => setPassword(text)} keyboardType='visible-password' style={{fontWeight: '600', fontSize: height * (14 / 800), padding: height * (16 / 800), borderRadius: 100, borderWidth: 1, borderColor: error === 'password' || error === 'invalid'? '#D83636' : '#E5E5E5', borderStyle: 'solid', width: width * 0.8666, height: height * (56 / 800)}} placeholderTextColor={'#B1B1B1'} placeholder="Password" secureTextEntry={true}/>
                        {error === 'password' || error === 'invalid'?
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Text style={{width: width * (280 / 360), fontWeight: '600', fontSize: height * (12 / 800), alignItems: 'center', color: '#D83636'}}>{error === 'password'? 'The password field must be at least 8 characters' : error === 'invalid' && 'Invalid credentials'}</Text>
                        </View>
                        :
                        ''
                        }
                    <View style={{alignItems: 'center', width: width * 0.8666, height: height * (20 / 800)}}>
                        <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', width: width * (280 / 360), height: height * (20 / 800)}}>
                            <Text style={{color: '#555555', fontSize: height * (12 / 800), fontWeight: '600'}}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* onPress={email === ''? () => setError('email') : password === ''? () => setError('password') : () => signIn()} */}
                <TouchableOpacity onPress={email === ''? () => setError('email') : password === ''? () => setError('password') : () => signIn()} style={{justifyContent: 'center', alignItems: 'center', opacity: email != '' && password != ''? 1 : 0.5, alignSelf: 'center', width: width * 0.8666, height: height * (56 / 800), backgroundColor: '#504297', borderRadius: 100, }}>
                    <Text style={{fontWeight: '600', color: 'white', textAlign: 'center', fontSize: height * (14 / 800)}}>Continue</Text>
                </TouchableOpacity>
                <View style={{height: 1, width: width * 0.8666, backgroundColor: '#E5E5E5'}}/>
                <View style={{justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', width: width * 0.8666, height: height * (192 / 800)}}>
                    <TouchableOpacity style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 16, width: width * 0.8666, height: height * (56 / 800), borderColor: '#E5E5E5', borderWidth: 1, borderStyle: 'solid', borderRadius: 100}}>
                        <Image source={google} style={{width: height * (24 / 800), height: height * (24 / 800)}}/>
                        <Text style={{fontWeight: '600', fontSize: height * (14 / 800), color: '#222222', width: width * (248 / 360)}}>Continue with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 16, width: width * 0.8666, height: height * (56 / 800), borderColor: '#E5E5E5', borderWidth: 1, borderStyle: 'solid', borderRadius: 100}}>
                        <Image source={apple} style={{width: height * (24 / 800), height: height * (24 / 800)}}/>
                        <Text style={{fontWeight: '600', fontSize: height * (14 / 800), color: '#222222', width: width * (248 / 360)}}>Continue with Apple</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 16, width: width * 0.8666, height: height * (56 / 800), borderColor: '#E5E5E5', borderWidth: 1, borderStyle: 'solid', borderRadius: 100}}>
                        <Image source={facebook} style={{width: height * (24 / 800), height: height * (24 / 800)}}/>
                        <Text style={{fontWeight: '600', fontSize: height * (14 / 800), color: '#222222', width: width * (248 / 360)}}>Continue with Facebook</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'flex-end', width: width * 0.8666, height: height * (97 / 800)}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: width * 0.8666, height: height * (20 / 800)}}>
                        <Text style={{color: '#555555', fontWeight: '600', fontSize: height * (12 / 800)}}>I don’t have an account yet.</Text>
                        <TouchableOpacity onPress={() => toggleOption('signup')} style={{marginLeft: 2}}>
                            <Text style={{color: '#504297', fontWeight: '600', fontSize: height * (12 / 800)}}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {loading && <ActivityIndicator color='#504297' style={{position: 'absolute', alignSelf: 'center', top: 0, left: 0, right: 0, bottom: 0}}/>}
            </Animated.View>
    )
}

export default observer(AuthLogin);