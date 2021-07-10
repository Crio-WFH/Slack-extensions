async(event,steps,auths)=>{
return await require("@pipedreamhq/platform").axios(this, {
  url: `https://www.googleapis.com/calendar/v3/calendars/primary`,
  headers: {
    Authorization: `Bearer ${auths.google_calendar.oauth_access_token}`,
  },
})  
}
