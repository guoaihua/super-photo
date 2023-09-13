import { View,Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import CustomNavigator from "@/components/CustomNavigator";
import s101Png from '@/images/activity/banner_nd.png'
import './index.scss'

export default function Activity() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='wrapper'>
      <CustomNavigator title='活动页' showBackBtn />
      <View className='components-warper'>
          <View className='title'> 2023 年活动</View>
          {
            [
              {
                url: '/pages/page101/index',
                imagePath: s101Png
              }
            ]?.map((item, index)=> (
              <View key={index} className='activity-list' onClick={()=>{
                Taro.navigateTo({
                  url: item?.url,
                })
              }}>
                <Image src={item?.imagePath}></Image>
              </View>
            ))
          }
      </View>
    </View>
  )
}
