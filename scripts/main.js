module.exports = function(bot) {
	//comes with commands specific to hubot module library
	//see https://hubot.github.com/docs/scripting/ 

	bot.hear(/I want to leave this planet/, function(res) {
		return res.send("How about a nice exoplanet?");
	});

	bot.hear(/Hi my name is (.*)/i, function(msg) {
		var name = msg.match[1];
		return msg.reply("Nice to meet ya, " + name);
	});

	bot.hear(/Add (.*) and (.*)/i, function(msg) {
		var a = parseInt(msg.match[1]);
		var b = parseInt(msg.match[2]);
		var equation = a + b;
		return msg.reply(a + " and " + b + "? That's " + equation);
	})

	//below doesn't work -- bug
	bot.respond(/What's your fave food\?/, function(res) {
		return res.send("Brains");
	});

};