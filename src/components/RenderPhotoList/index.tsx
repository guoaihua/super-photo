import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
} from "@tarojs/components";
import { LocalStorageKey, ImageDomain } from '@/configs/index';
import Taro from "@tarojs/taro";
import { saveImage } from "@/libs/common"
import Disk from "@/images/disk.png";
import Star from '@/images/icon-star-stroke.svg';
import StarActive from "@/images/icon-star-filled.svg"
import { useEffect, useState } from "react";

import './index.scss'

const OperateImage = ({ imageSrc, originSrc, onCancel, onLocalListChange }) => {
  const [localImgList, setLocalImgList] = useState([])
  console.log("localImgList",localImgList);

  useEffect(() => {
    const tempImgList = Taro.getStorageSync(LocalStorageKey)
    if (tempImgList && Array.isArray(tempImgList)) {
      setLocalImgList(tempImgList as [])
    }
  }, [])

  const toggleLocalImage = () => {
    const index = Taro.getStorageSync(LocalStorageKey).findIndex((item) => item === originSrc)
    if (index > -1) {
      localImgList.splice(index, 1)
    } else {
      localImgList.push(originSrc)
    }
    onLocalListChange && onLocalListChange(imageSrc)
    setLocalImgList([...localImgList])
    Taro.setStorageSync(LocalStorageKey, localImgList)
  }


  if (!imageSrc) {
    return null
  }
  return (
    <View className='image-container'>
      <View className='popup' onClick={(e) => {
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
          <Button onClick={() => {
            Taro.navigateTo({
              url: `/pages/photo/index?imagePath=${imageSrc}`,
            })
          }}
          >去添加挂件</Button>
          <Button onClick={toggleLocalImage}><Image src={localImgList?.findIndex((item) => item === originSrc) > -1 ? StarActive : Star}></Image></Button>
        </View>
      </View>

    </View>
  );
};

// 默认拉取的次数
const parallelCount = 8;
const timeOut = 30000;

const RenderPhotoList = (props) => {
  const { photoList, isCollect } = props
  const [showLoading, setShowLoading] = useState(false);
  // 已经缓存的图片资源
  const [cachedImg, setCacheImg] = useState([]);
  const [showReachBottom, setShowReachBottom] = useState(false);

  // 当前选中的图片
  const [currentImage, setCurrentImage] = useState('')

  const [activeIndex, setActiveIndex] = useState(0)

  // 待删除的缓存index,取消勾选不会直接删除缓存图片，而是做隐藏
  const [rmListIndex, setRmListIndex] = useState<number[]>([])

  useEffect(() => {
    // 无任何缓存数据时m,先拉取一次数据
    if (cachedImg?.length > 0) return
    pullImage(photoList.slice(0, parallelCount));
  }, [photoList])



  const pullImage = (list) => {
    setShowLoading(true);
    const imageRequestQueue = list?.map(
      (item) =>
        new Promise((resolve, reject) =>
          Taro.downloadFile({
            url: ImageDomain + item,
            timeout: timeOut,
            success(res) {
              resolve(res?.tempFilePath);
            },
            fail(res) {
              reject(res);
            },
          })
        )
    );
    Promise.all(imageRequestQueue).then((data) => {
      setCacheImg(cachedImg.concat(data));
      setShowLoading(false);
    });
  };

  console.log("rmListIndex", rmListIndex)

  return (
    <View className='scroll-wrapper'>
      {
        cachedImg.length === rmListIndex.length && isCollect && <Text style={{
          position: 'absolute',
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }} onClick={() => {
          // Taro.navigateTo({
          //   url: '/pages/piclib/index',
          // })
        }}>暂无收藏</Text>
      }
      <ScrollView
        className='components-warper'
        scrollY
        scrollWithAnimation
        onScrollToLower={() => {
          // 加载的时候，禁止出发事件
          if (showLoading) {
            return false;
          }
          console.log("到达底部，开始加载中");
          const currentIndex = cachedImg.length - 1;
          const targetList = photoList.slice(
            currentIndex,
            currentIndex + parallelCount
          ); // 每次从缓存的index往后找parallelCount个
          if (targetList.length <= 0) {
            setShowReachBottom(true);
            return console.log("到底了，没有更多了");
          }
          pullImage(targetList);
        }}
        lowerThreshold={100}
        enableFlex
      >
        {cachedImg?.length > 0 &&
          cachedImg.map((item, index) => {
            
         return  (
            <Image style={{
              display: !rmListIndex.includes(index) ? 'inline-block' : 'none'
            }} key={index} src={item} fadeIn onClick={() => {
              setCurrentImage(item)
              setActiveIndex(index)
            }}
            ></Image>
          )
          }
          )}
        {showLoading && (
          <Button style={{ border: "none" }} plain loading></Button>
        )}
        {showReachBottom && <View className='reach-bottom'>已经到底了哦</View>}
      </ScrollView>

      <OperateImage imageSrc={currentImage} originSrc={photoList[activeIndex]} onCancel={() => {
        setCurrentImage('')
      }} onLocalListChange={isCollect ? (imageSrc) => {
        const index = cachedImg.findIndex(item=> item === imageSrc)
        setRmListIndex([...rmListIndex.concat(index)])
        setCurrentImage('')
      } : null} />

    </View>)
}



export default RenderPhotoList