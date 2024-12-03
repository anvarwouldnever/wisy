import React, { useState, useRef } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import narrowleft from '../images/tablerleft.png'
import { useNavigation } from "@react-navigation/native";
import wisypfp from '../images/wisypfp.png'
import dog from '../images/Dog.png'
import arrow from '../images/arrowupblack.png'
import PlayVoiceMessage from "../components/PlayVoiceMessage";
import api from '../api/api'
import store from "../store/store";
import { observer } from "mobx-react-lite";
import DotsAnimation from "../animations/DotsAnimation";
import ChatMicroAnimation from "../animations/ChatMicroAnimation";

const ChatScreen = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const navigation = useNavigation()
    const [text, setText] = useState('')
    const flatListRef = useRef(null);
    const firstMessageRef = useRef(null);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.6} style={{marginRight: windowWidth * (16 / 932), width: windowWidth * (264 / 360), height: windowHeight * (60 / 800), paddingHorizontal: windowWidth * (8 / 360), paddingVertical: windowHeight * (16 / 932), gap: windowWidth * (4 / 360), borderRadius: 8, backgroundColor: '#F0F0F0'}}>
                <Text style={{fontWeight: '600', fontSize: windowHeight * (12 / 800), color: '#222222', lineHeight: windowHeight * (20 / 800)}}>{item.header}</Text>
                <Text style={{fontWeight: '400', fontSize: windowHeight * (12 / 800), color: '#555555', lineHeight: windowHeight * (20 / 800)}}>{item.text}</Text>
            </TouchableOpacity>
        )
    }
    
    const renderItemMessage = ({ item, index }) => {
    
        const messageType = item.type
        const isLastVoiceMessage = index === 0;
    
        return (
            messageType === 'text' || messageType === 'thinking'? (
                <View ref={index === 0 ? firstMessageRef : null} style={{ width: 'auto', height: 'auto', flexDirection: item.author === 'MyWisy' ? 'row' : 'row-reverse', gap: windowWidth * (8 / 360)}}>
                    <Image source={item.author === 'MyWisy' ? wisypfp : dog} style={{ width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24 }} />
                    <View style={{ width: 'auto', maxWidth: windowWidth * (250 / 360), height: 'auto', gap: windowWidth * (8 / 360), flexDirection: 'column' }}>
                        <Text style={{ color: '#555555', fontWeight: '600', fontSize: windowHeight * (14 / 800), lineHeight: windowHeight * (24 / 800), textAlign: item.author === 'MyWisy' ? 'left' : 'right' }}>{item.author}</Text>
                        <Text style={{ color: '#555555', fontSize: windowHeight * (14 / 800), fontWeight: '400', lineHeight: windowHeight * (24 / 800), textAlign: item.author === 'MyWisy' ? 'left' : 'left', writingDirection: 'ltr' }}>{item.text} {messageType === 'thinking' && <DotsAnimation />}</Text>
                    </View>
                </View>
            ) : <PlayVoiceMessage animated={isLastVoiceMessage} uri={item.text}/>
        )
    }

    const [recs, setRecs] = useState([
        {header: 'Lorem ipsum', text: 'Lorem ipsum dolor sit amet consectetur'},
        {header: 'Lorem ipsum', text: 'Lorem ipsum dolor sit amet consectetur'},
        {header: 'Lorem ipsum', text: 'Lorem ipsum dolor sit amet consectetur'},
    ])
    
    const sendMessage = async() => {
        const currentText = text
        setText('')
        await store.setMessages({type: 'text', text: currentText, author: 'You'});
        Keyboard.dismiss();
        setTimeout(async() => {
            await store.setMessages({type: 'thinking', text: 'Thinking', author: 'MyWisy'})
        }, 500);

        try {
            const response = await api.sendMessage({ message: currentText });
            await store.setMessages({type: 'text', text: response.response, author: 'MyWisy'});
            setTimeout(() => {
                if (firstMessageRef.current) {
                    firstMessageRef.current.measure((x, y, width, height) => {
                        const firstMessageHeight = height;
                        if (firstMessageHeight > 700) {
                            flatListRef.current.scrollToOffset({ offset: (firstMessageHeight - 400) });
                        }
                    });
                }
            }, 100);
        } catch (error) {
            console.log('Ошибка при отправке сообщения:', error);
        }
    };


    return (
        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
            <KeyboardAvoidingView style={{gap: windowWidth * (12 / 360)}} behavior='padding' keyboardVerticalOffset={10}>
                <View style={{width: windowWidth * (328 / 360), height: windowHeight * (630 / 800), marginTop: windowHeight * (20 / 800)}}>
                    <View style={{width: windowWidth * (328 / 360), height: windowHeight * (565 / 800), alignSelf: 'center', borderColor: 'red'}}>
                        <FlatList
                            ref={flatListRef}
                            data={store.messages}
                            renderItem={renderItemMessage}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{gap: windowHeight * (24 / 800), paddingTop: 30 }}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            inverted={true} 
                            scrollsToTop={false}
                        />
                    </View>
                    <View style={{width: windowWidth, height: windowHeight * (60 / 800), position: 'absolute', bottom: 0}}>
                        <FlatList 
                            data={recs}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={{width: windowWidth * (328 / 360), height: windowHeight * (40 / 800), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput 
                        style={{borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 100, width: windowWidth * (280 / 360), paddingHorizontal: windowHeight * (16 / 800), paddingVertical: windowHeight * (8 / 800), fontSize: windowHeight * (14 / 800)}}
                        placeholder="Message"
                        placeholderTextColor={'#B1B1B1'}
                        onChangeText={(text) => setText(text)}
                        keyboardAppearance="dark"
                        value={text}
                    />
                    {text === ''? <ChatMicroAnimation text={text} /> 
                    : 
                    <TouchableOpacity onPress={() => sendMessage()} style={{width: windowWidth * (40 / 360), height: windowHeight * (40 / 800), alignItems: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: text === ''? '#E5E5E5' : '#C4DF84'}}>
                        <Image source={arrow} style={{width: windowWidth * (10 / 360), height: windowHeight * (15 / 800), aspectRatio: 10 / 15}}/>
                    </TouchableOpacity>}
                </View>
            </KeyboardAvoidingView>
            <View style={{gap: windowWidth * (4 / 360), width: windowWidth * (328 / 360), height: windowHeight * (75 / 932), backgroundColor: 'white', flexDirection: 'row', alignItems: 'flex-end', position: 'absolute', top: 0}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={narrowleft} style={{width: windowHeight * (24 / 800), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                    <Text style={{fontWeight: '600', color: '#222222', fontSize: windowHeight * (14 / 800), lineHeight: windowHeight * (20 / 800), marginLeft: 2}}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default observer(ChatScreen);