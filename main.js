console.log('Starting assTelegramArchiveBot...');


var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');


function getCurrentChannelFile(channelId) {

	var today = new Date();
	var yyyy = today.getFullYear();
	var mm = ('0' + (today.getMonth()+1)).slice(-2);
	var dd = ('0' + today.getDate()).slice(-2);

	var dateStr = dd+"-"+mm+"-"+yyyy;

	if (!fs.existsSync(channelId)){
		fs.mkdirSync(channelId);
	}

	return channelId + "/" + dateStr + ".txt";
}


// create a new server instance
var server = express();

// let's parse json and xxx-form-urlencoded
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: true
}));


// If anyone just stumbles upon us directly, we tell them who we are.
server.get('/', function(req, res){
  res.send('I am the a softer space (internal) telegram archive bot - do you want to be my friend?');
});


// We are waiting for telegram to call us with a POST.
server.post('/new-message', function(req, res) {

	console.log("Telegram called us!");

	// req.body.chat.id contains the id
	// req.body.text contains the actual message text
	if (req.body && req.body.chat && req.body.chat.id && req.body.text) {

		var outFile = getCurrentChannelFile(req.body.chat.id);

		// We are using a flag for appending, not overwriting.
		var logStream = fs.createWriteStream(outFile, {'flags': 'a'});
		logStream.write("someone wrote:");
		logStream.end(req.body.text);
	}

	// Just return nothing - telegram does not care.
	return res.end();
});


// Everything is now set up - let's start the server!
server.listen(3000, function() {
	console.log('assTelegramArchiveBot successfully started!');
});

