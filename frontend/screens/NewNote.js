import React, { useEffect, useState } from "react";
import { userToken } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { ENV_DOMAIN } from "@env";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";

export default function CreateNoteScreen() {
  const [didAlreadyCreate, setDidAlreadyCreate] = useState(false);
  const [postCurrentNote, setPostCurrentNote] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentNote, setCurrentNote] = useState("");
  const [data, setData] = useState([]);

  const user_token = useSelector(userToken);
  const { colors } = useTheme();

  const CreateNewNote = () => {
    fetch(`http://${ENV_DOMAIN}/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
      body: JSON.stringify({
        title: currentTitle,
        text: currentNote,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (currentNote.length > 0 && currentTitle.length > 0) {
      setPostCurrentNote(true);
    }
  }, [currentNote, currentTitle]);

  useEffect(() => {
    if (postCurrentNote == true && didAlreadyCreate == false) {
      setDidAlreadyCreate(true);
      CreateNewNote();
    }
  }, [postCurrentNote]);

  const UpdateNote = () => {
    fetch(`http://${ENV_DOMAIN}/notes/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
      body: JSON.stringify({
        title: currentTitle,
        text: currentNote,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (didAlreadyCreate == true) {
      UpdateNote();
    }
  }, [currentNote, currentTitle]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView>
        <View
          style={{
            alignSelf: "flex-end",
            flex: 1,
            marginHorizontal: 8,
            marginTop: 10,
            flexDirection: "row",
          }}
        ></View>
        <View style={{ height: "100%", width: "100%" }}>
          <TextInput
            style={{
              marginTop: 10,
              marginLeft: 20,
              fontSize: 30,
              color: colors.text,
            }}
            placeholder="Title"
            value={currentTitle}
            onChangeText={setCurrentTitle}
          />
          <TextInput
            multiline
            KeyboardAvoidingView
            style={{
              margin: 20,
              fontSize: 20,
              color: colors.text,
            }}
            borderColor={colors.border}
            placeholder="Text..."
            value={currentNote}
            onChangeText={setCurrentNote}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
