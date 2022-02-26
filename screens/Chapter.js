import React from 'react';
import ChapterList from '../components/ChapterList';
import {useSelector} from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import { Alert } from 'react-native';
const Chapter = props => {
    

    const Id = props.navigation.getParam('categoryId');
    const availablemeals = useSelector(state => state.chapter.chapter);
    const display = availablemeals.filter(chap => chap.jlptIds.indexOf(Id) >= 0);
    return (
            <ChapterList listData={display} navigation={props.navigation} />
    );
};  

Chapter.navigationOptions = (navigationData) => {
    // const Id = navigationData.navigation.getParam('categoryId');
    
    // const selectedCategory = CATEGORIES.find(cat => cat.id === Id);
    const mealTitle = navigationData.navigation.getParam('categoryTitle');
    return {
        headerTitle: mealTitle,
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


export default Chapter;