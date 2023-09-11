import {
    View,
    Text,
    Image,
    ScrollView,
    Loading,
    Button,
  } from "@tarojs/components";
import { LocalStorageKey, ImageDomain} from '@/configs/index';
import Taro, { useLoad, useReachBottom } from "@tarojs/taro";
import { saveImage } from "@/libs/common"
import Disk from "@/images/disk.png";
import Star from '@/images/icon-star-stroke.svg';
import './index.scss'

const OperateImage = ({imageSrc, originSrc, onCancel}) => {
    console.log(imageSrc);
    if(!imageSrc){
      return
    }
    return (
      <View className='image-container'>
        <View className='popup' onClick={(e)=>{
        e.stopPropagation()
        onCancel()
      }}></View>
        <View className='image-box'>
        <Image src={imageSrc}></Image>
        <View
          className='create-img'
          onClick={() => {
            // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
            Taro.getSetting({
              success: function (res1) {
                if (!res1.authSetting["scope.writePhotosAlbum"]) {
                  Taro.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function () {
                      saveImage(imageSrc);
                    },
                  });
                } else {
                  saveImage(imageSrc);
                }
              },
              fail: function (err) {
                console.log(err);
              },
            });
          }}
        >
          <Image src={Disk} /> 保存至相册
        </View>
        <View className='footer'>
          <Button onClick={()=>{
            Taro.navigateTo({
              url: `/pages/photo/index?imagePath=${imageSrc}`, 
            })
          }}
          >去添加挂件</Button>
          <Button onClick={()=>{
            //收藏
            const localImgList = Taro.getStorageSync(LocalStorageKey) || []
            if(localImgList.find((item)=>item === imageSrc)){
              console.log('cancel')
            }else {
              localImgList.push(originSrc)
              Taro.setStorageSync(LocalStorageKey, localImgList)
            }
          }}><Image src={Star}></Image></Button>
        </View>
        </View>

      </View>
    );
  };
export default OperateImage