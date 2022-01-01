import React from "react";
import LottieView from "lottie-react-native";

export default class LottieAvatarIcon extends React.Component {
  render() {
    return (
      <LottieView
        source={require("../assets/lottie/lf30_editor_bkwgorai.json")}
        autoPlay
        loop={false}
      />
    );
  }
}
