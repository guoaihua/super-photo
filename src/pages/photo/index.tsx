import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Canvas,
  Swiper,
  SwiperItem,
  ScrollView,
  Icon
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import maskPng from "./cn_mask_1.png";
import maskPng2 from "./mask_china-02.png";
import "./index.scss";
import CustomNavigator from "../../components/CustomNavigator";
import Disk from  './imgs/disk.png';
import test1 from './imgs/test1.png'
import test2 from './imgs/test2.png'
import test3 from './imgs/test3.png'
import test4 from './imgs/test4.png'
import test5 from './imgs/selector-mask.png'


const PngList = [test1, test2, test3, test4, test5]

const Index = () => {
  const [userInfo, setUserInfo] = useState<{
    avatarUrl: string;
  }>();
  const [preview, setPreview] = useState(false)
  console.log(userInfo);
  const [tempFilePath, setTempFilePath] = useState('')
  const [currentUserPhoto, setCurrentUserPhoto] = useState<Uint8ClampedArray>()

  return (
    <View className='wrapper'>
         <CustomNavigator showBackBtn title="头像挂件"/>
      <View className='photo-top'>
        <View className='preview'>
          <View onClick={()=>{ 
            setPreview(false)
          }}>清除</View>
        </View>
        {/* <View className='photo-compose-container' style={{
            background: `url(${maskPng2}) ,url(${userInfo?.avatarUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}
        /> */}
        <View className="photo-compose-container">
       { !preview ? (
       <View>
       <Button
       className="avatar-wrapper"
          open-type='chooseAvatar'
          onChooseAvatar={(e) => {
            const { avatarUrl } = e.detail;
            console.log(avatarUrl);
            setPreview(true)
            const ctx = Taro.createCanvasContext("canvas");
            ctx.drawImage(avatarUrl, 0, 0, 300, 300);
            ctx.draw( false, ()=>{
              // 每次绘制成功之后保存下当前的源数据
              Taro.canvasGetImageData({
                canvasId: 'canvas',
                x:0,
                y:0,
                width: 300,
                height: 300,
                success: (res)=>{
                  setCurrentUserPhoto(res?.data)
                }
              })
            })
            
            // //获取全局唯一的文件管理器
            // Taro.getFileSystemManager()
            // .readFile({ //读取本地文件内容
            //     filePath: avatarUrl, // 文件路径
            //     encoding: 'base64', // 返回格式
            //     success: ({data}) => {
            //       setUserInfo({
            //           avatarUrl: 'data:image/png;base64,' + data
            //       })
            //     },
            //     fail(res) {
            //     console.log('fail', res)
            //     }
            // });
          }}
        >
          选择头像信息
        </Button>
        </View>
        )
        :<Canvas style='width: 300PX; height:  300PX;' canvasId='canvas' />
        }
        </View>
        
      </View>
      <View className='photo-bottom'>
        <ScrollView
          className='scrollview'
          scrollX
          style={{
            whiteSpace: "nowrap"
          }}
          scrollIntoViewAlignment="nearest"
        >
          {
            PngList.map((i, index)=><View className="scroll-item" style={{
              marginLeft: index=== 0 ? '30px': 0,
            }}
            onClick={()=>{
              const ctx = Taro.createCanvasContext("canvas");
            
              if(currentUserPhoto){
                Taro.canvasPutImageData({
                  canvasId: 'canvas',
                  width: 300,
                  height: 300,
                  x: 0,
                  y:0,
                  data: currentUserPhoto,
                   success: function(res){
                    ctx.drawImage(i, 0, 0, 300, 300);
                    ctx.draw(true, () => {
                      Taro.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: 300,
                        height: 300,
                        canvasId: "canvas",
                        success: function (res) {
                          console.log(res);
                          setTempFilePath(res.tempFilePath)
                        },
                      });
                    });
                   }
                })
              }else {
                ctx.drawImage(i, 0, 0, 300, 300);
                ctx.draw(!tempFilePath ? true : false, () => {
                  Taro.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 300,
                    height: 300,
                    canvasId: "canvas",
                    success: function (res) {
                      console.log(res);
                      setTempFilePath(res.tempFilePath)
                    },
                  });
                });
              }

            }}
            ><Image src={i} style={{ width: "100%", height: '100%'}}/></View>)
          }
        </ScrollView>

        <Button className='create-img' onClick={() => { 
                          // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
                          Taro.getSetting({
                            success: function (res1) {
                              if (!res1.authSetting["scope.writePhotosAlbum"]) {
                                Taro.authorize({
                                  scope: "scope.writePhotosAlbum",
                                  success: function () {
                                    // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
                                    Taro.saveImageToPhotosAlbum({
                                      filePath: tempFilePath,
                                      success: function (res2) {
                                        console.log(res2);
                                        Taro.showToast({
                                          title: 'success'
                                        })
                                      },
                                    });
                                  },
                                });
                              }else {
                                Taro.saveImageToPhotosAlbum({
                                  filePath: tempFilePath,
                                  success: function (res2) {
                                    console.log(res2);
                                    Taro.showToast({
                                      title: 'success'
                                    })
                                  },
                                });
                              }
                            },
                            fail: function(err){
                              console.log(err)
                            }
                          });
        }}>
         <Image  src={Disk} /> 保存至相册
        </Button>
      </View>
    </View>
  );
};

export default Index;
