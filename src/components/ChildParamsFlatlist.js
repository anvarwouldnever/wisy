import React from "react";
import { FlatList, View, Dimensions } from "react-native";
import ChildName from "./ChildName";
import ChildAge from "./ChildAge";

const { width, height } = Dimensions.get('window');

const ChildParamsFlalist = ({ animatedUp, setKeyboardActive }) => {

    const components = [
        {key: '1', component: <ChildName animatedUp={animatedUp} setKeyboardActive={setKeyboardActive}/>},
        {key: '2', component: <ChildAge />}
    ]

    const renderItem = ({ item }) => {
        return (
            <View style={{borderColor: 'red', borderWidth: 1, width: width, height: 200}}>
                {item.component}
            </View>
        )
    }

    return (
        <FlatList 
            renderItem={renderItem}
            data={components}
            keyExtractor={item => item.key}
            horizontal
        />
    )
}

export default ChildParamsFlalist;