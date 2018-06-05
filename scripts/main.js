module.exports = function(bot) {
	//comes with commands specific to hubot module library
	//see https://hubot.github.com/docs/scripting/ 

	// ['Object','Period (days)','Distance (ly)']
	exoplanets = ['Proxima Centauri b','11.186','4.22'],['Gliese 667 Cc','28.143 ± 0.029','23.62'],['Kepler-442b','112.3053','1291.6'],['Kepler-452b','384.8','1402'],['Wolf 1061c','17.9','13.8'],['Kepler-1229b','86.8','769'],['Kapteyn b*','48.6','13'],['Kepler-62f','267.291','1200'],['Kepler-186f','129.9459','561'],['Luyten b','18.65','12.36'],['TRAPPIST-1d','4.05','39'],['TRAPPIST-1e','6.1','39'],['TRAPPIST-1f','9.2','39'],['TRAPPIST-1g','12.4','39'],['LHS 1140 b','25','40'],['Kepler-1638b','259.365','2491.83']

	bot.hear(/I want to leave this planet/, function(res) {
		planet = res.random(exoplanets);
		return res.send("How about " + planet[0] + "?");
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