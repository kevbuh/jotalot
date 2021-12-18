import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function MainScreen({ route }) {
  // React.useEffect(() => {
  //   if (route.params?.note) {
  //     // do something here
  //   }
  // }, [route.params?.note]);

  return (
    <View style={styles.container}>
      {route.params?.note ? (
        <Text style={{ margin: 10 }}>{route.params?.note}</Text>
      ) : (
        <Text style={{ margin: 10 }}>No Current Notes</Text>
      )}
    </View>
  );
}

export default MainScreen;
