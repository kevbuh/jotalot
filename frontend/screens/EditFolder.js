import Ionicons from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  useIsFocused,
  useTheme,
} from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { userToken } from "../redux/userSlice";
import { useSelector } from "react-redux";
import {
  Pressable,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import { ENV_DOMAIN } from "@env";

export default function EditFolder(props) {
  const user_token = useSelector(userToken);
  const sentData = props.route.params.item;
  const [currentFolder, setCurrentFolder] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { colors } = useTheme();

  const [currentFolderName, setCurrentFolderName] = useState(
    sentData.folder_name
  );

  const getFolders = () => {
    fetch(`http://${ENV_DOMAIN}/folders/${sentData.id}`, {
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
        setCurrentFolder(json.notes);
        // setAreThereNotes(true);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderFolders = (item) => {
    return (
      <Pressable
        style={[
          styles.notes,
          {
            borderColor: colors.border,
          },
        ]}
        onPress={() => {
          navigation.navigate("Edit Note", {
            item: item,
          });
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}
        >
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: colors.text }}
        >
          {item.text}
        </Text>
      </Pressable>
    );
  };

  const UpdateFolder = () => {
    fetch(`http://${ENV_DOMAIN}/folders/${sentData.id}`, {
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

  useEffect(() => {
    getFolders();
  }, [isFocused]);

  const DeleteFolder = (sentData) => {
    fetch(`http://${ENV_DOMAIN}/folders/${sentData.id}`, {
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
            <Pressable
              onPress={() => {
                DeleteFolder(sentData);
                navigation.navigate("Main");
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name={"trash-outline"}
                  size={30}
                  style={{
                    marginRight: 15,
                    color: colors.primary,
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
                fontWeight: "bold",
                color: colors.text,
              }}
              value={currentFolderName}
              onChangeText={setCurrentFolderName}
            />
          </View>
          <View>
            <FlatList
              data={currentFolder}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => {
                return renderFolders(item);
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  notes: {
    width: "95%",
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderRadius: 5,
  },
  title: {
    paddingTop: 25,
    marginLeft: 20,
    paddingBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
});
