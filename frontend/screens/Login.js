import { useNavigation } from "@react-navigation/native";
import { LogUserIn } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { ENV_DOMAIN } from "@env";
import {
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function LoginScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const LoginUser = () => {
    if (currentEmail.trim().length < 6 || currentPassword.trim().length < 6) {
      alert("Invalid Username/Password.");
    } else {
      fetch(`http://${ENV_DOMAIN}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentEmail.trim(),
          password: currentPassword.trim(),
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
          dispatch(
            LogUserIn({
              email: json.email,
              authToken: json.auth_token,
              firstName: json.first_name,
              lastName: json.last_name,
            })
          );
        })
        .catch((error) => {
          console.log("error", error);
          alert("Invalid Username/Password.");
        });
    }
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
            Sign In{" "}
          </Text>

          <TextInput
            KeyboardAvoidingView
            style={styles.input}
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
            style={styles.input}
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
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold" }}>Sign In</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 20,
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 20,
    fontSize: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    width: "80%",
  },
  button: {
    paddingHorizontal: 5,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#DDDDDD",
    width: "80%",
    borderRadius: 10,
    marginVertical: 10,
  },
});
