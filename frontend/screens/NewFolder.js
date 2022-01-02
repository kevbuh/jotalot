import { userToken } from "../redux/userSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ENV_DOMAIN } from "@env";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";

export default function CreateFolder() {
  const [postCurrentFolder, setPostCurrentFolder] = useState(false);
  const [didAlreadyCreate, setDidAlreadyCreate] = useState(false);
  const [currentFolderName, setCurrentFolderName] = useState("");
  const [data, setData] = useState([]);

  const user_token = useSelector(userToken);

  const CreateNewFolder = () => {
    fetch(`http://${ENV_DOMAIN}/folders/`, {
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
    fetch(`http://${ENV_DOMAIN}/folders/${data.id}`, {
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
        <View style={{ height: "100%", width: "100%" }}>
          <TextInput
            style={{
              marginTop: 20,
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
