import React, { useCallback, useState } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import logo from "./hook.png";

import './index.scss'

const Index = () => {
  const [userInfo, setUserInfo] = useState<{
    avatarUrl: string
  }>()
  console.log(userInfo)
  return (
    <View className='wrapper'>
      { userInfo?.avatarUrl && <Image className='logo' src={userInfo?.avatarUrl} /> }
      <Button className='avatar-wrapper' open-type='chooseAvatar'onChooseAvatar={(e)=>{
           const { avatarUrl } = e.detail
           console.log(e)
           setUserInfo({
            avatarUrl
           })
      }}
      >
        选择头像信息
      </Button>
    </View>
  );
};

export default Index;
