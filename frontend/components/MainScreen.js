// import * as React from "react";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function MainScreen() {
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
        console.log(json);
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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={{ padding: 40, fontSize: 20, fontWeight: "bold" }}>
            Your Notes:
          </Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>
                {item.note_title}: {item.note_text}
              </Text>
            )}
          />
        </View>
      )}
    </View>
  );
}

export default MainScreen;
