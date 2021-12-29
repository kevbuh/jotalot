import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { userToken } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingTop: 30,
  },
});

export default function NoteSettingScreen(props) {
  const sentData = props.route.params.item;
  const navigation = useNavigation();

  const user_token = useSelector(userToken);

  const DeleteNote = (sentData) => {
    fetch(`http://localhost:8000/notes/${sentData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
    }).catch((error) => console.log("error", error));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>Customize Note</Text>
      </View>
      {/* <Text>{user_token}</Text> */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
        Utility
      </Text>
      <TouchableOpacity
        onPress={() => {
          alert("Redo!");
        }}
        style={{
          paddingHorizontal: 5,
          alignItems: "center",
          paddingVertical: 10,
          backgroundColor: "#DDDDDD",
          width: "30%",
          borderRadius: 10,
          marginVertical: 7,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Redo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          alert("Undo!");
        }}
        style={{
          paddingHorizontal: 5,
          alignItems: "center",
          paddingVertical: 10,
          backgroundColor: "#DDDDDD",
          width: "30%",
          borderRadius: 10,
          marginVertical: 7,
        }}
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
              DeleteNote(sentData);
              navigation.navigate("Main");
            }}
            style={{
              paddingHorizontal: 5,
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: "red",
              width: "30%",
              borderRadius: 10,
              marginTop: 7,
              marginBottom: 100,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
