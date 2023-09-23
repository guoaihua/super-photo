import { useEffect, useState } from "react";
import Taro, { useShareAppMessage, useShareTimeline } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import infoSvg from '@/images/icon-info.svg';
import CustomNavigator from "@/components/CustomNavigator";
import catPng from '@/images/cover/cover-cat.png';
import cpPng from '@/images/cover/cover-cp.png';
import crazyPng from '@/images/cover/cover-crazy.png';
import dogPng from '@/images/cover/cover-dog.png';
import intimidatingPng from '@/images/cover/cover-intimidating.png';
import lineDogPng from '@/images/cover/cover-lineDog.png';
import luckyPng from '@/images/cover/cover-lucky.png';
import maturePng from '@/images/cover/cover-mature.png';
import pandaPng from "@/images/cover/cover-panda.png";
import qqPng from "@/images/cover/cover-qq.png";
import y2kPng from "@/images/cover/cover-y2k.png";
import hungryPng from "@/images/cover/cover-hungry.png";


import dogsPng from './imgs/dogs.png'
import './index.scss'


const themesTitleMap = {
  dog: {
    title: '修狗狗',
    img: dogPng
  },
  // dogs: {
  //   title: '线性小狗',
  //   img: lineDogPng
  // },
  cat: {
    title: '猫猫头',
    img: catPng
  },
  cp: {
    title: 'CP头像',
    img: cpPng,
  },
  panda: {
    title: '圆滚滚熊猫',
    img: pandaPng
  },
  lineDog: {
    title: '线条小狗',
    img: dogsPng
  },
  hungry: {
    title: '好饿啊',
    img: hungryPng
  },
  crazy: {
    title: '人哪有不疯的',
    img: crazyPng
  },
  intimidating: {
    title: '看起来不好惹',
    img: intimidatingPng
  },
  y2k: {
    title: '千禧年',
    img: y2kPng,
  },
  lucky: {
    title: '时来运转',
    img: luckyPng
  },
  mature: {
    title: '成熟人士专用',
    img: maturePng
  },
  qq: {
    title: 'QQ怀旧头像',
    img: qqPng
  },
}

const Index = () => {
  const [themesMap, setThemesMap] = useState({})
  useEffect(() => {
    console.log('开始发送请求')
    Taro.request({
      url: 'https://ziming.online/ddphoto/getPics',
      success: ({ data }) => {
        setThemesMap(data?.themesMap)
      },
      fail(err1){
        console.log(err1)
      },

    })
  }, [])


  const handleShare = () => {
    return {
      title: '给头像换新颖',
      path: "/pages/piclib/index",
      imageUrl: "https://zm-1253465948.cos.ap-nanjing.myqcloud.com/static/photo/share_common.png"
    }
  }
  useShareAppMessage(handleShare)
  useShareTimeline(handleShare)

  return (
    <View className='wrapper'>
      <CustomNavigator title='头像库' />
      <View className='components-warper'>
        <View className='user-tips'>
          <Image src={infoSvg}></Image>头像收集于网络，仅供个人娱乐使用，请勿商业用途。
        </View>
        <View className='theme-card'>
          {
            Object.keys(themesMap)?.map((theme, index) => {
              return (
                <View key={index}
                  style={{
                    marginRight: (Object.keys(themesMap)?.length % 2 > 0 && index === Object.keys(themesMap)?.length - 1) ? '178px' : '' // 单数列的最后一个元素特殊处理
                  }}
                  onClick={() => {
                    Taro.navigateTo({
                      url: '/pages/picloader/index?title=12313',
                      success(res) {
                        res.eventChannel.emit('sendPicLibInfo', {
                          title: themesTitleMap[theme]?.title || theme,
                          data: themesMap[theme]
                        })
                      }
                    })
                  }}
                >
                  <View className='title'>{themesTitleMap[theme]?.title || theme}</View>
                  <Image src={themesTitleMap[theme]?.img}></Image>
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
