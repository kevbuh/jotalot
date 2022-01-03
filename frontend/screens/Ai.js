import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function AIScreen() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        AI
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 40,
  },
  buttons: {
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 30,
    width: "50%",
    borderRadius: 10,
    marginVertical: 7,
  },
  title: { fontSize: 35, marginRight: 6, fontWeight: "bold" },
  smallText: { fontSize: 20 },
  smallTitle: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
});
