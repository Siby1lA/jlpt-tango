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
import { Ionicons } from '@expo/vector-icons';
let kanjis ={
  hurigana: [],
  kanji: [],
  imi: [],
  reibun: [],
  reibunImi: [],
  reibunFurigana: [],
}
let kanjisAdd ={
  hurigana: [],
  kanji: [],
  imi: [],
  reibun: [],
  reibunImi: [],
  reibunFurigana: [],
}
let kanjiAddLocal={
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

let kansinItem;
let yarinaosu = 0;

const Kanji = props => {
  
  const dispatch = useDispatch();

  const kansin = ()=> {

    //나갔다 들어오면 즐겨찾기 눌러도 업데이트가 안됨
    setStar(!star);
    setStar2(!star2);
    
    if(item === kansinItem && star === false){
      kansinKanji.hurigana.pop();
      kansinKanji.kanji.pop();
      kansinKanji.imi.pop();
      kansinKanji.reibun.pop();
      kansinKanji.reibunImi.pop();
      kansinKanji.reibunFurigana.pop();
      AsyncStorage.setItem('kansinDATA', JSON.stringify(kansinKanji));
    } else{

      kansinKanji.hurigana.push(kanjis.hurigana[item]);
      kansinKanji.kanji.push(kanjis.kanji[item]);
      kansinKanji.imi.push(kanjis.imi[item]);
      kansinKanji.reibun.push(kanjis.reibun[item]);
      kansinKanji.reibunImi.push(kanjis.reibunImi[item]);
      kansinKanji.reibunFurigana.push(kanjis.reibunFurigana[item]);
      kansinItem = item;
      AsyncStorage.setItem('KANSINITEM', JSON.stringify(item));
      setKansinShow(true);
      AsyncStorage.setItem('KANSINITEM', JSON.stringify(kansinShow));  
      dispatch(kansinIng(kansinKanji));
      
      AsyncStorage.setItem('kansinDATA', JSON.stringify(kansinKanji));
    }
    
  }

  const speak = () => {
    
    if(sounds){
      let say = kanjis.reibunFurigana[item];
      Speech.speak(say, {language: 'ja'});
    } else{
      let say = kanjis.hurigana[item];
      Speech.speak(say, {language: 'ja'});
    }
    
  };



  const Ids = props.navigation.getParam('chapterId');
  
  const ingHandler = useCallback(() => {
    dispatch(toggleIng(Ids));
    
  }, [dispatch, Ids]); 
  

  let i = 0;
  const [item, setItem] = useState(0);
  const [item2, setItem2] = useState(0);
  const [kanjiShow, setKanjiShow] = useState(true);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [reibunShow, setReibunShow] = useState(false);
  const [sounds, setSounds] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const [star, setStar] = useState(true);
  const [star2, setStar2] = useState(false);
  const [kansinShow, setKansinShow] = useState(false);
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
  const initData = async () => {
    const KANSINITEMs = await AsyncStorage.getItem('KANSINITEM');
    const kansinKaniData = await AsyncStorage.getItem('kansinDATA');
    if(JSON.parse(KANSINITEMs)){
      kansinKanji = JSON.parse(kansinKaniData);
      dispatch(kansinIng(kansinKanji));
    }
    
    AsyncStorage.getItem('DATA2', (err, result) => {
    kanjiAddLocal = JSON.parse(result);
  });
  
    const Item = await AsyncStorage.getItem('ITEM');
    const Item2 = await AsyncStorage.getItem('ITEM2');
    const State = await AsyncStorage.getItem('STATE'); //State[1]+State[2]
    if (JSON.parse(State) != Id) {
      
      kanjisAdd.hurigana = [];
      kanjisAdd.kanji = [];
      kanjisAdd.imi = [];
      kanjisAdd.reibun = [];
      kanjisAdd.reibunImi = [];
      kanjisAdd.reibunFurigana = [];
      AsyncStorage.setItem('DATA2', JSON.stringify(kanjisAdd));
      AsyncStorage.getItem('DATA2', (err, result) => {
        kanjiAddLocal = JSON.parse(result);
      });
      AsyncStorage.setItem('KAN', JSON.stringify(0));
      AsyncStorage.setItem('KANJIADD', JSON.stringify(0));
      reset();
    } else {
      setItem(parseInt(Item));
      setItem2(parseInt(Item2));
    }
    
  try{
    const CAN = await AsyncStorage.getItem('DATA2');
    const KAN = await AsyncStorage.getItem('KAN');
    setDataLength(filter2[0].kanji.length-1);
    kanjis.hurigana = [];
    kanjis.kanji = [];
    kanjis.imi = [];
    kanjis.reibun = [];
    kanjis.reibunImi = [];
    kanjis.reibunFurigana = [];
    for(let j = 0; j<50; j++){
      kanjis.kanji.push(filter2[0].kanji[j]);
      kanjis.hurigana.push(filter2[0].hurigana[j]);
      kanjis.imi.push(filter2[0].imi[j]);
      kanjis.reibun.push(filter2[0].reibun[j]);
      kanjis.reibunImi.push(filter2[0].reibunImi[j]);
      kanjis.reibunFurigana.push(filter2[0].reibunFurigana[j]);
    }
    
    setShow(!show);
    setShow(false);
    setShow2(!show);
    setShow2(false);
      if((JSON.parse(CAN).imi.length) && KAN == 1){ 
        if(kanjiAddLocal.kanji.length){
            AsyncStorage.getItem('DATA3', (err, result) => {
              kanjis = Object.assign(kanjis, JSON.parse(result));
              setDataLength(kanjis.imi.length-1);
              if(parseInt(Item2)+1 == kanjis.imi.length+1 || kanjis.imi.length+1 < parseInt(Item2)+1){
                setItem(0);
                setItem2(0);
              } else {
                setItem(parseInt(Item));
                setItem2(parseInt(Item2));
                AsyncStorage.getItem('DATA2', (err, result) => {
                  kanjisAdd = JSON.parse(result);
                }); //첫번째 모름 저장
              }
            });
          }
        }  else { //2번째 완결시 모름 저장
          AsyncStorage.getItem('DATA2', (err, result) => {
            kanjisAdd = JSON.parse(result);
          });
        }
       
        
  } catch(err){
    console.log(err);
  }
}

const kanketsu = () => {
  AsyncStorage.getItem('DATA2', (err, result) => {
    kanjisAdd = JSON.parse(result);
  });
      if(kanjisAdd.kanji.length){
        yarinaosu = 1;
        kanjis.hurigana = [];
        kanjis.kanji = [];
        kanjis.imi = [];
        kanjis.reibun = [];
        kanjis.reibunImi = [];
        kanjis.reibunFurigana = [];
        kanjis = Object.assign(kanjis, kanjisAdd);
        setDataLength(kanjis.imi.length-1);
        AsyncStorage.setItem('DATA3', JSON.stringify(kanjis));
        reset();

    }
}


  const tsugi = () => {
    if(item === kanjis.kanji.length-1){
      AsyncStorage.getItem('DATA2', (err, result) => {
        kanjisAdd = JSON.parse(result);
      });
      
      if(kanjisAdd.kanji.length){
        Alert.alert(
          KanjiId + ' ' + title + "이 끝났습니다!",
          "몰랐던 단어들을 복습하시겠습니까?",
          [
            { text: "아니요", onPress: () => props.navigation.goBack() },
            { text: "네", onPress: () => {
              kanketsu();
              AsyncStorage.setItem('KAN', JSON.stringify(1));
            } }
          ],
          { cancelable: false }
        );
      }else{
        Alert.alert(
          KanjiId + ' ' + title + "이 끝났습니다!",
          "",
          [
            { text: "네", onPress: () => props.navigation.goBack()} 
          ],
        );
      }
        
    } else{
        i++;
        setItem(item + i);
        setItem2(item2 + i);
        AsyncStorage.setItem('STATE', JSON.stringify(Id));
        AsyncStorage.setItem('ITEM', JSON.stringify(item + i));
        AsyncStorage.setItem('ITEM2', JSON.stringify(item2 + i));
        if(show){
          setShow(!show);
        }
        if(show2){
          setShow2(!show2);
        }
        if(reibunShow){
          reibun();
        }
        if(star2){
          setStar2(!star2);
          setStar(!star);
        }
        
      }
  } 

  const back = () => {
        if(item2 != 0){
          i--;
          setItem(item -1);
          setItem2(item2 -1);
          AsyncStorage.setItem('STATE', JSON.stringify(Id));
          AsyncStorage.setItem('ITEM', JSON.stringify(item -1));
          AsyncStorage.setItem('ITEM2', JSON.stringify(item2 -1));
          if(show){
            setShow(!show);
          }
          if(show2){
            setShow2(!show2);
          }
          if(reibunShow){
            reibun();
          }
          if(star2){
            setStar2(!star2);
            setStar(!star);
          }
        }  
  }

  const refresh = () => {
    kanjisAdd.hurigana = [];
      kanjisAdd.kanji = [];
      kanjisAdd.imi = [];
      kanjisAdd.reibun = [];
      kanjisAdd.reibunImi = [];
      kanjisAdd.reibunFurigana = [];
      AsyncStorage.setItem('DATA2', JSON.stringify(kanjisAdd));
      AsyncStorage.getItem('DATA2', (err, result) => {
        kanjiAddLocal = JSON.parse(result);
      });
      AsyncStorage.setItem('KAN', JSON.stringify(0));
      AsyncStorage.setItem('KANJIADD', JSON.stringify(0));
      reset();

      setDataLength(filter2[0].kanji.length-1);
      kanjis.hurigana = [];
      kanjis.kanji = [];
      kanjis.imi = [];
      kanjis.reibun = [];
      kanjis.reibunImi = [];
      kanjis.reibunFurigana = [];
      for(let j = 0; j<50; j++){
        kanjis.kanji.push(filter2[0].kanji[j]);
        kanjis.hurigana.push(filter2[0].hurigana[j]);
        kanjis.imi.push(filter2[0].imi[j]);
        kanjis.reibun.push(filter2[0].reibun[j]);
        kanjis.reibunImi.push(filter2[0].reibunImi[j]);
        kanjis.reibunFurigana.push(filter2[0].reibunFurigana[j]);
      }
      
      setShow(!show);
      setShow(false);
      setShow2(!show);
      setShow2(false);

      kanjisAdd.hurigana = [];
      kanjisAdd.kanji = [];
      kanjisAdd.imi = [];
      kanjisAdd.reibun = [];
      kanjisAdd.reibunImi = [];
      kanjisAdd.reibunFurigana = [];
      yarinaosu = 0;
  }

  const reset = () => {
    setItem(0);
    setItem2(0);
    AsyncStorage.setItem('ITEM', JSON.stringify(item));
    AsyncStorage.setItem('ITEM2', JSON.stringify(item2));
  }

  const what = () => {
    if(yarinaosu){
      kanjisAdd.hurigana = [];
      kanjisAdd.kanji = [];
      kanjisAdd.imi = [];
      kanjisAdd.reibun = [];
      kanjisAdd.reibunImi = [];
      kanjisAdd.reibunFurigana = [];
      yarinaosu = 0;
    }

    kanjisAdd.kanji.push(kanjis.kanji[item]);
    kanjisAdd.hurigana.push(kanjis.hurigana[item]);
    kanjisAdd.imi.push(kanjis.imi[item]);
    kanjisAdd.reibun.push(kanjis.reibun[item]);
    kanjisAdd.reibunImi.push(kanjis.reibunImi[item]);
    kanjisAdd.reibunFurigana.push(kanjis.reibunFurigana[item]);
    AsyncStorage.setItem('DATA2', JSON.stringify(kanjisAdd)); 

    tsugi();
  }
    
  useEffect(() => {
    ingHandler();
    initData();
    
  }, [ingHandler]);
  const Id = props.navigation.getParam('chapterId');
  const KanjiId = props.navigation.getParam('kanjiId');
  const title = props.navigation.getParam('chapterTitle');
  const filter = KanjiData.filter(data => data.levelIds.indexOf(KanjiId) >= 0);
  const filter2 = filter.filter(data => data.id.indexOf(title) >= 0);
  // const sound = Platform.OS === 'android' ? '声' : '♬';
    return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
          <Ionicons name="arrow-back" size={28} color={Colors.white} onPress={()=>{back()}}/>
            <Text style={{color: '#e4e4e7', fontSize: 20, marginTop: 3}}>{item2+1}/{dataLength+1}</Text>
            <Ionicons name="refresh" size={28} color={Colors.white} onPress={()=>{refresh()}}/>
          </View>
            <View style={styles.kanjiContainer}>

              <View style={styles.kanjiTextContainer}>
                { show ?(
                     <Text style={styles.kanjiHurigana}>{kanjis.hurigana[item]}</Text>
                ) : null }
              </View>

                { kanjiShow ? (
                  <View style={styles.kanjiTextContainer}>
                  <Text selectable style={styles.kanji} >{kanjis.kanji[item]}</Text>
                </View>
                ) : null }

                { reibunShow ? (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{marginBottom: 10, width: '95%'}}>
                      <Text style={styles.kanji, styles.reibunFurigana} >{kanjis.reibunFurigana[item]}</Text>
                      <Text style={styles.kanji, styles.reibun} >{kanjis.reibun[item]}</Text>
                    </View>
                    <View>
                      <Text style={styles.kanji, styles.reibunImi} >{kanjis.reibunImi[item]}</Text>
                    </View>
                  </View>
                ) : null }
                
              <View style={styles.kanjiTextContainer2}>
                { show2 ?(
                     <Text style={styles.kanjiImi}>{kanjis.imi[item]}</Text>
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
                
                <CustomBtn onPress={what}>?</CustomBtn>
                <CustomBtn style={styles.androidBtnBottom} onPress={tsugi}>→</CustomBtn>
              </View>
              <View style={styles.btnContainer}>
                <CustomBtn onPress={reibun}>文</CustomBtn>
                <CustomBtn style={styles.androidBtnBottomMusic} onPress={speak}>♬</CustomBtn>
                { star ?(
                <CustomBtn style={styles.androidBtnBottomStar}onPress={kansin}>☆</CustomBtn>
                ) : null }
                { star2 ?(
                <CustomBtn style={styles.androidBtnBottomStar} onPress={kansin}>★</CustomBtn>
                ) : null }
              </View>
            </View>
        </View>
    );
};
Kanji.navigationOptions = (navigationData) => {
  const TITLE = navigationData.navigation.getParam('chapterTitle');
    return {
        headerTitle: TITLE,
        headerRight: ()=> (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
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
      alignItems: 'center',
      backgroundColor: Colors.backColor,
      paddingHorizontal: '3%'
    }, 
    kanjiContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      height: '41%',
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
      color: '#e4e4e7',
      textAlign: 'center',
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
    reibunImi: {
      fontSize: 30,
      color: '#e4e4e7',
      textAlign: 'center',
    },
    androidBtnBottom: {
      marginBottom : Platform.OS === 'android' ?  0 : 0,
      fontSize : Platform.OS === 'android' ?  50 : 50
    },
    androidBtnBottomMusic: {
      marginBottom : Platform.OS === 'android' ?  0 : 0,
      fontSize : Platform.OS === 'android' ? 40 : 50
    },
    androidBtnBottomStar: {
      marginBottom : Platform.OS === 'android' ? 6 : 0,
      fontSize : Platform.OS === 'android' ?  45 : 45
    }
  });



export default Kanji;