import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Tile from '../components/Tile';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StatusBar } from 'expo-status-bar';
import { AntDesign  } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
let ueAisatsu;
let shitaAisatsu;
const StartMenu = props => {
  let hours = new Date().getHours();
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
  }
  
  if (hours > 20 || hours < 5 ){
    ueAisatsu = '今夜も';
    shitaAisatsu =  'おつかれ！'
  } else {
    ueAisatsu = '今日も';
    shitaAisatsu =  '頑張って！'
  }
  
    const renderGridItem = itemData => {
        return (
            <Tile 
            title={itemData.item.id}
            subtitle={itemData.item.subtitle}
            color={itemData.item.color}
            onSelect={() => {
              if(itemData.item.color === ''){
                props.navigation.navigate({routeName: 'KanjiMyWordsScreen'});
              }else {
                props.navigation.navigate({routeName: 'ChapterScreen', params: {
                  categoryId: itemData.item.id,
                  categoryTitle: itemData.item.title   
              }})
              }
            }}/>
        );
    };

    return (
        
        <View style={styles.container}>
          
            <View style={{
              width: '100%',
              height: '35%',
              padding: '10%',
              paddingTop: '20%',
              backgroundColor: Colors.backColor, //#d4d4d4
              position: 'relative',
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50
          }}>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{justifyContent: 'center', height: '100%', marginBottom:  Platform.OS === 'android' ? '0%' : '10%'}}>
              <Text style={styles.mainName}>JLPT 단어</Text>
              <Text style={styles.mainName2}>{ueAisatsu}</Text>
              <Text style={styles.mainAisatsu}>{shitaAisatsu}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: Platform.OS === 'android' ? '0%' : '10%'}}>
            <TouchableCmp onPress={() => {
              props.navigation.navigate({routeName: 'InforamtionScreen'});
            }}>
              <View style={{
                width: 60,
                height: 60,
                backgroundColor: Colors.white,
                marginRight: 0,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                
                <AntDesign name="infocirlceo" size={30} color={Colors.backColor} />
              </View>
            </TouchableCmp>
            <TouchableCmp onPress={() => Alert.alert(
                "이미 유료버전 사용중입니다",
                "",
                [
                  { text: "네", onPress: () => {}
                    
                  } 
                ],
                { cancelable: false }
              )}>
              <View style={{
                width: 60,
                height: 60,
                backgroundColor: Colors.white,
                marginRight: 0,
                marginTop: 20,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Platform.OS === 'android' ? '60%' : '0%'
              }}>
                <AntDesign name="shoppingcart" size={30} color={Colors.backColor}/>
              </View>
              </TouchableCmp>
            </View>
            </View>
            
            
            
            </View>
            <View style={{flex:1, bottom: 40, paddingHorizontal: 10}}>
                <FlatList
                    keyExtractor={(item, index) => item.id} 
                    data={CATEGORIES} 
                    renderItem={renderGridItem} 
                    numColumns={2}
                    />
                    
            </View>
            </View>
    );
};

StartMenu.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'JLPT 단어',
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.white,
          shadowColor: 'transparent',
        },
        headerTintColor: Colors.backColor,
        headerRight: ()=> (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Favorite"
              iconName="cart"
              onPress={() => Alert.alert(
                "유료버전을 구매하시겠습니까?",
                "유료버전 기능\n1. 광고제거\n2. 예문\n3.음성\n4.내 단어(즐겨찾기)",
                [
                  { text: "아니요", onPress: () => {}},
                  { text: "네", onPress: () => {}
                    
                  } 
                ],
                { cancelable: false }
              )}
            />
            <Item
            title="star"
            iconName="star"
            onPress={()=>navigationData.navigation.navigate({routeName: 'KanjiMyWordsScreen'})}
          />
          </HeaderButtons>
          
        )
    }
};
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        // justifyContent: "space-between"
      },
      mainName: {
        fontSize: Platform.OS === 'android' ? 30 : 35,
        fontWeight: Platform.OS ==='android' ? 'bold' : '500',
        color: Colors.white,
        marginBottom: '8%'
      },
      mainName2: {
        fontSize: Platform.OS === 'android' ? 30 : 35,
        fontWeight: Platform.OS ==='android' ? 'bold' : '500',
        color: Colors.white
      },
      mainAisatsu:{
        fontSize: Platform.OS === 'android' ? 30 : 35, 
        color: Colors.white,
        fontWeight: Platform.OS ==='android' ? 'bold' : '500',
        marginBottom:  Platform.OS === 'android' ? '30%' : '0%',
      }
  
      
    
    
    
});

export default StartMenu;