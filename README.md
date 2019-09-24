# -liri-node-app

Overview
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

This app can take in one of the following commands:

concert-this
spotify-this-song
movie-this
do-what-it-says



What Each Command Should Do:


node liri.js concert-this <artist/band name here>

Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")

---------------------------------------------------------------------
node liri.js spotify-this-song '<song name here>'

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from

---------------------------------------------------------------------
node liri.js movie-this '<movie name here>'

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Rotten Tomatoes Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.

----------------------------------------------------------------------
node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt 
and then use it to call one of LIRI's commands.