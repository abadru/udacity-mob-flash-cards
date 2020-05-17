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
  initialRouteName: "Decks",
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

const tabScreens = {
  Decks: {
    screen: DecksScreen,
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
    },
  },
  AddDeck: {
    screen: AddDeckScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-add" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
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

const FlashCardTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreens, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabScreens, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-old",
          },
          activeTintColor: Colors.accentColor,
        },
      });

const MainNavigator = createStackNavigator(
  {
    Decks: FlashCardTabNavigator,
    DeckDetail: DeckDetailScreen,
    AddCard: AddCardScreen,
    Quiz: QuizScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

export default createAppContainer(MainNavigator);
