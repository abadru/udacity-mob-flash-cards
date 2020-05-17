import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { generateId } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { createDeck } from "../store/actions";
import { saveDeck } from "../utils/api";
import CustomButton from "../components/CustomButton";

import Colors from "../constants/Colors";

const AddDeckScreen = (props) => {
  const [deckName, setDeckName] = useState("");

  const existingDecks = useSelector((state) => state.decks);

  const dispatch = useDispatch();

  const handleInputChange = (value) => {
    setDeckName(value);
  };

  const handleSubmit = () => {
    let deck = {
      id: generateId(),
      name: deckName,
      cards: [],
    };

    if (deck.name !== "") {
      // Dispatch Redux action to update the store
      dispatch(createDeck(deck.id, deck.name));
      //Save changes
      saveDeck(deck);

      // Route to new deck's detail screen.
      props.navigation.navigate("DeckDetail", {
        deckId: deck.id,
        name: deck.name,
      });

      // Reset input
      setDeckName("");
    } else {
      alert("Please specify a deck name");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.label}>What is the title of your new deck?</Text>
      <TextInput
        style={styles.input}
        value={deckName}
        placeholder="Type your deck name"
        onChangeText={handleInputChange}
      />
      <CustomButton onPress={handleSubmit}>
        <Text>Create Deck</Text>
      </CustomButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    backgroundColor: Colors.white,
    width: 350,
    fontSize: 20,
    height: 50,
    padding: 10,
    borderRadius: 1,
    borderColor: Colors.gray,
    margin: 20,
  },
});

AddDeckScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Add Deck",
  };
};

export default AddDeckScreen;
