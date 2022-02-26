import React, { useState } from 'react';
import {  FlatList, StyleSheet, View, Alert, Text } from 'react-native';
import Colors from '../constants/Colors';
import ChapterItem from './ChapterItem';
import { useSelector } from 'react-redux';
import { CommonActions } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
let DATA = [
    {
        "id": "c1",
        "jlptIds": "N0",
        "title": "0장",
    }
];
let viewData = "";
AsyncStorage.getItem('VIEW', (err, result) => {
    viewData = JSON.parse(result);
});
let viewData2 = "";
AsyncStorage.getItem('VIEW2', (err, result) => {
    viewData2 = JSON.parse(result);
    
});
const ChapterList = props => {
    

    const renderGridItem = itemData => {


        AsyncStorage.getItem('CHAP', (err, result) => {
            DATA = JSON.parse(result);
        });
        return (
            <ChapterItem 
            title={itemData.item.title}
            jlptIds={itemData.item.jlptIds}
            color={viewData}
            jlptChapter={viewData2}
            onSelect={() => {
                if(DATA === null){
                    props.navigation.navigate({routeName: 'KanjiScreen' , params: {
                        kanjiId: itemData.item.jlptIds,
                        chapterId: itemData.item.id,
                        chapterTitle: itemData.item.title,
                        }
                    })
                } else {
                    if(itemData.item.title === DATA.title && viewData2 === itemData.item.jlptIds){
                        props.navigation.navigate({routeName: 'KanjiScreen' , params: {
                            kanjiId: itemData.item.jlptIds,
                            chapterId: itemData.item.id,
                            chapterTitle: itemData.item.title,
                            }
                        })
                    } else {
                        Alert.alert(
                            viewData2 + " "+ DATA.title + "을 진행중입니다.",
                            "진행했던 데이터를 포기하고\n " + itemData.item.title + "으로 넘어가시겠습니까?",
                            [
                              { text: "아니요", onPress: () => {} },
                              { text: "네", onPress: () => {
                                props.navigation.navigate({routeName: 'KanjiScreen' , params: {
                                kanjiId: itemData.item.jlptIds,
                                chapterId: itemData.item.id,
                                chapterTitle: itemData.item.title,}
                                })
                               
                              } }
                            ],
                            { cancelable: false }
                          );
                    }
                    
                }
                }
            }
        />
        )
    }

    const display = useSelector(state => state.chapter.id);
    if(display !== undefined){
        viewData = display.title;
        viewData2 = display.jlptIds;
        
        AsyncStorage.setItem('VIEW',JSON.stringify(viewData));
        AsyncStorage.setItem('VIEW2',JSON.stringify(viewData2));
        AsyncStorage.setItem('CHAP',JSON.stringify(display));
    }
    

    return (
        <View style={styles.list}>
            {/* <Text style={{color: Colors.white, textAlign: 'center', fontSize: 20}}>현재 {viewData} 진행중입니다.</Text> */}
            <FlatList style={{felx: 1}}
            keyExtractor={(item, index) => item.id} 
            data={props.listData} 
            renderItem={renderGridItem}
            numColumns={2}/>
            
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        backgroundColor: Colors.backColor,
        flex:1,
        
    }
});


export default ChapterList