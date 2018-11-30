import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

var createSearch=function(data) {
  return gql.mutate({
    mutation: ``,
    variables: data
  }).then((res) => {
    return res
  }).catch(() => {

  })
}

var getSearch=function(data) {
  return gql.query({
      query: ``,
      variables: data
    }).then((res) => {
      return res
    }).catch(() => {
      return res
    })
}



export default{
    createSearch,
    getSearch
}