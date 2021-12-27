import React, { useEffect } from "react";
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

export default function RegisterScreen() {
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [currentPassword2, setCurrentPassword2] = React.useState("");

  const navigation = useNavigation();

  const RegisterUser = () => {
    fetch("http://192.168.0.253:8000/auth/register", {
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
      // .then((response) => console.log(response));
      .then((json) => {
        console.log(json);
        console.log("REGISTERED USER");
        navigation.navigate("Account");
      })
      // .then((json) => {
      //   //alert(res.message);
      //   if (json.auth_token) {
      //     // AsyncStorage.setItem("user", res.user);
      //     navigation.navigate("Account");
      //   }
      //   // else {
      //   //   alert(res.message);
      //   // }
      // })
      // .done();
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
          {/* <TextInput
            KeyboardAvoidingView
            style={{
              margin: 20,
              fontSize: 20,
              borderBottomWidth: 2,
            }}
            borderColor="#D3D3D3"
            placeholder="Re-enter password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={currentPassword2}
            onChangeText={setCurrentPassword2}
          /> */}
          <Button
            title="Submit"
            onPress={() => {
              RegisterUser();
              // navigation.navigate("Untitled Note");
            }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
