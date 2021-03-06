import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

export default function CustomizeScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>Themes</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          alert("Customize");
        }}
        style={[styles.buttons, { backgroundColor: colors.cardBackground }]}
      >
        <Text style={{ fontWeight: "bold" }}>Customize</Text>
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 20,
            color: colors.text,
          }}
        >
          General
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert("Flow!");
          }}
          style={[styles.buttons, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={{ fontWeight: "bold" }}>Light Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("You clicked on the tutorial!");
          }}
          style={[styles.buttons, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={{ fontWeight: "bold" }}>Dark Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Change Password");
          }}
          style={[styles.buttons, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={{ fontWeight: "bold" }}>Sequoia</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              alert("Contact us!");
            }}
            style={[styles.buttons, { backgroundColor: colors.cardBackground }]}
          >
            <Text style={{ fontWeight: "bold" }}>Midnight Navy</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            alert("Nice choice!");
          }}
          style={[styles.buttons, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={{ fontWeight: "bold" }}>Shooting Star</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 10,
    width: "60%",
    borderRadius: 10,
    marginTop: 7,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 2,
    width: "90%",
  },
});
