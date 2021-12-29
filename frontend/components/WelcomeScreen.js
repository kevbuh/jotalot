import * as React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/NextNoteLogo.png")}
        style={{ borderRadius: 10, height: 50, width: 50, marginBottom: 20 }}
      />
      <Text style={{ fontSize: 40 }}>N E X T</Text>
      <Text style={{ fontSize: 40 }}>N O T E</Text>

      <Text style={{ marginBottom: 50 }}>Intelligent Note Taking</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={{
          paddingHorizontal: 5,
          alignItems: "center",
          paddingVertical: 10,
          backgroundColor: "#DDDDDD",
          width: "80%",
          borderRadius: 10,
          marginVertical: 7,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Start Thinking</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WelcomeScreen;
