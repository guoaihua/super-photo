import { View } from "@tarojs/components";
import CustomNavigator from "@/components/CustomNavigator";

import "./index.scss";

const Index = () => {
  return (
    <View className="wrapper">
      <CustomNavigator title="头像库" />
      <View>更多功能开发中</View>
    </View>
  );
};

export default Index;
