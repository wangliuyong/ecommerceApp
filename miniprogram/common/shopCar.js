import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let createShopCar=function(data){
    return gql.mutate({
      mutation:`mutation createuserCart($id: ID!, $user_id: ID, $product_id: ID, $count: Int, $createdAt: String, $updatedAt: String) {
        createuserCart: create_userCart(id: $id user_id: $user_id product_id: $product_id count: $count createdAt: $createdAt updatedAt: $updatedAt) {
            id
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
            count
            createdAt
            updatedAt
        }
    }`,
      variables:data 
    }).then((e)=>{
      return e
    }).catch((e)=>{
      return e
    })
}

let getAllShopCar=function(data){
  return gql.query({
    query:`query userCartbyprops($user_id: ID, $product_id: ID, $count: Int, $createdAt: String, $updatedAt: String) {
      userCartbyprops: userCart_by_props(user_id: $user_id product_id: $product_id count: $count createdAt: $createdAt updatedAt: $updatedAt) {
          id
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
          count
          createdAt
          updatedAt
      }
  }`,
    variables:data 
  }).then((e)=>{
    return e
  }).catch((e) => {
    return e
  })
}

let deleteShopCar=function(data){
  return gql.mutate({
    mutation:`mutation deleteuserCart($id: ID, $user_id: ID, $product_id: ID, $count: Int, $createdAt: String, $updatedAt: String) {
      deleteuserCart: delete_userCart(id: $id user_id: $user_id product_id: $product_id count: $count createdAt: $createdAt updatedAt: $updatedAt)
  }`,
    variables:data 
  }).then((e)=>{
    return e
  })
}




export default{
  createShopCar,
  getAllShopCar,
  deleteShopCar
}



