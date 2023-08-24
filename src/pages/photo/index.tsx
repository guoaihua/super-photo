import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Canvas,
  Swiper,
  SwiperItem,
  ScrollView,
  Icon,
 CoverImage
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import maskPng from "./cn_mask_1.png";
import maskPng2 from "./mask_china-02.png";
import "./index.scss";
import CustomNavigator from "../../components/CustomNavigator";
import Disk from "./imgs/disk.png";
import test1 from "./imgs/test1.png";
import test2 from "./imgs/test2.png";
import test3 from "./imgs/test3.png";
import test4 from "./imgs/test4.png";
import test5 from "./imgs/selector-mask.png";
import previewSvg from '../../images/icon-eyes.svg'
import refreshSvg from '../../images/icon-refresh.svg'
import shareSvg from '../../images/icon-share.svg'
import test10 from './imgs/selector-mask.png'

const PngList = [test1, test2, test3, test4, test5];

const themes = [
  {
    label: '热门',
    children: [
      test1, test2
    ]
  },
  {
    label: "中国",
    children: [
      test3, test4, test5
    ]
  },
  {
    label: '熊猫',
    children: [
      ...PngList
    ]
  },
  {
    label: "打工人",
    children: [
      ...PngList
    ]
  },
  {
    label: '生肖',
    children: [
      ...PngList
    ]
  },
  {
    label: "搞笑",
    children: [
      ...PngList
    ]
  },
  {
    label: "打工人",
    children: [
      ...PngList
    ]
  },
  {
    label: '生肖',
    children: [
      ...PngList
    ]
  },
  {
    label: "搞笑",
    children: [
      ...PngList
    ]
  }
]

