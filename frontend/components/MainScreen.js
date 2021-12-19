// import * as React from "react";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function MainScreen({ navigation }) {
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

  return (
    <ScrollView>
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
              // justifyContent: "center",
              // alignContent: "center",
              // textAlign: "center",
            }}
          >
            Notes:
          </Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text
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
                onPress={() => {
                  navigation.navigate("Add a note");
                }}
              >
                {item.note_title}: {item.note_text}
              </Text>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

export default MainScreen;
