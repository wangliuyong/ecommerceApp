# 电商小程序
使用技术栈:微信小程序+graphql+mongoDB
使用者只需要设计前端页面，后端自动生成，大大简化了后端操作。
## 参考文档


##  前置
grphql 好处我不用多说,想了解的话请点[传送通道](https://xxx.com)
熟悉使用react 都会知道Apollo，假如您使用Apollo开发，请移步到Apollo  链接

#### 1.Apollo
Apollo是一整套的关于GraphQl的工具套件吧，各种后台语言java、php、nodej的都有，关于前端框架封装GraphQl，让GraphQl使用更简单，更优化的库类也都有。vue、react等。

#### 2.小程序
小程序不同传统的网页。小程序是无浏览器环境的，而且也没ajax，用的是自己的api。

本文将会详细介绍在小程序上面使用graphql的方法

## 电商小程序实现的过程

**需求分析 -> 数据库的设计 -> 生成fc -> 测试接口 -> 获取数据进行展示 （前端）**

这些流程一个前端就可以实现。
### 一.需求分析
罗列出大众对电商类需求。

### 二.电商案例数据结构数据设计
根据需求分析，合理的将各种需求转换成各种表，进而转化成数据库结构

### 三.生成fc(fc 的命令行部署)


**流程：数据表 -> csv -> 可执行文件及配置文件 -> 部署到无服务器云函数 。**

以上流程实现起来比较麻烦，因此我们进行了集成，只需执行几条命令版可以自动实现

#### 1.首先将fass-backend工程下载到本地 

```
git clone  http://gogs.ioobot.com:6680/ioobot/faas-backend.git
```
下载后切换到**jna**分支

在faas-backend\module\deploy-tools目录下新建如temp/temp目录结构参考

#### 2.fass-backend根目录下执行命令生成配置文件
   
```
lein run -v -n -c -d -i schema/magazine.csv ../graphql/cloud/ide-graphql/config/magazine_schema.edn ../graphql/cloud/ide-graphql/config/resolve-map.edn
```


*注：csv替换 csv 为自己的，后面两个是输出，目录可以修改，名字不要改。*

执行命令后会在指定的目录下生成magazine_schema.edn resolve-map.edn 这两个配置文件

#### 3.创建目录结构
fass-backend 工程目录下的 module/deploy-tools 下面，创建temp目录和 temp/temp，以及temp/conf。

将home5[点击下载](https://wly-order-restaurant-1254337200.cos.ap-chengdu.myqcloud.com/home-5.zip?q-sign-algorithm=sha1&q-ak=AKIDNQIy1kNG3rjzyZQOUXVBcf8723qokWyc&q-sign-time=1545029074;1545030874&q-key-time=1545029074;1545030874&q-header-list=&q-url-param-list=&q-signature=2fe5b5f3fa8ae392085ee3025778cce8e6bb265f&x-cos-security-token=cd2805401ca4f3bb247d7d51eaac0968463c2b6610001)解压这个到temp/temp下 将上一步生成的`magazine_schema.edn  resolve-map.edn`这两个文件拷贝到temp/temp 覆盖原有的文件。



#### 3.安装最新的tencentcloud-sdk包
将该工程下载本地
```
git clone http://gogs.ioobot.com:6680/ioobot/tencentcloud-sdk.git
```
*tip:可以在fass-backend 的project.clj中先查看的tencentcloud-sdk版本，要保持最新版*

随后进入工程根目录执行
```
maven 
```

安装成功

#### 5. 打包（配置文件放在同一个目录下，然后打成zip包）

```
lein run -z <文件所在目录> <输出的zip名称>
```
例子：
```
lein run -z temp/temp temp/na-fc.zip
```

执行命令会在temp/temp下生成一个na-fc.zip。这个包也可以手动部署到fc

#### 6.部署到 fc(两种方式，推荐使用第一种)
1.通过cos部署
```
lein run -d testnfc temp/conf false
```
 说明： 把配置文件放在 temp/conf目录下，*[此时的目录结构点击下载](https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/temp.zip)* testnfc是函数名（需符合云服务商的命名规则）， 
 false 是指执行文件在cos里，名称缺省为 bucket "native-fc" 文件 "fc-only.zip"（cos中已经有个名字为'native-fc'bucket 了，已经创建好的，编译好的文件，用户不可更改，执行上面的命令后会从cos上下载三个执行文件**glserver、libsunec、load**到temp/conf下，然后跟本地的temp/conf下的 （四个文件），一起打包成一个remote.zip
 
 2.通过本地部署
 
```
lein run -d testnfc temp/conf true
```

 说明：如果执行文件在本地，则设为true，并创建native-fc目录,把只包含执行文件（包括.so .py，但不包括*.edn) 的zip
 起名为 fc-only.zip  
 
 打印日志："info:" "finished create fc"出现这个就说明fc创建成功
 
 *此时我们可以去云函数查看，会发现testnfc已经被创建*
 
#### 7.创建 api gw

```
lein run -a 服务名 云函数名 serviceId
```
参数：serviceId = 上次部署时产生的service 名称（这个就是在api网关那创建的服务），也可以没有（会默认创建一个新的）

例如: 
```
lein run -a autonfc testnfc
```

此时去tencen控制台下api 网关查看会发现刚创建好的服务，进入该服务下的环境管理，复制访问路径到浏览器并在最后添加/about,回车页面出现{"msg":"Clojure 1.9.0 - served from "}说明部署成功。部署成功之后我们可以进行自定义域名的配置，api服务自定义域名的配置详情见tencen云文档，假设这里我们配置好的自定义域名为：ec.ioobot.cn.（注意小程序的请求只能是https协议的，配置时需注意）

### 四.测试接口

浏览器访问 `ec.ioobot.cn/ql` 即可进入graphql的IDE界面，我们可以很方便的在ide中进行获取各种数据测试。

例如获取所有产品：

查询语句：
```
query productbyprops($category: String, $updatedAt: String, $name: String, $createdAt: String, $status: String, $intro: String, $price: Float, $img: String, $stock: Int) {
        productbyprops: product_by_props(category: $category updatedAt: $updatedAt name: $name createdAt: $createdAt status: $status intro: $intro price: $price img: $img stock: $stock) {
            category
            updatedAt
            unit`在这里插入代码片`
            name
            createdAt
            status
            id
            intro
            price
            img
            stock
        }
    }
```
结果：

```
{
  "data": {
    "productbyprops": [
      {
        "category": "鲜果",
        "updatedAt": "2018-12-31 11:11:11",
        "unit": [
          100,
          200,
          500
        ],
        "name": "橙子",
        "createdAt": "2018-12-31 11:11:11",
        "status": "1",
        "id": "1",
        "intro": "有机大橙子",
        "price": 8.99,
        "img": "https://ece-img-1254337200.cos.ap-chengdu.myqcloud.com/orange.jpg",
        "stock": 1000
      }
    ]
  }
}
```

相关测试成功之后，我们们就可以使用接口`ec.ioobot.cn/ql`来进行小程序的开发了。
### 五.获取数据进行展示
####  小程序使用 `GraphQl`

##### 1.原理
GraphQl请求跟Restfel api的请求一样，都是一个http请求。只是GraphQl的请求入口有且只有一个，一般是graphql服务端的入口/graphql ，请求方法是post。

所以GraphQl请求无非就是post方法到`http://xxxx.com/graphql`的请求，并传一些参数来使graphql服务端根据参数不同来执行不同的方法，从而实现不同的接口效果，返回想要请求得到的数据。

##### 2.发送请求的方法
知道了原理，发送请求就变得简单起来。你可以使用小程序自带的原生的请求api发送请求，也可以使用别人封装的一个微信小程序发送graphql请求的GraphQL框架。链接地址：`https://github.com/Authing/wxapp-graphql`  推荐使用框架，简单方便快捷。

## 结束





