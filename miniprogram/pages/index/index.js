//index.js

import product from '../../common/goods'



let {getProductByProps}=product

const app = getApp()

Page({
  data: {
    slideShow:[],
    logged: false,
    search:"",
    goods:[],
    magazine:[],
    fruit:[],
    allGoods:[]
  },
  onLoad: function() {
    
  },
  onShow(){
    //页面显示后获取产品
    this.getProduct({status:'1'})
  },
  clickTab(e){
    console.log(e)
  },
  clickGood(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.currentTarget.id
    }) 
  },
  onSearch(e){
    console.log(e.detail)
    let value =e.detail
    //得到所有产品的名字，进行模糊搜索
    let product=[],name='';
    this.data.allGoods.map((item)=>{
      if(item.category=="所有果品"){
        product=item.goods
      }
    })
    console.log(product)
    product.map((item)=>{
      if(item.name.indexOf(value)!=-1){
        console.log(item.name)
        name=item.name
        this.setData({
          search:name
        })
        this.getProduct({name})
      }
    })
  },
  onCancel(){
    this.getProduct({data:'1'})
    this.setData({
      search:""
    })
  },
  //封装函数
  getProduct(data){
    getProductByProps(data).then((e)=>{
      this.categoricalData(e);
    })
  },
  //分类
  categoricalData(e){

    console.log('product',e.data.productbyprops)
    let category=[];
    e.data.productbyprops.map((item)=>{
      category.push(item.category)
    })
    category=Array.from(new Set(category))
    console.log("category",category)
    let allGoods=[];

    
    allGoods.push({
      category:"所有果品",
      goods:e.data.productbyprops
    })
    category.map((it)=>{
      let hash={}
      hash["category"]=it;
      hash.goods=e.data.productbyprops.filter((item)=>{
        return item.category==it
      })
      allGoods.push(hash)
    })

    console.log('allGoods',allGoods)
    this.setData({
      allGoods:allGoods
    })

  }
})
