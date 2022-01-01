import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { userToken } from "../redux/userSlice";
import { useSelector } from "react-redux";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Modal,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Pressable,
  StyleSheet,
} from "react-native";

function HomeScreen() {
  const [areThereNotes, setAreThereNotes] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dataFolder, setDataFolder] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const user_token = useSelector(userToken);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getNotes = () => {
    fetch("http://localhost:8000/notes/", {
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
        setData(json);
        setAreThereNotes(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFolders = () => {
    fetch("http://localhost:8000/folders/", {
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
        setDataFolder(json);
        setAreThereNotes(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNotes();
    getFolders();
  }, [isFocused]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500)
      .then(getNotes())
      .then(() => {
        setRefreshing(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const renderNotes = (item) => {
    return (
      <Pressable
        style={styles.notes}
        onPress={() => {
          navigation.navigate("Edit Note", {
            item: item,
          });
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 18, fontWeight: "bold" }}
        >
          {item.title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {item.text}
        </Text>
      </Pressable>
    );
  };

  const renderRecent = (item) => {
    return (
      <Pressable
        style={styles.recent}
        onPress={() => {
          navigation.navigate("Edit Note", {
            item: item,
          });
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 18, fontWeight: "bold" }}
        >
          {item.title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {item.text}
        </Text>
      </Pressable>
    );
  };

  const renderFolders = (item) => {
    return (
      <View>
        <Pressable
          style={styles.folders}
          onPress={() => {
            navigation.navigate("Edit Folder", {
              item: item,
            });
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name={"folder-outline"}
              size={30}
              style={{
                marginRight: 15,
                color: "#e4007c",
              }}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {item.folder_name}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView>
      <View
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <ActivityIndicator />
          </View>
        ) : (
          <SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.title}>Recent Notes</Text>
              <Ionicons
                name={"create-outline"}
                size={30}
                color={"black"}
                onPress={() => {
                  navigation.navigate("New Note");
                }}
                style={{
                  color: "white",
                  marginRight: 25,
                  color: "#e4007c",
                }}
              />
            </View>
            <FlatList
              horizontal={true}
              style={{ marginLeft: 10 }}
              initialNumToRender={2}
              windowSize={1}
              data={data}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => {
                return renderRecent(item);
              }}
            />
            {data.length > 0 ? (
              <View>
                <Text style={styles.title}>All Notes</Text>
                <FlatList
                  data={data}
                  keyExtractor={({ id }) => id}
                  renderItem={({ item }) => {
                    return renderNotes(item);
                  }}
                />
                <View style={{ marginTop: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 20,
                        paddingBottom: 20,
                        fontSize: 30,
                        fontWeight: "bold",
                      }}
                    >
                      Folders
                    </Text>
                    <Ionicons
                      name={"add"}
                      size={30}
                      color={"black"}
                      onPress={() => {
                        navigation.navigate("Untitled Folder");
                      }}
                      style={{
                        color: "white",
                        marginRight: 25,
                        color: "#e4007c",
                      }}
                    />
                  </View>
                  <FlatList
                    data={dataFolder}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => {
                      return renderFolders(item);
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={{ justifyContent: "center", marginLeft: 20 }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 102,
                    marginRight: 20,
                  }}
                >
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 22,
                      }}
                    >
                      <View style={styles.modal}>
                        <Text
                          style={{
                            fontSize: 18,
                            marginBottom: 20,
                          }}
                        >
                          Click the pink 'Create Note' button at the top right
                          to make a note!
                        </Text>
                        <Pressable
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "#ddd",
                            borderRadius: 10,
                          }}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                            }}
                          >
                            Got it!
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                  <Pressable
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      backgroundColor: "#ddd",
                      borderRadius: 10,
                      marginTop: 80,
                    }}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                      }}
                    >
                      ?
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </SafeAreaView>
        )}
      </View>
    </ScrollView>
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
    borderColor: "#D3D3D3",
  },
  recent: {
    marginHorizontal: 2,
    width: 100,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderRadius: 5,
    backgroundColor: "#DDDDDD",
    borderColor: "#D3D3D3",
  },
  folders: {
    width: "90%",
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderTopWidth: 1,
    borderRadius: 5,
    borderColor: "#D3D3D3",
    backgroundColor: "#DDD",
  },
  title: {
    paddingTop: 25,
    marginLeft: 20,
    paddingBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
  },
});

export default HomeScreen;
