import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";

export const useCansvasInfo = (userInfo) => {
  const [canvasInfo, setCanvasInfo] =
    useState<Taro.NodesRef.BoundingClientRectCallbackResult>();

  useEffect(() => {
    if (!canvasInfo?.width) {
      Taro.createSelectorQuery()
        .select("#canvas")
        .boundingClientRect(function (rect) {
          console.log(rect);
          setCanvasInfo(rect as any);
        })
        .exec();
    }
  }, [userInfo]);

  return canvasInfo;
};
