import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform} from 'react-native';
import { AntDesign  } from '@expo/vector-icons';
import Colors from '../constants/Colors';
const Information = props => {
    
    return (
        <View style={styles.container}>
            <View style={styles.infoList}>

            <View style={{ width: '90%',height: 0.5, backgroundColor: '#a1a1aa', marginTop: '5%', marginBottom: '5%'}}></View>
                    <View style={{width: '70%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.font}>업데이트 목록</Text><Text style={styles.font}><AntDesign name="right" size={18}/></Text>
                </View>

            <View style={{ width: '90%',height: 0.5, backgroundColor: '#a1a1aa', marginTop: '5%', marginBottom: '5%'}}></View>
                    <View style={{width: '70%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.font}>앱 버전</Text><Text style={styles.font}>v1.0.0</Text>
                </View>
                
                <View style={{ width: '90%',height: 0.5, backgroundColor: '#a1a1aa', marginTop: '5%', marginBottom: '5%'}}></View>
                    <View style={{width: '40%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.font}>제작자</Text><Text style={styles.font}>SuiKa</Text>
                </View>
                
            </View>
            
        </View>
        
    );
};  

Information.navigationOptions = {
    headerTitle: '정보',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.backColor,
        paddingTop: '5%'
      },
      font: {
          color: Colors.white,
          fontSize: 18,
          textAlign: 'center'
      },
      infoList: {
          width: '100%',
          height: '20%',
          alignItems: 'center',
      }
});
export default Information;