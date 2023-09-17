const path = require("path");
const config = {
  projectName: "super-photo",
  date: "2023-8-15",
  designWidth: 390,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    390: 1.91 / 1,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  compiler: {
    type: "webpack5",
  },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },

  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  alias: {
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/images": path.resolve(__dirname, "..", "src/images"),
    "@/libs": path.resolve(__dirname, "..", "src/libs"),
    "@/pages": path.resolve(__dirname, "..", "src/pages"),
    "@/hooks": path.resolve(__dirname, "..", "src/hooks"),
    "@/configs": path.resolve(__dirname, "..", "src/configs")
  },
  sass: {
    resource: [path.resolve(__dirname, "..", "src/styles/index.global.scss")]
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
