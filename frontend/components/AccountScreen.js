import * as React from "react";
import { Button, StyleSheet, Text, View, Switch } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function AccountScreen() {
  //  useEffect(() => {
  //    if (currentNote.length > 0 && currentTitle.length > 0) {
  //      setPostCurrentNote(true);
  //    }
  //  }, [currentNote, currentTitle]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Account</Text>
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
