// Created by A2Z F17 and edited by dacs30
// Daniel Shiffman & Danilo Correia

var Twitter = require('twit');
var config = require('./config');

// the api keys and all the stuff is inside the config (hidden here)
var T = new Twitter(config);

// stream('user') does not work anymore
var stream = T.stream('statuses/filter', { track: ['@DaniloC3001'] });

stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {

    // reply to var
    var reply_to = tweet.in_reply_to_screen_name;

    // the name of who sent the reply
    var name = tweet.user.screen_name;

    // to follow the thread
    var id = tweet.id_str;

    // Ok, if this was in reply to me
    if (reply_to === 'DaniloC3001') {

        // the reply text
        var replyText = '@'+name + ' ' + ' hey there! This is my bot. The real me will reply to you soon!';

        // Post that tweet
        T.post('statuses/update', { status: replyText, in_reply_to_status_id: id}, tweeted);

            // Make sure it worked!
            function tweeted(err, reply) {
            if (err) {
                console.log(err.message);
                } else {
                    console.log('Tweeted: ' + reply.text);
                }
            }
    }    
};