import React, { useEffect } from "react";
import {
  Button,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { LogUserIn } from "../redux/userSlice";

export default function LoginScreen() {
  const [currentUsername, setCurrentUsername] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [currentEmail, setCurrentEmail] = React.useState("");

  const navigation = useNavigation();
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  // const [currentPassword2, setCurrentPassword2] = React.useState("");
  // Authorization: "Token " + "4bd97c6a3da72d83cee684617f43718811db4d88",

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
      // .then((response) => {
      //   response.json();
      // })
      // .then((json) => {
      //   if (json.msg === "success") {
      //     // dispatch(LogUserIn(email: currentEmail, ))
      //     console.log("*******--->", json);
      //   }
      // })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then((json) => {
        console.log("********---->", json);
        dispatch(LogUserIn({ email: json.email, authToken: json.auth_token }));
        console.log("Navigating to account....");
        navigation.navigate("Account");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView>
        <View style={{ height: "100%", width: "100%", alignItems: "center" }}>
          {/* <TextInput
            style={{
              margin: 20,
              fontSize: 20,
            }}
            placeholder="Username"
            autoCapitalize="none"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          /> */}
          <TextInput
            KeyboardAvoidingView
            style={{
              margin: 20,
              fontSize: 20,
            }}
            borderColor="#D3D3D3"
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
            }}
            borderColor="#D3D3D3"
            placeholder="Password"
            autoCapitalize="none"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <Button
            title="Submit"
            onPress={() => {
              LoginUser();
              // navigation.navigate("Untitled Note");
            }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
