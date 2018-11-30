import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let createProductOrder=function(data){
    return gql.mutate({
        mutation:`mutation createorderProduct($remark: String, $updatedAt: String, $unit: String, $product_id: ID, $orderPay: Float, $createdAt: String, $order_id: ID, $id: ID!, $count: Int, $productPay: Float, $user_id: ID) {
            createorderProduct: create_orderProduct(remark: $remark updatedAt: $updatedAt unit: $unit product_id: $product_id orderPay: $orderPay createdAt: $createdAt order_id: $order_id id: $id count: $count productPay: $productPay user_id: $user_id) {
                remark
                updatedAt
                unit
                product_id {
                    category
                    updatedAt
                    unit
                    name
                    createdAt
                    status
                    id
                    intro
                    price
                    img
                    stock
                }
                orderPay
                createdAt
                order_id {
                    deliveryTime
                    updatedAt
        
                    payTime
                    orderTotalPay
                    createdAt
                    orderStatus
        
                    id
                    orderShipFee
                    count
        
                    productTotalPay
                }
                id
                count
                productPay
                user_id {
                    email
                    updatedAt
                    password
                    telephone
                    username
                    createdAt
                    openid
                    id
                }
            }
        }`,
        variables:data 
      }).then((e)=>{
        return e
      }).catch((e)=>{
        return e
    })
}



let createOrder=function(data){
  return gql.mutate({
      mutation:`mutation createorder($deliveryTime: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $id: ID!, $orderShipFee: Float, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID) {
        createorder: create_order(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id id: $id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
            deliveryTime
            updatedAt
            orderLogistics_id {
                updatedAt
                logisticsFee
                expressId
                createdAt
    
                consigneeTel
                id
                consignAddress
                LogisticsStatus
    
                consigneeName
            }
            payTime
            orderTotalPay
            createdAt
            orderStatus
            userAddress_id {
                address
                updatedAt
                telephone
                default
                city
                username
                postcode
                createdAt
                deletedAt
                id
    
                area
                province
            }
            id
            orderShipFee
            count
            user_id {
                email
                updatedAt
                password
                telephone
                username
                createdAt
                openid
                id
            }
            productTotalPay
            orderPay_id {
                id
    
    
                totalPay
                transactionId
                payTime
            }
        }
    }`,
      variables:data 
    }).then((e)=>{
      return e
    }).catch((e)=>{
        return e
    })
}

let getOrder=function(data){
    return gql.query({
        query: `query orderbyprops($deliveryTime: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $orderShipFee: Float, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID) {
            orderbyprops: order_by_props(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
                deliveryTime
                updatedAt
                orderLogistics_id {
                    updatedAt
                    logisticsFee
                    expressId
                    createdAt
        
                    consigneeTel
                    id
                    consignAddress
                    LogisticsStatus
        
                    consigneeName
                }
                payTime
                orderTotalPay
                createdAt
                orderStatus
                userAddress_id {
                    address
                    updatedAt
                    telephone
                    default
                    city
                    username
                    postcode
                    createdAt
                    deletedAt
                    id
        
                    area
                    province
                }
                id
                orderShipFee
                count
                user_id {
                    email
                    updatedAt
                    password
                    telephone
                    username
                    createdAt
                    openid
                    id
                }
                productTotalPay
                orderPay_id {
                    id
        
        
                    totalPay
                    transactionId
                    payTime
                }
            }
        }`,
        variables: data
      }).then((res) => {
        return res
      }).catch((error) => {
        return error
      })
}

let getOrderById=function(data){
    return gql.query({
        query: `query orderbyid($id: ID) {
            orderbyid: order_by_id(id: $id) {
                deliveryTime
                updatedAt
                orderLogistics_id {
                    updatedAt
                    logisticsFee
                    expressId
                    createdAt
        
                    consigneeTel
                    id
                    consignAddress
                    LogisticsStatus
                    user_id
                    consigneeName
                }
                payTime
                orderTotalPay
                createdAt
                orderStatus
                userAddress_id {
                    address
                    updatedAt
                    telephone
                    default
                    city
                    username
                    postcode
                    createdAt
                    deletedAt
                    id
                    user_id
                    area
                    province
                }
                id
                orderShipFee
                count
                user_id
                productTotalPay
                orderPay_id {
                    id
                    user_id
        
                    totalPay
                    transactionId
                    payTime
                }
            }
        }`,
        variables: data
      }).then((res) => {
        return res
      }).catch((error) => {
        return error
      })
}

