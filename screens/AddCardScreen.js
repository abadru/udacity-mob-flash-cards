import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { createCard } from "../store/actions";
import { saveCard } from "../utils/api";
import CustomButton from "../components/CustomButton";

import Colors from "../constants/Colors";
import QuizScreen from "./QuizScreen";

const AddCardScreen = (props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    let deckId = props.navigation.getParam("deckId");

    if (question !== "" && answer !== "") {
      dispatch(createCard(deckId, question, answer));
      saveCard(deckId, { question, answer });

      // Return to Deck Detail view.
      props.navigation.goBack();

      // Reset form for future use.
      setQuestion("");
      setAnswer("");
    } else {
      alert("Please fill in the question and respective answer");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.element}>
        <Text style={styles.label}>What's the question?</Text>
        <TextInput
          style={styles.input}
          value={question}
          placeholder="Question?"
          onChangeText={(question) => {
            setQuestion(question);
          }}
        />
      </View>
      <View style={styles.element}>
        <Text style={styles.label}>What's the answer?</Text>
        <TextInput
          style={styles.input}
          value={answer}
          placeholder="Answer"
          onChangeText={(answer) => {
            setAnswer(answer);
          }}
        />
      </View>
      <CustomButton onPress={handleSubmit}>
        <Text>Create Card</Text>
      </CustomButton>
    </KeyboardAvoidingView>
  );
};

AddCardScreen.navigationOptions = (navigationData) => {
  const deckName = navigationData.navigation.getParam("deckName");
  return {
    headerTitle: `Add Card for deck ${deckName}`,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  element: {
    margin: 20,
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

export default AddCardScreen;
