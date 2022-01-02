import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useTheme } from "@react-navigation/native";
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
import { ENV_DOMAIN } from "@env";

function HomeScreen() {
  const [areThereNotes, setAreThereNotes] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dataFolder, setDataFolder] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { colors } = useTheme();

  const user_token = useSelector(userToken);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getNotes = () => {
    fetch(`http://${ENV_DOMAIN}/notes/`, {
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
        style={[styles.notes, { borderColor: colors.border }]}
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

  const renderRecent = (item) => {
    return (
      <Pressable
        style={[
          styles.recent,
          {
            backgroundColor: colors.cardBackground,
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

  const renderFolders = (item) => {
    return (
      <View>
        <Pressable
          style={[
            styles.folders,
            {
              borderColor: colors.border,
              backgroundColor: colors.cardBackground,
            },
          ]}
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
                color: colors.primary,
              }}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}
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
              <Text style={[styles.title, { color: colors.text }]}>
                Recent Notes
              </Text>
              <Ionicons
                name={"create-outline"}
                size={30}
                color={colors.text}
                onPress={() => {
                  navigation.navigate("New Note");
                }}
                style={{
                  color: "white",
                  marginRight: 25,
                  color: colors.primary,
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
                <Text style={[styles.title, { color: colors.text }]}>
                  All Notes
                </Text>
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
                        color: colors.text,
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
                        color: colors.primary,
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
                            color: colors.text,
                          }}
                        >
                          Click the pink 'Create Note' button at the top right
                          to make a note!
                        </Text>
                        <Pressable
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            backgroundColor: colors.cardBackground,
                            borderRadius: 10,
                          }}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: colors.text,
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
                      backgroundColor: colors.cardBackground,
                      borderRadius: 10,
                      marginTop: 80,
                    }}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: colors.text,
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
  },
  recent: {
    marginHorizontal: 2,
    width: 100,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderRadius: 5,
  },
  folders: {
    width: "90%",
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
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
