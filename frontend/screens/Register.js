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

export default function RegisterScreen() {
  const [currentConfirmPassword, setCurrentConfirmPassword] = useState("");
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const RegisterUser = () => {
    if (currentEmail.trim().length < 6 || currentPassword.trim().length < 6) {
      alert("Username/Password must be at least 6 characters");
    } else if (currentFirstName.trim().length < 1) {
      alert("Must have a first name");
    } else if (currentLastName.trim().length < 1) {
      alert("Must have a last name");
    } else if (currentPassword != currentConfirmPassword) {
      alert("Passwords do not match.");
    } else {
      fetch(`http://${ENV_DOMAIN}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentEmail.trim(),
          password: currentPassword.trim(),
          first_name: currentFirstName.trim(),
          last_name: currentLastName.trim(),
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
          dispatch(
            LogUserIn({
              email: json.email,
              authToken: json.auth_token,
              firstName: json.first_name,
              lastName: json.last_name,
            })
          );
          console.log("REGISTERED USER");
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
          <Text style={styles.title}>Sign Up </Text>
          <TextInput
            KeyboardAvoidingView
            style={styles.input}
            placeholder="First Name"
            autoCapitalize="none"
            value={currentFirstName}
            onChangeText={setCurrentFirstName}
          />
          <TextInput
            KeyboardAvoidingView
            style={styles.input}
            placeholder="Last Name"
            autoCapitalize="none"
            value={currentLastName}
            onChangeText={setCurrentLastName}
          />
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
          <TextInput
            KeyboardAvoidingView
            style={styles.input}
            placeholder="Confirm Password"
            autoCapitalize="none"
            value={currentConfirmPassword}
            onChangeText={setCurrentConfirmPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            RegisterUser();
          }}
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <Text>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Login");
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#E4007C" }}>
              Sign In
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
  title: {
    margin: 20,
    fontSize: 40,
    fontWeight: "bold",
    borderBottomWidth: 2,
  },
});
