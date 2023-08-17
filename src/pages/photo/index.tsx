import React, { useCallback, useState } from "react";
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
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import maskPng from "./cn_mask_1.png";
import maskPng2 from "./mask_china-02.png";
import "./index.scss";
import CustomNavigator from "../../components/CustomNavigator";


const Index = () => {
  const [userInfo, setUserInfo] = useState<{
    avatarUrl: string;
  }>();
  const [preview, setPreview] = useState(false)
  console.log(userInfo);
  

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
            ctx.drawImage(maskPng, 0, 0, 300, 300);
            ctx.draw(true, () => {
              Taro.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 300,
                height: 300,
                canvasId: "canvas",
                success: function (res) {
                  console.log(res.tempFilePath);

                  // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
                  Taro.getSetting({
                    success: function (res1) {
                      if (!res1.authSetting["scope.writePhotosAlbum"]) {
                        Taro.authorize({
                          scope: "scope.writePhotosAlbum",
                          success: function () {
                            // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
                            Taro.saveImageToPhotosAlbum({
                              filePath: res.tempFilePath,
                              success: function (res2) {
                                console.log(res2);
                              },
                            });
                          },
                        });
                      }else {
                        Taro.saveImageToPhotosAlbum({
                          filePath: res.tempFilePath,
                          success: function (res2) {
                            console.log(res2);
                          },
                        });
                      }
                    },
                    fail: function(err){
                      console.log(err)
                    }
                  });
                },
              });
            });
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
        <Button className='create-img' onClick={() => { 
          
        }}>
          保存至相册
        </Button>
        </View>
        )
        :<Canvas style='width: 100%; height: 100%;' canvasId='canvas' />
        }
        </View>
        
      </View>
      <View className='photo-bottom'>
      </View>
    </View>
  );
};

export default Index;
