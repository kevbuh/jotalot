// import * as React from "react";
import React, { useState, useEffect } from "react";
import {
  Button,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function EditNoteScreen(props) {
  const sentData = props.route.params.item;

  const [currentTitleUpdate, setCurrentTitleUpdate] = useState(
    sentData.note_title
  );

  const [currentNoteUpdate, setCurrentNoteUpdate] = useState(
    sentData.note_text
  );

  const navigation = useNavigation();

  const UpdateNote = () => {
    fetch(`http://127.0.0.1:8000/notes/${sentData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_title: currentTitleUpdate,
        note_text: currentNoteUpdate,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    UpdateNote();
  }, [currentNoteUpdate, currentTitleUpdate]);

  const DeleteNote = (sentData) => {
    fetch(`http://127.0.0.1:8000/notes/${sentData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.log("error", error));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignSelf: "flex-end",
              flexDirection: "row",
              marginHorizontal: 8,
              marginTop: 10,
            }}
          >
            <Button
              title="Delete"
              onPress={() => {
                DeleteNote(sentData);
                navigation.navigate("Main");
              }}
              color="black"
            />
          </View>
          <View style={{ height: "100%", width: "100%" }}>
            <TextInput
              style={{
                marginTop: 10,
                marginLeft: 20,
                fontSize: 30,
              }}
              value={currentTitleUpdate}
              onChangeText={setCurrentTitleUpdate}
            />
            <TextInput
              multiline
              KeyboardAvoidingView
              style={{
                height: 200,
                margin: 20,
                fontSize: 20,
              }}
              borderColor="#D3D3D3"
              value={currentNoteUpdate}
              onChangeText={setCurrentNoteUpdate}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
