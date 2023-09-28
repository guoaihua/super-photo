import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import Taro, { useShareAppMessage, useShareTimeline } from "@tarojs/taro";
import CustomNavigator from "@/components/CustomNavigator/index";
import nd_banner from "@/images/activity/banner_nd.png";
import panda_banner from '@/images/activity/banner_panda.png'
import { useShareImage } from "@/hooks/index";
import { useEffect } from "react";
import "./index.scss";
import photo from "./imgs/photo.png";
import photo_top from "./imgs/photo_top.png";
import photo_bottom from "./imgs/photo_bottom.png";
// import photo_top_2 from './imgs/photo_top_2.png'
// import photo_bottom_2 from './imgs/photo_bottom_2.png'
// import ball from './imgs/icon-crystalBall.svg'
import star from "../../images/icon-shootingStar.svg";


const activityList = [
  {
    url: "../page101/index",
    bannerImage: nd_banner,
  },
  // {
  //   url: "../page101/index",
  //   bannerImage: panda_banner,
  // },
];

const Index = () => {

  const handleShare = () => {
    return {
      title: '给头像换新颖',
      path: "/pages/index/index",
      imageUrl: "https://zm-1253465948.cos.ap-nanjing.myqcloud.com/static/photo/share_common.png"
    }
  }
  useShareAppMessage(handleShare)
  useShareTimeline(handleShare)

  return (
    <View className='wrapper'>
      <CustomNavigator title='头像工具' />
      <View className='components-warpper'>
        <View className='banner'>
          <Swiper
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots={activityList?.length > 1}
            autoplay
            activeClass='active-swiper-item'
          // nextMargin='50px'
          >
            {activityList.map((item, index) => (
              <SwiperItem key={index} className='swiper-item'>
                <Image
                  src={item?.bannerImage}
                  onClick={() => {
                    Taro.navigateTo({
                      url: item?.url,
                    });
                  }}
                />
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        {/* 卡片 */}
        <View
          className='components-card'
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/photo/index",
            });
          }}
        >
          <View className='item-left'>
            <Image src={photo} />
            <View className='tips'>
              <Image src={star}></Image>
              头像挂件
            </View>
          </View>
          <View className='item-right'>
            <Image className='list-item-top' src={photo_top} />
            <Image className='list-item-bottom' src={photo_bottom} />
          </View>
        </View>
        {/* <View className='components-card'>
          <View className='item-left'
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/personal/index'
              })
            }}
          >
            <Image src={photo} />
            <View className='tips'>
              <Image src={ball}></Image>
              卡通头像生成
            </View>
          </View>
          <View className='item-right'>
            <Image className='list-item-top' src={photo_top_2} />
            <Image className='list-item-bottom' src={photo_bottom_2} />
          </View>
        </View> */}
        {/* <View onClick={()=>{
             Taro.login({
              success: function (res) {
                if (res.code) {
                  console.log(res)
                  //发起网络请求
                  Taro.request({
                    method: 'GET',
                    url: 'http://192.168.50.128:9000/login',
                    data: {
                      code: res.code
                    },
                    success({data}){
                      Taro.setStorageSync('login_info', data)
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
             })
        }}>登录</View> */}
      </View>
    </View>
  );
};

export default Index;
