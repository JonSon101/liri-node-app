var keys = require("./keys");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
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
    inquirer.prompt([
        {
            type: "input",
            message: "Type the name of your favorite song: ",
            name: "songTitle"
        }
    ]).then(function(response) {
        console.log("spotifyThisSong");
        console.log(response.songTitle);
        reset();        
    });
//    * This will show the following information about the song in your terminal/bash window
     
//      * Artist(s)
     
//      * The song's name
     
//      * A preview link of the song from Spotify
     
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
//    * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api). See the 

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