import React from "react";
import LottieView from "lottie-react-native";

export default class LottiePinkAvatarIcon extends React.Component {
  render() {
    return (
      <LottieView
        source={require("../assets/lottie/lf30_editor_gnweawgu.json")}
        autoPlay
        loop={false}
      />
    );
  }
}
