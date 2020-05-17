import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import CustomButton from "./CustomButton";

const QuizCard = (props) => {
  const [showQuestion, setShowQuestion] = useState(true);

  const toggleQuestion = () => {
    setShowQuestion(!showQuestion);
  };

  const { card } = props;

  return (
    <View style={styles.container}>
      <View>
        {showQuestion ? (
          <Text style={styles.text}>{card.question}</Text>
        ) : (
          <Text style={styles.text}>{card.answer}</Text>
        )}
      </View>
      <View style={{ marginTop: 30 }}>
        <CustomButton
          style={{ backgroundColor: Colors.gray }}
          onPress={toggleQuestion}
        >{`See ${showQuestion ? "Answer" : "Question"}`}</CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blue,
    padding: 30,
    width: 350,
    height: 250,
    borderRadius: 5,
    shadowRadius: 5,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 4,
      height: 5,
    },
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
  },
});

export default QuizCard;
