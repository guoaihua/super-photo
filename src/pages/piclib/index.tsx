import React, { useCallback, useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import infoSvg from '@/images/icon-info.svg';
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import CustomNavigator from "@/components/CustomNavigator";
import dogsPng from './imgs/dogs.png'
import './index.scss'

const Index = () => {
const [themesMap, setThemesMap] = useState({})
  useEffect(()=>{
    Taro.request({
      url: 'https://ziming.online/ddphoto/getPics',
      success: ({data})=>{
        console.log(data)
        setThemesMap(data?.themesMap)
      }
    })
  },[])

  return (
    <View className='wrapper'>
      <CustomNavigator title='头像库' />
      <View className='components-warper'>
        <View className='user-tips'>
            <Image src={infoSvg}></Image>头像收集于网络，仅供个人娱乐使用，请勿商业用途。
        </View>
        <View className='theme-card'>
            {
              Object.keys(themesMap)?.map((theme, index)=>{
                return (
                  <View key={index} onClick={()=>{
                      Taro.navigateTo({
                        url: '/pages/picloader/index?title=12313',
                        success(res){
                          res.eventChannel.emit('sendPicLibInfo', {
                            title: theme,
                            data: themesMap[theme]
                          })
                        }
                      })
                  }}
                  >
                    <View className='title'>{theme}</View>
                    <Image src={dogsPng}></Image>
                  </View>
                )
              })
            }
        </View>
      </View>
    </View>
  );
};

export default Index;
