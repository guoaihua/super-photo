import { View, Text, Image} from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import CustomNavigator from "@/components/CustomNavigator";
import logoIcon from '@/images/logo.svg'
import './index.scss'

export default function About() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='wrapper'>
      <CustomNavigator title='关于' showBackBtn />
      <View className='components-warper'>
        <Text >
          叮咚头像生成器
          不知道有和我一样喜欢经常换头像的人吗？为了方便更换微信头像，我们开发了这个小程序。
          功能都很简单啦，我们也不希望让这个工具变得复杂。其中「头像挂件」适合用在类似微信这种“正方形”头像上，可能不太适配一些“圆形”头像的社交平台。
          另外，我们会经常更新哦，记得常来瞧瞧～
        </Text>

        <View className='footer'>
          <Image src={logoIcon}></Image>
          <View className='copyRight'>Copyright © 2023 MAN! GO Studio.
            Designed by YorKun, Coded by ZiMing.</View>
        </View>
      </View>
    </View>
  )
}
