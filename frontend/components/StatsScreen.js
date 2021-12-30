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
import {
  userEmail,
  userToken,
  userFirstName,
  userLastName,
} from "../redux/userSlice";
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

export default function StatsScreen() {
  const user_email = useSelector(userEmail);
  const user_token = useSelector(userToken);
  const user_first_name = useSelector(userFirstName);
  const user_last_name = useSelector(userLastName);

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
        // console.log("********---->", json);
        // console.log("Logging User Out....");
        dispatch(LogUserOut());
        // console.log("Success, navigating to login....");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 35, marginRight: 6, fontWeight: "bold" }}>
            Statistics
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        Notes Created:
      </Text>
      <TouchableOpacity
        onPress={() => {
          alert("Flow!");
        }}
        style={{
          paddingHorizontal: 5,
          alignItems: "center",
          paddingVertical: 20,
          backgroundColor: "#DDDDDD",
          width: "50%",
          borderRadius: 10,
          marginVertical: 7,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            // , color: "#50e3c2"
          }}
        >
          235
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 10 }}>More than</Text>
        <Text style={{ fontWeight: "bold", fontSize: 10 }}>60% of users!</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        Days Spent Creating:
      </Text>
      <TouchableOpacity
        onPress={() => {
          alert("You changed the Appearance!");
        }}
        style={{
          paddingHorizontal: 5,
          alignItems: "center",
          paddingVertical: 30,
          backgroundColor: "#DDDDDD",
          width: "50%",
          borderRadius: 10,
          marginVertical: 7,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>10 days</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        AI suggestions accepted:
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Change Password");
        }}
        style={{
          paddingHorizontal: 5,
          alignItems: "center",
          paddingVertical: 20,
          backgroundColor: "#DDDDDD",
          width: "50%",
          borderRadius: 10,
          marginVertical: 7,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>94</Text>
        <Text style={{ fontWeight: "bold", fontSize: 10 }}>Looks like</Text>
        <Text style={{ fontWeight: "bold", fontSize: 10 }}>
          its helping you!
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
