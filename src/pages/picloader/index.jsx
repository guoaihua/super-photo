import {
  View,
  Image,
  ScrollView,
  Button,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useState } from "react";
import CustomNavigator from "@/components/CustomNavigator";
import OperateImage from "@/components/OperateImage";
import {ImageDomain} from '@/configs/index';

import "./index.scss";

// 默认拉取的次数
const parallelCount = 8;
const timeOut = 30000;
export default function Picloader() {
  const [title, setTitle] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  // 原始的库
  const [photoList, setPhotoList] = useState([]);
  // 已经缓存的图片资源
  const [cachedImg, setCacheImg] = useState([]);
  const [showReachBottom, setShowReachBottom] = useState(false);

  // 当前选中的图片
  const [currentImage, setCurrentImage] = useState('')

  const [activeIndex, setActiveIndex] = useState()

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
      console.log(data);
      setCacheImg(cachedImg.concat(data));
      setShowLoading(false);
    });
  };

  return (
    <View className='wrapper'>
      <CustomNavigator title={title} showBackBtn />
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
              setActiveIndex(index)
            }}
            ></Image>
          ))}
        {showLoading && (
          <Button style={{ border: "none" }} plain loading></Button>
        )}
        {showReachBottom && <View className='reach-bottom'>已经到底了哦</View>}
      </ScrollView>

      <OperateImage imageSrc={currentImage} originSrc={photoList[activeIndex]} onCancel={()=>{
        setCurrentImage('')
      }}/>
    </View>
  );
}
