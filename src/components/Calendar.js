import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";

const { width, height } = Dimensions.get('window');

const Calendar = ({ setShow, formatDate }) => {

    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };
    
    const done = () => {
        formatDate(date)
        setShow(false)
    }

    const cancel = () => {
        setShow(false)
    }
    
    return (
            <View style={{width: width * (314 / 360), maxWidth: 445, height: height * (380 / 800), alignItems: 'center', borderRadius: 20, backgroundColor: 'white', position: 'absolute', top: height * (230 / 932), alignSelf: 'center', flexDirection: 'column', justifyContent: 'space-between', shadowColor: 'black', shadowRadius: 400, shadowOffset: {width: 1, height: 1}, shadowOpacity: 1}}>
                <RNDateTimePicker
                    value={date} 
                    onChange={onChange}
                    themeVariant="light"
                    style={{marginTop: 1, width: width * 0.8666 - 25, maxWidth: 420, height: height * (320 / 800), backgroundColor: 'white'}}
                    accentColor="#504297"
                    display="inline"
                />
                <View style={{width: width * (314 / 360), maxWidth: 460, paddingHorizontal: 16, height: height * (44 / 800), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                    <TouchableOpacity onPress={() => cancel()} style={{width: width * (53 / 360), height: height * (24 / 800), justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#504297', fontSize: 17, letterSpacing: 0.5, fontWeight: '400'}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => done()} style={{width: width * (43 / 360), height: height * (24 / 800), justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#504297', fontSize: 17, letterSpacing: 0.5, fontWeight: '600'}}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View> 
    )
}

export default Calendar;