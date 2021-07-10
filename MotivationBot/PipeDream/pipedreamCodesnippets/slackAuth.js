async (event, steps, auths) => {
return await require("@pipedreamhq/platform").axios(this, {
  url: `https://slack.com/api/users.profile.get`,
  headers: {
    Authorization: `Bearer ${auths.slack.oauth_access_token}`,
  },
})
}
