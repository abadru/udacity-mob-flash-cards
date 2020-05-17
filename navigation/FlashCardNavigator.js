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

const DeckNavigator = createStackNavigator(
  {
    AddDeck: { screen: AddDeckScreen },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
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
  }
);

const tabScreens = {
  Decks: {
    screen: DecksNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-list" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Decks</Text>
        ) : (
          "Decks"
        ),
      headerTitle: "Decks",
    },
  },
  AddDeck: DeckNavigator,
};

const MainTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreens, {
        activeTintColor: Colors.accentColor,
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
        shifting: false,
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
