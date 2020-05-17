import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import pluralize from "pluralize";
import { deleteDeck } from "../store/actions";
import { removeDeck } from "../utils/api";

const DeckDetailScreen = (props) => {
  const { navigation } = props;
  const deckId = navigation.getParam("deckId");

  const deck = useSelector((state) => state.decks[deckId]);
  // To be used on the screen title
  useEffect(() => {
    navigation.setParams({ deckName: deck.name });
  }, [deckId]);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteDeck(deckId));
    removeDeck(deckId);
    navigation.goBack();
  };

  if (!deck || deck === "undefined" || deck === null) {
    return (
      <View>
        <Text>The selected deck does not exists</Text>
      </View>
    );
  }

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
        <CustomButton
          style={{
            backgroundColor:
              deck.cards.length !== 0 ? Colors.gray : Colors.green,
          }}
          onPress={() => {
            navigation.navigate("AddCard", {
              deckId: deck.id,
              deckName: deck.name,
            });
          }}
        >
          <Text>Add Card</Text>
        </CustomButton>

        <CustomButton
          onPress={() => {
            navigation.navigate("Quiz", { deck });
          }}
        >
          <Text>Start Quiz</Text>
        </CustomButton>

        <CustomButton
          style={{
            backgroundColor: Colors.red,
          }}
          onPress={handleDelete}
        >
          <Text>Delete Deck</Text>
        </CustomButton>
      </View>
    </View>
  );
};

DeckDetailScreen.navigationOptions = (navigationData) => {
  const deckName = navigationData.navigation.getParam("deckName");
  return {
    headerTitle: deckName,
  };
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
