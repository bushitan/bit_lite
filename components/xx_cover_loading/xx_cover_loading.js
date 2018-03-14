// components/xx_cover_news/xx_cover_news.js



// <xx-loading isloading= "{{true}}" content= "暂无更多记录" color="#fff" > </xx-loading>

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      isloading: {
            type: Boolean,
            value: true,
            observer: '_change',
      },
      content:{
          type:String,
          value: "暂无更多数据",
      },
      color: {
          type: String,
          value: "#999999",
      },
      
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 改变
    _change(newVal, oldVal) {
    },

  }
})
