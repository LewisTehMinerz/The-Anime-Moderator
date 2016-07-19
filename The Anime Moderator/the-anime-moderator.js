var Discord             = require("discord.io");
var Logging             = require("./log4js")("The Anime Moderator");
var os                  = require("os");
Logging.info("Creating new Discord client...");
var bot                 = new Discord.Client({ token: "MTkxNDg2ODA4NTk1NDk2OTYw.Cj7GhA.4gcOeZmfQ3dOoChUs1CRTxdB40E", autorun: true });
Logging.info("Done. Authenticating...");
var error_intro         = ":no_entry: Command not executed: ";
var error_plugin        = ":no_entry: Plugin failed to load: ";
var error_invalid_perms = "Invalid permissions.";
var error_command       = "The command failed to execute. An error is shown below:\n\n";
var error_unknown       = "Unknown error occurred.";
var website             = "Check out my website: https://lewistehminerz.github.io/The-Anime-Moderator/";

var commands = {
    "help": {
        "desc": "Shows the help for this bot",
        execute: function(user, userID, channelID, message, event) {
           var msg = "```xml\nUse TAM-Prefix if you ever forget my prefix!\n";
           var tmp = null;
           var keys = Object.keys(commands);
           keys.forEach(function(val) {
            if (val !== "tam-prefix") {
                tmp = `<+${val}> | ${commands[val].desc}\n`;
                if ((tmp.length + msg.length) > 2000) {
                    msg = `${msg}\`\`\``;
                    setTimeout(function(){
                        bot.sendMessage({
                            to: userID,
                            message: msg
                        });}, 1000);
                    msg = "```xml\n";
                }
                msg = `${msg}<+${val}> | ${commands[val].desc}\n`;
            }
           });
           msg = `${msg}\`\`\`\n\n${website}`;
           bot.sendMessage({
            to: userID,
            message: msg
           });
           bot.sendMessage({
            to: channelID,
            message: `:diamond_shape_with_a_dot_inside: <@${userID}>, __check your PM!__ :envelope_with_arrow: :diamond_shape_with_a_dot_inside:`
           }); 
        }
    },
    "getChannelID": {
        desc: "Gets a channel's ID",
        execute: function(user, userID, channelID, message, event) {
           bot.sendMessage({
            to: channelID,
            message: `Channel ID: \`${channelID}\``
           }); 
        }
    },
    "author": {
        desc: "Gets the author of me",
        execute: function(user, userID, channelID, message, event) {
           bot.sendMessage({
            to: channelID,
            message: "My daddy is <@96269247411400704>."
           }); 
        }
    },
    "uptime": {
        desc: "Gets the bot uptime.",
        execute: function(user, userID, channelID, message, event) {
            var sec_num = parseInt(process.uptime(), 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            var time    = `${hours} hours, ${minutes} minutes and ${seconds} seconds.`;
            bot.sendMessage({
                to: channelID,
                message: time
            }); 
        }
    },
    "ping": {
        desc: "Tests reply speed",
        execute: function(user, userID, channelID, message, event) {
            var reply_speed = 0;
            
            bot.sendMessage({
                to: channelID,
                message: `Pong. *${reply_speed}ms*`
            }); 
        }
    },
    "tam-prefix": {
        desc: "Gets my prefix",
        execute: function(user, userID, channelID, message, event) {
            bot.sendMessage({
                to: channelID,
                message: "My prefix is `+`. Use `+help` to get help."
            }); 
        }
    }
}


bot.on('ready', function() {
    Logging.info(`Authenticated. Logged in as ${bot.username} (User ID: ${bot.id})`);
    bot.setPresence({
        game: null
    });
    bot.setPresence({
        game: "with Remilia // https://lewistehminerz.github.io/The-Anime-Moderator",
    });
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (userID == "191486808595496960")
        return;
    var args = message.split(" ");
    var cmd = args[0];
    args.shift();
    var cmd1 = cmd.substring(1);
    var cmd2 = cmd;
    cmd1 = cmd1.toLowerCase();
    cmd2 = cmd2.toLowerCase();
    try {
    var server = bot.servers[bot.channels[channelID].guild_id].name;
    var channel = bot.channels[channelID].name; } catch(err) {
        var server = "Direct Message";
        var channel = userID;
    }
    try {
    if (commands.hasOwnProperty(cmd1) && cmd.charAt(0) === "+" && cmd1 !== "tam-prefix") {
        commands[cmd1].execute(user, userID, channelID, message, event, args);
        Logging.info(`${user} [<@${userID}>] in channel #${channel} in server ${server} ran command: +${cmd1}`);  
    }
    if (cmd2 === "tam-prefix") {
        commands[cmd2].execute(user, userID, channelID, message, event, args);
    }
     } catch (err) {
         bot.sendMessage({
                to: channelID,
                message: `${error_intro}${error_command}\`${err.message}\``
     });}
});

bot.on('disconnect', function() {
    Logging.warn("Disconnected. Attempting reconnection...");
    bot.connect();
});