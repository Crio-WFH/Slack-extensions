const slackBot = require('slackbots')
const axios = require('axios')

//initalize bot with token
const bot = new slackBot({
    token : 'xoxb-your-token',
    name : 'Motivator Bot'
})

// start handler
bot.on('start', ()=>{
    const params = {
        icon_emoji: ':bow:'

    }

    //introduction message of bot
    bot.postMessageToChannel(
        'motivatorbotdemo', 
        'Hiya, I am here with you for boosting your morale. 🥺', 
        params
        );

    bot.on('error', (err) => 
        console.log(err));

    bot.on('message', (data) => {

        if(data.type != 'message'){
            return;
        }

        handleMessage(data.text);
    })

    //cases on which bot responds
        function handleMessage(message){
        if(message.includes(' advice')){
            handleAdvices();
        }
        if(message.includes(' affirmation')){
            handleAffirmation();
        }
        if(message.includes(' quotes')){
            handleQuotes();
        }
        if(message.includes(' help')){
            handleHelp();
        }else if(message.includes('<@U027UL7PFUZ>')  && !message.includes(' advice') && !message.includes(' affirmation') && !message.includes(' quotes'))
            handleError();
        }
})

//Advices of bot
function handleAdvices(){

    axios.get('https://api.adviceslip.com/advice')
    .then(res =>{
        const advice = res.data.slip.advice;

        const params = {
            icon_emoji: ':blush:'
        }
    
        bot.postMessageToChannel(
            'motivatorbotdemo', 
            `Advice : ${advice} 🥺👉👈`, 
            params
        );    
    })
}
//Affirmations of bot
function handleAffirmation(){

    axios.get('https://www.affirmations.dev')
    .then(res =>{
        const affirmation = res.data.affirmation;

        const params = {
            icon_emoji: ':hugging_face:'
        }
    
        bot.postMessageToChannel(
            'motivatorbotdemo', 
            `Affirmation : ${affirmation} 😇👩🏻‍💻`, 
            params
        );    
    })
}

//Quotes handle 
function handleQuotes(){

    axios.get("https://type.fit/api/quotes")
    .then(res =>{
        const rand = Math.floor(Math.random()*1000);
        const quotes = res.data[rand].text;
        
        const params = {
            icon_emoji: ':thinking_face:'
        }
    
        bot.postMessageToChannel(
            'motivatorbotdemo', 
            `Quote : ${quotes} 🤔`, 
            params
        );    
    })
}

// help command handle
function handleHelp(){

        const params = {
            icon_emoji: ':bow:'
        }
    
        bot.postMessageToChannel(
            'motivatorbotdemo', 
            `Please use keywords 'advice' or 'quotes' or 'affirmation' to get good vibes. 😺`, 
            params
        );    
}

function handleError(){

    const params = {
        icon_emoji: ':pleading_face:'
    }

    bot.postMessageToChannel(
        'motivatorbotdemo', 
        `Oops, I dunno what to say.`, 
        params
    );    
    handleHelp();
}
