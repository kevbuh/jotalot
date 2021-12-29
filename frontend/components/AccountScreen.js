import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { userEmail, userToken } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { LogUserOut } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingLeft: 40,
    paddingTop: 40,
  },
});

export default function AccountScreen() {
  const user_email = useSelector(userEmail);
  const user_token = useSelector(userToken);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const UserLogout = () => {
    fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
      // body: JSON.stringify({
      //   title: currentTitle,
      //   text: currentNote,
      // }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then((json) => {
        console.log("********---->", json);
        console.log("Logging User Out....");
        dispatch(LogUserOut());
        console.log("Success, navigating to login....");
        navigation.navigate("Login");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>Account</Text>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>{user_email}</Text>
      </View>
      {/* <Text>{user_token}</Text> */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
        Notifications
      </Text>
      <Text style={{ marginVertical: 10 }}>Mobile push notifications</Text>
      <Switch />
      <Text style={{ marginVertical: 10 }}>Email notifications</Text>
      <Switch />
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          Manage Your Data
        </Text>
        <Text style={{ marginTop: 10 }}>
          We save and use your data anonymously
        </Text>
        <Text>to give the best experience.</Text>
        <Text style={{ marginTop: 5 }}>You can turn it off anytime: </Text>
        <Switch style={{ marginTop: 10 }} />
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          General
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert("Flow!");
          }}
          style={{
            paddingHorizontal: 5,
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#DDDDDD",
            width: "30%",
            borderRadius: 10,
            marginVertical: 7,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Flow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("You changed the Appearance!");
          }}
          style={{
            paddingHorizontal: 5,
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#DDDDDD",
            width: "30%",
            borderRadius: 10,
            marginVertical: 7,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Appearance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChangePassword");
          }}
          style={{
            paddingHorizontal: 5,
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#DDDDDD",

            width: "30%",
            borderRadius: 10,
            marginVertical: 7,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            UserLogout();
          }}
          style={{
            paddingHorizontal: 5,
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#DDDDDD",
            width: "30%",
            borderRadius: 10,
            marginTop: 7,
            marginBottom: 100,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
