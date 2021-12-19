import * as React from "react";
import { Image, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30, borderRadius: 6 }}
      source={require("../assets/NextNoteLogo.png")}
    />
  );
}
