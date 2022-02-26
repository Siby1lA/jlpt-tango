import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Colors from '../constants/Colors';

let colors;
const ChapterItem = props => {
    return (
        <View style={styles.ChapterItem}>
            <TouchableOpacity onPress={props.onSelect} style={{flexGrow: 1}}>
                <View style={props.color === props.title && props.jlptChapter === props.jlptIds ? styles.container2 : styles.container}>
                    <Text style={styles.title}>{props.jlptIds}</Text>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    ChapterItem: {
        flex: 1,
        height: 130,
        margin: 10,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ?  'hidden' : 'visible',
        elevation: 5,
        
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white //#dae2ed
    },
    container2: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#757575'
    },
    title: {
        fontSize: 18,
        fontWeight: Platform.OS ==='android' ? 'bold' : '600'
    }
    
});

export default ChapterItem;