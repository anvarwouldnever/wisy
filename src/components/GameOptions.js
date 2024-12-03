import React, { useState } from "react";
import { FlatList, Platform, TouchableOpacity, useWindowDimensions } from "react-native";
import store from "../store/store";
import { SvgUri } from "react-native-svg";

const GameCategories = ({ setActiveCategory, activeCategory, setSubCollections }) => {

    const { height: windowHeight, width: windowWidth } = useWindowDimensions();

    const gameoptions = store.categories

    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => {
                    setActiveCategory(index);
                    setSubCollections(null)
                }} style={{marginRight: 8, width: windowWidth * (64 / 800), alignItems: 'center', justifyContent: 'center', height: Platform.isPad? windowWidth * (64 / 800) : windowHeight * (64 / 360), borderTopLeftRadius: 100, borderTopRightRadius: 100, backgroundColor: activeCategory === index? 'white' : '#F8F8F833'}}>
                <SvgUri width={windowWidth * (48 / 800)} height={windowHeight * (48 / 360)} uri={item.image.url} style={{backgroundColor: '#F8F8F833', borderRadius: 100, width: windowWidth * (48 / 800), height: Platform.isPad? windowWidth * (48 / 800) : windowHeight * (48 / 360), aspectRatio: 48 / 48}}/>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList 
            data={gameoptions}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default GameCategories;