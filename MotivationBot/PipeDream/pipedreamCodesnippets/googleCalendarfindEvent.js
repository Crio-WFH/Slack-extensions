async(event, steps, params, auths) => {
  
const axios = require('axios')

const calendarId = params.calendarId || "primary"
const calendarParams = ["q", "iCalUID", "maxAttendees", "maxResults", "orderBy", "pageToken", "privateExtendedProperty", "sharedExtendedProperty", "showDeleted", "showHiddenInvitations", "singleEvents", "timeMax", "timeMin", "timeZone", "updatedMin"]

// DATE CODE [ DO NOT TOUCH ]

    var today = new Date();
    const currentEpoch = Math.floor(new Date().getTime()/1000.0);
    
    var date = new Date(currentEpoch * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var alformattedTime = (parseInt(hours) + 1) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy+'-'+mm+'-'+dd+'T'+formattedTime+'Z';
    //var tomorrow = yyyy+'-'+mm+'-'+ (parseInt(dd)+1 ) +'T00:00:00Z';
    var altomorrow = yyyy+'-'+mm+'-'+ dd +'T'+alformattedTime+'Z';
    
// DATE CODE [ DO NOT TOUCH ]

const {q, iCalUID, maxAttendees, maxResults, orderBy, pageToken, privateExtendedProperty, sharedExtendedProperty, showDeleted, showHiddenInvitations, singleEvents, timeMax, timeMin, timeZone, updatedMin} = params
p = params
p.timeMin = today
p.timeMax = altomorrow

const queryString = calendarParams.filter(param => p[param]).map(param => `${param}=${p[param]}`).join("&")


return await require("@pipedreamhq/platform").axios(this, {
  url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${queryString}`,
  headers: {
    Authorization: `Bearer ${auths.google_calendar.oauth_access_token}`,
  },
  method: 'GET'
})
}
