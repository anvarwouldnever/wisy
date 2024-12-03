import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { View, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const CalendarAndroid = ({ setShowAndroid, formatDate }) => {

    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        if (event.type === "set") {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setShowAndroid(false);
            formatDate(currentDate);
        } else if (event.type === "dismissed") {
            setShowAndroid(false);
        }
    };

    return (
        
            <RNDateTimePicker
                value={date} 
                onChange={onChange}
                style={{marginTop: 1, width: width * 0.8666 - 25, maxWidth: 420, height: height * (320 / 800), backgroundColor: 'white'}}
                accentColor="#504297"
                display='inline'
            />
        
    )
}

export default CalendarAndroid;