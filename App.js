import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "./constants/Colors";
import Navigator from "./navigation/Navigator";
import { createStore, combineReducers } from "redux";
import chapterReducer from "./store/reducers/chapters";
import kansinReducer from "./store/reducers/kansins";
import { Provider } from "react-redux";
const rootReducer = combineReducers({
  chapter: chapterReducer,
  kansin: kansinReducer,
});
const store = createStore(rootReducer);
export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backColor,
  },
});
