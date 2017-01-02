'use strict';

//Update this value to reflect your own channel name
var channel = '7re3k0';


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

}
