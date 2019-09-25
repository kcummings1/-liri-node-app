require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var command = process.argv[2];

var input = process.argv.slice(3).join(" ");

beginLiri(command, input);


function beginLiri(command, input) {

    switch (command) {
        case "concert-this":
            concertThis(input);
            break;
        case "spotify-this-song":
            spotifyThis(input);
            break;
        case "movie-this":
            movieThis(input);
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log("NO FUNction")
    };
};

//----------concert-this----------

function concertThis(input) {
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

    request(queryURL, function (error, response, body) {
        if (error) {
            var concInf = JSON.parse(body)
            for (var i = 0; i < concInf.length; i++) {
                console.log("Venue name: " + concInf[i].Venue.Name);
                console.log("Venue location: " + concInf[i].Venue.City);
                var formatDate = moment(concInf[i].dateTime).format('MM/DD/YYYY');
                console.log("Date: " + formatDate);

                // fs.appendFileSync("log.text", "\r\n\r\n" + concInf[i].venue.name + " , ");
                // fs.appendFileSync("log.text", "\r\n" + concInf[i].venue.city + " , ");
                // fs.appendFileSync("log.text", "\r\n" + formatDate + " , ");

            }
        } else {
            console.log("error");
            return;
        };
    });
};

//-----spotify-this------
//Client ID : 50319f04103c473e835d94ff90b6bd32
// Client Secret : 342a18407b7243e4bb237bfdc2fdeb02
//display : artist,song name, album name, and a preview link

function spotifyThis(input) {
    //---------------no song default to "Wonderboy" by Tenacious D----------------
    if (!input || input === undefined) {
        input = "Wonderboy"
    };

    spotify.search({
            type: "track",
            query: input
        },
        function (error, data) {
            if (error) {
                console.log("error: " + error)
                return;
            };
            var songData = data.tracks.items

            for (var j = 0; j < songData.length; j++) {
                console.log("song artist: " + songData[j].artists[0].name);
                console.log("song name: " + songData[j].name);
                console.log("preview link: " + songData[j].preview_url);
                console.log("song album: " + songData[j].album.name);

                // fs.appendFileSync("log.txt", "\r\n\r\n" + songData[j].artists[0].name + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + songData[j].name + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + songData[j].preview_url + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + songData[j].album.name + " , ");
            };
        }
    );

};

//---------movie-this--------------
//OMDB api with trilogy api key
//display : title, release year, IMDB, rotten tomm rating, country produced, language, plot, actors
//default : for no movie name input === "MR. NOBODY"

function movieThis() {

    //-------"MR. NOBODY"----------

    if (!input || input === undefined) {
        input = "Mr. Nobody"
    }
    var queryURL2 = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL2).then(
            function (response) {
                //console.log(response.data);
                var movieData = response.data
                console.log("movie title: " + movieData.Title);
                console.log("release year: " + movieData.Year);
                console.log("plot: " + movieData.Plot);
                console.log("actors: " + movieData.Actors);
                console.log("languages: " + movieData.Language);
                console.log("country produced: " + movieData.Country);
                console.log("IMDB rating: " + movieData.imdbRating);
                console.log("rotton tomatoes rating: " + movieData.Ratings[1].Value);

                // fs.appendFileSync("log.txt", "\r\n\r\n" + movieData.title + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + movieData.releaseYear + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + movieData.plot + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + movieData.actors + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + movieData.language + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + movieData.countryProduced + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + movieData.imdbRating + " , ");
                // fs.appendFileSync("log.txt", "\r\n" + movieData.rottonTomatoesRating[1] + " , ");


            })
        .catch(function (error) {
            if (error.response) {
                console.log("-----------data----------");
                console.log(error.response.data);
                console.log("-----------status----------");
                console.log(error.response.status);
                console.log("-----------status----------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request)
            } else {
                console.log("error", error.message);
            }
            console.log(error.config);
        })
}
//-----------DO IT----------
function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("error: " + error)
            return;
        }
        var infoArr = data.split(",");
        beginLiri(infoArr[0], infoArr[1])
    })
}