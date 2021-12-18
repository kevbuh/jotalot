import * as React from "react";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function CreateNoteScreen() {
  const [currentNote, setCurrentNote] = React.useState("");
  const [currentTitle, setCurrentTitle] = React.useState("");

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
        {/* <Button
        title="Done"
        onPress={() => {
          navigation.navigate({
            name: "Main",
            params: { note: currentNote },
            merge: true,
          });
        }}
      /> */}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
