import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import StartMenu from '../screens/StartMenu';
import Chapter from '../screens/Chapter';
import Colors from '../constants/Colors';
import Kanji from '../screens/Kanji';
import KanjiMyWords from '../screens/KanjiMyWords';
import Inforamtion from '../screens/Inforamtion';
const defalutStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.backColor,
        shadowColor: 'transparent',
    },
    headerTintColor: Colors.white
}

const Navigator = createStackNavigator({
    Categories: {
        screen: StartMenu,
    },
    ChapterScreen: {
        screen: Chapter,
    },
    KanjiScreen: {
        screen: Kanji,
    },
    KanjiMyWordsScreen: {
        screen: KanjiMyWords
    },
    InforamtionScreen: {
        screen: Inforamtion
    }
}, {
    
    defaultNavigationOptions: defalutStackNavigationOptions,
});


const Container = createAppContainer(Navigator);
export default Container;