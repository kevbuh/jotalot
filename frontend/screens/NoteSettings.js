import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";

export default function NoteSettingScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>Customize Note</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
        Utility
      </Text>
      <TouchableOpacity
        onPress={() => {
          alert("Redo!");
        }}
        style={styles.touchable}
      >
        <Text style={{ fontWeight: "bold" }}>Redo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          alert("Undo!");
        }}
        style={styles.touchable}
      >
        <Text style={{ fontWeight: "bold" }}>Undo</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
        Style
      </Text>
      <Text style={{ marginVertical: 10 }}>Dark Theme</Text>
      <Switch />
      <Text style={{ marginVertical: 10 }}>Favorite</Text>
      <Switch />
      <View>
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Main");
            }}
            style={styles.redTouchable}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingTop: 30,
  },
  touchable: {
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#DDDDDD",
    width: "30%",
    borderRadius: 10,
    marginVertical: 7,
  },
  redTouchable: {
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "red",
    width: "30%",
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 100,
  },
});
