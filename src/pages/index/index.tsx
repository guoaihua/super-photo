import { View, Image, Swiper, SwiperItem } from "@tarojs/components";
import Taro from "@tarojs/taro";
import CustomNavigator from "@/components/CustomNavigator/index";
import "./index.scss";
import photo from "./imgs/photo.png";
import photo_top from "./imgs/photo_top.png";
import photo_bottom from "./imgs/photo_bottom.png";
// import photo_top_2 from './imgs/photo_top_2.png'
// import photo_bottom_2 from './imgs/photo_bottom_2.png'
// import ball from './imgs/icon-crystalBall.svg'
import banner from "./imgs/banner_nd.png";
import star from "../../images/icon-shootingStar.svg";

const activityList = [
  {
    url: "../page101/index",
    bannerImage: banner,
  },
];

const Index = () => {
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
          >
            {activityList.map((item, index) => (
              <SwiperItem key={index}>
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
      </View>
    </View>
  );
};

export default Index;
