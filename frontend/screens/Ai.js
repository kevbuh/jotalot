import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function AIScreen() {
  const [text, setText] = useState("");

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
      <TextInput
        style={{
          marginTop: 20,
          fontSize: 30,
          color: colors.text,
        }}
        placeholder="Type in an idea..."
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginTop: 80,
  },
  title: { fontSize: 35, marginRight: 6, fontWeight: "bold" },
  smallText: { fontSize: 20 },
  smallTitle: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
});
