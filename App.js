import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading";
import productsReducer from "./store/reducers/products";

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer)

const fetchFonts = () => {
  return (
      Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
      })
  )
}

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false)

  if (!fontsLoaded) {
    return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => {setFontsLoaded(true)}}
          onError={console.warn}
        />
    )
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>...</View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
