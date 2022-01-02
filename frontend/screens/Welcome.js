import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as React from "react";

function WelcomeScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/nnclear.png")}
        style={{
          borderRadius: 10,
          height: 200,
          width: 200,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          borderColor: colors.border,
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
        style={[
          styles.buttons,
          {
            backgroundColor: colors.cardBackground,
          },
        ]}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 15,
    width: "80%",
    borderRadius: 10,
    marginVertical: 7,
  },
});

export default WelcomeScreen;
