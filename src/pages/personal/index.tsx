import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import CustomNavigator from "@/components/CustomNavigator";
import collectIcon from "@/images/icon-folder.svg"

import "./index.scss";

const Index = () => {

  return (
    <View className='wrapper'>
      <CustomNavigator title='个人中心' />
      <View className='components-warper'>
        <View className='collect' onClick={() => {
          Taro.navigateTo({
            url: '/pages/collect/index'
          })
        }}>
          <Image src={collectIcon}></Image>
          收藏夹
        </View>
      </View>
    </View>
  );
};

export default Index;
