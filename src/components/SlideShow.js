import React, { useCallback } from "react";
import { FlatList, View, Image, Text, Dimensions } from "react-native";
import Pag1 from '../images/Pag1.png'
import Pag2 from '../images/Pag2.png'
import Pag3 from '../images/Pag3.png'
import Pag4 from '../images/Pag4.png'
import Pag5 from '../images/Pag5.png'
import Pag6 from '../images/Pag6.png'

const { width, height } = Dimensions.get('window');

const SlideShow = ({ onPageChange }) => {

    const items = [
        {id: '1', image: Pag1, header1: 'Personalised AI', header2: 'generated content', text: 'Engaging child with a content developed specifically for individuals level and personality traits'},
        {id: '2', image: Pag2, header1: 'Seamless online & offline ', header2: 'experience', text: 'Ensuring learning happens in all possible forms - from digital world to physical games'},
        {id: '3', image: Pag3, header1: 'Feedback for parents', header2: '', text: 'Parents will receive insights on their childs educational performance and potential improvements, along with monitoring emotional health risks through facial and action analysis.'},
        {id: '4', image: Pag4, header1: 'Wisy support for the kid', header2: '', text: 'Wisy supports children by guiding them through interactive, competence-based educational games that adhere to OECD standards.'},
        {id: '5', image: Pag5, header1: 'Take care', header2: '', text: 'To enhance engagement and educational value, we teach nurturing skills by allowing to feed and provide care to Wisy panda.'},
        {id: '6', image: Pag6, header1: 'Break time', header2: '', text: 'Break times are guided by Wisy, who encourages engaging in physical activities to promote healthy movement and mental refreshment.'}
    ]
    

    const renderItem = ({ item }) => {
        return (
            <View style={{flexDirection: 'column', alignItems: 'center', width: width, height: 'auto'}}>
                <Image style={{width: width * 0.8666, height: height * 0.2575, aspectRatio: 312 / 206}} source={item.image}/>
                <View style={{width: width * 0.8666, height: 'auto', marginTop: height * (20 / 800)}}>
                    <View style={{width: width * 0.8666, height: 'auto', flexDirection: 'column'}}>
                        <Text style={{letterSpacing: 0.5, fontWeight: '600', color: '#222222', fontSize: height * (24 / 800), textAlign: 'center'}}>{item.header1}</Text>
                        {item.header2 != '' && <Text style={{marginTop: 5, letterSpacing: 0.5, fontWeight: '600', color: '#222222', fontSize: height * (24 / 800), textAlign: 'center'}}>{item.header2}</Text>}
                    </View>
                    <View style={{paddingTop: height * (10 / 800), alignItems: 'center', justifyContent: 'center', width: width * 0.8666, height: 'auto'}}>
                        <Text style={{color: '#555555', fontSize: height * (12 / 800), fontWeight: '400', textAlign: 'center', lineHeight: height * (24 / 800)}}>{item.text}</Text>
                    </View>
                </View>
            </View>
        )
    };

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={items} 
            renderItem={renderItem}
            horizontal={true}
            pagingEnabled={true}
            style={{alignSelf: 'center'}} // borderWidth: 1, borderStyle: 'solid', borderColor: 'black'
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(event) => {
                const index = Math.floor(event.nativeEvent.contentOffset.x / (width - (width - (width * 0.8666))));
                onPageChange(index)}
            }
        />
    )
}

export default SlideShow;