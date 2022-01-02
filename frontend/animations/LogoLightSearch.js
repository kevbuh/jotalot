import React from "react";
import LottieView from "lottie-react-native";

export default class LottieLightSearch extends React.Component {
  render() {
    return (
      <LottieView
        source={require("../assets/lottie/lf30_editor_jahlcdnf.json")}
        autoPlay
        loop={false}
      />
    );
  }
}
