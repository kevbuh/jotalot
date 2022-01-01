import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";

function NewAccountScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 40, marginBottom: 20 }}>Congratulations</Text>
        <Text style={{ fontSize: 18, marginBottom: 4 }}>
          Your account has been
        </Text>
        <Text style={{ fontSize: 18 }}>successfully created!</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={styles.touchable}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "80%",
  },
  touchable: {
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#DDDDDD",
    width: "80%",
    borderRadius: 10,
    marginVertical: 7,
  },
});

export default NewAccountScreen;
