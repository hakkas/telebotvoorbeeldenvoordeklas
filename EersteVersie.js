const TeleBot = require('telebot');

const bot = new TeleBot({
    token: '421511573:AAEuIpP0J9ImJCoWMgh_5vke6rxaT-Rj0ZA' // Telegram Bot API token.
});

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost/spelers';


bot.on('/start', function (msg) {
  return bot.sendMessage(msg.from.id, "Hello world!");
});

bot.on('/wannier', (msg) => {
    var arg = { replyToMessage: msg.message_id }
    return bot.sendMessage(msg.from.id, "2018!", arg);
});

bot.on(/Hoi/, (msg) => {
  return bot.sendMessage(msg.from.id, "Hey ouwe reus!");
});

bot.on("document", (msg) => {
  return bot.sendMessage(msg.from.id, "Hey ouwe reus! dank v h doc");
});

bot.on(/^\/score ([0-9]+)$/, (msg, props) => {
  mongo.connect(url, function(err, db) {
      db.collection('highscores').insertOne({
          "naam": msg.from.username,
          "score": props.match[1].parseInt()
      });
      db.close();
  });
  return bot.sendMessage(msg.from.id, "Bedankt!");
});

bot.on(/scores/, (msg, props) => {
  mongo.connect(url, function(err, db) {
      db.collection('highscores').findOne({}, function (err, result) {
            if (err) throw (err);
            db.close();
            return bot.sendMessage(msg.from.id, result.naam + " " + result.score);
      });
  });
});

bot.on(/score (.+)/, (msg, props) => {
  mongo.connect(url, function(err, db) {
      db.collection('highscores').findOne({ "naam" : props.match[1] }, function (err, result) {
            if (err) throw (err);
            db.close();
            if (!result) {
              return bot.sendMessage(msg.from.id, "Speler " + props.match[1] + " bestaat niet!");
            }
            else {
              return bot.sendMessage(msg.from.id, result.naam + " " + result.score);
            }
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

bot.on(/^\/say ([a-zA-Z]+) to ([a-zA-Z]+ [a-zA-Z]+)$/, (msg, props) => {
    const thingToSay = props.match[1];
    const sayTo = props.match[2];

    mongo.connect(url, function(err, db) {
        db.collection('gesprekken').insertOne({
            ding: thingToSay,
            tegen: sayTo
        });
        db.close();
    });

    return bot.sendMessage(msg.from.id, sayTo + ": " + thingToSay);
});

bot.on(/^\/postcode ([a-zA-Z]+)$/, (msg, props) => {
    console.log(props);
    const postcode = props.match[1];
    console.log("Postcode is: " + postcode);
    let returnMessage = "";

    console.log(isNaN(postcode[0]));
    if (postcode.length != 6 ) {
      returnMessage = "Lengte postcode klopt niet!"
    }
    else if (isNaN(postcode[0]) || isNaN(postcode[1]) || isNaN(postcode[2]) || isNaN(postcode[3])) {
      returnMessage = "Eerste vier karakters zijn geen cijfers";
    }
    else if (isNaN(postcode[4]) || isNaN(postcode[5])) {
      returnMessage = "Goed!";
    }
    else {
      returnMessage = "Laatste twee karakters zijn geen letters!";
    }

    return bot.sendMessage(msg.from.id, returnMessage);
});

bot.start();
