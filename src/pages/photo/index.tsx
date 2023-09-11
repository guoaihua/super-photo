import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Canvas,
  ScrollView,
} from "@tarojs/components";
import Taro, {useRouter, useLoad} from "@tarojs/taro";
// import maskPng from "./cn_mask_1.png";
// import maskPng2 from "./mask_china-02.png";
import CustomNavigator from "@/components/CustomNavigator";
import {
  makeImage,
  saveImage,
  chooseLocalImage,
  getTempFile,
} from "@/libs/common";
import { useCansvasInfo } from "@/hooks/index";

import Preview from "@/components/Preview";

import Disk from "@/images/disk.png";
import previewSvg from "@/images/icon-eyes.svg";
import refreshSvg from "@/images/icon-refresh.svg";
import shareSvg from "@/images/icon-share.svg";

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

import sticker_panda_01 from "@/images/panda/sticker_panda_01.png";
import sticker_panda_02 from "@/images/panda/sticker_panda_02.png";
import sticker_panda_03 from "@/images/panda/sticker_panda_03.png";
import sticker_panda_04 from "@/images/panda/sticker_panda_04.png";
import sticker_panda_05 from "@/images/panda/sticker_panda_05.png";
import sticker_panda_06 from "@/images/panda/sticker_panda_06.png";
import sticker_panda_07 from "@/images/panda/sticker_panda_07.png";
import sticker_panda_08 from "@/images/panda/sticker_panda_08.png";
import sticker_panda_09 from "@/images/panda/sticker_panda_09.png";
import sticker_panda_10 from "@/images/panda/sticker_panda_10.png";
import sticker_panda_11 from "@/images/panda/sticker_panda_11.png";
import sticker_panda_12 from "@/images/panda/sticker_panda_12.png";
import sticker_panda_13 from "@/images/panda/sticker_panda_13.png";

import sticker_worker_01 from "@/images/worker/sticker_worker_01.png";
import sticker_worker_02 from "@/images/worker/sticker_worker_02.png";
import sticker_worker_03 from "@/images/worker/sticker_worker_03.png";
import sticker_worker_04 from "@/images/worker/sticker_worker_04.png";
import sticker_worker_05 from "@/images/worker/sticker_worker_05.png";
import sticker_worker_06 from "@/images/worker/sticker_worker_06.png";
import sticker_worker_07 from "@/images/worker/sticker_worker_07.png";
import sticker_worker_08 from "@/images/worker/sticker_worker_08.png";
import sticker_worker_09 from "@/images/worker/sticker_worker_09.png";
import sticker_worker_10 from "@/images/worker/sticker_worker_10.png";
import sticker_worker_11 from "@/images/worker/sticker_worker_11.png";
import sticker_worker_12 from "@/images/worker/sticker_worker_12.png";
import sticker_worker_13 from "@/images/worker/sticker_worker_13.png";
import sticker_worker_14 from "@/images/worker/sticker_worker_14.png";
import sticker_worker_15 from "@/images/worker/sticker_worker_15.png";
import sticker_worker_16 from "@/images/worker/sticker_worker_16.png";
import sticker_worker_17 from "@/images/worker/sticker_worker_17.png";

import sticker_animal_01 from "@/images/animal/sticker_animal_01.png";
import sticker_animal_02 from "@/images/animal/sticker_animal_02.png";
import sticker_animal_03 from "@/images/animal/sticker_animal_03.png";
import sticker_animal_04 from "@/images/animal/sticker_animal_04.png";
import sticker_animal_05 from "@/images/animal/sticker_animal_05.png";
import sticker_animal_06 from "@/images/animal/sticker_animal_06.png";
import sticker_animal_07 from "@/images/animal/sticker_animal_07.png";
import sticker_animal_08 from "@/images/animal/sticker_animal_08.png";
import sticker_animal_09 from "@/images/animal/sticker_animal_09.png";
import sticker_animal_10 from "@/images/animal/sticker_animal_10.png";
import sticker_animal_11 from "@/images/animal/sticker_animal_11.png";
import sticker_animal_12 from "@/images/animal/sticker_animal_12.png";
import sticker_animal_13 from "@/images/animal/sticker_animal_13.png";
import sticker_animal_14 from "@/images/animal/sticker_animal_14.png";
import sticker_animal_15 from "@/images/animal/sticker_animal_15.png";
import sticker_animal_16 from "@/images/animal/sticker_animal_16.png";
import sticker_animal_17 from "@/images/animal/sticker_animal_17.png";
import sticker_animal_18 from "@/images/animal/sticker_animal_18.png";
import sticker_animal_19 from "@/images/animal/sticker_animal_19.png";

import defaultImage from "./imgs/default.png";
import "./index.scss";

