import React, { useCallback, useState } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from '@tarojs/taro'

import './index.scss'


const Index = () => {
  const [userInfo, setUserInfo] = useState<{
    avatarUrl: string
  }>()
  console.log(userInfo)
  return (
    <View className='wrapper'>
        <Button onClick={()=>{
          Taro.navigateTo({
            url: '/pages/photo/index'
          })
        }}
        > 头像挂件</Button>
    </View>
  );
};

export default Index;
