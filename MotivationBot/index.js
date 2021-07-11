
// import statements
const { WebClient, LogLevel } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

const axios = require('axios')
const cron = require("node-cron");
let shell = require("shelljs");

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
    cronJob();

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
    
    if(message.includes(' help')){
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
    const helpText = 
    `Hi. Hope you are doing good. 🤗
     I am capable of following : 
     1. Sending quotes, advice and affirmations daily.
     2. Set reminders [remindme, remindus] with precision of minutes, hours, or days
     3. Sending Google Calendar event alert when you have a meeting within one hour, so you dont miss it. 
     4. I send Github alerts when > you are mentioned,  or a branch is created or an issue is raised for your repository
     5. Can search for your Github repository using /repository_exact_name command. Non Case sensitive. 
     
     I am constantly being updated for your better experience. 🥳`


    postMessage(event, helpText)
}

//// handler for error/no match case
function handleError(event){
    const oops = 
    `Oops, I dunno what you mean ?! 
     Use 'help' for knowing my capabilities. 🥺`
    postMessage(event,oops)

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

    const message = event.text
    const splitMessage = message.split(',')
    const timeDesc = splitMessage[1].split(" ")
    const resposeLength = timeDesc.length

    const currentEpoch = Math.floor(new Date().getTime()/1000.0);
    var futureTime = currentEpoch
    var scheduledTimeMessage = 'Reminder set successfully at ' + toReadableTime(futureTime,event);
    

    if(timeDesc[resposeLength-1] === 'hour' || timeDesc[resposeLength-1] === 'hours' || timeDesc[resposeLength-1] === 'hh' || timeDesc[resposeLength-1] === 'h' ){
        futureTime = currentEpoch + (parseInt(timeDesc[resposeLength-2]) * 3600)
        scheduledTimeMessage = 'Reminder set successfully at ' + toReadableTime(futureTime,event);
    }
    else if(timeDesc[resposeLength-1] === 'minute' || timeDesc[resposeLength-1] === 'minutes' || timeDesc[resposeLength-1] === 'mm' || timeDesc[resposeLength-1] === 'm' ){
        futureTime = currentEpoch + (parseInt(timeDesc[resposeLength-2]) * 60)
        scheduledTimeMessage = 'Reminder set successfully at ' + toReadableTime(futureTime,event);
    }
    else if(timeDesc[resposeLength-1] === 'day' || timeDesc[resposeLength-1] === 'days' || timeDesc[resposeLength-1] === 'dd' || timeDesc[resposeLength-1] === 'd'){
        futureTime = currentEpoch + (parseInt(timeDesc[resposeLength-2]) * 86400)

        scheduledTimeMessage = 'Reminder set successfully for ' + timeDesc[resposeLength-2] +  ' day' ;       
    }

    const messageToRemind = splitMessage[0].split("remindme")
    console.log('>>>>>>>>>>>>'+ messageToRemind[messageToRemind.length-1]);

    (async () =>{
    try {
        await slackClient.reminders.add({token : userToken , text :messageToRemind[messageToRemind.length-1], time:  futureTime})
        
    }catch(error){
        console.error(error)
    }
})();
postMessage(event, scheduledTimeMessage)

}

function postMessage(event,text){
    (async () =>{
        try{
            await slackClient.chat.postMessage({channel : event.channel, text : '> '+ text })
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

function postSimpleMessage(text){

    (async () =>{
        const result = await slackClient.chat.postMessage({
            // The token you used to initialize your app
            token: slackToken,
            channel: 'motivatorbotdemo',
            text: '> '+text
            // You could also use a blocks[] array to send richer content
          });

          console.log(result)
        })();

}

function cronJob(){
try{
    console.log("Cron Job Started ...")
    
    //  set advice message at 3 PM
    cron.schedule("0 0 15 * * MON,TUE,WED,THU,FRI,SAT,SUN *", function(){
        
        axios.get('https://api.adviceslip.com/advice')
        .then(res =>{
            const advice = res.data.slip.advice + '🥺👉👈';
            console.log(advice)
            postSimpleMessage(advice)
        })
    
    });

    //set morning affirmation message at 9 AM 
    cron.schedule("0 0 9 * * MON,TUE,WED,THU,FRI,SAT,SUN *", function(){
    
    axios.get('https://www.affirmations.dev')
    .then(res =>{
        const affirmation = 'Hi, Good Morning. '+ res.data.affirmation +'🤗';
        console.log(affirmation)
        postSimpleMessage(affirmation)
    })

    });

    // set quote message at 6 PM
    cron.schedule("0 0 18 * * MON,TUE,WED,THU,FRI,SAT,SUN *", function(){
        axios.get("https://type.fit/api/quotes")
        .then(res =>{
            const rand = Math.floor(Math.random()*1000);
            const quotes = res.data[rand].text + '🤔';
            console.log(quotes)
            postSimpleMessage(quotes)
        })
    });

    }catch(error){
        console.log(error)
    }
}
