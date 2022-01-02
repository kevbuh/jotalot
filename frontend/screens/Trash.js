import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function TrashScreen() {
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
        Trash
      </Text>
      <Text
        style={[
          styles.smallText,
          {
            color: colors.text,
          },
        ]}
      >
        Nothing in the trash!
      </Text>
      <Text
        style={[
          styles.smallText,
          {
            color: colors.text,
          },
        ]}
      >
        Deleted Items will show here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 20,
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
