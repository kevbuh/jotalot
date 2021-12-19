import * as React from "react";
import { Button } from "react-native";

export default function DeleteNoteButton() {
  const DeleteNote = (data) => {
    fetch(`http://127.0.0.1:8000/notes/${sentData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        props.navigation.navigate("Main");
      })
      .catch((error) => console.log("error", error));
  };
  return <Button title="x" onPress={DeleteNote(data)} />;
}
