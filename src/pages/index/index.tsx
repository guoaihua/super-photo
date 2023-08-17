import React, { useCallback, useState } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from '@tarojs/taro'
import CustomNavigator from "../../components/CustomNavigator";
import './index.scss'
import photo from './imgs/photo.png'
import photo_top from './imgs/photo_top.png'
import photo_bottom from './imgs/photo_bottom.png'

const Index = () => {
  const taroGlobalData = Taro.getApp().$app.taroGlobalData

  const [userInfo, setUserInfo] = useState<{
    avatarUrl: string
  }>()
  console.log(userInfo)
  return (
    <View className='wrapper'>
      <CustomNavigator title='头像工具' />

      <View className="components-warpper">
        <View className="components-card">
          <View className="item-left"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/photo/index'
              })
            }}>
            <Image src={photo} />
          </View>
          <View className="item-right">
            <Image className="list-item-top" src={photo_top} />
            <Image className="list-item-bottom" src={photo_bottom} />
          </View>
        </View>
      </View>

    </View>
  );
};

export default Index;
