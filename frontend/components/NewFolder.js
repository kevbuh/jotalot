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

export default function CreateFolder() {
  const [didAlreadyCreate, setDidAlreadyCreate] = useState(false);
  const [postCurrentFolder, setPostCurrentFolder] = useState(false);
  const [currentFolderName, setCurrentFolderName] = useState("");
  const [data, setData] = useState([]);

  const user_token = useSelector(userToken);

  const CreateNewFolder = () => {
    fetch("http://localhost:8000/folders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
      body: JSON.stringify({
        folder_name: currentFolderName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (currentFolderName.length > 0) {
      setPostCurrentFolder(true);
    }
  }, [currentFolderName]);

  useEffect(() => {
    if (postCurrentFolder == true && didAlreadyCreate == false) {
      setDidAlreadyCreate(true);
      CreateNewFolder();
    }
  }, [postCurrentFolder]);

  const UpdateFolderName = () => {
    fetch(`http://localhost:8000/folders/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
      body: JSON.stringify({
        folder_name: currentFolderName,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (didAlreadyCreate == true) {
      UpdateFolderName();
    }
  }, [currentFolderName]);

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
            }}
            placeholder="Folder Name..."
            value={currentFolderName}
            onChangeText={setCurrentFolderName}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
