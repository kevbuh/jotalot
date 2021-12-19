// import * as React from "react";
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
  LogBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function MainScreen(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  const getNotes = () => {
    fetch("http://localhost:8000/notes", {
      method: "GET",
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getNotes();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500)
      .then(getNotes())
      .then(() => setRefreshing(false))
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
          {item.note_title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {item.note_text}
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
          <ActivityIndicator />
        ) : (
          <View>
            <Text
              style={{
                paddingTop: 25,
                paddingHorizontal: 10,
                paddingBottom: 20,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Notes:
            </Text>
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => {
                return renderNotes(item);
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainScreen;
