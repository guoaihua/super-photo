import React, { useCallback, useState } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from '@tarojs/taro'
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import maskPng from './cn_mask_1.png'
import maskPng2 from './mask_china-02.png'
import './index.scss'


const Index = () => {
  const [userInfo, setUserInfo] = useState<{
    avatarUrl: string
  }>()
  console.log(userInfo)
  return (
    <View className='wrapper'>
      <View className="photo-top">
        <View className="preview">
            <View>效果预览</View>
        </View>
        <View className="photo-compose-container" style={{
            background: `url(${maskPng2}) ,url(${userInfo?.avatarUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }} />

      </View>
      <View className="photo-bottom">
            <Button className='avatar-wrapper' open-type='chooseAvatar'onChooseAvatar={(e)=>{
                const { avatarUrl } = e.detail
                    //获取全局唯一的文件管理器
                    Taro.getFileSystemManager()
                    .readFile({ //读取本地文件内容
                        filePath: avatarUrl, // 文件路径
                        encoding: 'base64', // 返回格式
                        success: ({data}) => {
                        setUserInfo({
                            avatarUrl: 'data:image/png;base64,' + data
                        })
                        },
                        fail(res) {
                        console.log('fail', res)
                        }
                    });

            }}
            >
                选择头像信息
            </Button>
            <Button className="create-img" onClick={()=>{
                
            }}>
                保存至相册
            </Button>
       </View>


    </View>
  );
};

export default Index;