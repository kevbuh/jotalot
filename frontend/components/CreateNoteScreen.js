import * as React from "react";
import {
  Button,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function CreateNoteScreen(props) {
  const [currentNote, setCurrentNote] = React.useState("");
  const [currentTitle, setCurrentTitle] = React.useState("");

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
        console.log("Saved note!");
        console.log(data);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView style={{ height: "100%", width: "100%", marginTop: 40 }}>
        <TextInput
          style={{
            marginTop: 10,
            marginLeft: 20,
            fontSize: 30,
          }}
          placeholder="Untitled"
          value={currentTitle}
          onChangeText={setCurrentTitle}
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
          placeholder="Tap here to continue"
          value={currentNote}
          onChangeText={setCurrentNote}
        />
        <Button
          title="Save"
          onPress={() => {
            CreateNewNote();
          }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
