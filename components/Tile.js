import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback, Touchable} from 'react-native';
import Colors from '../constants/Colors';

const Tile = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return(
        <View style={styles.gridItem}>
            <TouchableCmp  style={{flexGrow: 1}} 
                onPress={props.onSelect}>
                <View style={styles.container}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.title2}>{props.subtitle}{props.color}</Text>
                </View>
            </TouchableCmp>
        </View>
    );
}
// {{... styles.title, ... {color: props.color}}}
const styles = StyleSheet.create({
    gridItem: {
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
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 10,
        padding: 30,
        justifyContent: 'center',
        backgroundColor: Colors.white//'#dae2ed'
        
    },
    title: {
        fontSize: 35,
        color: Colors.black,
        fontWeight: Platform.OS ==='android' ? 'bold' : '500',
        textAlign: 'center',
    },
    title2: {
        fontSize: 22,
        color: Colors.black,
        fontWeight: Platform.OS ==='android' ? 'bold' : '500',
        textAlign: 'center',
    },
});

export default Tile;