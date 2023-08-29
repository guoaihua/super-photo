import { View, ScrollView, Image } from "@tarojs/components";
import "./index.scss";
import { useState } from "react";
import nd_10_1 from "../../images/101/sticker_nd_01.png";

import wx_bg_1 from "./imgs/wx_bg_1.png";
import wx_bg_2 from "./imgs/wx_bg_2.png";

const Preview = (props) => {
  const showModal = props?.showModal;
  const setShowModal = props?.setShowModal;
  const preViewImg = props?.preViewImg;

  return (
    showModal && (
      <View
        className="pre-container"
        onClick={() => {
          setShowModal(false);
        }}
      >
        <ScrollView
          scrollX
          className="preview-scrollview"
          style={{
            whiteSpace: "nowrap",
          }}
          scrollIntoViewAlignment="nearest"
          onClick={(e) => {
            e.stopPropagation();
          }}
          enhanced
          showScrollbar
        >
          <View>
            <Image className="bg" src={wx_bg_1} />
            <Image className="cover" src={preViewImg} />
          </View>
          <View>
            <Image className="bg" src={wx_bg_2} />
            <Image className="cover" src={preViewImg} />
          </View>
          <View className="scroll-bar">--</View>
        </ScrollView>
      </View>
    )
  );
};

export default Preview;
