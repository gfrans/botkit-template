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
    });
};
