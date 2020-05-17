import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const CustomButton = ({ children, onPress, style = {} }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.reset, style]}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: Colors.primaryColor,
    margin: 10,
    padding: 15,
    width: 300,
  },
  reset: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
});

export default CustomButton;
