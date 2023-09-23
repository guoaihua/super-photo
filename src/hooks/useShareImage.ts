import Taro, {useShareAppMessage, useShareTimeline} from "@tarojs/taro";

export const useShareImage = (path)=>{
    const handleShare = () => {
        return {
          title: '给头像换新颖',
          path: path,
          imageUrl: "https://zm-1253465948.cos.ap-nanjing.myqcloud.com/static/photo/share_common.png"
        }
      }
    
      useShareAppMessage(handleShare)

      useShareTimeline(handleShare)
    
}