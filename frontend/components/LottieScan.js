import React from "react";
import LottieView from "lottie-react-native";

export default class LottieScanning extends React.Component {
  render() {
    return (
      <LottieView
        source={require("../assets/4117-search-history-icon.json")}
        autoPlay
        loop={false}
      />
    );
  }
}
