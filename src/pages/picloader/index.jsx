import {
  View,
} from "@tarojs/components";
import Taro, { useLoad, useShareAppMessage, useShareTimeline} from "@tarojs/taro";
import { useState } from "react";
import CustomNavigator from "@/components/CustomNavigator";
import RenderPhotoList from "@/components/RenderPhotoList";
import "./index.scss";

export default function Picloader() {
  const [title, setTitle] = useState("");
  // 原始的库
  const [photoList, setPhotoList] = useState([]);

  useLoad(() => {
    const pages = Taro.getCurrentPages();
    const current = pages[pages.length - 1];
    const eventChannel = current.getOpenerEventChannel();
    // 接受页面发送过来的数据
    eventChannel.on("sendPicLibInfo", (res) => {
      setTitle(res?.title);
      setPhotoList(res?.data);
    });
  });

  const handleShare = () => {
    return {
      title: '给头像换新颖',
      path: "/pages/picloader/index",
      imageUrl: "https://zm-1253465948.cos.ap-nanjing.myqcloud.com/static/photo/share_common.png"
    }
  }
  useShareAppMessage(handleShare)
  useShareTimeline(handleShare)

  return (
    <View className='wrapper'>
      <privacy-popup></privacy-popup>
      <CustomNavigator title={title} showBackBtn />
      <RenderPhotoList photoList={photoList} />
    </View>
  );
}
