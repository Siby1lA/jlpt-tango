import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform} from 'react-native';
import Colors from '../constants/Colors';
import KanjiData from '../data/KanjiData.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import CustomBtn from '../components/CustomBtn';
import { toggleIng } from '../store/actions/chapters';
import { kansinIng } from '../store/actions/kansins';
import * as Speech from 'expo-speech';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
let kanjis ={
  hurigana: [],
  kanji: [],
  imi: [],
  reibun: [],
  reibunImi: [],
  reibunFurigana: [],
}
let kansinKanji = {
  hurigana: [],
  kanji: [],
  imi: [],
  reibun: [],
  reibunImi: [],
  reibunFurigana: [],
}
let kansinKanjis = {
  hurigana: [],
  kanji: [],
  imi: [],
  reibun: [],
  reibunImi: [],
  reibunFurigana: [],
}
let DATAINIT = {
  hurigana: [],
  kanji: [],
  imi: [],
  reibun: [],
  reibunImi: [],
  reibunFurigana: [],
}
const KanjiMyWords = props => {
    
  let i = 0;
  const [item, setItem] = useState(0);
  const [item2, setItem2] = useState(0);
  const [kanjiShow, setKanjiShow] = useState(true);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [reibunShow, setReibunShow] = useState(false);
  const [sounds, setSounds] = useState(0);
  const [tric, setTric] = useState(false);
  const speak = () => {
    
    if(sounds){
      let say = kanjis.reibunFurigana[item];
      Speech.speak(say, {language: 'ja'});
    } else{
      let say = kanjis.hurigana[item];
      Speech.speak(say, {language: 'ja'});
    }
    
  };
  const reibun = () => {
    setReibunShow(!reibunShow);
    setKanjiShow(!kanjiShow);
    
    setSounds(!sounds);
    
    if(show){
      setShow(!show);
    }
    if(show2){
      setShow2(!show2);
    }
    
  }
    
  const tsugi = () => {
        i++;
        setItem(item + i);
        setItem2(item2 + i);
        AsyncStorage.setItem('ITEM3', JSON.stringify(item + i));
        AsyncStorage.setItem('ITEM4', JSON.stringify(item2 + i));
        if(show){
          setShow(!show);
        }
        if(show2){
          setShow2(!show2);
        }
        if(reibunShow){
          reibun();
        }
  }

  const iten = () => {
        i--;
        setItem(item - 1);
        setItem2(item2 - 1);
        AsyncStorage.setItem('ITEM3', JSON.stringify(item - 1));
        AsyncStorage.setItem('ITEM4', JSON.stringify(item2 - 1));
        if(show){
          setShow(!show);
        }
        if(show2){
          setShow2(!show2);
        }
        if(reibunShow){
          reibun();
        }
  }

const deleteKansin = () => {
  kansinKanji.hurigana.splice(item, 1);
  kansinKanji.imi.splice(item, 1);
  kansinKanji.kanji.splice(item, 1);
  kansinKanji.reibun.splice(item, 1);
  kansinKanji.reibunFurigana.splice(item, 1);
  kansinKanji.reibunImi.splice(item, 1);
  // kanjis = 어세신 kanji 해야 될듯?
  AsyncStorage.setItem('kansinDATAs', JSON.stringify(kansinKanji));
  setTric(!tric);
  
  AsyncStorage.setItem('kansinDATA', JSON.stringify(kansinKanji));
}

const reset = () => {
  setItem(0);
  setItem2(0);
  AsyncStorage.setItem('ITEM3', JSON.stringify(item));
  AsyncStorage.setItem('ITEM4', JSON.stringify(item2));
}

const initData = async () => {

  const Item3 = await AsyncStorage.getItem('ITEM3');
  const Item4 = await AsyncStorage.getItem('ITEM4');
  if(Item3){
    setItem(parseInt(Item3));
    setItem2(parseInt(Item4));
  } else{
    reset();
  }
  
  const kansinDATAinit = await AsyncStorage.getItem('kansinDATA');
  
  DATAINIT = JSON.parse(kansinDATAinit);
  kansinKanji = Object.assign(kansinKanji, DATAINIT);
  // kansinKanjis = Object.assign(kansinKanjis, kansinKanji);
  if(DATAINIT === null){
    kansinKanji.hurigana = '미정';
    kansinKanji.imi = '미정';
    kansinKanji.kanji = '미정';
    kansinKanji.reibun = '미정';
    kansinKanji.reibunFurigana = '미정';
    kansinKanji.reibunImi = '미정';
    AsyncStorage.setItem('kansinDATA', JSON.stringify(kansinKanji));
  }
  
  setTric(!tric);
}



useEffect(() => {
  initData();
}, [kansinKanji]);

    const display = useSelector(state => state.kansin.ids);
    if(display[0] === undefined){
      // AsyncStorage.getItem('kansinDATA', (err, result) => {
      //   DATAINIT = JSON.parse(result);
      // });
      // kansinKanji = Object.assign(kansinKanji, DATAINIT);
    } else {
      kansinKanji = Object.assign(kansinKanji, display[0]);
      AsyncStorage.setItem('kansinDATA', JSON.stringify(kansinKanji));
    }
    
    return (
        <View style={styles.container}>
          <View>
          <Text style={{color: '#e4e4e7', fontSize: 18, textAlign: 'center'}}>{item2+1}/{kansinKanji.hurigana.length}</Text>
          </View>
            <View style={styles.kanjiContainer}>
              <View style={styles.kanjiTextContainer}>
                { show ?(
                     <Text style={styles.kanjiHurigana}>{kansinKanji.hurigana[item]}</Text>
                ) : null }
              </View>

              { tric ? (
                  <View></View>
                ) : null }

                { kanjiShow ? (
                  <View style={styles.kanjiTextContainer}>
                  <Text selectable style={styles.kanji} >{kansinKanji.kanji[item]}</Text>
                </View>
                ) : null }

                { reibunShow ? (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{marginBottom: 10, width: '95%'}}>
                      <Text style={styles.kanji, styles.reibunFurigana} >{kansinKanji.reibunFurigana[item]}</Text>
                      <Text style={styles.kanji, styles.reibun} >{kansinKanji.reibun[item]}</Text>
                    </View>
                    <View>
                      <Text style={styles.kanji, styles.reibun} >{kansinKanji.reibunImi[item]}</Text>
                    </View>
                  </View>
                ) : null }
                
              <View style={styles.kanjiTextContainer2}>
                { show2 ?(
                     <Text style={styles.kanjiImi}>{kansinKanji.imi[item]}</Text>
                ) : null }
                </View>
            </View>

                  
            <View style={{flex:1}}>
            
              <View style={styles.btnContainer}>
                <CustomBtn onPress={()=> {
                  setShow(!show);
                  if(reibunShow){
                    reibun();
                  }
                  }}>あ</CustomBtn>
                <CustomBtn onPress={()=> {
                  setShow2(!show2);
                  if(reibunShow){
                    reibun();
                  }
                  }}>가</CustomBtn>
                <CustomBtn style={styles.androidBtnBottom} onPress={iten}>←</CustomBtn>
                <CustomBtn style={styles.androidBtnBottom} onPress={tsugi}>→</CustomBtn>
                
              </View>
              <View style={styles.btnContainer}>
                <CustomBtn onPress={reibun}>文</CustomBtn>
                <CustomBtn style={styles.androidBtnBottomMusic} onPress={speak}>♬</CustomBtn>
                <CustomBtn onPress={deleteKansin}>del</CustomBtn>
              </View>
            </View>
        </View>
    );
};  
KanjiMyWords.navigationOptions = {
    headerTitle: '내 단어',
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.backColor,
      }, 
      kanjiContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        height: '43%',
        width: '90%',
        marginTop: 40
      },
      btnContainer : {
        flexDirection: 'row',
        marginBottom:  '5%',
        justifyContent: 'center',
      },
      
      kanji: {
        fontSize: 65,
        textAlign: 'center',
        color: '#e4e4e7',
        height: 100
      },
      kanjiImi: {
        fontSize: 45,
        textAlign: 'center',
        color: '#e4e4e7',
      },
      kanjiHurigana:{
        fontSize: 40,
        textAlign: 'center',
        color: '#e4e4e7',
      },
      kanjiTextContainer: {
        marginTop: 10,
        height: '15%',
      },
      kanjiTextContainer2:{
        height: '40%',
        marginTop: 37,
      },
      reibun: {
        fontSize: 40,
        textAlign: 'center',
        color: '#e4e4e7',
      },
      reibunFurigana: {
        fontSize: 20,
        color: '#F48FB1',
        textAlign: 'center',
      },
      androidBtnBottom: {
        marginBottom : Platform.OS === 'android' ?  0 : 0,
        fontSize : Platform.OS === 'android' ?  50 : 50
      },
      androidBtnBottomMusic: {
        marginBottom : Platform.OS === 'android' ?  6 : 0,
        fontSize : Platform.OS === 'android' ?  40 : 50
      }
    });
    
    


export default (KanjiMyWords);