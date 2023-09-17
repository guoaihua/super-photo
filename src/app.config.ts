export default {
  pages: [
    "pages/index/index",
    "pages/personal/index",
    "pages/collect/index",
    "pages/piclib/index",
    "pages/photo/index",
    "pages/page101/index",
    "pages/picloader/index",
    "pages/about/index",
    "pages/activity/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  tabBar: {
    customer: true,
    color: "#A9ABAF",
    selectedColor: "#FFA112",
    list: [
      {
        pagePath: "pages/index/index",
        text: "小工具",
        iconPath: "./images/tabar/icon-tab-tool.png",
        selectedIconPath: "./images/tabar/icon-tab-tool_focus.png",
      },
      {
        pagePath: "pages/piclib/index",
        text: "头像库",
        iconPath: "./images/tabar/icon-tab-img.png",
        selectedIconPath: "./images/tabar/icon-tab-img_focus.png",
      },
      {
        pagePath: "pages/personal/index",
        text: "个人中心",
        iconPath: "./images/tabar/icon-tab-user.png",
        selectedIconPath: "./images/tabar/icon-tab-user_focus.png",
      },
    ],
  },
  __usePrivacyCheck__: true,
  usingComponents: {
    "privacy-popup": "./components/privacyPopup/privacyPopup"
  }
};
