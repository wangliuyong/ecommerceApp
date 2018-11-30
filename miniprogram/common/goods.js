import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);


let getProductById=function(id){
    return gql.query({
        query: `query getProductById($id:ID){
            product_by_id(id:$id){
              category
              createdAt
              id
              img
              intro
              name
              price
              status
              stock
              unit
              updatedAt
            }
          }`,
        variables: {
            id
        }
      }).then((res) => {
        return res
      }).catch((e) => {
        return e
      })
}
let getProductByProps=function(data){
  return gql.query({
      query: `query productbyprops($category: String, $updatedAt: String, $name: String, $createdAt: String, $status: String, $intro: String, $price: Float, $img: String, $stock: Int) {
        productbyprops: product_by_props(category: $category updatedAt: $updatedAt name: $name createdAt: $createdAt status: $status intro: $intro price: $price img: $img stock: $stock) {
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
    }`,
      variables: data
    }).then((res) => {
      return res
    }).catch((e) => {
      return e
    })
}


export default {
    getProductById,
    getProductByProps
}