import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import pluralize from "pluralize";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import QuizCard from "../components/QuizCard";
import QuizActions from "../components/QuizActions";
import QuizResults from "../components/QuizResults";
import Colors from "../constants/Colors";

const QuizScreen = (props) => {
  const { navigation } = props;
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const deck = navigation.getParam("deck");
  console.log(deck);

  const _getRemainingCountMessage = () => {
    const remainingQuestions =
      deck.cards.length - (correctAnswerCount + incorrectAnswerCount + 1);
    return `${remainingQuestions} ${pluralize(
      "question",
      remainingQuestions
    )} remaining.`;
  };

  const restartQuiz = () => {
    setCorrectAnswerCount(0);
    setIncorrectAnswerCount(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const recordAnswer = (knewAnswer) => {
    // Update answer count.
    let correctAnswers = correctAnswerCount;
    let incorrectAnswers = incorrectAnswerCount;
    let displayResults = showResults;
    let currentQuestionIndex_ = currentQuestionIndex;

    // Update the count.
    if (knewAnswer) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }

    // Determine whether to show another card or quiz results.
    if (currentQuestionIndex_ === deck.cards.length - 1) {
      // time to show results.
      displayResults = true;

      // User completed a quiz, disable today's notification.
      clearLocalNotification();
      // Set tomorrow's notification.
      setLocalNotification();
    } else {
      // show next card.
      currentQuestionIndex_++;
    }

    // Update state with new values.
    setCorrectAnswerCount(correctAnswers);
    setIncorrectAnswerCount(incorrectAnswers);
    setCurrentQuestionIndex(currentQuestionIndex_);
    setShowResults(displayResults);
  };

  console.log(currentQuestionIndex);

  return !showResults ? (
    <View style={styles.container}>
      <QuizCard card={deck.cards[currentQuestionIndex]} />
      <Text style={styles.count}>{_getRemainingCountMessage()}</Text>
      <QuizActions recordAnswer={recordAnswer} />
    </View>
  ) : (
    <QuizResults
      correctAnswerCount={correctAnswerCount}
      incorrectAnswerCount={incorrectAnswerCount}
      restartQuiz={restartQuiz}
      navigation={navigation}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 10,
  },
  count: {
    color: Colors.gray,
    fontSize: 20,
    marginTop: 10,
  },
});
export default QuizScreen;
