import React, { useCallback, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import infoSvg from '@images/icon.svg';
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import CustomNavigator from "../../components/CustomNavigator";

import './index.scss'


const Index = () => {

  // useEffect(()=>{
  //   Taro.request({
  //     url: 'http://localhost:9000/getPics',
  //     success: (res)=>{
  //       console.log(res)
  //     }
  //   })
  // },[])

  return (
    <View className='wrapper'>
      <CustomNavigator title='头像库' />
      <View className='components-warper'>
        <View className='user-tips'>
           头像收集于网络，仅供个人娱乐使用，请勿商业用途。
        </View>
      </View>
    </View>
  );
};

export default Index;
