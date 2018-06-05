# Spacebot

This Slack bot gets it. You just wanna go to space! Let Spacebot help.  

## I want to leave this planet

Anytime someone types **I want to leave this planet** in the Slack workspace, the bot will helpfully suggest somewhere else to go.

Sample response:
> How about the habitable exoplanet TRAPPIST-1f? It's only 39 light years away! It orbits its star every 9.2 days.

The suggested planet is randomly chosen from a list of potential exoplanets in the conservatively habitable zone. This list comes from [Wikipedia](https://en.wikipedia.org/wiki/List_of_potentially_habitable_exoplanets#List_of_exoplanets_in_the_conservative_habitable_zone).

## Crew list

You've got a destination, now what about your crew? Anytime someone types **Crew list** in the Slack workspace, the bot will assign everyone a job. Each crew list has a Commander and Flight Engineer, but the other jobs are randomly chosen from a list of important and very space-related occupations. 

The bot also informs you of the spacecraft's name and sponsor (both randomly chosen). 

Sample response:
> Welcome to the spacecraft Hades 17, sponsored by Bank of America! Here's your crew:
> * Commander: @Sapo
> * Flight Engineer: @Eda
> * Parking Lot Attendant: @Bree
> * Aerobics Instructor: @summer
> * Funeral Director: @Mauro
> * Translator: @Mandy
> * Travel Agent: @Jeremy
> * Lifeguard: @trevor
> * Bartender: @John
> * Private Detective: @Jessenia
> * Telecommunications Equipment Installer: @Robin
> * Maxillofacial Surgeon: @Dora

The class list is hard-coded in the script, and shuffled with each new crew list. The script uses a `forEach` method to assign jobs, and a `splice` array method to re-assign the Commander and Flight Engineer roles to the first two jobs slots. Some people might get the same jobs. The output is formatted in Markdown.

The Greek god, company name, and occupations all come from Darius Kazemi's [corpora collection](https://github.com/dariusk/corpora/tree/master/data).

## Is today a good day to launch?

The last thing you'll require for your journey is a launch date. Anytime someone types **Is today a good day to launch?** in the Slack workspace, the bot responds with a request for clarification:

> What's the weather like? Type `weather: sunny`, `weather: rainy`, etc.

When the user responds (with, say, *weather: cloudy*), the bot replies with its recommendation: 

> Better not risk it. Fingers crossed for tomorrow!

The script uses a switch statement to ascertain which of its 3 responses to deliver. Multiple cases have the same expression (response), so that the user gets the same response to `weather: good` as to `weather: sunny`. There is also a default in case the bot doesn't recognize the weather descriptor provided by the user. 

## space

Anytime a user types `space` (lowercase) in the Slack workspace, the bot responds with:

> SPACE! The final frontier. 🚀🌏🛰✨🛸☄️👾

## What can you do?

When a user types `@robin-bot What can you do?`, the bot responds with simple documentation: 

> I respond to:
> * `space`
> * `I want to leave this planet`
> * `Crew list`
> * `Is today a good day to launch?`

---

## Notes 

* Heroku app URL: https://dashboard.heroku.com/apps/spacebot2
* I used two functions found elsewhere, [an array shuffler](https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array) and a [random integer generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).

### Unsolved issues
* I wasn't sure how to code in uppercase/lowercase command options. I tried `bot.hear((/Crew list/ || /crew list/), function(msg) { ...` but it didn't work. 
* Is there a way to automatically load a list of users? Currently, it is hard-coded into the script. I looked through the [Hubot docs](https://hubot.github.com/docs/scripting/) but didn't see how to export a users list, except by storing previous user interactions in the `brain`.




