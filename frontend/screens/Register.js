import { useNavigation, useTheme } from "@react-navigation/native";
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
  const { colors } = useTheme();

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
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            Sign Up{" "}
          </Text>
          <TextInput
            KeyboardAvoidingView
            style={[
              styles.input,
              {
                borderBottomColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="First Name"
            placeholderTextColor={colors.text}
            autoCapitalize="none"
            value={currentFirstName}
            onChangeText={setCurrentFirstName}
          />
          <TextInput
            KeyboardAvoidingView
            style={[
              styles.input,
              {
                borderBottomColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Last Name"
            placeholderTextColor={colors.text}
            autoCapitalize="none"
            value={currentLastName}
            onChangeText={setCurrentLastName}
          />
          <TextInput
            KeyboardAvoidingView
            style={[
              styles.input,
              {
                borderBottomColor: colors.border,
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCompleteType="email"
            placeholder="Email"
            placeholderTextColor={colors.text}
            value={currentEmail}
            onChangeText={setCurrentEmail}
          />
          <TextInput
            KeyboardAvoidingView
            style={[
              styles.input,
              {
                borderBottomColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor={colors.text}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TextInput
            KeyboardAvoidingView
            style={[
              styles.input,
              {
                borderBottomColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Confirm Password"
            autoCapitalize="none"
            placeholderTextColor={colors.text}
            value={currentConfirmPassword}
            onChangeText={setCurrentConfirmPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            RegisterUser();
          }}
          style={[
            styles.button,
            {
              backgroundColor: colors.cardBackground,
            },
          ]}
        >
          <Text style={{ fontWeight: "bold", color: colors.text }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: colors.text }}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Login");
            }}
          >
            <Text style={{ fontWeight: "bold", color: colors.primary }}>
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
    width: "80%",
  },
  button: {
    paddingHorizontal: 5,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 15,
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
