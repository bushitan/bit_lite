/* api.js  公共类
    小程序的api接口集合 
 */
var KEY = require('key.js');
// var host_url = 'https://xcx.308308.com/huaxun_2/api/';
// var meet_url = 'https://xcx.308308.com/huaxun_2/meet/';
var host_url = 'http://127.0.0.1:8000/huaxun_2/api/';
var meet_url = 'http://127.0.0.1:8000/huaxun_2/meet/';
// var host_url = 'http://192.168.199.204:8000/huaxun_2/api/';
// var meet_url = 'http://192.168.199.204:8000/huaxun_2/meet/';

var APP
function Request(options) {

    APP = getApp()
    //初始化 全局变量
    if (APP.globalData.isLogin == undefined) {
        APP.globalData.isLogin = 0 //是否经登陆
        APP.globalData.preList = [] //未登录前的请求队列 
        APP.globalData.failList = [] //请求失败的队列
        APP.globalData.isCheckThread = false
    }
    options['live'] = 3 //请求重连生命周期

    if (APP.globalData.isCheckThread == false) {
        setInterval(
            function () {
                var opt = APP.globalData.failList.pop()

                console.log(opt)
                if (opt != undefined) {
                    opt['live']--
                    _Request(opt)
                }
            },
            5000)
        APP.globalData.isCheckThread = true
    }

    console.log(options)
    if (APP.globalData.isLogin == 0) {
        APP.globalData.preList.push(options)
        _RequestLogin(options)
        APP.globalData.isLogin = 1
    }
    else if (APP.globalData.isLogin == 1) {
        APP.globalData.preList.push(options)
    }
    else {
        _Request(options)
    }
}

function _RequestLogin(options) {
    wx.login({
        success: function (res) {
            var _session = wx.getStorageSync(KEY.SESSION)
            _Request({
                'live': 3,
                'url': meet_url + 'login/',
                'data': {
                    js_code: res.code,
                    meet_session: _session,
                },
                'success': function (res) {
                    var object = res.data
                    wx.setStorageSync(KEY.SESSION, res.data.dict_user.session)

                    APP.globalData.isLogin = 2 //登陆成功
                    // 执行login == false时的请求
                    for (var i in APP.globalData.preList) {
                        _Request(APP.globalData.preList[i])
                    }
                    APP.globalData.preList = []
                },
            })
        }
    });
}

// 普通登陆
function _Request(options) {
    // console.log(options)

    var data = options.data
    if (data == undefined)
        data = {}
    //session 不存在，设置为false
    var _session = wx.getStorageSync(KEY.SESSION)
    if (!_session) //检查session,不存在，为false
        _session = "false"
    data['meet_session'] = _session  //每个请求都加session
    wx.request
        ({
            url: options.url,
            method: "GET",
            data: data,
            success: function (res) {
                // if (res.data.status == 'false'){   //用户未登陆，重新登录
                //     WXLogin(options)
                //     return
                // }
                if (options.success != undefined)
                    options.success(res)
            },
            fail: function (res) {
                if (options.fail != undefined)
                    options.fail(res)
                if (options['live'] > 0)
                    APP.globalData.failList.push(options) //将请求加入失败队列
            },
            complete: function (res) {
                if (options.complete != undefined)
                    options.complete(res)
            },
        })
}


// //下拉滚动查询
// function RequestScroll(start = 0, range = 10) {
//     // this.GP = _GP
//     this.start = start //文章初始位置
//     this.range = range //文章加载范围
//     var that = this
//     this.ReStart = function () {
//         this.start = 0
//     },
//         this.Filter = function (url, data, hack) {
//             if (data == undefined) data = {}  //如果数据为空，则创建对象
//             data['start_index'] = this.start
//             data['end_index'] = this.start + this.range
//             var that = this
//             _Request({
//                 'url': url,
//                 'data': data,
//                 'success': function (res) {
//                     // this.start = this.start + this.range //文章索引增加
//                     that._success()
//                     if (res.data.article_list.length < that.range)
//                         hack.success(res, false) //没有文章
//                     else
//                         hack.success(res, true) //还有文章
//                 },
//             })
//         }
//     this._success = function () {
//         this.start = this.start + this.range //文章索引增加
//     }
// }





module.exports = {
    Request: Request,
    MEET_INDEX: meet_url + 'index/',
    MEET_AGENDA: meet_url + 'agenda/get_list/meet_id/',

}
