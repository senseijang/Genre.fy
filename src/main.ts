import SpotifyOauth from "./spotify/spotifyOauth";

//export so we can maniuplate instance of app
export const app = new SpotifyOauth();

//start express webserver
app.startExpress();

