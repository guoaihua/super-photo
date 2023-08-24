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
        console.log(11)
        const ctx = Taro.createCanvasContext('canvas')


        const makeGarden = (x,y,r)=>{
          ctx.moveTo(r,0)
          ctx.beginPath()
          ctx.arc(r, r, r, 1.5 * Math.PI, Math.PI, true)
          ctx.lineTo(0, y - r)
          ctx.arc(r,y-r, r, Math.PI, Math.PI * 0.5, true)

          ctx.lineTo(x-r, y)

          ctx.arc(x-r, y-r, r, Math.PI * 0.5, 0, true)

          ctx.lineTo(x, r)

          ctx.arc(x-r, r, r, 0, Math.PI*1.5, true)
          ctx.closePath()
        }

        makeGarden(300,300,20)

//         ctx.rect(10, 10, 100, 30)
// ctx.setStrokeStyle('yellow')
// ctx.stroke()
// // begin another path
// ctx.beginPath()
// ctx.rect(10, 40, 100, 30)
// // only stoke this rect, not in current path
// ctx.setStrokeStyle('blue')
// ctx.strokeRect(10, 70, 100, 30)
// ctx.rect(10, 100, 100, 30)
// // it will stroke current path
// ctx.setStrokeStyle('red')
// ctx.stroke()
// ctx.draw()
      }
      }
      > 生成圆角 </View>
    </View >
  );
};

export default Index;
