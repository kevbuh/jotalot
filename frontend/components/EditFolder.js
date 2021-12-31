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
import { useSelector } from "react-redux";
import { userToken } from "../redux/userSlice";

export default function EditFolder(props, item) {
  const sentData = props.route.params.item;
  // console.log("sentData ---->", sentData);

  const navigation = useNavigation();
  const user_token = useSelector(userToken);

  const [currentFolderName, setCurrentFolderName] = useState(
    sentData.folder_name
  );

  const UpdateFolder = () => {
    fetch(`http://localhost:8000/folders/${sentData.id}`, {
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
      .catch((error) => console.log("UpdateFolder() failed: ", error));
  };

  useEffect(() => {
    UpdateFolder();
  }, [currentFolderName]);

  const DeleteNote = (sentData) => {
    fetch(`http://localhost:8000/folders/${sentData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
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
          <View>
            <TextInput
              style={{
                marginTop: 10,
                marginLeft: 20,
                fontSize: 30,
              }}
              value={currentFolderName}
              onChangeText={setCurrentFolderName}
            />
            {/* <TextInput
              multiline
              KeyboardAvoidingView
              style={{
                height: "100%",
                margin: 20,
                fontSize: 20,
                paddingBottom: 100,
              }}
              borderColor="#D3D3D3"
              value={currentNoteUpdate}
              onChangeText={setCurrentNoteUpdate}
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
