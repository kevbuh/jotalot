import React, { useState } from "react";
import {
  Button,
  ScrollView,
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
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            // flex: 1,
            justifyContent: "center",
            paddingVertical: 100,
          }}
        >
          <Text
            style={{
              margin: 20,
              fontSize: 20,
              fontWeight: "bold",
              borderBottomWidth: 2,
            }}
          >
            Login{" "}
          </Text>
          <Button
            title="Need to register? Click here"
            onPress={() => {
              navigation.replace("Register");
            }}
          />
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
            title="Log In"
            onPress={() => {
              LoginUser();
            }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
