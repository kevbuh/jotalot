import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { userToken } from "../redux/userSlice";

export default function CreateNoteScreen() {
  const [didAlreadyCreate, setDidAlreadyCreate] = useState(false);
  const [postCurrentNote, setPostCurrentNote] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentNote, setCurrentNote] = useState("");
  const [data, setData] = useState([]);

  const user_token = useSelector(userToken);

  const CreateNewNote = () => {
    fetch("http://localhost:8000/notes/", {
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
    fetch(`http://localhost:8000/notes/${data.id}`, {
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
        >
          {/* <Button
            title="+"
            onPress={() => {
              setCurrentNote("");
              setCurrentTitle("");
              CreateNewNote();
            }}
            color="black"
          /> */}
        </View>
        <View style={{ height: "100%", width: "100%" }}>
          <TextInput
            style={{
              marginTop: 10,
              marginLeft: 20,
              fontSize: 30,
            }}
            placeholder="Title"
            value={currentTitle}
            onChangeText={setCurrentTitle}
          />
          <TextInput
            multiline
            KeyboardAvoidingView
            style={{
              height: "100%",
              paddingBottom: 100,
              margin: 20,
              fontSize: 20,
            }}
            borderColor="#D3D3D3"
            placeholder="Text..."
            value={currentNote}
            onChangeText={setCurrentNote}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