let getOrderProduct=function(data){
    return gql.query({
        query: `query orderProductbyprops($remark: String, $updatedAt: String, $unit: String, $product_id: ID, $orderPay: Float, $createdAt: String, $order_id: ID, $count: Int, $productPay: Float, $user_id: ID) {
            orderProductbyprops: orderProduct_by_props(remark: $remark updatedAt: $updatedAt unit: $unit product_id: $product_id orderPay: $orderPay createdAt: $createdAt order_id: $order_id count: $count productPay: $productPay user_id: $user_id) {
                remark
                updatedAt
                unit
                product_id {
                    category
                    updatedAt
                    unit
                    name
                    createdAt
                    status
                    id
                    intro
                    price
                    img
                    stock
                }
                orderPay
                createdAt
                order_id {
                    deliveryTime
                    updatedAt
        
                    payTime
                    orderTotalPay
                    createdAt
                    orderStatus
        
                    id
                    orderShipFee
                    count
        
                    productTotalPay
                }
                id
                count
                productPay
                user_id {
                    email
                    updatedAt
                    password
                    telephone
                    username
                    createdAt
                    openid
                    id
                }
            }
        }`,
        variables: data
      }).then((res) => {
        return res
      }).catch((error) => {
        return error
      })
}

let updateOrder=function(data){
    return gql.mutate({
        mutation:`mutation updateorder($deliveryTime: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $id: ID, $orderShipFee: Float, $count: Int, $user_id: String, $productTotalPay: Float, $orderPay_id: ID) {
            updateorder: update_order(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id id: $id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
                deliveryTime
                updatedAt
                orderLogistics_id {
                    updatedAt
                    logisticsFee
                    expressId
                    createdAt
        
                    consigneeTel
                    id
                    consignAddress
                    LogisticsStatus
                    user_id
                    consigneeName
                }
                payTime
                orderTotalPay
                createdAt
                orderStatus
                userAddress_id {
                    address
                    updatedAt
                    telephone
                    default
                    city
                    username
                    postcode
                    createdAt
                    deletedAt
                    id
                    user_id
                    area
                    province
                }
                id
                orderShipFee
                count
                user_id
                productTotalPay
                orderPay_id {
                    id
                    user_id
        
                    totalPay
                    transactionId
                    payTime
                }
            }
        }`,
        variables:data 
      }).then((e)=>{
        return e
      }).catch((e) => {
        return e
      })
}


let deleteOrder=function(data){
    return gql.mutate({
        mutation:`mutation deleteorder($deliveryTime: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $id: ID, $orderShipFee: Float, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID) {
            deleteorder: delete_order(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id id: $id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id)
        }`,
        variables:data 
      }).then((e)=>{
        return e
      }).catch((e) => {
        return e
      })
}

let deleteOrderProduct=function(data){
    return gql.mutate({
        mutation:`mutation deleteorderProduct($remark: String, $updatedAt: String, $unit: String, $product_id: ID, $orderPay: Float, $createdAt: String, $order_id: ID, $id: ID, $count: Int, $productPay: Float, $user_id: ID) {
            deleteorderProduct: delete_orderProduct(remark: $remark updatedAt: $updatedAt unit: $unit product_id: $product_id orderPay: $orderPay createdAt: $createdAt order_id: $order_id id: $id count: $count productPay: $productPay user_id: $user_id)
        }`,
        variables:data 
      }).then((e)=>{
        return e
      }).catch((e) => {
        return e
      })
}
export default {
  createProductOrder,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrderProduct,
  deleteOrderProduct
}