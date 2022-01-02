import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { LogUserOut } from "../redux/userSlice";
import { ENV_DOMAIN } from "@env";
import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import {
  userEmail,
  userToken,
  userFirstName,
  userLastName,
} from "../redux/userSlice";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 20,
  },
});

export default function AccountScreen() {
  const user_first_name = useSelector(userFirstName);
  const user_last_name = useSelector(userLastName);
  const user_email = useSelector(userEmail);
  const user_token = useSelector(userToken);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const UserLogout = () => {
    fetch(`http://${ENV_DOMAIN}/auth/logout`, {
      method: "POST",
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
      .then(() => {
        dispatch(LogUserOut());
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            marginBottom: 5,
            borderBottomWidth: 2,
            width: "90%",
            borderColor: "#dddddd",
          }}
        >
          Account
        </Text> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 35, marginRight: 6, fontWeight: "bold" }}>
            {user_first_name}
          </Text>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            {user_last_name}
          </Text>
        </View>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>{user_email}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
          Statistics
        </Text>
        <Text>View your statistics:</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Stats");
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
          <Text style={{ fontWeight: "bold" }}>Statistics</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        Appearance
      </Text>
      <Text style={{ marginVertical: 10 }}>Switch to dark mode?</Text>
      <Switch />
      <Text style={{ marginVertical: 10 }}>Customize theme & font:</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Customize Theme");
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
        <Text style={{ fontWeight: "bold" }}>Customize</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        Notifications
      </Text>
      <Text style={{ marginVertical: 10 }}>Mobile push notifications</Text>
      <Switch />
      <Text style={{ marginVertical: 10 }}>Email notifications</Text>
      <Switch />
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        Cloud Sync
      </Text>
      <Text style={{ marginVertical: 10 }}>Save your ideas in the cloud</Text>
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
            width: "60%",
            borderRadius: 10,
            marginVertical: 7,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Flow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Trash");
          }}
          style={{
            paddingHorizontal: 5,
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#DDDDDD",
            width: "60%",
            borderRadius: 10,
            marginVertical: 7,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Trash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("You clicked on the tutorial!");
          }}
          style={{
            paddingHorizontal: 5,
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#DDDDDD",
            width: "60%",
            borderRadius: 10,
            marginVertical: 7,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Tutorial</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Change Password");
          }}
          style={{
            paddingHorizontal: 5,
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#DDDDDD",

            width: "60%",
            borderRadius: 10,
            marginVertical: 7,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Change Password</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Feedback");
            }}
            style={{
              paddingHorizontal: 5,
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: "#DDDDDD",
              width: "60%",
              borderRadius: 10,
              marginVertical: 7,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Contact Us</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            UserLogout();
          }}
          style={{
            paddingHorizontal: 5,
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#DDDDDD",
            width: "60%",
            borderRadius: 10,
            marginTop: 7,
            // marginBottom: 100,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Review in App Store</Text>
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
            width: "60%",
            borderRadius: 10,
            marginTop: 7,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          paddingBottom: 100,
          marginTop: 30,
          marginRight: 40,
        }}
      >
        <Text>v.0.0.1</Text>
      </View>
    </ScrollView>
  );
}