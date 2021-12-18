import * as React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/NextNoteLogo.png")}
        style={{ borderRadius: 10, height: 50, width: 50, marginBottom: 20 }}
      />
      <Text style={{ fontSize: 40 }}>NEXT NOTE</Text>
      <Text style={{ marginBottom: 50 }}>Intelligent Note Taking</Text>
      <Button
        title="Get Started"
        onPress={() => {
          navigation.navigate("Main");
        }}
      />
    </View>
  );
}

export default WelcomeScreen;
