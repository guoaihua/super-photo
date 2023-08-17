import { Component, PropsWithChildren  } from 'react'
  import './app.scss'
import Taro from '@tarojs/taro'

    class App extends  Component < PropsWithChildren > {
      taroGlobalData = {}

      onLaunch(options){
        const statusBarHeight = Taro.getSystemInfoSync()?.statusBarHeight || 0
        const menu = Taro.getMenuButtonBoundingClientRect()

        const navBarHeight = (menu.top - statusBarHeight) * 2 + menu.height

        this.taroGlobalData = {
          ...this.taroGlobalData,
          navBarHeight,
          statusBarHeight,
          /** 胶囊信息 */
          menuBtn: menu
        }

      }
      componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  // this.props.children 是将要会渲染的页面
  render() {
        return this.props.children
      }
    }
      
export default App
