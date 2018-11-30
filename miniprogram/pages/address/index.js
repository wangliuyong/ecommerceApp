
//index.js
//获取应用实例
import address from '../../common/address'

let {userAddressByProps,updateUserAddress}=address
var app = getApp()

Page({
  data: {
    allAddress: [],//地址列表
  },
  onLoad: function () {
    this.getAddress({"user_id":app.globalData.openid})
    
  },
  onShow:function(){
     //发送请求,获取用户联系人地址列表
     this.getAddress({"user_id":app.globalData.openid})
  },
  addrss(){
    wx.navigateTo({
        url: '/pages/address/addto/index'
      })
  },
  radioChange(e){
    console.log(e.detail.value)
    let id=e.detail.value
    this.data.allAddress.map((item)=>{
      if(item.id==id){
        updateUserAddress({id:item.id,default:"1"})
      }else{
        updateUserAddress({id:item.id,default:"0"})
      } 
    })
  },
  //封装函数
  getAddress(data){
    userAddressByProps(data).then((e)=>{
      console.log(e.data.userAddressbyprops)
      this.setData({
        allAddress:e.data.userAddressbyprops
      })
    })
  },

})
