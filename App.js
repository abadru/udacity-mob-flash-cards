import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import decksReducer from "./store/reducers";
import MainTabNavigator from "./navigation/FlashCardNavigator";

const rootReducer = combineReducers({
  decks: decksReducer,
});

// create application store
const store = createStore(rootReducer);

enableScreens();

// Load my custom fonts
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Display loading component while fetching fonts
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainTabNavigator />
    </Provider>
  );
}
