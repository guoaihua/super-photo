import { View, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import CustomNavigator from "@/components/CustomNavigator";
import { LocalStorageKey, ImageDomain} from '@/configs/index';
import { useState } from 'react';
import OperateImage from "@/components/OperateImage";
import './index.scss'




export default function Collect() {
  const [imageList, setImageList] = useState([])
    // 当前选中的图片
    const [currentImage, setCurrentImage] = useState('')

  useLoad(() => {
    const data = Taro.getStorageSync(LocalStorageKey)
    if(data){
      setImageList(data)
    }
  })

  console.log(ImageDomain, imageList)

  return (
    <View className='wrapper'>
    <CustomNavigator showBackBtn title='收藏夹' />
    <View className='components-warper'>
        {
          imageList?.map((item, index)=> <Image src={ImageDomain + item} key={index} fadeIn onClick={()=>{
            setCurrentImage(item)
          }}></Image>)
        }
    </View>
    {/* <OperateImage imageSrc={currentImage} originSrc={photoList[activeIndex]} onCancel={()=>{
        setCurrentImage('')
      }}/> */}
    </View>
  )
}
