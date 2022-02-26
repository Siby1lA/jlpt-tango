import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback, Touchable} from 'react-native';
import Colors from '../constants/Colors';

const Tile2 = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return(
        <TouchableCmp  style={{flexGrow: 1,  alignItems: 'center'}} 
                onPress={props.onSelect}>
                <View style={{ ...styles.container2, ...{backgroundColor: Colors.white}}}>
                    <Text style={styles.title2}>내가 저장한 단어</Text>
                </View>
            </TouchableCmp>
    );
}

const styles = StyleSheet.create({
    title2:{
        color: Colors.backColor,
        fontSize: 28,
        fontWeight: '500'
    },
    container2: {
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        padding: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
        height: '40%'
    },
});

export default Tile2;