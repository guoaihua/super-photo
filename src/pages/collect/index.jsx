import { View, Image, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import CustomNavigator from "@/components/CustomNavigator";
import { LocalStorageKey } from '@/configs/index';
import { useEffect, useState } from 'react';
import RenderPhotoList from "@/components/RenderPhotoList";
import './index.scss'




export default function Collect() {
  // 原始的库
  const [photoList, setPhotoList] = useState([]);
  useLoad(() => {
    const data = Taro.getStorageSync(LocalStorageKey)
    if (data) {
      setPhotoList(data)
    }
  })

  return (
    <View className='wrapper'>
      <privacy-popup></privacy-popup>
      <CustomNavigator title='收藏夹' showBackBtn />
      <RenderPhotoList photoList={photoList} isCollect />
    </View>
  )
}
