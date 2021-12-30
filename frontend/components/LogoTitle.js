import * as React from "react";
import { Image } from "react-native";

export default function LogoTitle() {
  return (
    <Image
      style={{
        width: 40,
        height: 40,
        //  borderRadius: 6, borderWidth: 2
      }}
      source={require("../assets/nnclear.png")}
    />
  );
}
