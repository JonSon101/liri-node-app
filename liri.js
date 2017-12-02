var keys = require("./keys");
var twitter = require("twitter");
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
//      * This will show your last 20 tweets and when they were created at in your terminal/bash window.
    console.log("myTweets");
    reset();
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
            id: keys.client_id,
            secret: keys.client_secret
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
        console.log("movieThis");
        console.log(response.movieTitle);
        reset();        
    });
// * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
        
//      * It's on Netflix!
    
//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

}

var doWhatItSays = function() {

// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

// * Feel free to change the text in that document to test out the feature for other commands.
    console.log("doWhatItSays");
    reset();
}

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.

initLIRI();