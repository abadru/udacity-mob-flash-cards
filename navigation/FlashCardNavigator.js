import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import DecksScreen from "../screens/DecksScreen";
import AddDeckScreen from "../screens/AddDeckScreen";
import DeckDetailScreen from "../screens/DeckDetailScreen";
import QuizScreen from "../screens/QuizScreen";
import AddCardScreen from "../screens/AddCardScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const DecksNavigator = createStackNavigator(
  {
    Decks: { screen: DecksScreen },
    DeckDetail: {
      screen: DeckDetailScreen,
      navigationOptions: defaultStackNavOptions,
    },
    AddCard: { screen: AddCardScreen },
    Quiz: { screen: QuizScreen },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreens = {
  Decks: DecksNavigator,
  AddDeck: {
    screen: AddDeckScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-add" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Add Deck</Text>
        ) : (
          "Add Deck"
        ),
      headerTitle: "Add Deck",
    },
  },
};

const MainTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreens, {
        activeTintColor: Colors.accentColor,
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
        shifting: true,
      })
    : createBottomTabNavigator(tabScreens, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-old",
          },
          activeTintColor: Colors.primaryColor,
        },
      });

export default createAppContainer(MainTabNavigator);
