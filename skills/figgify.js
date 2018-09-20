//
// Figgify
//
module.exports = function (controller) {

    controller.hears([/^figgify\s*(.*)$/], 'direct_message,direct_mention', function (bot, message) {

            var fig = require('figlet');

            fig.text(message.match[1],
                    { font: 'Big',
                      horizontalLayout: 'default',
                      verticalLayout: 'default' },
                    function(err, data) {
                        bot.reply(message, "```text\n" + data + "\n```");
             });

            //bot.reply(message, "http://lmgtfy.com/?q=" + message.match[1]);
	    //var request = require("request");
	    //const url="http://lmgtfy.com/?q=" + message.match[1];

	    //request({
	    //  uri: url,
	    //}, function(error, response, body) {
	    // 	bot.reply(message, "```html\n" + body + "\n```");
	    //});

	    // const Http = new XMLHttpRequest();
	    // const url="http://lmgtfy.com/?q=" + message.match[1];
	    // Http.open("GET", url);
	    // Http.send();
	    // Http.onreadystatechange=(e)=>{
	    // 	bot.reply(message, Http.responseText);
	    // }

    });
};
