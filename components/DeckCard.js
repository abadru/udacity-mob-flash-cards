import React from "react";
import pluralize from "pluralize";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";
const DeckCard = ({ id, name, cardCount, navigation }) => (
  <View style={styles.gridItem}>
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("DeckDetail", { deckId: id, name: name })
      }
    >
      <DefaultText style={styles.name}>{name}</DefaultText>
      <Text style={styles.count}>{`${cardCount} ${pluralize(
        "Card",
        cardCount
      )}`}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    backgroundColor: Colors.accentColor,
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 5,
    color: Colors.white,
  },
  count: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
    color: "black",
    marginBottom: 5,
  },
});

export default DeckCard;
