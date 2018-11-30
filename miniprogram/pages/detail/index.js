//index.js
//import data from '../../data'
import product from '../../common/goods'
import shopCar from '../../common/shopCar'

let {getProductById}=product
//let {goods}=data
let {createShopCar}=shopCar

const app = getApp()

Page({
  data: {
    carData:{
      count:1,
      id:"",
      "createdAt": "2018-12-31",
      product_id:"",
      updatedAt:"",
      user_id:""
    },
    logged: false,
    good:{},
    show:false,
    selecCount:1
  },
  onLoad: function(option) {

    this.setData({
      "carData.product_id":option.id,
      "carData.user_id":app.globalData.openid
    })
    getProductById(option.id).then((e)=>{
      console.log('goodByid',e.data.product_by_id)
      console.log("option",option)
      this.setData({
        good:e.data.product_by_id
      })
    })
  },

  onShow(){
    console.log('detail')  
  },
  countChange(e){
    this.setData({
      "carData.count":e.detail
    })
    console.log(this.data)
  },

  onShowPay(){
    console.log("去支付")
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  toPay(){
    wx.navigateTo({
      url: '/pages/order/index?id='+this.data.good.id+"&count="+this.data.carData.count
    })
  },
  addCar(){
    let that=this
    //发送请求存储的购物车
    //发送的数据有
    let updatedAt=new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2)
    this.setData({
      "carData.updatedAt":updatedAt,
      "carData.id":new Date().getTime()
    })
    console.log("this.data.carData",this.data.carData)
    createShopCar(this.data.carData).then((res)=>{
      console.log(res)
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 1000
      })
    }) 
  },
  onClickToCar(){
    wx.switchTab({
      url: '/pages/shopCar/index?id='+this.data.good.id+"&count="+this.data.carData.count
    })
  }
})
