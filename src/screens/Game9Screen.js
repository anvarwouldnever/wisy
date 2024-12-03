import { View, Text, Platform, useWindowDimensions, Image, FlatList, PanResponder } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import wisy from '../images/pandaHead.png'
import petux from '../images/petushara.png'
import delfin from '../images/delfin.png'
import pes from '../images/pes.png'
import { Svg, Polyline } from 'react-native-svg';
import { SvgUri } from 'react-native-svg';

const Game9Screen = ({ data, setLevel }) => {
    
    const images = data.content.images
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const navigation = useNavigation();

    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState([]);
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
            const { locationX, locationY } = evt.nativeEvent;
            setCurrentLine([`${locationX},${locationY}`]);
        },
        onPanResponderMove: (evt) => {
            const { locationX, locationY } = evt.nativeEvent;
            setCurrentLine((prev) => [...prev, `${locationX},${locationY}`]);
        },
        onPanResponderRelease: () => {
            setLines((prev) => [...prev, currentLine]);
            setCurrentLine([]);
        },
    });

    // const data = [
    //     petux,
    //     delfin,
    //     pes,
    //     delfin,
    //     petux,
    //     delfin,
    //     pes,
    //     pes,
    // ]

    const renderItem = ({ item }) => {
        return (
            <SvgUri uri={item.url} width={windowWidth * (64 / 800)} height={windowHeight * (64 / 360)}/>
        )
    }

    return (
        <View style={{top: 24, width: windowWidth - 60, height: windowHeight - 60, position: 'absolute', paddingTop: 50, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{position: 'absolute', alignItems: 'center', top: windowHeight * (61 / 360), width: windowWidth * (602 / 800), height: windowHeight * (239 / 360), flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{width: windowWidth * (602 / 800), height: windowHeight * (84 / 360), alignItems: 'center'}}>
                    <FlatList 
                        data={images}
                        renderItem={renderItem}
                        contentContainerStyle={{backgroundColor: 'white', alignItems: 'center', borderRadius: 10, gap: windowWidth * (10 / 800), padding: 10}}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                    />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: windowWidth * (292 / 800), height: windowHeight * (115 / 360)}}>
                    <View style={{width: windowWidth * (115 / 800), height: windowHeight * (115 / 360), backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={pes} style={{width: windowWidth * (80 / 800), height: windowHeight * (80 / 360)}}/>
                    </View>
                    <Text style={{fontSize: 40, fontWeight: '600', color: '#504297'}}>=</Text>
                    <View
                        {...panResponder.panHandlers}
                        style={{width: windowWidth * (115 / 800), height: windowHeight * (115 / 360), backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}
                    >
                        <Svg height='100%' width='100%'>
                            {lines.map((line, index) => (
                                <Polyline
                                key={index}
                                points={line.join(' ')}
                                stroke="#504297"
                                strokeWidth="6"
                                fill="none"
                                />
                            ))}
                            <Polyline
                                points={currentLine.join(' ')}
                                stroke="#504297"
                                strokeWidth="6"
                                fill="none"
                            />
                        </Svg>
                    </View>
                </View>
            </View>
            <View style={{width: 'auto', height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, left: 0}}>
                <View style={{width: windowWidth * (255 / 800), height: Platform.isPad? windowWidth * (150 / 800) : windowHeight * (100 / 360), alignSelf: 'flex-end', alignItems: 'flex-end', flexDirection: 'row'}}>
                    <Image source={wisy} style={{width: windowWidth * (64 / 800), height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), aspectRatio: 64 / 64}}/>
                </View>
            </View>
        </View>
    )
}

export default Game9Screen;