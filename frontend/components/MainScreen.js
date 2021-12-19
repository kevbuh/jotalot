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
} from "react-native";

function MainScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getNotes = () => {
    console.log("fetching data");
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
        // console.log(json);
        setData(json);
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
    wait(1000)
      .then(getNotes())
      .then(() => setRefreshing(false))
      .catch((error) => console.log("error", error));
  }, []);

  const renderNotes = (item) => {
    return (
      <View
        style={{
          width: "95%",
          marginHorizontal: 10,
          marginVertical: 8,
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#D3D3D3",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {item.note_title}
        </Text>
        <Text>{item.note_text}</Text>
      </View>
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
                paddingBottom: 5,
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
