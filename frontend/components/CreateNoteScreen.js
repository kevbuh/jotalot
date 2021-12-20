import React, { useEffect } from "react";
import {
  Button,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";

export default function CreateNoteScreen() {
  const [currentNote, setCurrentNote] = React.useState("");
  const [currentTitle, setCurrentTitle] = React.useState("");
  const [postCurrentNote, setPostCurrentNote] = React.useState(false);
  const [didAlreadyCreate, setDidAlreadyCreate] = React.useState(false);

  const [data, setData] = React.useState([]);

  const CreateNewNote = () => {
    fetch("http://127.0.0.1:8000/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_title: currentTitle,
        note_text: currentNote,
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
    fetch(`http://127.0.0.1:8000/notes/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_title: currentTitle,
        note_text: currentNote,
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
          <Button
            title="+"
            onPress={() => {
              setCurrentNote("");
              setCurrentTitle("");
              CreateNewNote();
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
            placeholder="Edit Title"
            value={currentTitle}
            onChangeText={setCurrentTitle}
          />
          <TextInput
            multiline
            KeyboardAvoidingView
            style={{
              // height: 200,
              height: "100%",
              paddingBottom: 100,
              margin: 20,
              fontSize: 20,
            }}
            borderColor="#D3D3D3"
            placeholder="Tap here to edit text"
            value={currentNote}
            onChangeText={setCurrentNote}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
