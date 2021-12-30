import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
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
  const user_token = useSelector(userToken);
  const navigation = useNavigation();

  const [searchField, setSearchField] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* <View>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            marginBottom: 5,
            borderBottomWidth: 2,
            width: "90%",
            borderColor: "#dddddd",
          }}
        >
          Search
        </Text>
      </View> */}
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
            alert("Cancel!");
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
    </ScrollView>
  );
}
