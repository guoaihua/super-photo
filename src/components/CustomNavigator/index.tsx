
import {
    View,
    Text,
    Button,
    Image,
    Canvas,
    Swiper,
    SwiperItem,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.scss';
import backBtn from './imgs/icon-back.png'

const CustomNavigator = (props) => {
    const title = props?.title
    const showBackBtn = props?.showBackBtn
    const taroGlobalData = Taro.getApp().$app.taroGlobalData
    console.log(taroGlobalData)

    return (
        <View className="custom-navigator" style={{
            height: taroGlobalData.navBarHeight,
            lineHeight: taroGlobalData.navBarHeight + 'px',
            paddingTop: taroGlobalData.statusBarHeight,
        }}>

            {!showBackBtn ? (title ?? '头像工具') : (
                <View style={{display: 'flex', alignItems: 'center'}}>
                    <Image src={backBtn} style={{ width: "24px", height: "24px", marginLeft: '15px',position: 'absolute'}} onClick={()=>{ Taro.navigateBack()}} />
                    <View style={{ textAlign: 'center', width: '100%'}}>
                        <Text>{title}</Text>
                    </View>
                </View>
            )}

        </View>
    )
}
export default CustomNavigator