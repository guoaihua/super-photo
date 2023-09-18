
import {
  View,
  Text,
  Button,
  Image,
  Canvas,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import './index.scss';
import backBtn from './imgs/icon-back.png'
import { useRef, useState } from "react";

const CustomNavigator = (props) => {
  const title = props?.title
  const showBackBtn = props?.showBackBtn
  const customHeader = props?.customHeader
  const taroGlobalData = Taro.getApp().$app.taroGlobalData
  const [showPrivacy, setShowPrivacy] = useState(true)
  const privacyRef = useRef()

  const renderTitle = () => {
    return !showBackBtn ? (title ?? '头像工具') : (
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <Image src={customHeader || backBtn} className={customHeader ? 'custom-header' : ''} style={customHeader ? '' : { width: "24px", height: "24px", marginLeft: '15px', position: 'absolute' }} onClick={() => {
          // 兼容下分享过来的页面
          Taro.navigateBack({
            fail() {
              // 失败的场景说明为分享过去的页面，此时自动切换到主页
              Taro.switchTab({
               url: '/pages/index/index'
              })
            }
          })
        }} />
        <View className='other' style={{ textAlign: 'center', width: '100%' }}>
          <Text>{title}</Text>
        </View>
      </View>
    )
  }


  return (
    <View className='custom-navigator' style={{
      height: taroGlobalData.navBarHeight,
      lineHeight: taroGlobalData.navBarHeight + 'px',
      paddingTop: taroGlobalData.statusBarHeight,
      background: customHeader ? '' : '#FFEEBF'
    }}
    >
      {renderTitle()}
    </View>

  )
}
export default CustomNavigator
