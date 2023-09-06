import {
  View,
  Text,
  Image,
  ScrollView,
  Loading,
  Button,
} from "@tarojs/components";
import Taro, { useLoad, useReachBottom } from "@tarojs/taro";
import { useEffect, useState } from "react";
import CustomNavigator from "@/components/CustomNavigator";
import Disk from "@/images/disk.png";
import Star from '@/images/icon-star-stroke.svg'
import { saveImage } from "@/libs/common";
import "./index.scss";

// 默认拉取的次数
const parallelCount = 8;
const timeOut = 30000;
const targetURL = "https://ziming.online/dd-photo-img";
export default function Picloader(opts) {
  const [title, setTitle] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  // 原始的库
  const [photoList, setPhotoList] = useState([]);
  // 已经缓存的图片资源
  const [cachedImg, setCacheImg] = useState([]);
  const [showReachBottom, setShowReachBottom] = useState(false);

  // 当前选中的图片
  const [currentImage, setCurrentImage] = useState('')

  useLoad(() => {
    const pages = Taro.getCurrentPages();
    const current = pages[pages.length - 1];
    const eventChannel = current.getOpenerEventChannel();
    // 接受页面发送过来的数据
    eventChannel.on("sendPicLibInfo", (res) => {
      setTitle(res?.title);
      setPhotoList(res?.data);
      // 先拉取一次数据
      pullImage(res?.data.slice(0, parallelCount));
    });
  });

  const pullImage = (list) => {
    setShowLoading(true);
    const imageRequestQueue = list?.map(
      (item) =>
        new Promise((resolve, reject) =>
          Taro.downloadFile({
            url: targetURL + item,
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
      console.log(data);
      setCacheImg(cachedImg.concat(data));
      setShowLoading(false);
    });
  };

  const OperateImage = ({imageSrc}) => {
    console.log(imageSrc);
    if(!imageSrc){
      return
    }
    return (
      <View className='image-container'>
        <View className='popup' onClick={(e)=>{
        e.stopPropagation()
        setCurrentImage('')
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
              url: '/pages/photo/index'
            })
          }}
          >去添加挂件</Button>
          <Button><Image src={Star}></Image></Button>
        </View>
        </View>

      </View>
    );
  };

  return (
    <View className='wrapper'>
      <CustomNavigator title={title} showBackBtn />
      <ScrollView
        className='components-warper'
        scrollY
        scrollWithAnimation
        onScrollToLower={(e) => {
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
          console.log(targetList);
          pullImage(targetList);
        }}
        lowerThreshold={100}
        enableFlex
      >
        {cachedImg?.length > 0 &&
          cachedImg.map((item, index) => (
            <Image key={index} src={item} fadeIn onClick={() => {
              setCurrentImage(item)
            }}
            ></Image>
          ))}
        {showLoading && (
          <Button style={{ border: "none" }} plain loading></Button>
        )}
        {showReachBottom && <View className='reach-bottom'>已经到底了哦</View>}
      </ScrollView>

      <OperateImage imageSrc={currentImage} />
    </View>
  );
}
