//index.js
import address from '../../../common/address'
//import { timingSafeEqual } from 'crypto';


let {createUserAddress}=address


const app = getApp()

Page({
  data: {
    addressData:{
      "address": "",
      "area": "",
      "city": "",
      "default":0,
      "id": "",
      "postcode": "",
      "province": "",
      "telephone": "",
      "updatedAt": "",
      "user_id": "",
      "username": ""
    },
    region: ['安徽省', '合肥市',''],
  },
  onLoad: function(option) {
    console.log(option)

  },
  onShow(){
    
  },
  clickLocation(){
    console.log("click location")
  },
  changeInput(e){
    let index=e.currentTarget.id
    if(index=='1'){this.setData({"addressData.username":e.detail})}
    if(index=='2'){this.setData({"addressData.telephone":e.detail})}
    if(index=='4'){this.setData({"addressData.address":e.detail})}
    if(index=='5'){this.setData({"addressData.postcode":e.detail})}
    console.log(this.data)
  },
  clickArea(){

  },
  bindRegionChange(e){
    console.log(e.detail.value)
    this.setData({
      "addressData.province":e.detail.value[0],
      "addressData.city":e.detail.value[1],
      "addressData.area":e.detail.value[2],
    })

  },
  save(){
    this.setData({
      "addressData.default":0,
      "addressData.id":new Date().getTime(),
      "addressData.updatedAt":new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
      "addressData.user_id":app.globalData.openid,
    })

    let save=true,addData=this.data.addressData
    
    if(addData.telephone.length<11){
      save=false
    }
    for(let key in addData){
      console.log('this.data.addressData[key]',addData)
      if(addData[key].length==''||addData[key]==null){
        save=false
      }
    }

    console.log('this.data.addressData',this.data.addressData)
    if(save){
      //提交数据,要修改
      createUserAddress(this.data.addressData).then((e)=>{
        console.log('createAddress',e)
        wx.showToast({
          title: '新建地址成功',
          icon: 'success',
          duration: 1000
        })
      })

      
    }else{
      wx.showToast({
        title: '数据为空或格式不正确',
        icon: 'none',
        duration: 1000
      })
    }
  }
})
