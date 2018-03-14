
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        image: {
            type: String,
            value: "../../images/hotapp_01_03.png",
        },
        x: {
            type: String,
            value: "0px",
        },
        y: {
            type: String,
            value: "0px",
        },

        endx: {
            type: String,
            value: "250px",
        },
        endy: {
            type: String,
            value: "300px",
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
    
        click(e) {    
            this.onClick() 
            this.triggerEvent('click', e.currentTarget.dataset.index);
        },
     
        onClick(){
            // console.log(
            //     this.data
            // )
            this.setData({
                y: this.data.endy,
                x: this.data.endx,
                opacity:0,
            })
        }
    }
})
