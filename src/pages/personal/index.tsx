import React, { useCallback } from "react";
import { View, Text, Button, Image, Canvas } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import Taro from "@tarojs/taro";
import logo from "./hook.png";

import './index.scss'

const Index = () => {
  const env = useEnv();


  return (
    <View className='wrapper'>
      <Canvas canvasId='canvas' id='canvas' />
      <View onClick={() => {
        const ctx = Taro.createCanvasContext('canvas')

      }
      }
      > 生成圆角 </View>
    </View >
  );
};

export default Index;
