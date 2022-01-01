import { useNavigation } from "@react-navigation/native";
import { userToken } from "../redux/userSlice";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from "react-native";

export default function ChangePasswordScreen() {
  const [currentNewPassword, setCurrentNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const user_token = useSelector(userToken);
  const navigation = useNavigation();

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
      .then(() => {
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
      <View
        style={{
          height: "85%",
          justifyContent: "center",
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
            Change Your Password{" "}
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
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
              width: "80%",
            }}
            borderColor="#D3D3D3"
            placeholder="New Password..."
            autoCapitalize="none"
            value={currentNewPassword}
            onChangeText={setCurrentNewPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            ChangeUserPassword();
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
          <Text style={{ fontWeight: "bold" }}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
