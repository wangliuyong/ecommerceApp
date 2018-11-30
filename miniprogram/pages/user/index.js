//index.js
import user from '../../common/user'

let {
  createUser,
  getUserByProps
} = user

const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function () {
    let that =this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              that.getUser({openid:app.globalData.openid}).then((e)=>{
                console.log('getUser',e)
                if(e.data.userbyprops.length==0){
                  let data = {
                    "createdAt": new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
                    "email": "1355498705@qq.com",
                    "openid": app.globalData.openid,
                    "password": "135549",
                    "telephone": "13222637947",
                    "updatedAt": "",
                    "userData_id": "",
                    "username": res.userInfo.nickName,
                    "id": new Date().getTime()+parseInt(Math.random(),10)
                  }
                  that.createUsers(data)
                }
              })
            }
          })
        }
      }
    })
  },
  onShow(){
    console.log('userInfo',this.data.userInfo)
  },
  address() {
    wx.navigateTo({
      url: '/pages/address/index'
    })
  },
  order() {
    wx.navigateTo({
      url: '/pages/orderCenter/index'
    })
  },
  //封装的函数
  createUsers(data){
    createUser(data).then((e)=>{
      console.log('createUser',e)
    })
  },
  getUser(data){
    return getUserByProps(data).then((e)=>{
      return e
    })
  }
  /* getuser(e){
    console.log('user',e)
  } */
})