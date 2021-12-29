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
import { useDispatch, useSelector } from "react-redux";
import { userEmail, userToken } from "../redux/userSlice";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentNewPassword, setCurrentNewPassword] = useState("");

  const user_token = useSelector(userToken);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const ChangeUserPassword = () => {
    fetch("http://localhost:8000/auth/password_change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user_token,
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: currentNewPassword,
      }),
    })
      // .then((res) => {
      //   if (res.ok) {
      //     return res.json();
      //   } else {
      //     throw res.json();
      //   }
      // })
      .then((json) => {
        // console.log("Changing Password....");
        // console.log("Navigating to account....");
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
            Change Password{" "}
          </Text>
          <TextInput
            KeyboardAvoidingView
            style={{
              margin: 20,
              fontSize: 20,
            }}
            borderColor="#D3D3D3"
            placeholder="Current Password..."
            autoCapitalize="none"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TextInput
            KeyboardAvoidingView
            style={{
              margin: 20,
              fontSize: 20,
            }}
            borderColor="#D3D3D3"
            placeholder="New Password..."
            autoCapitalize="none"
            value={currentNewPassword}
            onChangeText={setCurrentNewPassword}
          />
          <Button
            title="Change Password"
            onPress={() => {
              ChangeUserPassword();
            }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
