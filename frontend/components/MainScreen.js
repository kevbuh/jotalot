import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { userToken } from "../redux/userSlice";
import Ionicons from "react-native-vector-icons/Ionicons";

function MainScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [areThereNotes, setAreThereNotes] = useState(false);
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const user_token = useSelector(userToken);

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
        // console.log("MAIN SCREEN TRYING TO getNotes(): ******* ", json);
        setData(json);
        setAreThereNotes(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNotes();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500)
      .then(getNotes())
      .then(() => {
        setRefreshing(false);
        // console.log("MAIN SCREEN STOPPED LOADING");
      })
      .catch((error) => console.log("error", error));
  }, []);

  const renderNotes = (item) => {
    return (
      <Pressable
        style={{
          width: "95%",
          marginHorizontal: 10,
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderTopWidth: 1,
          borderRadius: 5,
          borderColor: "#D3D3D3",
        }}
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

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{ height: 700 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingTop: 25,
                  marginLeft: 20,
                  paddingBottom: 20,
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                Notes:
              </Text>
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Untitled Note");
                }}
                style={{
                  paddingHorizontal: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 30,
                  backgroundColor: "#DDDDDD",
                  // width: "30%",
                  height: 40,
                  borderRadius: 10,
                  marginVertical: 7,
                  marginRight: 10,
                  // borderWidth: 2,
                  borderColor: "black",
                  backgroundColor: "#e4007c",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
                >
                  +
                </Text>
              </TouchableOpacity> */}
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
            {data.length > 0 ? (
              <FlatList
                data={data}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => {
                  return renderNotes(item);
                }}
              />
            ) : (
              <View style={{ justifyContent: "center", marginLeft: 20 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}
                >
                  You currently have 0 notes.
                </Text>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ marginTop: 20, fontSize: 20 }}>
                    Click the pink 'Create Note' button at the top right
                  </Text>
                  <Text style={{ fontSize: 20 }}>to make a note!</Text>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainScreen;
