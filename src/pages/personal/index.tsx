import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import CustomNavigator from "@/components/CustomNavigator";
import collectIcon from "@/images/icon-folder.svg"
import ArrowRightIcon from "@/images/icon-arrowRight.svg"

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
        <View className='collect' onClick={() => {
          Taro.navigateTo({
            url: '/pages/collect/index'
          })
        }}>
          <Image src={collectIcon}></Image>
          活动页
        </View>
        <View className='personal-info'>
          <View onClick={()=>{
            Taro.navigateTo({
              url: '/pages/about/index'
            })
          }}>关于<Image src={ArrowRightIcon}></Image></View>
          <View>建议&反馈<Image src={ArrowRightIcon}></Image></View>
          <View>叮咚决策器<Image src={ArrowRightIcon}></Image></View>
        </View>
      </View>
    </View>
  );
};

export default Index;
