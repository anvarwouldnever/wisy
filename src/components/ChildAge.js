import React, { useState } from "react";
import { Dimensions, TouchableOpacity, Text, Modal, Platform, View } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import Calendar from "./Calendar";
import { format } from "date-fns";
import CalendarAndroid from "./CalendarAndroid";

const { width, height } = Dimensions.get('window');

const ChildAge = ({ setOptions, options }) => {

    const [show, setShow] = useState(false);
    // const [formattedDate, setFormatedDate] = useState('')
    const [showAndroid, setShowAndroid] = useState(false)

    const formatDate = (someDate) => {
        setOptions(prevOptions => ({
            ...prevOptions,
            age: `${format(someDate, 'dd.MM.yyyy')}`
        }))
    }

    return (
        <Animated.View entering={SlideInRight} style={{width: width * 0.8666, height: '100%', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}}>
            {
            Platform.OS === 'ios'? <Modal visible={show} animationType='fade' transparent={true}>
                <Calendar setShow={setShow} formatDate={formatDate}/>
            </Modal> 
            : 
            showAndroid && <CalendarAndroid setShow={setShow} formatDate={formatDate} setShowAndroid={setShowAndroid}/>
            }
            <TouchableOpacity onPress={() => Platform.OS === 'ios'? setShow(true) : setShowAndroid(true)} style={{justifyContent: 'center', opacity: show? 0 : 1, alignItems: 'center', width: width * 0.8666, borderRadius: 100, padding: 16, height: height * (56 / 800), borderWidth: 1, borderColor: '#E5E5E5'}}>
                <Text style={{fontWeight: '600', fontSize: height * (14 / 800), textAlign: 'center', color: options.birthday === '' ? '#B1B1B1' : '#222222'}}>{options.age === '' ? 'Select Date' : options.age}</Text>
            </TouchableOpacity>
            <Text style={{opacity: show? 0 : 1, fontWeight: '500', fontSize: height * (12 / 800), color: '#555555', textAlign: 'center', lineHeight: height * (24 / 800), width: width * (290 / 360)}}>
                We need the age for generating appropriate games and date to celebrate with Wisy the Birthday
            </Text>
        </Animated.View>
    )
}

export default ChildAge;