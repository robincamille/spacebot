// ['Object','Period (days)','Distance (ly)']
var exoplanets = [['Proxima Centauri b','11.186','4.22'],['Gliese 667 Cc','28.143 ± 0.029','23.62'],['Kepler-442b','112.3053','1291.6'],['Kepler-452b','384.8','1402'],['Wolf 1061c','17.9','13.8'],['Kepler-1229b','86.8','769'],['Kapteyn b*','48.6','13'],['Kepler-62f','267.291','1200'],['Kepler-186f','129.9459','561'],['Luyten b','18.65','12.36'],['TRAPPIST-1d','4.05','39'],['TRAPPIST-1e','6.1','39'],['TRAPPIST-1f','9.2','39'],['TRAPPIST-1g','12.4','39'],['LHS 1140 b','25','40'],['Kepler-1638b','259.365','2491.83']];

var jobs = ["Accountant","Actuary","Aerobics Instructor","Aerospace Engineer","Agricultural Inspector","Anesthesiologist","Animal Trainer","Anthropologist","Archeologist","Architectural Drafter","Archivist","Art Director","Art Teacher","Audio And Video Equipment Technician","Auditor","Baker","Barber","Bartender","Bicycle Repairer","Broadcast Technician","Cartographer","Chef","Chiropractor","Choreographer","Civil Engineer","Compliance Officer","Computer Programmer","Continuous Mining Machine Operator","Cooling Equipment Operator","Correctional Officer","Cosmetologist","Dental Hygienist","Door-To-Door Salesperson","Drama Teacher","Elevator Installer","Embalmer","Emergency Medical Technician","Epidemiologist","Farm Equipment Mechanic","Firefighter","Fish And Game Warden","Forest Fire Prevention Specialist","Funeral Director","Geoscientist","Hairstylist","Historian","History Teacher","Human Resources Manager","Interior Designer","Intern","Kettle Operator","Librarian","Lifeguard","Locker Room Attendant","Manicurist","Materials Engineer","Maxillofacial Surgeon","Mining Safety Engineer","Motorcycle Mechanic","Nuclear Power Reactor Operator","Occupational Health And Safety Technician","Optometrist","Parking Lot Attendant","Pedicurist","Petroleum Refinery Operator","Physical Therapist","Political Scientist","Postal Service Mail Carrier","Private Detective","Proofreader","Public Relations Manager","Real Estate Broker","Recyclable Material Collector","Religious Activities Director","Scout Leader","Septic Tank Servicer","Ski Patrol","Social Scientist","Social Service Assistant","Stonemason","Structural Steel Worker","Tailor","Tax Collector","Tax Preparer","Taxi Driver","Telecommunications Equipment Installer","Telemarketer","Translator","Travel Agent","Undertaker","Upholsterer","Urban Planner","Valve Installer","Welder","Zoologist"];

var users = ["Bree","Eda","Jeremy","Jessenia","John","Mandy","Mauro","Robin","Sapo","summer","trevor"];

function shuffle(a) {
	//from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getRandomInt(max) { 
  	return Math.floor(Math.random() * Math.floor(max));
	};
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random


module.exports = function(bot) {
	//comes with commands specific to hubot module library
	//see https://hubot.github.com/docs/scripting/ 



	// ['Object','Period (days)','Distance (ly)']

	bot.hear(/I want to leave this planet/, function(res) {
		planetNum = getRandomInt(exoplanets.length);
		planet = exoplanets[planetNum];
		return res.send("How about " + planet[0] + "? It's only " + planet[2] + " light years away! It orbits its star every " + planet[1] + " days.");
	});

	bot.hear(/Crew list/, function(msg) {
		var crew = shuffle(users);
		// crew1 = users[getRandomInt(users.length)];
		// crew2 = users[getRandomInt(users.length)];
		// crew3 = users[getRandomInt(users.length)];
		//randomJob = jobs[getRandomInt(jobs.length)];
		// return msg.send("*Commander:* " + crew1 + ". *Flight Engineer:* " + crew2 + ". *" + randomJob + ":* " + crew3 + ".");

		var ourJobs = [];
		crew.forEach(function(name) {
			var job = jobs[getRandomInt(jobs.length)];
			ourJobs.push([job, name]);
		});
		return msg.send("*Commander:* " + crew1 + ". *Flight Engineer:* " + crew2 + ". *" + randomJob + ":* " + crew3 + ".");
	});

	bot.hear(/Is today a good day to launch\?/, function(comm) {
		return comm.reply("What's the weather like? Type `weather: sunny`, `weather: rainy`, etc.")
	});

	bot.hear(/weather: (.*)/, function(repl) {
		var weather = repl.match[1];
		switch (weather) {
			case "sunny":
			case "partly cloudy":
			case "good":
			case "balmy":
				return repl.reply("Today's a great launch day! 10... 9...");
				break;
			case "cloudy":
			case "partly cloudy":
			case "rainy":
			case "bad":
				return repl.reply("Better not risk it. Fingers crossed for tomorrow!");
				break;
			case "stormy":
			case "storming":
			case "thunderstorms":
			case "thunder":
			case "lightning":
			case "snow":
			case "snowing":
				return repl.reply("Are you nuts?! Things are bad down here, but let's not fly into a storm!");
				break;
		}
	});


	// bot.hear(/Hi my name is (.*)/i, function(msg) {
	// 	var name = msg.match[1];
	// 	return msg.reply("Nice to meet ya, " + name);
	// });

	// bot.hear(/Add (.*) and (.*)/i, function(msg) {
	// 	var a = parseInt(msg.match[1]);
	// 	var b = parseInt(msg.match[2]);
	// 	var equation = a + b;
	// 	return msg.reply(a + " and " + b + "? That's " + equation);
	// })

	// //below doesn't work -- bug
	// bot.respond(/What's your fave food\?/, function(res) {
	// 	return res.send("Brains");
	// });

};