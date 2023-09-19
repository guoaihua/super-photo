import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Canvas,
  ScrollView,
} from "@tarojs/components";
import Taro, {useShareAppMessage, useShareTimeline} from "@tarojs/taro";
import CustomNavigator from "@/components/CustomNavigator";
import {
  makeImage,
  saveImage,
  chooseLocalImage,
  getTempFile,
} from "@/libs/common";
import { useCansvasInfo } from "@/hooks/index";

import Preview from "@/components/Preview";
import logo from "./imgs/logo_text_dark.png";
import previewSvg from "@/images/icon-eyes_white.svg";
import refreshSvg from "@/images/icon-refresh_white.svg";

import nd_10_1 from "@/images/101/sticker_nd_01.png";
import nd_10_2 from "@/images/101/sticker_nd_02.png";
import nd_10_3 from "@/images/101/sticker_nd_03.png";
import nd_10_4 from "@/images/101/sticker_nd_04.png";
import nd_10_5 from "@/images/101/sticker_nd_05.png";
import nd_10_6 from "@/images/101/sticker_nd_06.png";
import nd_10_7 from "@/images/101/sticker_nd_07.png";


import sticker_china_01 from "@/images/china/sticker_china_01.png";
import sticker_china_02 from "@/images/china/sticker_china_02.png";
import sticker_china_03 from "@/images/china/sticker_china_03.png";
import sticker_china_04 from "@/images/china/sticker_china_04.png";
import sticker_china_05 from "@/images/china/sticker_china_05.png";
import sticker_china_06 from "@/images/china/sticker_china_06.png";
import sticker_china_07 from "@/images/china/sticker_china_07.png";
import sticker_china_08 from "@/images/china/sticker_china_08.png";
import sticker_china_09 from "@/images/china/sticker_china_09.png";
import sticker_china_10 from "@/images/china/sticker_china_10.png";
import sticker_china_11 from "@/images/china/sticker_china_11.png";
import sticker_china_12 from "@/images/china/sticker_china_12.png";
import sticker_china_13 from "@/images/china/sticker_china_13.png";
import sticker_china_14 from "@/images/china/sticker_china_14.png";
import sticker_china_15 from "@/images/china/sticker_china_15.png";

import morePhoto from "./imgs/selector-mask.png";
import Disk from "@/images/disk.png";
import shareSvg from "@/images/icon-share.svg";
import titleImg from "@/images/101/title_nd.png";
import shareLargePng from '@/images/share_large.png'
import "./index.scss";

const themes = [
  nd_10_1,
  nd_10_2,
  nd_10_3,
  nd_10_4,
  nd_10_5,
  nd_10_6,
  nd_10_7,
  sticker_china_01,
  sticker_china_02,
  sticker_china_03,
  sticker_china_04,
  sticker_china_05,
  sticker_china_06,
  sticker_china_07,
  sticker_china_08,
  sticker_china_09,
  sticker_china_10,
  sticker_china_11,
  sticker_china_12,
  sticker_china_13,
  sticker_china_14,
  sticker_china_15,
  morePhoto,
];
const canvasId = "canvas";

