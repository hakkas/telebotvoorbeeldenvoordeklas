const TeleBot = require('telebot');

const bot = new TeleBot({
    token: '421511573:AAEuIpP0J9ImJCoWMgh_5vke6rxaT-Rj0ZA' // Telegram Bot API token.
});

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost/flappyBirdDB';

/**

*/
bot.on(/^\/beoordeel ([0-9]+)$/, (msg, props) => {
  mongo.connect(url, function(err, db) {
      db.collection('highscores').insertOne({
          "naam": msg.from.username,
          "score": props.match[1].parseInt()
      });
      db.close();
  });
  return bot.sendMessage(msg.from.id, "Bedankt voor de beoordeling!");
});

bot.on(/eenscore/, (msg, props) => {
  mongo.connect(url, function(err, db) {
    db.collection('highscores').findOne({}, function (err, result) {
      if (err) throw (err);
      db.close();
      var bericht = result.naam + " " + result.score
      return bot.sendMessage(msg.from.id, bericht);
    });
  });
});

bot.on(/score (.+)/, (msg, props) => {
  mongo.connect(url, function(err, db) {
    db.collection('highscores').findOne({ "naam" : props.match[1] }, function (err, result) {
      var bericht;
      if (err) throw (err);
      db.close();
      if (!result) {
        bericht = "Speler " + props.match[1] + " bestaat niet!"
      } else {
        bericht = result.naam + " " + result.score
      }
      return bot.sendMessage(msg.from.id, bericht);
    });
  });
});

bot.on(/scores (.+)/, (msg, props) => {
  mongo.connect(url, function(err, db) {
    db.collection('highscores').find({ "naam" : props.match[1] }).toArray(function (err, result) {
      if (err) throw (err);
      db.close();

      for (var i = 0; i < result.length; i++) {
        var bericht = result[i].naam + " " + result[i].score;
        bot.sendMessage(msg.from.id, bericht);
      }
    });
  });
});

bot.start();
