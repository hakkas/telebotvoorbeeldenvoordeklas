const TeleBot = require('telebot');

const bot = new TeleBot({
    token: '421511573:AAEuIpP0J9ImJCoWMgh_5vke6rxaT-Rj0ZA' // Telegram Bot API token.
});

bot.on('/start', function (msg) {
  return bot.sendMessage(msg.from.id, "Hello world!");
});

bot.on('/wiebenje', function (msg) {
  return bot.sendMessage(msg.from.id, "Ik ben Hayreddinbot");
});

bot.on('/foto', (msg) => {
    return bot.sendPhoto(msg.from.id, "images/grimlock.png");
});

bot.start();
