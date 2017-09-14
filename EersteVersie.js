const TeleBot = require('telebot');

const bot = new TeleBot({
    token: '421511573:AAEuIpP0J9ImJCoWMgh_5vke6rxaT-Rj0ZA' // Telegram Bot API token.
});

bot.on('/start', function (msg) {
  console.log(msg.from.first_name + " " + msg.from.last_name + " met id " + msg.from.id + " is verbonden ...");
  return bot.sendMessage(msg.from.id, "Hello world!");
});

bot.start();
