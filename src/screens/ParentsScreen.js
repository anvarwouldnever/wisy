import React, { useState } from "react";
import { Text, Image, View, SafeAreaView, useWindowDimensions, TouchableOpacity, Platform } from "react-native";
import ParentsCancel from "../components/ParentsCancel";
import dog from '../images/Dog.png';
import narrowdown from '../images/narrowdown.png';
import ParentsComponents from "../components/ParentsComponent";
import BottomTabs from "../components/BottomTabs";
import ParentsSettings from "../components/ParentsSettings";
import SubscriptionState from "../components/SubscriptionState";

const ParentsScreen = () => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [screen, setScreen] = useState('Knowledge');

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', paddingTop: Platform.OS === 'android'? 40 : 0}}>
            <ParentsCancel />
            {screen != 'Settings' && <View style={{width: windowWidth * (312 / 360), padding: windowWidth * (16 / 360), height: windowHeight * (80 / 800), justifyContent: 'space-between', borderRadius: 12, backgroundColor: '#F8F8F8', flexDirection: 'row', gap: windowWidth * (12 / 360), alignItems: 'center'}}>
                <Image source={dog} style={{width: windowHeight * (48 / 800), height: windowWidth * (48 / 800), aspectRatio: 48 / 48}}/>
                <View style={{width: windowWidth * (184 / 360), height: windowHeight * (44 / 800), alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View style={{width: windowWidth * (184 / 360), height: windowHeight * (20 / 800), flexDirection: 'row'}}>
                        <Text style={{fontWeight: '600', color: '#000000', fontSize: windowHeight * (12 / 800), lineHeight: windowHeight * (20 / 800)}}>Joshua</Text>
                        <Text style={{color: '#555555', fontWeight: '400', fontSize: windowHeight * (12 / 800), lineHeight: windowHeight * (20 / 800), marginLeft: 5}}>/ age 6</Text>
                    </View>
                    <View style={{width: windowWidth * (184 / 360), flexDirection: 'row', height: windowHeight * (20 / 800)}}>
                        <Text style={{fontWeight: '600', color: '#222222', lineHeight: windowHeight * (20 / 800), fontSize: windowHeight * (12 / 800)}}>63</Text>
                        <Text style={{fontWeight: '400', fontSize: windowHeight * (12 / 800), color: '#555555', lineHeight: windowHeight * (20 / 800), marginLeft: 5}}>completed tasks</Text>
                    </View>
                </View>
                <TouchableOpacity style={{width: windowWidth * (24 / 360), height: windowHeight * (24 / 800), justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={narrowdown} style={{width: windowWidth * (24 / 360), height: windowHeight * (24 / 800), aspectRatio: 24 / 24}}/>
                </TouchableOpacity>
            </View>}
            {screen === 'Settings'? <ParentsSettings /> : <ParentsComponents screen={screen} />}
            {screen === 'Settings' && <SubscriptionState />}
            <View style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800)}} />
            <View style={{width: windowWidth * (312 / 360), height: windowHeight * (56 / 800), alignItems: 'center', position: 'absolute', bottom: Platform.OS === 'ios'?windowHeight * (40 / 932) : windowHeight * (15 / 932), alignSelf: 'center'}}>
                <BottomTabs screen={screen} setScreen={setScreen} />
            </View>
        </SafeAreaView>
    )
}

export default ParentsScreen;







// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import ChildAge from "../components/ChildAge";
// import ChildGender from "../components/ChildGender";
// import ChildEngagementTime from "../components/ChildEngagementTime";
// import ChildName from "../components/ChildName";
// import HomeIcon from '../images/Cat.png'
// import CartIcon from '../images/Dog.png'
// import OrdersIcon from '../images/Girafe.png'
// import UserIcon from '../images/dino.png'
// import { Text, Image, Dimensions } from "react-native";

// const windows = Dimensions.get('window')
// const SCREEN_WIDTH = windows.width
// const SCREEN_HEIGHT = windows.height

// const Tab = createBottomTabNavigator();

// const ParentsScreen = () => {
//     return (
//         <Tab.Navigator screenOptions={({route}) => ({headerShown: false, tabBarShowLabel: false, tabBarStyle: {backgroundColor: '#F8F8F8', borderRadius: 100, position: 'absolute', bottom: 50, height: 56, width: 188, borderTopWidth: 0, shadowColor: 'gray', shadowOpacity: 0.4, shadowRadius: 5, shadowOffset: {width: 1, height: 1}}, tabBarItemStyle: {flexDirection: 'column', width: 'auto', height: 52}, tabBarIcon: ({ focused, color, size }) => {
//             let icon;
//                 if (route.name === 'Главная') {
//                     icon = focused ? HomeIcon : HomeIcon;
//                 } else if (route.name === 'Чат') {
//                     icon = focused ? CartIcon : CartIcon;
//                 } else if (route.name === 'Избранное') {
//                     icon = focused ? OrdersIcon : OrdersIcon;
//                 } else if (route.name === 'Аккаунт') {
//                     icon = focused ? UserIcon : UserIcon;
//                 }

//       return <Image source={icon} style={{width: 24, height: 24, tintColor: focused ? '#6246EA' : '#7D8588', marginTop: 6}} />
//         }
//           })} >
//             <Tab.Screen name="Главная" component={ChildAge} />
//             <Tab.Screen name="Чат" component={ChildEngagementTime} />
//             <Tab.Screen name="Избранное" component={ChildGender} />
//             <Tab.Screen name="Аккаунт" component={ChildName} />
//         </Tab.Navigator>
//     )   
// }

// export default ParentsScreen;