const Index = () => {
  const [userInfo, setUserInfo] = useState("");
  const [currentUserPhoto, setCurrentUserPhoto] = useState("");
  const [activePic, setActivePic] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [preViewImg, setPreViewImg] = useState("");

  const canvasInfo = useCansvasInfo(userInfo);

  const handleShare = (res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '欢度国庆，给头像换新颖',
      path: '/pages/page101/index',
      imageUrl: shareLargePng
    }
  }

  useShareAppMessage(handleShare)

  useShareTimeline(handleShare)


  return (
    <View className='wrapper'>
      <privacy-popup></privacy-popup>
      <CustomNavigator showBackBtn title='叮咚头像生成器' customHeader />
      <View className='photo-top'>
        {/* 头像显示区域 */}
        <View className='title'>
          <Image src={titleImg}></Image>
        </View>
        <View className='photo-compose-container'>
          {!userInfo ? (
            <View>
              <Button
                className='avatar-wrapper select-btn'
                open-type='chooseAvatar'
                onChooseAvatar={(e) => {
                  const { avatarUrl } = e.detail;
                  getTempFile(avatarUrl, (data) => {
                    setCurrentUserPhoto(avatarUrl);
                    setUserInfo("data:image/png;base64," + data);
                  });
                }}
              >
                使用微信头像
              </Button>
              <Button
                className='select-btn local-album'
                onClick={() => {
                  chooseLocalImage((tempFilePath, data) => {
                    setCurrentUserPhoto(tempFilePath);
                    setUserInfo("data:image/png;base64," + data);
                  });
                }}
              >
                本地相册上传 <View className='recommend'>推荐</View>
              </Button>
              <Text> 本地上传图片更清晰</Text>
            </View>
          ) : (
            //  ios真机不支持多个bg-image，且cover-image、canvas等原生组件均不支持圆角，故采用多个背景图片重叠
            // view的bg-image不支持临时路径，先转换成base-64加载，此处也可以直接使用image组件
            <View
              style={{
                background: `url(${userInfo}) no-repeat center`,
                backgroundSize: "100%",
              }}
              className='user-view'
            >
              {themes[activePic] && (
                <Image
                  src={themes[activePic]}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                ></Image>
              )}
              <Canvas id='canvas' canvasId='canvas' />
            </View>
          )}
        </View>
        {/* 预览操作按钮 */}
        <View
          className={
            currentUserPhoto && themes[activePic]
              ? "preview"
              : "preview dd-disable"
          }
        >
          <View
            onClick={() => {
              makeImage({
                canvasInfo,
                canvasId,
                bgImg: currentUserPhoto,
                coverImg: themes[activePic],
                cb: (tempFilePath) => {
                  setPreViewImg(tempFilePath);
                  setShowModal(true);
                },
                showGarden: true,
              });
            }}
          >
            <Image src={previewSvg} /> 查看预览
          </View>
          <View
            onClick={() => {
              const ctx = Taro.createCanvasContext("canvas");
              // 清除临时数据
              setUserInfo("");
              setActivePic(-1);
              setCurrentUserPhoto("");
              ctx.restore();
            }}
          >
            <Image src={refreshSvg} />
            重新上传
          </View>
        </View>
      </View>
      {/* 生成相册图片 */}
      <View className='photo-bottom'>
        <ScrollView
          className='photo-scrollview'
          scrollX
          style={{
            whiteSpace: "nowrap",
          }}
          scrollIntoViewAlignment='nearest'
        >
          {themes.map((i, index) => (
            <View
              className='scroll-item'
              key={index}
              style={{
                marginLeft: index === 0 ? "20px" : 0,
              }}
              onClick={() => {
                // 最后一项，跳转到头像挂件
                if (index === themes.length - 1) {
                  return Taro.navigateTo({ url: "../photo/index" });
                }

                if (!currentUserPhoto) {
                  return Taro.showToast({
                    title: "请先设置图像",
                    icon: 'error'
                  });
                }

                // 选择挂件蒙层
                activePic !== index && setActivePic(index);
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
              if (!currentUserPhoto || !themes[activePic]) {
                return Taro.showToast({
                  title: "请先设置图片",
                  icon: 'error'
                });
              }
              makeImage({
                canvasInfo,
                canvasId,
                bgImg: currentUserPhoto,
                coverImg: themes[activePic],
                cb: (tempFilePath) => {
                  // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
                  Taro.getSetting({
                    success: function (res1) {
                      if (!res1.authSetting["scope.writePhotosAlbum"]) {
                        Taro.authorize({
                          scope: "scope.writePhotosAlbum",
                          success: function () {
                            saveImage(tempFilePath);
                          },
                        });
                      } else {
                        saveImage(tempFilePath);
                      }
                    },
                    fail: function (err) {
                      console.log(err);
                    },
                  });
                },
              });
            }}
          >
            <Image src={Disk} /> 保存至相册
          </View>
          <Button open-type='share'  className='share' >
            <Image src={shareSvg} />
          </Button>
        </View>
      </View>
      <Preview
        showModal={showModal}
        setShowModal={setShowModal}
        preViewImg={preViewImg}
      />
    </View>
  );
};

export default Index;
