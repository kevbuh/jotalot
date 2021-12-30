import React from "react";
import {
  TouchableOpacity,
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
  const [currentFirstName, setCurrentFirstName] = React.useState("");
  const [currentLastName, setCurrentLastName] = React.useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const RegisterUser = () => {
    fetch(`http://localhost:8000/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: currentEmail,
        password: currentPassword,
        first_name: currentFirstName,
        last_name: currentLastName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          // console.log("res.json() was ok -> returned json");
          return res.json();
        } else {
          // console.log("res.json() wasn't ok");
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
        // navigation.navigate("Untitled Notes");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {/* <ScrollView> */}
      <View
        style={{
          height: "85%",
          // width: "100%",
          // alignItems: "center",
          // flex: 1,
          justifyContent: "center",
          // paddingVertical: 100,
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
            Sign Up{" "}
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
            placeholder="First Name"
            autoCapitalize="none"
            value={currentFirstName}
            onChangeText={setCurrentFirstName}
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
            placeholder="Last Name"
            autoCapitalize="none"
            value={currentLastName}
            onChangeText={setCurrentLastName}
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
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
              width: "80%",
            }}
            placeholder="Password"
            autoCapitalize="none"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            RegisterUser();
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
          <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 20,
            // marginRight: 40,
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
      {/* </ScrollView> */}
    </TouchableWithoutFeedback>
    // <TouchableWithoutFeedback
    //   onPress={() => {
    //     Keyboard.dismiss();
    //   }}
    // >
    //   <ScrollView>
    //     <View
    //       style={{
    //         height: "100%",
    //         width: "100%",
    //         alignItems: "center",
    //         flex: 1,
    //         justifyContent: "center",
    //         paddingVertical: 100,
    //       }}
    //     >
    //       <Text
    //         style={{
    //           margin: 20,
    //           fontSize: 20,
    //           fontWeight: "bold",
    //           borderBottomWidth: 2,
    //         }}
    //       >
    //         Register{" "}
    //       </Text>
    //       <Button
    //         title="I have an account/ Sign In"
    //         onPress={() => {
    //           navigation.replace("Login");
    //         }}
    //       />
    //       <TextInput
    //         KeyboardAvoidingView
    //         style={{
    //           margin: 20,
    //           fontSize: 20,
    //           borderBottomWidth: 2,
    //         }}
    //         borderColor="#D3D3D3"
    //         autoCapitalize="none"
    //         textContentType="emailAddress"
    //         keyboardType="email-address"
    //         autoCompleteType="email"
    //         placeholder="Email"
    //         blurOnSubmit={false}
    //         value={currentEmail}
    //         onChangeText={setCurrentEmail}
    //       />
    //       <TextInput
    //         KeyboardAvoidingView
    //         style={{
    //           margin: 20,
    //           fontSize: 20,
    //           borderBottomWidth: 2,
    //         }}
    //         borderColor="#D3D3D3"
    //         placeholder="Password"
    //         secureTextEntry={true}
    //         autoCapitalize="none"
    //         value={currentPassword}
    //         onChangeText={setCurrentPassword}
    //       />

    //       <Button
    //         title="Register"
    //         onPress={() => {
    //           RegisterUser();
    //         }}
    //       />
    //     </View>
    //   </ScrollView>
    // </TouchableWithoutFeedback>
  );
}
