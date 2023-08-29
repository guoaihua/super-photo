import { View, Canvas, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";

import "./index.scss";

const Index = () => {
  const scrollStyle = {
    height: "150px",
  };

  const vStyleA = {
    height: "150px",
    backgroundColor: "rgb(26, 173, 25)",
    display: "",
  };
  const vStyleB = {
    height: "150px",
    backgroundColor: "rgb(39,130,215)",
  };
  const vStyleC = {
    height: "150px",
    backgroundColor: "rgb(241,241,241)",
    color: "#333",
  };
  return (
    <ScrollView
      className="scrollview"
      scrollX
      scrollWithAnimation
      style={scrollStyle}
    >
      <View style={vStyleA}>A</View>
      <View style={vStyleB}>B</View>
      <View style={vStyleC}>C</View>
    </ScrollView>
  );
};

export default Index;
