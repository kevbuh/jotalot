import * as React from "react";
import { Image } from "react-native";

export default function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30, borderRadius: 6 }}
      source={require("../assets/NextNoteLogo.png")}
    />
  );
}
