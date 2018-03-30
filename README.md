# assTelegramArchiveBot

**Class:** A Softer Space Internal

**Language:** NODE.JS

**Platform:** Server

This is a telegram bot that archives any messages that are being sent to it.

## Setup

Just download the sources here and you're good to go!

## Build

Install the necessary libraries:

```
npm install --save express body-parser
```

## Configure

[Register a bot on Telegram](https://core.telegram.org/bots) and get your own bot token, which you will need later on.

## Start

Startup the bot itself:

```
npm start
```

It will start to listen on port 3000.

To start the bot from an SSH session and keep it alive even after the session is stopped, you can e.g. use a command such as:

```
npm start &
disown
```

To then stop it again later, kill the processes that come up when calling these two commands:

```
ps -aux | grep npm
ps -aux | grep 'node main.js'
```

### Firewall

You might have to open up the port in your firewall, if it is not open already, which can be seen here:

```
iptables -L
```

### Running next to Apache Server

If you are running an Apache server instance on the same machine, a quick-and-dirty way to forward calls to our node.js bot is to edit `/etc/apache2/sites-available/000-default.conf` and insert something similar to this:

```
        LoadModule proxy_module /usr/lib/apache2/modules/mod_proxy.so
        LoadModule proxy_http_module /usr/lib/apache2/modules/mod_proxy_http.so

        <Location /assTelegramArchiveBot>
                ProxyPass http://127.0.0.1:3000
                ProxyPassReverse http://127.0.0.1:3000
        </Location>
```

You then need to restart Apache (after updating `sites-enabled` if they are not just symlinked to `sites-available` anyway), e.g. like this:

```
sudo service apache2 restart
```

### Registering with Telegram

Finally, you need to tell Telegram that whenever a message is sent to newly created bot, it should be forwarded to your server.

You can do this by calling:

```
curl -F "url=https://[YOUR_SERVER]/new-message"  https://api.telegram.org/bot[YOUR_BOT_TOKEN]/setWebhook
```

Now when someone writes to your bot on telegram, for each distinct channel a folder should be created, and each folder should contain a log file for each day that any messages have been received, with all of them inside.

## License

We at A Softer Space really love the Unlicense, which pretty much allows anyone to do anything with this source code.
For more info, see the file UNLICENSE.
