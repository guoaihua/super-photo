export default {
  pages: [
    "pages/piclib/index",
    "pages/index/index",
    "pages/photo/index",
    "pages/page101/index",
    "pages/personal/index",
    "pages/picloader/index"
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
    ],
  },
};
