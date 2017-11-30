var keys = require("twitterKeys");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

switch (process.argv[2]) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        var songName = process.argv[3];
        spotifyThisSong(songName);
        break;
    case "movie-this":
        var movieName = process.argv[3];
        movieThis(movieName);
        break;
    case "do-what-it-says":
        //use fs 
        break;
    default:
        console.log("Please type a valid command.");
}

var myTweets = function() {

}

var spotifyThisSong = function(songName) {

}

var movieThis = function(movieName) {

}

var doWhatItSays = function() {

}