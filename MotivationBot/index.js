
// import statements
const { WebClient, LogLevel } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api')
const axios = require('axios')

// token assignments from .env
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackToken = process.env.SLACK_TOKEN
const userToken = process.env.USER_TOKEN


// port allocation and event declaration
const port = process.env.SLACK_PORT || 3000;
const slackEvents = createEventAdapter(slackSigningSecret)
const slackClient = new WebClient(slackToken, {
    logLevel: LogLevel.DEBUG
})

// event app_mention based trigger
slackEvents.on('app_mention',(event) =>{
    console.log(`got message from user ${event.user}: ${event.text}`);
    handleMessage(event);
    debugger;
});

// event error based log
slackEvents.on('error', console.error)

// console to output server has started
slackEvents.start(port).then(()=>{
    console.log(`Slack Event onStart : Port : Server started on port ${port}`)
})


// message handler (pretty much like a switch case)
function handleMessage(event){

    const message = event.text

    if(message.includes('advice')){
        handleAdvices(event);
    }

    if(message.includes(' affirmation')){
        handleAffirmation(event);
    }

    if(message.includes(' quotes')){
        handleQuotes(event);
    }
    
    if(message.includes(' help') || message.includes(' Hi') || message.includes(' Hey')){
        handleHelp(event);
    }    
    if(message.includes(' schedule')){
        scheduleMessage(event)
    }
    if(message.includes(' remindme')){
        remindUser(event)
    }
    if(message.includes(' remindus')){
        remindChannel(event)
    }

    else if(!message.includes(' advice') 
            && !message.includes(' affirmation') 
            && !message.includes(' quotes')
            && !message.includes(' help')
            && !message.includes(' schedule')
            && !message.includes(' remindme')
            && !message.includes(' remindus')){
        handleError(event)
    }
    console.log('fn handleMessage '+ message + ' '+ event.channel)
}

// handler for advice keyword
function handleAdvices(event){

    axios.get('https://api.adviceslip.com/advice')
    .then(res =>{
        const advice = res.data.slip.advice + '🥺👉👈';
        postMessage(event, advice)
    })
}

// handler for affirmation keyword
function handleAffirmation(event){
    axios.get('https://www.affirmations.dev')
    .then(res =>{
        const affirmation = res.data.affirmation +'🤗';
        postMessage(event, affirmation)
    })
}

// handler for quotes keyword
function handleQuotes(event){
    axios.get("https://type.fit/api/quotes")
    .then(res =>{
        const rand = Math.floor(Math.random()*1000);
        const quotes = res.data[rand].text + '🤔';
        postMessage(event,quotes)
    })
}

// handler for help keyword
function handleHelp(event){
    const helpText = `Hi. Please use keywords 'advice' or 'quotes' or 'affirmation' to get good vibes. 😺`
    postMessage(event, helpText)
}

//// handler for error/no match case
function handleError(event){
    const helpText = `Hi. Please use keywords 'advice' or 'quotes' or 'affirmation' to get good vibes. 😺`
    const oops = 'Oops, I dunno what you mean ?!'
    postMessage(event,oops)
    postMessage(event,helpText)
}
// handler for scheduling message
function scheduleMessage(event){
    const currentEpoch = Math.floor(new Date().getTime()/1000.0) 
    const channelId = event.channel;
    
    (async () =>{
    try {
        
    const result = await slackClient.chat.scheduleMessage({
        channel: channelId,
        text: "Will add scheduled message logic here",
        post_at: currentEpoch + 120
    });
        const scheduledTime = 'Schedule set successfully ' + toReadableTime(result.post_at,event);
        postMessage( event, scheduledTime )

    }
    catch (error) {
        console.error(error);
    }
})();
}

// handler for reminding user
function remindChannel(event){

    const currentEpoch = Math.floor(new Date().getTime()/1000.0);
    const scheduledTime = 'Reminder set successfully at' + toReadableTime(currentEpoch+30,event);

    (async () =>{
    try {
        await slackClient.reminders.add({token : userToken , text : `A reminder is set for y'all !!!`, time:  currentEpoch+30, channel : event.channel})
    }catch(error){
        console.error(error)
    }
})();
postMessage(scheduledTime, event )
}



function remindUser(event){

    const currentEpoch = Math.floor(new Date().getTime()/1000.0);
    const scheduledTime = 'Reminder set successfully at ' + toReadableTime(currentEpoch+30,event);
    (async () =>{
    try {
        await slackClient.reminders.add({token : userToken , text : `A personal reminder is sent to you !!!`, time:  currentEpoch+30})
        
    }catch(error){
        console.error(error)
    }
})();
postMessage(event, scheduledTime)

}

function postMessage(event,text){
    (async () =>{
        try{
            await slackClient.chat.postMessage({channel : event.channel, text : text })
        }catch (error){
            console.log(error.data)
        }
    })();
}
// function to convert unixtimestamp to readable format
function toReadableTime(unix_timestamp, event){

    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}