const Index = () => {
  const [userInfo, setUserInfo] = useState();
  const [preview, setPreview] = useState(false);
  console.log(userInfo);
  const [tempFilePath, setTempFilePath] = useState("");
  const [currentUserPhoto, setCurrentUserPhoto] = useState<Uint8ClampedArray>();
  const [activeTheme, setActiveTheme] = useState(0)
  const [activePic, setActivePic] = useState(-1)
  const [canvasInfo, setCanvasInfo] = useState<Taro.NodesRef.BoundingClientRectCallbackResult>()


  const makeGarden = (ctx, x,y,r = 30)=>{
    console.log(ctx, x, y, r)
    ctx.moveTo(r,0)
    ctx.beginPath()
    ctx.arc(r, r, r, 1.5 * Math.PI, Math.PI, true)
    ctx.lineTo(0, y - r)
    ctx.arc(r,y-r, r, Math.PI, Math.PI * 0.5, true)

    ctx.lineTo(x-r, y)

    ctx.arc(x-r, y-r, r, Math.PI * 0.5, 0, true)

    ctx.lineTo(x, r)

    ctx.arc(x-r, r, r, 0, Math.PI*1.5, true)

//     ctx.setStrokeStyle('red')
// ctx.stroke()
    ctx.strokeStyle = "transparent";
    ctx.stroke();
    ctx.lineTo(r,0)
    ctx.clip()
  }

  return (
    <View className='wrapper'>
      <CustomNavigator showBackBtn title='头像挂件' />
      <View className='photo-top'>
        <View className='photo-compose-container'>
          {!preview ? (
            <View>
              <Button
                className='avatar-wrapper'
                open-type='chooseAvatar'
                onChooseAvatar={(e) => {
                  const { avatarUrl } = e.detail;
                  console.log(avatarUrl);
                  setPreview(true);
                                    //获取全局唯一的文件管理器
                  Taro.getFileSystemManager()
                  .readFile({ //读取本地文件内容
                      filePath: avatarUrl, // 文件路径
                      encoding: 'base64', // 返回格式
                      success: ({data}) => {
                        setUserInfo('data:image/png;base64,' + data)
                      },
                      fail(res) {
                      console.log('fail', res)
                      }
                  });
                  const ctx = Taro.createCanvasContext("canvas");
                  ctx.save()
                  if(!canvasInfo?.width){
                   return Taro.createSelectorQuery().select('#canvas').boundingClientRect(function(rect){
                      console.log(rect)
                      setCanvasInfo(rect)
                      const canvasWidth = rect.width;
                      const canvasHeight = rect.height;

                      makeGarden(ctx, canvasWidth,canvasHeight)

                      ctx.drawImage(avatarUrl, 0, 0, canvasWidth,canvasHeight );
                      ctx.draw(false, () => {
                        // 每次绘制成功之后保存下当前的源数据
                        Taro.canvasGetImageData({
                          canvasId: "canvas",
                          x: 0,
                          y: 0,
                          width: canvasWidth,
                          height: canvasHeight,
                          success: (res) => {
                            setCurrentUserPhoto(res?.data);
                          },
                        });
                      });
                    }).exec()
                  }

                  ctx.drawImage(avatarUrl, 0, 0, canvasInfo.width, canvasInfo.height);
                  ctx.draw(false, () => {
                    // 每次绘制成功之后保存下当前的源数据
                    Taro.canvasGetImageData({
                      canvasId: "canvas",
                      x: 0,
                      y: 0,
                      width: canvasInfo.width,
                      height: canvasInfo.height,
                      success: (res) => {
                        setCurrentUserPhoto(res?.data);
                      },
                    });
                  });

                }}
              >
                使用微信头像或者本地相册
              </Button>
            </View>
          ) : (
            //  ios真机不支持多个bg-image，且cover-image、canvas等原生组件均不支持圆角，故采用多个背景图片重叠
            // view的bg-image不支持临时路径，先转换成base-64加载，此处也可以直接使用image组件
              <View style={{
                background: `url(${userInfo}) no-repeat center`,
                backgroundSize: "100%"
              }} className="user-view">

                {themes[activeTheme]?.children?.[activePic] && <Image src={ themes[activeTheme]?.children?.[activePic]} style={{
                   width: "100%",
                   height: "100%"
                }}></Image>}
                <Canvas id='canvas' canvasId='canvas' />
              </View>
          )}
        </View>
        <View className='preview'>
          <View>
            <Image src={previewSvg} /> 查看预览
          </View>
          <View
            onClick={() => {
              const ctx = Taro.createCanvasContext("canvas");

              setPreview(false);
              // 清除临时数据
              setTempFilePath('');
              setActivePic(-1);
              setActiveTheme(0);
              setCurrentUserPhoto(undefined);
              ctx.restore()
            }}
          >
            <Image src={refreshSvg} />
            重新上传
          </View>
        </View>
      </View>
      <View className='photo-bottom'>
        <ScrollView
          className='themes-scrollview'
          scrollX
          style={{
            whiteSpace: "nowrap",
          }}
          scrollIntoViewAlignment='nearest'
        >
          {
            themes.map((theme, index) => <View
              key={index}
              className={activeTheme === index ? 'active scroll-item' : 'scroll-item'}
              style={{
              marginLeft: index === 0 ? "20px" : 0,
            }}
              onClick={() => {
              index !== activeTheme && setActiveTheme(index)
            }}
            >
              {theme.label}
            </View>)
          }
        </ScrollView>
        <ScrollView
          className='photo-scrollview'
          scrollX
          style={{
            whiteSpace: "nowrap",
          }}
          scrollIntoViewAlignment='nearest'
        >
          {themes[activeTheme]?.children.map((i, index) => (
            <View
              className='scroll-item'
              key={index}
              style={{
                marginLeft: index === 0 ? "20px" : 0,
              }}
              onClick={() => {

                activePic !== index && setActivePic(index)
                const ctx = Taro.createCanvasContext("canvas");
                if (currentUserPhoto) {
                 // 重新绘制
                  Taro.canvasPutImageData({
                    canvasId: "canvas",
                    width: canvasInfo?.width || 0 ,
                    height: canvasInfo?.height || 0,
                    x: 0,
                    y: 0,
                    data: currentUserPhoto,
                    success: function (res) {
                      // 裁剪形状
                      ctx.drawImage(i, 0, 0, canvasInfo?.width  || 0, canvasInfo?.height  || 0);
                      ctx.draw(true, () => {
                        Taro.canvasToTempFilePath({
                          x: 0,
                          y: 0,
                          width: canvasInfo?.width || 0,
                          height: canvasInfo?.height || 0,
                          canvasId: "canvas",
                          success: function (res) {
                            console.log(res);
                            setTempFilePath(res.tempFilePath);
                          },
                        });
                      });
                    },
                  });
                } else {
                  ctx.drawImage(i, 0, 0, canvasInfo?.width || 0, canvasInfo?.height || 0);
                  ctx.draw(!tempFilePath ? true : false, () => {
                    Taro.canvasToTempFilePath({
                      x: 0,
                      y: 0,
                      width: canvasInfo?.width || 0,
                      height: canvasInfo?.height || 0,
                      canvasId: "canvas",
                      success: function (res) {
                        console.log(res);
                        setTempFilePath(res.tempFilePath);
                      },
                    });
                  });
                }
              }}
            >
              <Image src={i} style={{ width: "100%", height: "100%" }} />
            </View>
          ))}
        </ScrollView>

        <View className='photo-operation'>
          <View
            className='create-img'
            onClick={() => {
              if (!tempFilePath) {
                return Taro.showToast({
                  title: '请先选择头像'
                })
              }
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
                              title: "success",
                            });
                          },
                        });
                      },
                    });
                  } else {
                    Taro.saveImageToPhotosAlbum({
                      filePath: tempFilePath,
                      success: function (res2) {
                        console.log(res2);
                        Taro.showToast({
                          title: "success",
                        });
                      },
                    });
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
          <View className='share'>
            <Image  src={shareSvg} />
          </View>
        </View>

      </View>
    </View>
  );
};

export default Index;
