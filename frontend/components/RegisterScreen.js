import React from "react";
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

export default function RegisterScreen() {
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const RegisterUser = () => {
    fetch("http://localhost:8000/auth/register", {
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
          console.log("res.json() was ok -> returned json");
          return res.json();
        } else {
          console.log("res.json() wasn't ok");
          throw res.json();
        }
      })
      .then((json) => {
        console.log(json);
        dispatch(LogUserIn({ email: json.email, authToken: json.auth_token }));
        console.log("REGISTERED USER");
        navigation.navigate("Untitled Notes");
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
            flex: 1,
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
            Register{" "}
          </Text>
          <Button
            title="Need to login? Click here"
            onPress={() => {
              navigation.replace("Login");
            }}
          />
          <TextInput
            KeyboardAvoidingView
            style={{
              margin: 20,
              fontSize: 20,
              borderBottomWidth: 2,
            }}
            borderColor="#D3D3D3"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCompleteType="email"
            placeholder="Email"
            blurOnSubmit={false}
            value={currentEmail}
            onChangeText={setCurrentEmail}
          />
          <TextInput
            KeyboardAvoidingView
            style={{
              margin: 20,
              fontSize: 20,
              borderBottomWidth: 2,
            }}
            borderColor="#D3D3D3"
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <Button
            title="Register"
            onPress={() => {
              RegisterUser();
            }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
