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

export default function LoginScreen() {
  const [currentUsername, setCurrentUsername] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [currentEmail, setCurrentEmail] = React.useState("");

  const navigation = useNavigation();

  // const [currentPassword2, setCurrentPassword2] = React.useState("");

  const LoginUser = () => {
    fetch("http://localhost:8000/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + "4bd97c6a3da72d83cee684617f43718811db4d88",
      },
      body: JSON.stringify({
        username: currentEmail,
        password: currentPassword,
        // email: currentEmail,
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
        console.log(json);
        console.log("LOGGED IN");
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
