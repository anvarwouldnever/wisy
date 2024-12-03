import React from "react";
import { View, Modal, Text, useWindowDimensions, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import xwhite from '../images/xwhite.png'

const PopUpModal = ({ modal, setModal }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    return (
        <Modal transparent={true} visible={modal} animationType='fade' onRequestClose={() => setModal(false)}>
            <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => setModal(false)}>
                <TouchableWithoutFeedback>
                    <View style={{position: 'absolute', top: windowHeight * (60 / 800), alignSelf: 'center', borderRadius: 12, width: windowWidth * (312 / 360), padding: windowHeight * (16 / 800), height: windowHeight * (56 / 800), backgroundColor: '#504297', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{fontWeight: '600', fontSize: windowHeight * (14 / 800), color: '#FFFFFF'}}>New password was saved</Text>
                        <TouchableOpacity onPress={() => setModal(false)}>
                            <Image source={xwhite} style={{width: windowWidth * (24 / 360), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default PopUpModal;