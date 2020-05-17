import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import pluralize from "pluralize";

const DeckDetailScreen = (props) => {
  const { navigation } = props;
  const deckId = navigation.getParam("deckId");

  console.log(deckId);

  const deck = useSelector((state) => state.decks[deckId]);
  console.log(deck);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{deck.name}</Text>
        <Text style={styles.count}>{`${deck.cards.length} ${pluralize(
          "Card",
          deck.cards.length
        )}`}</Text>
      </View>
      <View style={styles.actions}>
        {deck.cards.length !== 0 && (
          <CustomButton
            onPress={() => {
              navigation.navigate("Quiz", { deck });
            }}
          >
            <Text>Start Quiz</Text>
          </CustomButton>
        )}
        <CustomButton
          style={{
            backgroundColor:
              deck.cards.length !== 0 ? Colors.gray : Colors.green,
          }}
          onPress={() => {
            navigation.navigate("AddCard", { deckId: deck.id });
          }}
        >
          <Text>Add Card</Text>
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
  },
  count: {
    fontSize: 20,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 5,
  },
  actions: {
    marginTop: 20,
  },
});
export default DeckDetailScreen;
