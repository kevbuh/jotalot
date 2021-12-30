import React from "react";
import LottieView from "lottie-react-native";

export default class LottieAvatarIcon extends React.Component {
  render() {
    return (
      <LottieView
        source={require("../assets/79638-avatar-icon.json")}
        autoPlay
        loop={false}
      />
    );
  }
}
