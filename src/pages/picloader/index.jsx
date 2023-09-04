import { View, Text, Image} from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useEffect, useState } from 'react';
import CustomNavigator from "@/components/CustomNavigator";

import './index.scss'

// 默认拉取的次数
const parallelCount = 6;
const timeOut = 30000;
const targetURL = "https://ziming.online/dd-photo-img"
export default function Picloader(opts) {
  const [title, setTitle] = useState('')
  // 原始的库
  const [photoList, setPhotoList] = useState([])
  // 已经缓存的图片资源
  const [cachedImg, setCacheImg] = useState([])

  useLoad(() => {
    const pages = Taro.getCurrentPages();
    const current = pages[pages.length - 1];
    const eventChannel = current.getOpenerEventChannel();
    // 接受页面发送过来的数据
    eventChannel.on('sendPicLibInfo',(res)=>{
      setTitle(res?.title)
      setPhotoList(res?.data)

      // 先拉取一次数据
      pullImage(res?.data.slice(0,parallelCount))
    })
  })


  const pullImage = (list)=>{

   const imageRequestQueue =  list?.map(item=> new Promise((resolve, reject)=>Taro.downloadFile({url: targetURL+ item, timeout: timeOut ,success(res){resolve(res?.tempFilePath)}, fail(res){reject(res)}})))

        Promise.all(imageRequestQueue).then((res)=>{
          console.log(res)
          setCacheImg(res)
        })
  }







  return (
    <View className='picloader'>
       <CustomNavigator title={title} showBackBtn />
       <View className='components-warper'>
          {
            cachedImg?.length > 0 && cachedImg.map((item, index)=><Image key={index} src={item} style={{
              width: 75,
              height: 75
            }}
            ></Image>)
          }
       </View>
    </View>
  )
}
