//
// LMGTFY
//
module.exports = function (controller) {

    controller.hears([/^derp$/], 'direct_message,direct_mention', function (bot, message) {

        // puppeteer setup
        const puppeteer = require('puppeteer');

        // fs setup
        var fs = require('fs');

        // canvas setup
        const Canvas = require('canvas-prebuilt');
        const Image = Canvas.Image;

        // gifencoder setup -- this works!
        var GIFEncoder = require('gifencoder');
        var encoder = new GIFEncoder(800, 600);
        stream = encoder.createReadStream();
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(500);
        encoder.setQuality(10);


        (async() => {
          const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
          console.log(await browser.version());
          const page = await browser.newPage();
          await page.goto('http://lmgtfy.com/?q=derp'); //, {waitUntil: 'networkidle2'});

          var derp = await page.screenshot({clip: {x: 0, y: 0, width: 800, height: 600}});
          var count = 0;

          // test creating a gif from successive pngs streamed from screenshots
          var img = new Image;
          var canvas = new Canvas(800, 600);
          var ctx = canvas.getContext('2d');
          img.src = derp;
          ctx.drawImage(img, 0, 0, 800, 600); // need to do the draw AFTER creating stream
          await encoder.addFrame(ctx);

          while (count < 40) {
            derp = await page.screenshot({clip: {x: 0, y: 0, width: 800, height: 600}});
            img.src = derp;
            ctx.drawImage(img, 0, 0, 800, 600); // need to do the draw AFTER creating stream
            await encoder.addFrame(ctx);
            count++;
          }
          await encoder.finish();

          //debugger;

          await browser.close();
	  bot.reply(message, {text:"Here's an image", files:[stream]});
        })();
    });
};


