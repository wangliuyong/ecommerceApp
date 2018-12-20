//index.js
import address from '../../common/address'

let {userAddressByProps,updateUserAddress,deleteuserAddress}=address
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
  deleteAddress(data){
    deleteuserAddress(data).then((e)=>{
      this.getAddress({"user_id":app.globalData.openid})
      console.log(e)
    })
  },



  toModify(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/address/addto/index?id='+e.currentTarget.dataset.id
    })
  },
  toDelete(e){
    console.log(e.currentTarget.dataset.id)
    this.deleteAddress({id:e.currentTarget.dataset.id})
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
