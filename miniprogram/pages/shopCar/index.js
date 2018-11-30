//index.js
import data from '../../data'
import shopCar from '../../common/shopCar' 
import pay from '../../common/pay'

let {getAllShopCar,deleteShopCar}=shopCar
let {payRuqest}=pay

const app = getApp()

Page({
  data: {
    sumPrice:0,
    allGood:{},
    good_id:"",
    allGoods:[],
    sumPrice:"",
    shopCarCount:''
  },
  onLoad: function(option) {
   console.log('option',option)
  },
  onShow(){
    this.getShopCar()
  },
  delete(e){
    console.log(e.currentTarget.id)
    deleteShopCar({id:e.currentTarget.id}).then((e)=>{
      console.log(e)
      this.getShopCar()
    })
    
  },
  onSubmit(){
    wx.navigateTo({
      url: "/pages/order/index?shopCar=true&sumPrice="+this.data.sumPrice+"&shopCarCount="+this.data.shopCarCount
    })
  },

  //封装的函数
  getShopCar(){

    getAllShopCar({"user_id":app.globalData.openid}).then((e)=>{
      console.log("getAllShopCar",e.data.userCartbyprops)
      this.setData({
        allGoods:e.data.userCartbyprops
      })

      let sum=0,shopCarCount=0;
      e.data.userCartbyprops.map((item)=>{
        sum+=item.count*item.product_id.price
        shopCarCount+=item.count
      })

      console.log(sum)
      this.setData({
        sumPrice:sum*100,
        shopCarCount
      })

      console.log("shopCarCount",shopCarCount)
    })

  },
  createOrder(data){
    let that =this,
    {orderStatus,payTime,shopCar}=data
    console.log("this.data.order.good",this.data.order.good)
    
    let id=new Date().getTime()+parseInt(Math.random(),10),
        openid=app.globalData.openid;

    let orderData = {
      "count": that.data.order.selectCount,
      "createdAt": new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
      "deliveryTime": "",
      "id": id,
      "orderLogistics_id": "",
      "orderPay_id": "546455464456",
      "orderShipFee": 0,
      "orderStatus": orderStatus,
      "orderTotalPay": that.data.sumPrice/100,
      "payTime": payTime,
      "productTotalPay": that.data.order.good.price *that.data.order.selectCount,
      "updatedAt": "",
      "userAddress_id": that.data.defaultAddress.id,
      "user_id": openid
    }
    createOrder(orderData).then((e) => {
      console.log('创建订单成功', e)
    })



  },
  createOrderProduct(data){
    let {orderPay,order_id,openid}=data,that=this
    let productData = {
      "count": that.data.order.selectCount,
      "createdAt": new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
      "id": new Date().getTime()+parseInt(Math.random(),10),
      "orderPay": orderPay,
      "order_id": order_id,
      "productPay": that.data.order.good.price *that.data.order.selectCount,
      "product_id": that.data.order.good.id,
      "remark": that.data.message,
      "unit": "100",
      "updatedAt": "",
      "user_id": openid
    }
    
    console.log("productData",productData)
    
    createProductOrder(productData).then((e)=>{
      console.log("创建订单产品信息成功",e)
    })
  }

})
