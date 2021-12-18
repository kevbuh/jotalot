import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function NoteSettingsScreen() {
  return (
    <View style={styles.container}>
      <Button
        title="Style"
        onPress={() => {
          alert("You changed the style of the note!");
        }}
      />
      <Button
        title="Undo"
        onPress={() => {
          alert("Undid!");
        }}
      />
      <Button
        title="Redo"
        onPress={() => {
          alert("Redid!");
        }}
      />
      <Button
        title="Page history"
        onPress={() => {
          alert("You clicked!");
        }}
      />
      <Button
        title="Delete"
        onPress={() => {
          alert("You deleted the note!");
        }}
      />
    </View>
  );
}
