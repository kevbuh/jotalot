import React from "react";
import LottieView from "lottie-react-native";

export default class LottieScanning extends React.Component {
  render() {
    return (
      <LottieView
        source={require("../assets/lf30_editor_iwskubgz.json")}
        autoPlay
        loop={false}
      />
    );
  }
}
