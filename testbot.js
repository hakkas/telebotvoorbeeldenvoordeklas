//import Bot, { Message, File } from 'telegram-api';

// ES5:
var Bot = require('telegram-api').default;
var Message = require('telegram-api/types/Message');
var File = require('telegram-api/types/File');

var bot = new Bot({
  token: '421511573:AAEuIpP0J9ImJCoWMgh_5vke6rxaT-Rj0ZA'
});

bot.start();

bot.get(/Hi|Hey|Hello|Yo/, function(message) {
  var answer = new Message().text('Hello, Sir').to(message.chat.id);

  bot.send(answer);
});

bot.command('start', function(message) {
  //var welcome = new File().file('grimlock.png').caption('Welcome').to(message.chat.id);
  const file = new File()
                    .file('./grimlock.png')
                    .caption('This is a test');
  bot.send(file);
  //bot.send(welcome);
});

// Arguments, see: https://github.com/mdibaiee/node-telegram-api/wiki/Commands
bot.command('weather <city> [date]', function(message) {
  console.log(message.args.city, message.args.date);
})

bot.get(/.*?/, function(message) {
  var answer = new Message().text('Why do you even ask?').to(message.chat.id);

  bot.send(answer);
});
