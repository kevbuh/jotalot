import React from "react";
import LottieView from "lottie-react-native";

export default class LottieGuyIcon extends React.Component {
  render() {
    return (
      <LottieView
        source={require("../assets/73810-business-idea-animation.json")}
        autoPlay
        // loop={false}
      />
    );
  }
}
