import React, { useEffect, useState } from "react";

import { Button, StyleSheet, Text, View, Switch } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function AccountScreen({ route, navigation }) {
  //  useEffect(() => {
  //    if (currentNote.length > 0 && currentTitle.length > 0) {
  //      setPostCurrentNote(true);
  //    }
  //  }, [currentNote, currentTitle]);
  // const { user } = route.params;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState([]);
  const GetUser = () => {
    fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "titi@titi.com",
        password: "titipassword54",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setIsAuthenticated(true);
        console.log(data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    console.log("Going to get user!");
    GetUser();
    console.log("Got user!");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Account</Text>
      {isAuthenticated ? (
        <Text>{userData.email}</Text>
      ) : (
        <Text>Not authenticated</Text>
      )}
      {/* <Text>Email: {JSON.stringify(user)}</Text> */}
      <Text style={{ marginVertical: 10 }}>Mobile push notifications</Text>
      <Switch />
      <Text style={{ marginVertical: 10 }}>Email notifications</Text>
      <Switch />
      <Text style={{ fontSize: 20, marginVertical: 10 }}>General</Text>
      <Button
        title="Flow"
        onPress={() => {
          alert("Flow!");
        }}
      />
      <Button
        title="Appearance"
        onPress={() => {
          alert("You changed the Appearance!");
        }}
      />
      <Button
        title="Change Password"
        onPress={() => {
          alert("You pressed change password!");
        }}
      />
      <Button
        title="Log Out"
        onPress={() => {
          alert("You logged out!");
        }}
      />
    </View>
  );
}
