console.log('Starting assTelegramArchiveBot...');


var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');


function getCurrentChannelFile(channelId) {

	var channelStr = "channel" + channelId;

	if (!fs.existsSync(channelStr)){
		fs.mkdirSync(channelStr);
	}

        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = ('0' + (today.getMonth()+1)).slice(-2);
        var dd = ('0' + today.getDate()).slice(-2);
        var dateStr = dd+"-"+mm+"-"+yyyy;

	return channelStr + "/" + dateStr + ".txt";
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

	if (req && req.body && req.body.message && req.body.message.chat &&
	    req.body.message.chat.id && req.body.message.text) {

		var channelId = req.body.message.chat.id;
		var from = req.body.message.from.first_name;
		var message = req.body.message.text;

		var outFile = getCurrentChannelFile(channelId);

		// We are using a flag for appending, not overwriting.
		var logStream = fs.createWriteStream(outFile, {'flags': 'a'});
		logStream.write(from + ":\n");
		logStream.end(message + "\n\n");
	}

	// Just return nothing - telegram does not care.
	return res.end();
});


// Everything is now set up - let's start the server!
server.listen(3000, function() {
	console.log('assTelegramArchiveBot successfully started!');
});

