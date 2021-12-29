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
    justifyContent: "space-evenly",
    height: "80%",
  },
});

function NewAccountScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../assets/NextNoteLogo.png")}
        style={{ borderRadius: 10, height: 50, width: 50, marginBottom: 20 }}
      /> */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 40, marginBottom: 20 }}>Congratulations</Text>
        <Text style={{ fontSize: 18, marginBottom: 4 }}>
          Your account has been
        </Text>
        <Text style={{ fontSize: 18 }}>successfully created!</Text>
      </View>

      {/* <Text style={{ marginBottom: 50, marginTop: 20, fontSize: 17 }}>
        Intelligent Note Taking
      </Text> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={{
          paddingHorizontal: 5,
          alignItems: "center",
          paddingVertical: 15,
          backgroundColor: "#DDDDDD",
          width: "80%",
          borderRadius: 10,
          marginVertical: 7,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NewAccountScreen;
