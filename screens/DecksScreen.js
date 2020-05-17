import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { retrieveDecks } from "../utils/api";
import { receiveDecks } from "../store/actions";
import DeckCard from "../components/DeckCard";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";

const DecksScreen = (props) => {
  const [ready, setReady] = useState(false);
  const { navigation } = props;

  const decks = useSelector((state) => state.decks);

  const dispatch = useDispatch();

  useEffect(() => {
    retrieveDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => {
        setReady(true);
      });
  }, [dispatch]);

  if (!ready) {
    return (
      <View style={styles.blank}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (Object.values(decks).length === 0) {
    return (
      <View style={styles.content}>
        <Text style={{ color: Colors.accentColor }}>
          There is no Deck available. Please Add 1 Deck to start!
        </Text>
      </View>
    );
  }

  return Object.values(decks).length > 0 ? (
    <View style={styles.container}>
      <FlatList
        data={Object.values(decks)}
        renderItem={({ item }) => (
          <DeckCard
            id={item.id}
            name={item.name}
            cardCount={item.cards.length}
            navigation={props.navigation}
          />
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  ) : (
    <View style={styles.blank}>
      <Text style={{ fontSize: 18 }}>You don't have any decks yet.</Text>
      <CustomButton
        onPress={() => {
          navigation.navigate("AddDeck");
        }}
      >
        Create Deck
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
  },
  blank: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontFamily: "open-sans",
    fontSize: 18,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

DecksScreen.navigationOptions = {
  headerTitle: "Decks!",
};

export default DecksScreen;
