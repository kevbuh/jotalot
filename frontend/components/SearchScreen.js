import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { userToken } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginLeft: 10,
    marginTop: 40,
  },
});

export default function SearchScreen() {
  const navigation = useNavigation();
  const user_token = useSelector(userToken);
  const [data, setData] = useState([]);

  const [searchField, setSearchField] = useState("");

  const searchNotes = () => {
    fetch(`http://localhost:8000/notes/search/?search=${searchField}`, {
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
        // console.log("Searching notes...", json);
        // setAreThereNotes(true);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    searchNotes();
  }, [searchField]);

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
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
          // backgroundColor: "#DDDDDD",
        }}
      >
        <TextInput
          KeyboardAvoidingView
          style={{
            fontSize: 20,
            paddingBottom: 4,
            paddingTop: 4,
            paddingLeft: 20,
            borderWidth: 1,
            borderColor: "#dddddd",
            width: "80%",
            borderRadius: 8,
            backgroundColor: "#DDDDDD",
          }}
          placeholder="Search..."
          autoCapitalize="none"
          value={searchField}
          onChangeText={setSearchField}
        />
        <TouchableOpacity
          onPress={() => {
            setSearchField("");
            navigation.navigate("Main");
          }}
          style={{
            alignSelf: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {data.length > 0 ? (
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 20,
              borderBottomWidth: 2,
              marginLeft: 20,
              width: "90%",
              borderColor: "#dddddd",
            }}
          >
            Search Results
          </Text>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => {
              return renderNotes(item);
            }}
          />
        </View>
      ) : (
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 5,
            marginTop: 20,
            marginLeft: 20,
            borderBottomWidth: 2,
            width: "90%",
            borderColor: "#dddddd",
          }}
        >
          No search results!
        </Text>
      )}
      {/* <TouchableOpacity
        onPress={() => {
          searchNotes();
        }}
        style={{
          alignSelf: "center",
          alignItems: "center",
          marginRight: 15,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 5,
            marginTop: 10,
            borderBottomWidth: 2,
            width: "90%",
            borderColor: "#dddddd",
          }}
        >
          Search
        </Text>
      </TouchableOpacity> */}
      {/* <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 5,
            marginTop: 10,
            borderBottomWidth: 2,
            width: "90%",
            borderColor: "#dddddd",
          }}
        >
          Type to find notes
        </Text>
      </View> */}
    </SafeAreaView>
  );
}
