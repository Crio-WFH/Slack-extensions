async (event, steps, params, auths) => {

const { WebClient } = require('@slack/web-api')
const web = new WebClient(auths.slack_bot.bot_token)

try {
  this.response = await web.chat.postMessage({
    attachments: params.attachments,
    unfurl_links: params.unfurl_links,
    text: params.text,
    unfurl_media: params.unfurl_media,
    parse: params.parse || 'full',
    mrkdwn: params.mrkdwn || true,
    channel: params.channel,
    username: params.username,
    blocks: params.blocks,
    icon_emoji: params.icon_emoji,
    link_names: params.link_names,
    reply_broadcast: params.reply_broadcast || false,
    thread_ts: params.thread_ts,
    icon_url: params.icon_url,
    as_user: params.as_user || true,
  })
} catch (err) {
  this.error = err
  throw err
}
}
