// This script powers https://dashboard.heroku.com/apps/spacebot2, a Slackbot that 
// will guide you through your journey off this miserable planet.


// Data setup

var exoplanets = [['Proxima Centauri b','11.186','4.22'],['Gliese 667 Cc','28.143 ± 0.029','23.62'],['Kepler-442b','112.3053','1291.6'],['Kepler-452b','384.8','1402'],['Wolf 1061c','17.9','13.8'],['Kepler-1229b','86.8','769'],['Kapteyn b*','48.6','13'],['Kepler-62f','267.291','1200'],['Kepler-186f','129.9459','561'],['Luyten b','18.65','12.36'],['TRAPPIST-1d','4.05','39'],['TRAPPIST-1e','6.1','39'],['TRAPPIST-1f','9.2','39'],['TRAPPIST-1g','12.4','39'],['LHS 1140 b','25','40'],['Kepler-1638b','259.365','2491.83']];
// ['Exoplanet name','Period (days)','Distance (ly)']

var jobs = ["Accountant","Actuary","Aerobics Instructor","Aerospace Engineer","Agricultural Inspector","Anesthesiologist","Animal Trainer","Anthropologist","Archeologist","Architectural Drafter","Archivist","Art Director","Art Teacher","Audio And Video Equipment Technician","Auditor","Baker","Barber","Bartender","Bicycle Repairer","Broadcast Technician","Cartographer","Chef","Chiropractor","Choreographer","Civil Engineer","Compliance Officer","Computer Programmer","Continuous Mining Machine Operator","Cooling Equipment Operator","Correctional Officer","Cosmetologist","Dental Hygienist","Door-To-Door Salesperson","Drama Teacher","Elevator Installer","Embalmer","Emergency Medical Technician","Epidemiologist","Farm Equipment Mechanic","Firefighter","Fish and Game Warden","Forest Fire Prevention Specialist","Funeral Director","Geoscientist","Hairstylist","Historian","History Teacher","Human Resources Manager","Interior Designer","Intern","Kettle Operator","Librarian","Lifeguard","Locker Room Attendant","Manicurist","Materials Engineer","Maxillofacial Surgeon","Mining Safety Engineer","Motorcycle Mechanic","Nuclear Power Reactor Operator","Occupational Health And Safety Technician","Optometrist","Parking Lot Attendant","Pedicurist","Petroleum Refinery Operator","Physical Therapist","Political Scientist","Postal Service Mail Carrier","Private Detective","Proofreader","Public Relations Manager","Real Estate Broker","Recyclable Material Collector","Religious Activities Director","Scout Leader","Septic Tank Servicer","Ski Patrol","Social Scientist","Social Service Assistant","Stonemason","Structural Steel Worker","Tailor","Tax Collector","Tax Preparer","Taxi Driver","Telecommunications Equipment Installer","Telemarketer","Translator","Travel Agent","Undertaker","Upholsterer","Urban Planner","Valve Installer","Welder","Zoologist"];

var users = ["Bree","Eda","Jeremy","Jessenia","John","Mandy","Mauro","Robin","Sapo","summer","trevor"];

var companies = ["Wal-Mart Stores","Exxon Mobil","Chevron","Berkshire Hathaway","Apple","Phillips 66","General Motors","Ford Motor","General Electric","Valero Energy","AT&T","CVS Caremark","Fannie Mae","UnitedHealth Group","Verizon Communications","Hewlett-Packard","J.P. Morgan Chase","Costco Wholesale","Express Scripts Holding","Bank of America","Cardinal Health","IBM","Kroger","Citigroup","Wells Fargo","Boeing","Procter & Gamble","Freddie Mac","Home Depot","Microsoft","Amazon","Target","Walgreens","Johnson & Johnson","State Farm Insurance","MetLife","PepsiCo","Comcast","Google","ConocoPhillips","Dow Chemical","Caterpillar","United Parcel Service","Pfizer","Lowe’s Companies","Intel Corporation","The Coca-Cola Company","Lockheed Martin","Best Buy","The Walt Disney Company","FedEx","Goldman Sachs","Delta Air Lines","Oracle","Morgan Stanley","Twenty-First Century Fox","American Express","Philip Morris International","3M Company","Time Warner","Halliburton Company"];

var gods = ["Aphrodite","Apollo","Ares","Artemis","Athena","Demeter","Dionysus","Hades","Hephaestus","Hera","Hermes","Hestia","Poseidon","Zeus","Aether","Ananke","Chaos","Chronos","Erebus","Eros","Hypnos","Uranus","Gaia","Phanes","Pontus","Tartarus","Thalassa","Thanatos","Hemera","Nyx","Nemesis"];


// Functions setup 

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
	 // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  	return Math.floor(Math.random() * Math.floor(max));
	};


//The bot
module.exports = function(bot) {

	// Get us excited about space
	bot.hear(/space/, function(message) {
		return message.send("SPACE! The final frontier. 🚀🌏🛰✨🛸☄️👾")
	});

	// Habitable exoplanet responder
	bot.hear(/I want to leave this planet/, function(res) {
		planetNum = getRandomInt(exoplanets.length);
		planet = exoplanets[planetNum];
		return res.send("How about the habitable exoplanet " + planet[0] + "? It's only " + planet[2] + " light years away! It orbits its star every " + planet[1] + " days.");
	});

	// Crew list: jobs for everybody in the class
	bot.hear(/Crew list/, function(msg) {

		//Give everyone a job
		var crew = shuffle(users);
		var ourJobs = [];
		crew.forEach(function(name) {
			var job = jobs[getRandomInt(jobs.length)];
			ourJobs.push([job, name]);
		});

		//Gotta have a commander and flight engineer on every flight
		var commander = ourJobs[0][1];
		var flightEng = ourJobs[1][1];
		ourJobs.splice(0,1,["Commander", commander]);
		ourJobs.splice(1,1,["Flight Engineer", flightEng]);

		//Format output
		var greeting = "Welcome to the spacecraft " + gods[getRandomInt(gods.length)] + " " + getRandomInt(99) + ", sponsored by " + companies[getRandomInt(companies.length)] + "! Here's your crew:"
		var jobList = [greeting];
		ourJobs.forEach(function(pair) {
			jobList.push("*" + pair[0] + "*: @" + pair[1]);
		});

		return msg.send(jobList.join("\n"));
	});

	// Given weather data, inform about launch potential
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
			case "clouds":
			case "partly cloudy":
			case "rainy":
			case "rain":
			case "bad":
				return repl.reply("Better not risk it. Fingers crossed for tomorrow!");
				break;
			case "stormy":
			case "storm":
			case "storms":
			case "storming":
			case "thunderstorms":
			case "thunder":
			case "lightning":
			case "snow":
			case "snowing":
			case "blizzard":
				return repl.reply("Are you nuts?! Things are bad down here, but let's not fly into a storm!");
				break;
			default:
				return repl.reply("Yeah, sure, why not? Let's get the heck off this rock!")
		}
	});

	// Documentation
	bot.hear(/@robin-bot What can you do\?/, function(mssg) {
		return mssg.reply("I respond to:\n* `space`\n* `I want to leave this planet`\n* `Crew list`\n* `Is today a good day to launch?`");
	});



};