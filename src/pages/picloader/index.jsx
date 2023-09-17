import {
  View,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
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

  return (
    <View className='wrapper'>
      <privacy-popup></privacy-popup>
      <CustomNavigator title={title} showBackBtn />
      <RenderPhotoList photoList={photoList} />
    </View>
  );
}
