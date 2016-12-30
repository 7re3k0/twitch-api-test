'use strict';

//Update this value to reflect your own channel name
var channel = '7re3k0';

//Set the timer in minutes
var setMinutes = 10

//Box art size
var size = 'large'; //272px x 380px

//How often should we poll to check if the game has changed
var pollTimeSec = 60000; //1 minute

//Do not change anything below this line unless you are familiar with javascript and jQuery
//Some globals that track what urls and game we are using as well as a default image.
var globalGameName;
var globalBoxartUrl;
var defaultLargeBoxArt = 'http://static-cdn.jtvnw.net/ttv-static/404_boxart-272x380.jpg';

//This code runs when the DOM objects are initialised as defined in the jQuery documentation
$(document).ready(function start() {

    //Get default ArtBox
    if (globalBoxartUrl === null || typeof globalBoxartUrl === 'undefined') {
        globalBoxartUrl = defaultLargeBoxArt;
    }

    //Update the image
    updateImage(globalBoxartUrl);

    //Get the current game straight away and update
    getChannelId();
    getCurrentGame();

    //Now let's set up polling to Twitch so that we check for new games every minute
    var myTimer = setInterval(getCurrentGame, pollTimeSec);
});

//Update the image in the html
function updateImage(url) {
    //Select the image from the htnl
    var image = document.getElementById('myImage');

    //Set to default img
    if (url === null | typeof url === "undefined") {
        url = defaultLargeBoxArt;
    }

    //Update the image in the html
    image.src = url;
}

//Update the image in the html
function updateGameName(name) {

    var text = document.getElementById("GameName");

    if (name !== null && typeof name !== "undefined") {
        text.innerHTML = name;
    }

}

//v5 needs a Channel Id rather than a channel name
function getChannelId() {
    //Using ajax here, could have used getJSON but the error handling is awful
    $.ajax({
        url: "https://api.twitch.tv/kraken/search/channels?query=" + channel,
        dataType: 'json',
        headers: {
            'Client-ID': 'a947rrvhm9tvulk4ud8l4flvp6002sh',
            'Accept': 'application/vnd.twitchtv.v5+json'
        },
        success: getChannelIdCallback
    })

}

function getChannelIdCallback(data) {
    //Get ID from channel name
    channel = data["channels"][0]["_id"];
    //Now we can get the current game
    getCurrentGame();
}

function getCurrentGame() {
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/" + channel,
        dataType: 'json',
        headers: {
            'Client-ID': 'a947rrvhm9tvulk4ud8l4flvp6002sh',
            'Accept': 'application/vnd.twitchtv.v5+json'
        },
        success: getCurrentGameCallback
    })

}

function getCurrentGameCallback(data) {
    //If the game name is the same we don't need to make the second call as we already have it stored
    if (data["game"] === globalGameName) {
        return;
    } else {
        globalGameName = data["game"];
    }
    //We found a new game so we need to call into Twitch again to get the JSON for the game itself
    getGameImageUrl(globalGameName);
}

//This function sends a request to twitch for the JSON associated with the game
//It sets a callback for the data and that is all
function getGameImageUrl(gameName) {
    $.ajax({
        url: "https://api.twitch.tv/kraken/search/games?query=" + gameName + "&type=suggest",
        dataType: 'json',
        headers: {
            'Client-ID': 'a947rrvhm9tvulk4ud8l4flvp6002sh',
            'Accept': 'application/vnd.twitchtv.v5+json'
        },
        success: getGameImageUrlCallback
    })

}

function getGameImageUrlCallback(data) {

    //The url for the box art is deep in the JSON hence the strange array here.
    globalBoxartUrl = data["games"]["0"]["box"][size];

    //Now we have a new image we can update the html
    updateImage(globalBoxartUrl);

    //Update the game name
    updateGameName(globalGameName);


    // var wrapperWidth     = $('.wrapper').width();
    // var wrapperHeight    = $('.wrapper').height();
    // var progressBarWidth = wrapperWidth
    // $('.show-container').width(progressBarWidth);
}
// var wrapperWidth  = $('.wrapper').width();
// var wrapperHeight = $('.wrapper').height();

// Timers
var newMillis    = setMinutes * 60000;
var progresMills = newMillis / 100;

setTimeout(
    function() {
        $(document).ready(function() {
            var timer = 1;
            var percentageWidth = $('#progressBar').outerWidth() / 100;

            function timerRun() {
                $('#progressBar .progress-bar').css("width", timer + "%").attr("aria-valuenow", timer);

                $('#progressBar .progress-number').css("-webkit-transform", "translateX(" + percentageWidth * timer + "px)").attr("aria-valuenow", timer + '%');

                if (timer >= 100) {
                    $('#progressBar .progress-bar').css("width", "100%");
                    return;
                }
                timer++;
                setTimeout(function() {
                    timerRun();
                }, progresMills);
            }

            $(document).ready(function() {
                timerRun();
            });
        });


        function startTimer(duration, display) {
            var timer = duration,
                minutes, seconds;
            setInterval(function() {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.text(minutes + ":" + seconds);
                if (--timer < 0) {
                    timer = 0;
                }

            }, 1000);
        }

        function millisToMinutes(millis) {
            var millisminutes = Math.floor(millis / 60000);
            return millisminutes;
        }

        var newMinutes = millisToMinutes(newMillis) * 60
        jQuery(function($) {
            var display = $('#timer');
            startTimer(newMinutes, display);
        });

    }, 5000);


//Moving text items
$(document).ready(function () {

var word1 = $('#word1'),
    word2 = $('#word2'),
    word3 = $('#word3'),
    word4 = $('#word4'),
    tl    = new TimelineMax({repeat:-1});

    tl
      .from(word1, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut, delay:10}, '-=0.15')
      .from(word2, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .from(word3, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .from(word4, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .to(word1, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut, delay:10}, '-=0.15')
      .to(word2, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .to(word3, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15')
      .to(word4, 0.3, {y:50, autoAlpha:0, ease:Power1.easeOut}, '-=0.15');





})
