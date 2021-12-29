import React, { useState } from "react";
import {
  Button,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { LogUserIn } from "../redux/userSlice";

export default function LoginScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const LoginUser = () => {
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: currentEmail,
        password: currentPassword,
      }),
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
        dispatch(LogUserIn({ email: json.email, authToken: json.auth_token }));
        // console.log("Navigating to account....");
        // navigation.navigate("Untitled Notes");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {/* <ScrollView> */}
      <View
        style={{
          height: "85%",
          // width: "100%",
          // alignItems: "center",
          // flex: 1,
          justifyContent: "center",
          // paddingVertical: 100,
        }}
      >
        <View style={{ marginLeft: 20 }}>
          <Text
            style={{
              margin: 20,
              fontSize: 40,
              fontWeight: "bold",
              borderBottomWidth: 2,
            }}
          >
            Sign In{" "}
          </Text>

          <TextInput
            KeyboardAvoidingView
            style={{
              margin: 20,
              fontSize: 20,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
              width: "80%",
            }}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCompleteType="email"
            placeholder="Email"
            value={currentEmail}
            onChangeText={setCurrentEmail}
          />
          <TextInput
            KeyboardAvoidingView
            style={{
              margin: 20,
              fontSize: 20,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
              width: "80%",
            }}
            placeholder="Password"
            autoCapitalize="none"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            LoginUser();
          }}
          style={{
            paddingHorizontal: 5,
            alignSelf: "center",
            alignItems: "center",
            paddingVertical: 15,
            backgroundColor: "#DDDDDD",
            width: "80%",
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Sign In</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 20,
            // marginRight: 40,
          }}
        >
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Register");
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#E4007C" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
    </TouchableWithoutFeedback>
  );
}
