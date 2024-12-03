import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, Modal } from 'react-native'
import React, { useState } from 'react'
import image from '../images/noti-img 2 (1).png'
import Logo from '../components/Logo'
import { useNavigation } from '@react-navigation/native';
import EmailModal from '../components/EmailModal';

const EmailConfirmScreen = () => {

const { width, height } = Dimensions.get('window');
const navigation = useNavigation()

const [modal, setModal] = useState(false)

return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between'}}>
        <Logo />
        <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: width * (312 / 360), height: height * (356 / 800)}}>
            <Image source={image} style={{width: width * (244 / 360), height: height * (244 / 800), aspectRatio: 1 / 1}}/>
            <View style={{width: width * (312 / 360), height: height * (88 / 800), justifyContent: 'space-between', flexDirection: 'column'}}>
                <Text style={{width: width * (312 / 360), color: '#222222', fontWeight: '600', fontSize: height * (20 / 800), lineHeight: height * (28 / 800), textAlign: 'center', height: height * (28 / 800)}}>Follow instructions to proceed</Text>
                <Text style={{width: width * (312 / 360), color: '#555555', fontWeight: '400', fontSize: height * (14 / 800), lineHeight: height * (24 / 800), height: height * (48 / 800), textAlign: 'center'}}>There’s a link sent to your email address. Please open it on this device.</Text>
            </View>
        </View>
        <EmailModal modal={modal} setModal={setModal} />
        <View style={{marginTop: 50, marginBottom: 30, width: width * (312 / 360), height: height * (124 / 800), justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setModal(true)} style={{backgroundColor: '#504297', borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: width * (312 / 360), height: height * (56 / 800)}}>
                <Text style={{color: '#FFFFFF', fontWeight: '600', fontSize: height * (14 / 800), lineHeight: height * (24 / 800)}}>Open inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChildParamsScreen')} style={{justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: '#E5E5E5', alignItems: 'center', width: width * (312 / 360), height: height * (56 / 800), }}>
                <Text style={{color: '#504297', fontWeight: '600', fontSize: height * (14 / 800), lineHeight: height * (24 / 800)}}>Resend code in 00:20</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}

export default EmailConfirmScreen;