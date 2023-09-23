import Taro from "@tarojs/taro";
// import selectedIcon from '@/images/icon-selected1.png'

export const makeGarden = (ctx, x, y, r = 30) => {
  ctx.moveTo(r, 0);
  ctx.beginPath();
  ctx.arc(r, r, r, 1.5 * Math.PI, Math.PI, true);
  ctx.lineTo(0, y - r);
  ctx.arc(r, y - r, r, Math.PI, Math.PI * 0.5, true);

  ctx.lineTo(x - r, y);

  ctx.arc(x - r, y - r, r, Math.PI * 0.5, 0, true);

  ctx.lineTo(x, r);

  ctx.arc(x - r, r, r, 0, Math.PI * 1.5, true);

  ctx.strokeStyle = "transparent";
  ctx.stroke();
  ctx.lineTo(r, 0);
  ctx.clip();
};

/** 读取临时路径文件 */

export const getTempFile = (tempUrl, cb) => {
  //获取全局唯一的文件管理器
  Taro.getFileSystemManager().readFile({
    //读取本地文件内容
    filePath: tempUrl, // 文件路径
    encoding: "base64", // 返回格式
    success: ({ data }) => {
      cb(data);
    },
    fail(res) {
      console.log("fail", res);
    },
  });
};

/** 以底图和挂件生成图片 */
export const makeImage = ({
  canvasInfo,
  canvasId,
  bgImg,
  coverImg,
  cb,
  showGarden = false,
}) => {
  if (!bgImg || !coverImg) {
    return Taro.showToast({
      title: "请先设置图像",
      icon: 'error',
      duration: 100000
    });
  }

  const ctx = Taro.createCanvasContext(canvasId);

  showGarden &&
    makeGarden(ctx, canvasInfo?.width || 0, canvasInfo?.height || 0);
  ctx.drawImage(bgImg, 0, 0, canvasInfo?.width || 0, canvasInfo?.height || 0);
  ctx.drawImage(
    coverImg,
    0,
    0,
    canvasInfo?.width || 0,
    canvasInfo?.height || 0
  );
  ctx.draw(false, () => {
    Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: canvasInfo?.width || 0,
      height: canvasInfo?.height || 0,
      canvasId: canvasId,
      success: function (res) {
        cb(res.tempFilePath);
      },
    });
  });
};

/** 保存图片至相册 */
export const saveImage = (tempFilePath) => {
  // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
  Taro.saveImageToPhotosAlbum({
    filePath: tempFilePath,
    success: function () {
      Taro.showToast({
        title: "已保存",
        // image: selectedIcon,
      });
    },
  });
};

/** 选择裁剪本地图像 */
export const chooseLocalImage = (cb) => {
  Taro.chooseMedia({
    count: 9,
    mediaType: ["image", "video"],
    sourceType: ["album", "camera"],
    sizeType: ["original"],
    maxDuration: 30,
    camera: "back",
    success(res) {
      Taro.cropImage({
        src: res.tempFiles[0].tempFilePath,
        cropScale: "1:1", // 裁剪比例
        success(resolveData) {
          getTempFile(resolveData?.tempFilePath, (data) => {
            cb(resolveData?.tempFilePath, data);
          });
        },
      });
    },
    fail(res) {
      console.log("fail", res);
    },
  });
};
