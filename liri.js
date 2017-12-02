var twitterKeys = require("./twitterKeys");
var spotifyKeys = require("./spotifyKeys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");

var initLIRI = function() {
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome to LIRI! Please choose a command: ",
            choices: ["My Tweets", "Spotify This Song", "Movie This", "Do What It Says"],
            name: "command"
        }
    ]).then(function(response) {
        switch (response.command) {
            case "My Tweets":
                myTweets();
                break;
            case "Spotify This Song":
                spotifyThisSong();
                break;
            case "Movie This":
                movieThis();
                break;
            case "Do What It Says":
                //use fs 
                doWhatItSays();
                break;
            default:
                console.log("default response");
        }
    });
}

var reset = function() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Select another command?",
            default: "false",
            name: "confirm"
        }
    ]).then(function(response) {
        if (response.confirm) {
            initLIRI();
        } else {
            console.log("Thank You!");
        }
    });
}

var myTweets = function() {
    console.log("Welcome to My Tweets");
    
    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    });

    var params = {screen_name: "jsmit826"};

    client.get('statuses/user_timeline', params).then(function(tweet) {
        console.log("Searching for " + params.screen_name + " most recents Tweets...");
        for (var i = 0; i < tweet.length; i++) {
            console.log(tweet[i].created_at + " - " + tweet[i].text);
        }
        reset();
    }).catch(function(error) {
        console.log(error);
    });
}

var spotifyThisSong = function() {
    console.log("Welcome to Spotify This Song!");
    
    inquirer.prompt([
        {
            type: "input",
            message: "Type the name of your favorite song: ",
            name: "songTitle"
        }
    ]).then(function(response) {
        var songTitle = response.songTitle;
        console.log("Searching for: " + songTitle);
        
        var spotify = new Spotify({
            id: spotifyKeys.client_id,
            secret: spotifyKeys.client_secret
        });
           
        spotify.search(
            { 
                type: 'track', 
                query: songTitle, 
                limit: "1"
            }
        ).then(function(response) {
            if (songTitle == response.tracks.items[0].name) {
                var artist = response.tracks.items[0].artists[0].name;
                var name = response.tracks.items[0].name;
                var previewURL = response.tracks.items[0].preview_url;
                var album = response.tracks.items[0].album.name;
                console.log("Artist: " + artist + "\nName: " + name + "\nPreview: " + previewURL + "\nAlbum: " + album);
            } else {
                console.log("Sorry, we could not find " + songTitle);
                console.log("Here is one of our favorites!");
                console.log("Artist: Ace of Base" + "\nName: The Sign" + "\nPreview: ..."+ "\nAlbum: The Sign")
            }
            
            reset();                    
        }).catch(function(err) {
            console.log(err);
        });
    });
}

var movieThis = function() {
    inquirer.prompt([
        {
            type: "input",
            message: "Type the name of your favorite movie: ",
            name: "movieTitle"
        }
    ]).then(function(response) {
        console.log("Welcome to Movie This!");

        if (response.movieTitle === "") {
            console.log("Try typing in a movie title!\nHere is one of our favorites!\n");
            console.log("\nTitle: Mr. Nobody" + "\nYear: 2009" + "\nIMDB Rating: 7.9/10" + "\nRotten Tomatoes: 66%" + 
                "\nProduced in: USA" + "\nLanguage: English" + "\nPlot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible." + 
                "\nActors: Jared Leto, Sarah Polley, Diane Kruger\n");   
            reset();
        } else {
            request("http://www.omdbapi.com/?t=" + response.movieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, movie) {
            
                if (!error && response.statusCode === 200) {
                    //console.log(JSON.parse(movie).Ratings[0].Value);
                    var title = JSON.parse(movie).Title;
                    var year = JSON.parse(movie).Year;
                    var ratingIMDB = JSON.parse(movie).Ratings[0].Value;
                    var ratingRotTom = JSON.parse(movie).Ratings[1].Value;
                    var country = JSON.parse(movie).Country;
                    var language = JSON.parse(movie).Language;
                    var plot = JSON.parse(movie).Plot;
                    var actors = JSON.parse(movie).Actors;

                    console.log("\nTitle: " + title + "\nYear: " + year + "\nIMDB Rating: " + ratingIMDB + "\nRotten Tomatoes: " + ratingRotTom + 
                        "\nProduced in: " + country + "\nLanguage: " + language + "\nPlot: " + plot + "\nActors: " + actors + "\n");              
                }
                reset();                
            });
        }
    });
}

var doWhatItSays = function() {

// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

// * Feel free to change the text in that document to test out the feature for other commands.
    console.log("doWhatItSays");
    reset();
}

initLIRI();