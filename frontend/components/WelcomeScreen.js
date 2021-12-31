import * as React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BasicExample from "./LottieTest";

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
      {/* <View> */}
      {/* </View> */}
      <Image
        source={require("../assets/nnclear.png")}
        style={{
          borderRadius: 10,
          height: 200,
          width: 200,
          // marginBottom: 10,
          // borderWidth: 2,
        }}
      />
      <View
        style={{
          // paddingVertical: 30,
          // paddingHorizontal: 20,
          // borderWidth: 2,
          // borderRadius: 20,
          flexDirection: "row",
          borderColor: "#D3D3D3",
        }}
      >
        <Text style={{ fontSize: 35, marginRight: 30 }}>N E X T</Text>
        <Text style={{ fontSize: 35 }}>N O T E</Text>
      </View>

      <Text style={{ marginBottom: 50, marginTop: 10, fontSize: 17 }}>
        Intelligent Note Taking
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Get Started</Text>
      </TouchableOpacity>
      {/* <BasicExample /> */}
    </View>
  );
}

export default WelcomeScreen;
