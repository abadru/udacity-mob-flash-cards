import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { generateId } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { createDeck } from "../store/actions";
import { saveDeck } from "../utils/api";
import CustomButton from "../components/CustomButton";

import Colors from "../constants/Colors";

const AddDeckScreen = (props) => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const _createDeckObject = () => ({
    id: generateId(),
    name: input,
    cards: [],
  });

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleSubmit = () => {
    let deck = _createDeckObject();

    if (deck.name !== "") {
      // Dispatch Redux action
      dispatch(createDeck(deck.id, deck.name));
      //Save changes
      saveDeck(deck);

      // Route to new deck's detail screen.
      props.navigation.navigate("DeckDetail", {
        deckId: deck.id,
        name: deck.name,
      });

      // Reset input
      setInput("");
    } else {
      alert("Please specify a deck name");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.label}>What will you learn in this deck?</Text>
      <TextInput
        style={styles.input}
        value={input}
        placeholder="e.g. React Native"
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
