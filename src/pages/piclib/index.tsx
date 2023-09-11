import React, { useCallback, useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import infoSvg from '@/images/icon-info.svg';
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import CustomNavigator from "@/components/CustomNavigator";
import dogsPng from './imgs/dogs.png'
import './index.scss'

const themesTitleMap = {
  dog: '修狗狗',
  cat: '猫猫头',
  cp: 'CP头像',
  panda: '圆滚滚熊猫',
  lineDog: '线条小狗',
  hungry: '好饿啊',
  crazy: '人哪有不疯的',
  intimidating: '看起来不好惹',
  y2k: '千禧年',
  lucky: '时来运转',
  mature: '成熟人士专用',
  qq: 'QQ怀旧头像'
}

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
                            title: themesTitleMap[theme] || theme,
                            data: themesMap[theme]
                          })
                        }
                      })
                  }}
                  >
                    <View className='title'>{themesTitleMap[theme] || theme}</View>
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
