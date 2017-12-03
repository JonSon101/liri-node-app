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
            message: "Welcome to LIRI! Please choose a command: \n",
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
    console.log("Welcome to My Tweets!\n");
    
    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    });

    var params = {screen_name: "jsmit826"};

    client.get('statuses/user_timeline', params).then(function(tweet) {
        console.log("Searching for " + params.screen_name + " most recents Tweets...\n");
        for (var i = 0; i < tweet.length; i++) {
            console.log(tweet[i].created_at + " - " + tweet[i].text);
        }
        console.log("")
        reset();
    }).catch(function(error) {
        console.log(error);
    });
}

var spotifyThisSong = function(song) {
    console.log("Welcome to Spotify This Song!\n");
    
    if (song) {
        console.log("\nSearching for " + song);
        
        var spotify = new Spotify({
            id: spotifyKeys.client_id,
            secret: spotifyKeys.client_secret
        });
        
        spotify.search(
            { 
                type: 'track', 
                query: song, 
                limit: "1"
            }
        ).then(function(response) {
            
            var artist = response.tracks.items[0].artists[0].name;
            var name = response.tracks.items[0].name;
            var previewURL = response.tracks.items[0].preview_url;
            var album = response.tracks.items[0].album.name;
            console.log("\nArtist: " + artist + "\nName: " + name + "\nPreview: " + previewURL + "\nAlbum: " + album + "\n");
            
            reset();                    
        }).catch(function(err) {
            console.log(err);
        });
    } else {
        inquirer.prompt([
            {
                type: "input",
                message: "Type the name of your favorite song: ",
                name: "songTitle"
            }
        ]).then(function(response) {
            var songTitle = response.songTitle;
            console.log("\nSearching for: " + songTitle);
            
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
                    console.log("\nArtist: " + artist + "\nName: " + name + "\nPreview: " + previewURL + "\nAlbum: " + album + "\n");
                } else {
                    console.log("\nSorry, we could not find " + songTitle);
                    console.log("Here is one of our favorites!");
                    console.log("Artist: Ace of Base" + "\nName: The Sign" + "\nPreview: ..."+ "\nAlbum: The Sign\n")
                }
                
                reset();                    
            }).catch(function(err) {
                console.log(err);
            });
        });
    }
    
}

var movieThis = function(movieTxt) {
    if (movieTxt) {
        console.log("Welcome to Movie This!");
        
        request("http://www.omdbapi.com/?t=" + movieTxt + "&y=&plot=short&apikey=trilogy", function (error, response, movie) {
        
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

                console.log("Title: " + title + "\nYear: " + year + "\nIMDB Rating: " + ratingIMDB + "\nRotten Tomatoes: " + ratingRotTom + 
                    "\nProduced in: " + country + "\nLanguage: " + language + "\nPlot: " + plot + "\nActors: " + actors + "\n");              
            }
            reset();                
        });
    } else {
        inquirer.prompt([
            {
                type: "input",
                message: "Type the name of your favorite movie: ",
                name: "movieTitle"
            }
        ]).then(function(response) {
            console.log("Welcome to Movie This!\n");

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
    
}

var doWhatItSays = function() {
    console.log("Welcome to Do What It Says!\n");
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        
        if (error) return console.log(error);
                
        var dataArr = data.split(",");
        
        switch (dataArr[0]) {
            case "my-tweets":
                myTweets();
                break;
            case "spotify-this-song":
                spotifyThisSong(dataArr[1]);
                break;
            case "movie-this":
                movieThis(dataArr[1]);
                break;
            case "do-what-it-says":
                console.log("This is quite the loop!");
                break;
            default:
                console.log("Type a valid command.");
                reset();
        }
    });
}

initLIRI();