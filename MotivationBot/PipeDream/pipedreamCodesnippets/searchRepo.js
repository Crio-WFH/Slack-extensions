async(params, auths) => {

//See the API docs: https://developer.github.com/v3/search/#search-repositories
const config = {
  url: `https://api.github.com/search/repositories`,
  params: {
    order: params.order,
    q: params.query,
    sort: params.sort,
  },
  headers: {
    Authorization: `Bearer ${auths.github.oauth_access_token}`,
  },
}
return await require("@pipedreamhq/platform").axios(this, config)
}
