import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

var createUser=function(data) {
  return gql.mutate({
    mutation: `mutation createuser($email: String, $updatedAt: String, $password: String, $telephone: String, $username: String, $createdAt: String, $openid: String, $id: ID!, $userData_id: ID) {
      createuser: create_user(email: $email updatedAt: $updatedAt password: $password telephone: $telephone username: $username createdAt: $createdAt openid: $openid id: $id userData_id: $userData_id) {
          email
          updatedAt
          password
          telephone
          username
          createdAt
          openid
          id
          userData_id {
              id
              nickname
              avatar
              isVip
              vipCode
              userPoint
              createdAt
              updatedAt
          }
      }
  }`,
    variables: data
  }).then((res) => {
    return res
  }).catch(() => {

  })
}

var getUserByProps=function(data) {
  return gql.query({
      query: `query userbyprops($openid: String, $username: String, $password: String, $telephone: String, $email: String, $userData_id: ID, $createdAt: String, $updatedAt: String) {
        userbyprops: user_by_props(openid: $openid username: $username password: $password telephone: $telephone email: $email userData_id: $userData_id createdAt: $createdAt updatedAt: $updatedAt) {
            email
            updatedAt
            password
            telephone
            username
            createdAt
            openid
            id
            userData_id {
                id
                nickname
                avatar
                isVip
                vipCode
                userPoint
                createdAt
                updatedAt
            }
        }
      }`,
      variables: data
    }).then((res) => {
      return res
    }).catch(() => {
      return res
    })
}



export default{
    createUser,
    getUserByProps
}