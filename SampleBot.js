var Bot = require('../index');
var AUTH = 'auth+live+';
var ROOMID = 'FakeRoomID4cc82f72594d88';
var TopBotName = 'will be set to the first dj used in the list';
var BotCounter = 0;
var BotNames = [];

var botCrew = [];
addBot('FakeAutheb0d6ce3440f671378f53b156818a7c0', 'FakeUserIDf75161a100287e', 'FillInBotUserNameNo1');
// addBot('FakeAuth9b461fb80c9f21f477dc06921715fc24', 'FakeUserIDf75161a10023bc', 'FillInBotUserNameNo2');
// addBot('FakeAuthee4768922450994be71b3eeacf88675b', 'FakeUserIDf75161a1003118', 'FillInBotUserNameNo3');

// Iterate through bot collection. Make each vote; only first speak.
var len = botCrew.length;
for (var i = 0; i < len; i++) {
	botCrew[i].on('newsong', function (data) { voteUpAutomaticallyButAtRandomTime(this, data); });
	if (i === 0) { 
		botCrew[i].on('speak', function (data) { respondToSpeak(this, data); });
	}
}


//-----------------------------------------------------------------------------------------------------
// UTILITY FUNCTIONS
//-----------------------------------------------------------------------------------------------------

function addBot (auth, userid, username) {
	var newBot = new Bot(AUTH+auth, userid, ROOMID);
	botCrew.push(newBot);
	BotCounter += 1;
	if (BotCounter === 1) { TopBotName = username; }
}

function voteUpAutomaticallyButAtRandomTime (caller, data) {
	var maxWaitSeconds = 80;
	var oneSecond = 1000;
	setTimeout( function() {
		caller.vote('up');
	}, Math.floor(Math.random() * maxWaitSeconds) * oneSecond);
}

function respondToSpeak (caller, speakData) {
	if (speakData.name !== TopBotName) {		
		var t = speakData.text;
		switch (true) {
			case /^[\/#!]*commands/.test(t): // Respond to "#commands" or "!commands"
				caller.speak('Commands: dance • boogie • hello • #boo');
				break;
			case /dance/i.test(t): // Two different words make bot bop
			case /boogie/i.test(t):
				caller.vote('up');
				caller.speak(getADanceResponse());
				break;
			case /hello/i.test(t): // Respond to "hello" no matter where it is in user's comment
				caller.speak(getAHelloResponse(speakData.name));
				break;
			case /^[\/#!]*boo/i.test(t): // Respond to either "#boo" or "!boo"
				caller.speak(getABooResponse(speakData.name));
				break;
		}
	}
}

function getADanceResponse() {
	var responses = [
		'Ah yeah, this is my SHIIIIIIT!',
		'Woohoo!',
		'That\s that FUNK!',
		'SCIENCE!',
		'YAAAAAAAYUH! OKAAAAAAAAAAYYYY??!',
		'Ill shit!!!!!',
		'All of these beats!!!!'
	];
	return responses[Math.floor(Math.random() * responses.length)];
}

function getAHelloResponse(name) {
	var responses = [
		'Hey there, '+name+' what\'s good?',
		'And a good day to you too sir!',
		'Back atcha, '+name+'!'
	];
	return responses[Math.floor(Math.random() * responses.length)];
}

function getABooResponse(name) {
	var responses = [
		'Shove it, '+name+'!',
		'Awwww, '+name+' doesn\'t like the song, waaaaaaa',
		'Suck it, '+name+'!'
	];
	return responses[Math.floor(Math.random() * responses.length)];
}