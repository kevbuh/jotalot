import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { userToken } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { ENV_DOMAIN } from "@env";
import {
  Pressable,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

export default function EditNoteScreen(props) {
  const sentData = props.route.params.item;

  const [currentTitleUpdate, setCurrentTitleUpdate] = useState(sentData.title);
  const [currentNoteUpdate, setCurrentNoteUpdate] = useState(sentData.text);
  const [currentFolder, setCurrentFolder] = useState(sentData.folder);
  const [folderChoices, setFolderChoices] = useState([]);
  const [open, setOpen] = useState(false);

  const user_token = useSelector(userToken);
  const navigation = useNavigation();

  const UpdateNote = () => {
    fetch(`http://${ENV_DOMAIN}/notes/${sentData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
      body: JSON.stringify({
        folder: currentFolder,
        title: currentTitleUpdate,
        text: currentNoteUpdate,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log("UpdateNote() failed: ", error));
  };

  const getFolders = () => {
    fetch(`http://${ENV_DOMAIN}/folders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then((json) => {
        setFolderChoices(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteNote = (sentData) => {
    fetch(`http://${ENV_DOMAIN}/notes/${sentData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
    }).catch((error) => console.log("error", error));
  };

  const renderFolders = (item) => {
    return (
      <Pressable
        style={styles.notes}
        onPress={() => {
          setCurrentFolder(item.id);
          setOpen(!open);
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 18, fontWeight: "bold" }}
        >
          {item.folder_name}
        </Text>
      </Pressable>
    );
  };

  useEffect(() => {
    UpdateNote();
  }, [currentNoteUpdate, currentTitleUpdate, currentFolder]);

  useEffect(() => {
    UpdateNote();
    // alert("Changed folders!");
  }, [currentFolder]);

  useEffect(() => {
    getFolders();
  }, []);

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
              justifyContent: "space-between",
              flexDirection: "row",
              marginHorizontal: 8,
              marginTop: 10,
            }}
          >
            <View>
              <Ionicons
                name={open ? "folder" : "folder-outline"}
                size={30}
                style={{
                  marginLeft: 10,
                  color: "#e4007c",
                }}
                onPress={() => setOpen(!open)}
              />
              {open ? (
                <View>
                  <Text
                    style={{
                      marginLeft: 10,
                      marginVertical: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Choose a folder:
                  </Text>
                  <FlatList
                    data={folderChoices}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => {
                      return renderFolders(item);
                    }}
                  />
                </View>
              ) : null}
            </View>

            <Pressable
              onPress={() => {
                DeleteNote(sentData);
                navigation.navigate("Main");
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name={"trash-outline"}
                  size={30}
                  style={{
                    marginRight: 15,
                    color: "#e4007c",
                  }}
                />
              </View>
            </Pressable>
          </View>
          <View>
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
                height: "100%",
                margin: 20,
                fontSize: 20,
                paddingBottom: 100,
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

const styles = StyleSheet.create({
  notes: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#D3D3D3",
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginBottom: 5,
  },
});
