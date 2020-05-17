import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DecksScreen = (props) => {
    return (
        <View><Text>Add Card Screen</Text></View>
    );
};

const styles = StyleSheet.create({

});

DecksScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Decks",
    };
};

export default DecksScreen;
