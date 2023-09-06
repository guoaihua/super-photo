import Taro from "@tarojs/taro";
import { Image, View } from "@tarojs/components"
import { useState } from "react";

interface ImageLoaderProps {

}

const ImageLoader = (props)=>{
  const  = props.
  const [imgList,setImaList] = useState([])

  return (
    <View>
      {
        imgList && imgList?.length > 0 ? (
          <View>
            {
                imgList.map((item, index)=> <Image src={item} key={index}></Image>)
            }
          </View>
        )

        : null
      }
    </View>
  )
}

export default ImageLoader
