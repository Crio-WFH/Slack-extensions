
## MotivatorBot

### A simple bot which pushes you forward to do more with the help of alerts, reminders, schedulers, and Github, Google Calendar Integrations.

- How many times do we miss or get late on checking Github issues, mentions, or branch alerts. No more now, using Pipedream API to integrate Github, now one can directly get notified when they are mentioned, or a branch is created, or issue is raised for a repo.  

- Have you dozed off with naptime while a calendar event was scheduled for next one hour and so you missed it ? Say no further, you can now get alerts if there's a meeting in an hour with help of Pipedream integration and some JS snippets.

- Want to quick search your favorite github repo stats, or get issue counts, no need to open chrome. Just **/searchrepo** it. 

- In order to stay on track and to not miss out anything, one can set reminds for himself or for channel with precision of minutes or hours or days. Just **remindme** or **remindus** it

- Want to set scheduled messages with a friendly precision, you got it. Just **schedule** it

- Often during work all we feel is a need to find some positivity to deal with anxiety, stress or fear or even imposter syndrome. Sometimes words are the best friend we need. This bot posts a good morning alert, advice at noon, and quotes in evening. 

- Written solely on Javascript

<hr>
<p>

  _Bold words mentioned above are keywords/commands._  
</p>  

### Screenshots of the extension/software's working 
<img src="https://github.com/theprogrammedwords/Slack-extensions/blob/main/MotivationBot/Screenshot%202021-07-11%20at%2012.23.19%20PM.png">

### Demo Video Link
- [DEMO VIDEO](https://youtu.be/GFMnQXL8SBg)

Commands That work : 
- help : Displays help commands (syntax : **@Motivator Bot** help>
- /searchrepo : Search a repo within your Github org (syntax : /searchrepo repository-name)
- remindme : set reminder your user (syntax : **@Motivator Bot** remindme message,minute or hour or day)
- remindus : set reminder for channel (syntax : **@Motivator Bot** remindus message,minute or hour or day)
- schedule : schedule message (syntax : **@Motivator Bot** schedule message,friendly expression)
- quotes : (syntax : **@Motivator Bot** quotes)
- advice : (syntax : **@Motivator Bot** advice)
- affirmation : (syntax : **@Motivator Bot** affirmation)

Triggers that work : 
- Github Issue creation
- Github Branch creation
- Github mentions
- Next Google Calendar Event (within an hour)

## APIs Used:
[https://api.adviceslip.com/advice](https://api.adviceslip.com/advice) <br>
[https://www.affirmations.dev](https://www.affirmations.dev) <br>
[https://type.fit/api/quotes](https://type.fit/api/quotes) <br>
<br>

## Libraries used
- Slack Web API
- Slack Events API
- friendly cron
- node cron
- axios
- ngrok

## PipeDream Workflows 
- Issue Creation : 
https://pipedream.com/@rprasad43255/github-to-slack-communication-issuecreation-p_PACWRBV

- New Branch : 
https://pipedream.com/@rprasad43255/github-to-slack-communication-new-branch-p_OKCYwGr

- User Mentions : 
https://pipedream.com/@rprasad43255/github-to-slack-communication-new-branch-p_OKCYwGr
  
- Search repo : 
https://pipedream.com/@rprasad43255/github-to-slack-communication-search-github-repo-p_PACWRJZ
  
- Get Next Google Calendar Event : 
https://pipedream.com/@rprasad43255/googlecalendaralerts-p_YyCWZwG

## Quick Start

``` bash
# Install dependencies
npm install
npm install @slack/web-api
npm install @slack/events-api
npm install friendly-cron
npm install node-cron
npm install axios
npm i -g ngrok 
  
# Serve on localhost:3000
npm start
  
# Start ngrok endpoint and add it to slack bot Event Subscription Request URL  
ngrok http localhost   
node index.js
# Create bot in Slack and generate and include your Bot, User and Signing Secrets in .env
## while running export secrets of env
export SLACK_TOKEN=<botToken>
export SLACK_SIGNING_SECRET=<secret>
export USER_TOKEN=<userToken>
```

## App Info

### Author

[Ashish Prasad](https://www.polywork.com/ashishprasad)

### Version

1.1.0

### License

This project is licensed under the MIT License
