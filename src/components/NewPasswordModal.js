import React from "react";
import { Modal, TouchableOpacity, TextInput, useWindowDimensions, View, KeyboardAvoidingView, TouchableWithoutFeedback, Text, Image } from "react-native";
import eye from '../images/tabler_eye.png'

const NewPasswordModal = ({ setModal, setSecure, secure, modal, setPopUpModal }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    return (
        <Modal transparent={true} visible={modal} animationType='slide' onRequestClose={() => setModal(false)}>
            <TouchableOpacity activeOpacity={0} style={{flex: 1}} onPress={() => setModal(false)}>
                <KeyboardAvoidingView style={{ position: 'absolute', bottom: 0 }} behavior='padding'>
                    <TouchableWithoutFeedback>
                        <View style={{width: windowWidth, height: windowHeight * (322 / 800), backgroundColor: 'white', borderRadius: 24, shadowOffset: {width: 1, height: 1}, shadowColor: 'black', shadowRadius: 450, shadowOpacity: 1}}>
                            <View style={{width: windowWidth * (312 / 360), alignSelf: 'center', height: windowHeight * (128 / 800), marginTop: 30, justifyContent: 'space-between'}}>
                                <Text style={{color: '#222222', fontSize: windowHeight * (16 / 800), lineHeight: windowHeight * (24 / 800), fontWeight: '600'}}>Change password</Text>
                                <View style={{width: windowWidth * (312 / 360), height: windowHeight * (88 / 800), alignItems: 'center', justifyContent: 'space-between'}}>
                                    <View style={{borderRadius: 100, height: windowHeight * (56 / 800),  width: windowWidth * (312 / 360), borderWidth: 1, borderColor: '#E5E5E5', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16}}>
                                        <TextInput 
                                            style={{borderRadius: 100, height: windowHeight * (56 / 800), fontSize: windowHeight * (14 / 800), alignItems: 'center', fontWeight: '600', width: windowWidth * (232 / 360)}}
                                            placeholder="New password"
                                            placeholderTextColor={'#B1B1B1'}
                                            secureTextEntry={secure}
                                        />
                                        <TouchableOpacity onPress={() => setSecure(prev => !prev)}>
                                            <Image source={eye} style={{width: windowWidth * (24 / 360), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{width: windowWidth * (312 / 360), height: windowHeight * (20 / 800), fontWeight: '400', fontSize: windowHeight * (12 / 800), lineHeight: windowHeight * (20 / 800), color: '#555555'}}>Password must contain at least 1 uppercase letter</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {
                                    setModal(false)
                                    setPopUpModal(true)
                                }
                            }
                             activeOpacity={0.9} style={{backgroundColor: '#504297', borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), borderWidth: 1, alignSelf: 'center', marginTop: 30}}>
                                <Text style={{color: '#FFFFFF', fontWeight: '600', fontSize: windowHeight * (14 / 800), lineHeight: windowHeight * (24 / 800)}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        </Modal>
    )
}

export default NewPasswordModal;