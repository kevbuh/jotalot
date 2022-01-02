import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

export default function StatsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Statistics</Text>
        </View>
      </View>
      <Text style={styles.smallTitle}>Notes Created:</Text>
      <TouchableOpacity
        onPress={() => {
          alert("Flow!");
        }}
        style={styles.buttons}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          235
        </Text>
        <Text style={styles.smallText}>More than</Text>
        <Text style={styles.smallText}>60% of users!</Text>
      </TouchableOpacity>
      <Text style={styles.smallTitle}>Days Spent Creating:</Text>
      <TouchableOpacity
        onPress={() => {
          alert("You changed the Appearance!");
        }}
        style={styles.buttons}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>10 days</Text>
      </TouchableOpacity>
      <Text style={styles.smallTitle}>AI suggestions accepted:</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Change Password");
        }}
        style={styles.buttons}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>94</Text>
        <Text style={styles.smallText}>Looks like</Text>
        <Text style={styles.smallText}>its helping you!</Text>
      </TouchableOpacity>
    </ScrollView>
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
    backgroundColor: "#DDDDDD",
    width: "50%",
    borderRadius: 10,
    marginVertical: 7,
  },
  title: { fontSize: 35, marginRight: 6, fontWeight: "bold" },
  smallText: { fontWeight: "bold", fontSize: 10 },
  smallTitle: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
});