import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const CustomBtn = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
        </TouchableOpacity>
    );
    
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2f2f33',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 15,
        marginHorizontal: 10,

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: {height: 2, width: 2},
                shadowRadius: 2,
            },

            android: {
                elevation: 0,
                
            },
        })
    },

    text: {
        fontSize: 40,
        textAlign: 'center',
        color: '#d4d4d4',
        
    }
});

export default CustomBtn