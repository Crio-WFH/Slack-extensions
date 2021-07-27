# Slackmarks
> Sometimes, we wish to store important chrome web-pages in our Slack personal workspace.
> What if we can automate this task and instantly send web-pages with just a single click?

![Slack-bot-picture](https://user-images.githubusercontent.com/73909578/127194979-c812b9ea-87d2-4a6c-bf43-c529820d2c71.png)

## How to achieve this?
- ### Set up Slack Bot
  - Create a workspace in Slack.
  - Head to Slack apps > https://myspace.slack.com/apps
  - Search for `Bots`
  - Click `Add Configuration` to create a new bot.
  - Give it a username (_say bookmarks-bot_) and purpose.
  - A Bot token starting with `xoxb-` will be generated.

 - Clone this Repo.
 -  __Change the Token and channel name__ in `config.js` accordingly.
 - Visit Chrome Settings & ensure that the Developer Mode is turned on in Extensions.
 - Click Load unpacked extension.
 - Select the directory.
 - :tada: The extension is ready to use!

## How to use
- Press `Cmd + B`
- Or Right-click mouse and select `Slack this`
- A _notification_ comes from __bookmarks-bot__ 
- All your bookmarks are saved in __bookmarks-bot__ chat window!

## Demo Video
- [Video Link](https://youtu.be/F6z6cWl5aLY)

## Medium Blog
- [Blog Link](https://nimishayadav.medium.com/slackmarks-7ce688ae9fe0)


<hr>

### Developed by - [Nimisha Yadav](https://www.linkedin.com/in/nimisha-yadav)
