import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let createUserAddress=function(data){
    return gql.mutate({
        mutation:`mutation createuserAddress($address: String, $updatedAt: String, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $id: ID!, $user_id: ID, $area: String, $province: String) {
            createuserAddress: create_userAddress(address: $address updatedAt: $updatedAt telephone: $telephone
                default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt id: $id user_id: $user_id area: $area province: $province) {
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
                area
                province
            }
        }`,
        variables:data 
      }).then((e)=>{
        return e
      }).catch((e)=>{
          return e
      })
}

let getUserAddressByUser_id=function(userId){
    return gql.query({
        query:`query userAddressbyprops($address: String, $updatedAt: String, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $user_id: String, $area: String, $province: String) {
            userAddressbyprops: userAddress_by_props(address: $address updatedAt: $updatedAt telephone: $telephone
                default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt user_id: $user_id area: $area province: $province) {
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
        }`,
        variables:{
            user_id:userId
        }
    }).then((e)=>{
        return e
    }).catch((e) => {
        return e
      })
}

let userAddressByProps=function(data){
    return gql.query({
        query:`query userAddressbyprops($address: String, $updatedAt: String, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $user_id: ID, $area: String, $province: String) {
            userAddressbyprops: userAddress_by_props(address: $address updatedAt: $updatedAt telephone: $telephone
                default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt user_id: $user_id area: $area province: $province) {
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
                area
                province
            }
        }`,
        variables:data
    }).then((e)=>{
        return e
    }).catch((e)=>{
        return e
    })
}

let updateUserAddress=function(data){
    return gql.mutate({
        mutation:`mutation updateuserAddress($address: String, $updatedAt: String, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $id: ID, $user_id: ID, $area: String, $province: String) {
            updateuserAddress: update_userAddress(address: $address updatedAt: $updatedAt telephone: $telephone
                default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt id: $id user_id: $user_id area: $area province: $province) {
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
                area
                province
            }
        }`,
        variables:data 
      }).then((e)=>{
        return e
      }).catch((e)=>{
          return e
      })
}



export default {
    createUserAddress,
    getUserAddressByUser_id,
    userAddressByProps,
    updateUserAddress
}