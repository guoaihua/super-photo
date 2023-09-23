import { View, Image,Button} from "@tarojs/components";
import Taro,{useShareAppMessage, useShareTimeline} from "@tarojs/taro";
import CustomNavigator from "@/components/CustomNavigator";
import collectIcon from "@/images/icon-folder.svg"
import pizzaIcon from '@/images/icon-pizza.svg'
import ArrowRightIcon from "@/images/icon-arrowRight.svg"
import ddToolPng from '@/images/icon-dingdongTool.png'
import linkOpenPng from '@/images/icon-linkOpen.svg'
import "./index.scss";

const Index = () => {

  const handleShare = () => {
    return {
      title: '给头像换新颖',
      path: "/pages/personal/index",
      imageUrl: "https://zm-1253465948.cos.ap-nanjing.myqcloud.com/static/photo/share_common.png"
    }
  }
  useShareAppMessage(handleShare)
  useShareTimeline(handleShare)

  return (
    <View className='wrapper'>
      <CustomNavigator title='个人中心' />
      <View className='components-warper'>
        <View className='collect' onClick={() => {
          Taro.navigateTo({
            url: '/pages/collect/index'
          })
        }}>
          <Image src={collectIcon}></Image>
          收藏夹
        </View>
        <View className='collect' onClick={() => {
          Taro.navigateTo({
            url: '/pages/activity/index'
          })
        }}>
          <Image src={pizzaIcon}></Image>
          活动页
        </View>
        <View className='personal-info'>
          <View onClick={()=>{
            Taro.navigateTo({
              url: '/pages/about/index'
            })
          }}>关于<Image src={ArrowRightIcon}></Image></View>
          {/* <Button  className='feedback' openType="feedback">建议&反馈 <Image src={ArrowRightIcon}></Image></Button> */}
          <View onClick={()=>{
            Taro.navigateToMiniProgram({
              appId: 'wxcda8f0f389481b34',
              path: 'pages/index/index',
              success(res) {
                // 打开成功
              }
            })
          }}> <View className='dd-tips'> <Image src={ddToolPng} />叮咚决策器</View> <Image src={linkOpenPng} /></View>
        </View>
      </View>
    </View>
  );
};

export default Index;
