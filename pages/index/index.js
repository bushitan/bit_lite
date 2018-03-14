
var GP
var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      spritList: [
          { x: "10px", y: "50px" },
          { x: "100px", y: "20px" },
      ],
      actionList:[
        {
            num: 0.02,
            name: "GXS",
            time:"2小时前"
          },
          {
              num: 0.02,
              name: "GXS",
              time: "2小时前"
        },
        {
            num: 0.02,
            name: "GXS",
            time: "2小时前"
        },
      ]
  },

  onLoad: function () {
  },
  onShareAppMessage(){},
})
