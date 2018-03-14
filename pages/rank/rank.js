
var GP
var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');


Page({
    data: {
        rankList: [
            {
                num:4,
                name: "开心Sky",
                time: "14738"
            },
            {
                num: 5,
                name: "悠悠岁月",
                time: "4538"
            },
            {
                num: 6,
                name: "大坏蛋",
                time: "738"
            },
        ]
    },
    onShareAppMessage() { },
    onLoad: function (options) {
        GP = this

        GP.setData({ isSign: wx.getStorageSync(KEY.IS_SIGN) == true ? true :false})
        // GP.onInit()
    },
    onInit(){},


})