var keys = require("twitterKeys");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

switch (process.argv[2]) {
    case "my-tweets":
        //show last 20 tweets
        break;
    case "spotify-this-song":
        var songName = process.argv[3];
        //show song information
        break;
    case "movie-this":
        var movieName = process.argv[3];
        //show movie information
        break;
    case "do-what-it-says":
        //use fs 
        break;
    default:

}