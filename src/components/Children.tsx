import React from 'react'
import { View, Platform, TouchableOpacity, Image, ScrollView, useWindowDimensions, Text } from 'react-native'
import store from '../store/store'
import rabbit from '../images/Rabbit.png'
import plus from '../images/Button.png'
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native'

function Children({ setChosenPlayer, chosenPlayer }) {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const navigation = useNavigation()
  
    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignSelf: 'center', alignItems: 'center', width: 'auto', height: Platform.isPad? windowWidth * (136 / 800) : windowHeight * (136 / 360), gap: 32}}>
                    {store.children && store.children.map((player, index) => {
                        // console.log(player)
                        return (
                            <View key={index} style={{width: Platform.isPad? windowWidth * (96 / 800) : windowWidth * (96 / 800), height: Platform.isPad? windowWidth * (136 / 800) : windowHeight * (136 / 360), justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}}>
                                <TouchableOpacity activeOpacity={1} onPress={() => { 
                                        setChosenPlayer(index)
                                        store.setPlayingChildId(player)    
                                    }
                                } 
                                    style={{width: 'auto', height: 'auto', borderWidth: 3, borderColor: chosenPlayer === index? '#504297' : '#F4E3F1', borderRadius: 100}}>
                                    <Image source={rabbit} style={{borderWidth: 2, borderColor: 'white', borderRadius: 100, width: Platform.isPad? windowHeight * (96 / 360) : windowWidth * (96 / 800), height: Platform.isPad? windowWidth * (96 / 800) : windowHeight * (96 / 360), aspectRatio: 96 / 96}}/>    
                                </TouchableOpacity>
                                <Text style={{color: '#504297', width: 'auto', height: windowHeight * (24 / 360), fontSize: 14, lineHeight: 24, fontWeight: '600', textAlign: 'center'}}>{player.name}</Text>
                            </View>
                        )
                    })}
                    <TouchableOpacity onPress={() => navigation.navigate('ChildParamsScreen')} style={{width: Platform.isPad? windowWidth * (96 / 800) : windowWidth * (96 / 800), height: Platform.isPad? windowWidth * (136 / 800) : windowHeight * (136 / 360), justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}}>
                        <Image source={plus} style={{width: Platform.isPad? windowHeight * (96 / 360) : windowWidth * (96 / 800), height: Platform.isPad? windowWidth * (96 / 800) : windowHeight * (96 / 360), aspectRatio: 96 / 96}}/>
                        <Text style={{color: '#504297', width: 'auto', height: windowHeight * (24 / 360), fontSize: 14, lineHeight: 24, fontWeight: '600'}}>Add new user</Text>
                    </TouchableOpacity>
                </ScrollView>
    )
}

export default observer(Children);