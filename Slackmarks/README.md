# Slackmarks
> Sometimes, we want to store important web-pages in our Slack personal workspace.
> What if we can automate this ?
Just Press `Cmd + B` / `Ctrl + B`

![Slack-bot-picture](https://user-images.githubusercontent.com/73909578/125204492-4035ad80-e29b-11eb-9611-7c475aaf49bc.png)


## How to achieve this?
- ### Set up Slack Bot
  - Let's say your workspace name is "myspace"
  - Head to Slack apps > https://myspace.slack.com/apps
  - Search for `Bots`
  - Click `Add Configuration` and give it a username (say _bookmarks-bot_), purpose, etc.
  - A Bot token starting with `xoxb-` will be generated.

 - Clone this Repo.
 - __Change the Token and channel name__ in `config.js` accordingly.
 - Visit chrome settings & ensure that the Developer mode is turned on in extensions.
 - Click Load unpacked extension.
 - Select the directory.
 - :tada: It's done!

## How to use
- Press `Cmd + B`
- Or Right-click mouse and select `Slack this`
- A _notification_ comes from __bookmarks-bot__ 
- All your bookmarks are saved in __bookmarks-bot__ chat window.

## Demo Video
- Video Link - https://youtu.be/F6z6cWl5aLY

## Blog Link
- Blog Link - https://nimishayadav.medium.com/slackmarks-7ce688ae9fe0