const themes = [
  {
    label: "热门",
    children: [
      defaultImage,
      nd_10_1,
      nd_10_2,
      nd_10_3,
      nd_10_4,
      nd_10_5,
      nd_10_6,
      nd_10_7,
    ],
  },
  {
    label: "中华",
    children: [
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
    ],
  },
  {
    label: "熊猫",
    children: [
      sticker_panda_01,
      sticker_panda_02,
      sticker_panda_03,
      sticker_panda_04,
      sticker_panda_05,
      sticker_panda_06,
      sticker_panda_07,
      sticker_panda_08,
      sticker_panda_09,
      sticker_panda_10,
      sticker_panda_11,
      sticker_panda_12,
      sticker_panda_13,
    ],
  },
  {
    label: "打工人",
    children: [
      sticker_worker_01,
      sticker_worker_02,
      sticker_worker_03,
      sticker_worker_04,
      sticker_worker_05,
      sticker_worker_06,
      sticker_worker_07,
      sticker_worker_08,
      sticker_worker_09,
      sticker_worker_10,
      sticker_worker_11,
      sticker_worker_12,
      sticker_worker_13,
      sticker_worker_14,
      sticker_worker_15,
      sticker_worker_16,
      sticker_worker_17,
    ],
  },
  {
    label: "动物园",
    children: [
      sticker_animal_01,
      sticker_animal_02,
      sticker_animal_03,
      sticker_animal_04,
      sticker_animal_05,
      sticker_animal_06,
      sticker_animal_07,
      sticker_animal_08,
      sticker_animal_09,
      sticker_animal_10,
      sticker_animal_11,
      sticker_animal_12,
      sticker_animal_13,
      sticker_animal_14,
      sticker_animal_15,
      sticker_animal_16,
      sticker_animal_17,
      sticker_animal_18,
      sticker_animal_19,
    ],
  },
];

const canvasId = "canvas";

const Index = (props) => {
  const [userInfo, setUserInfo] = useState("");
  const [currentUserPhoto, setCurrentUserPhoto] = useState("");
  const [activeTheme, setActiveTheme] = useState(0);
  const [activePic, setActivePic] = useState(-1);

  const [preViewImg, setPreViewImg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const canvasInfo = useCansvasInfo(userInfo);
  const router = useRouter()

  useLoad(()=>{
    // 头像库跳转赋予默认值
    if(router?.params?.imagePath){
      getTempFile(router?.params?.imagePath, (data) => {
        setCurrentUserPhoto(router?.params?.imagePath || '');
        setUserInfo("data:image/png;base64," + data);
      });
    }
  })



  return (
    <View className='wrapper'>
      <CustomNavigator showBackBtn title='头像挂件' />
      <View className='photo-top'>
        {/* 头像显示区域 */}
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
              {themes[activeTheme]?.children?.[activePic] && (
                <Image
                  src={themes[activeTheme]?.children?.[activePic]}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                ></Image>
              )}
              <Canvas id='canvas' canvasId={canvasId} />
            </View>
          )}
        </View>
        {/* 预览操作按钮 */}
        <View
          className={
            currentUserPhoto && themes[activeTheme]?.children?.[activePic]
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
                coverImg: themes[activeTheme]?.children?.[activePic],
                cb: (tempFilePath) => {
                  setPreViewImg(tempFilePath);
                  setShowModal(true);
                },
                showGarden: true
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
              setActiveTheme(0);
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
          className='themes-scrollview'
          scrollX
          style={{
            whiteSpace: "nowrap",
          }}
          scrollIntoViewAlignment='nearest'
        >
          {themes.map((theme, index) => (
            <View
              key={index}
              className={
                activeTheme === index ? "active scroll-item" : "scroll-item"
              }
              style={{
                marginLeft: index === 0 ? "20px" : 0,
              }}
              onClick={() => {
                if (index !== activeTheme) {
                  setActiveTheme(index);
                  setActivePic(-1);
                }
              }}
            >
              {theme.label}
            </View>
          ))}
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
                if (!currentUserPhoto) {
                  return Taro.showToast({
                    title: "请先选择头像",
                  });
                }

                // 选择挂件蒙层
                // 选中热门区第一个，恢复默认头像，清除其它选项
                if (activeTheme === 0 && index === 0) {
                  return setActivePic(-1);
                }

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
              if (
                !currentUserPhoto ||
                !themes[activeTheme]?.children?.[activePic]
              ) {
                return Taro.showToast({
                  title: "请先设置图片",
                });
              }
              makeImage({
                canvasInfo,
                canvasId,
                bgImg: currentUserPhoto,
                coverImg: themes[activeTheme]?.children?.[activePic],
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
          <View className='share'>
            <Image src={shareSvg} />
          </View>
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
