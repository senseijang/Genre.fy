import { Artist } from "./artist";
import { Track } from "./track";

export class Album {

    public name: string;
    public spotifyURL: string;
    public imageURL: string;
    public artist: Artist;
    public songs: Track[];

    constructor(name: string, spotifyURL: string, imageURL: string, artist: Artist, songs: Track[]) {

        this.name = name;
        this.spotifyURL = spotifyURL;
        this.imageURL = imageURL;
        this.artist = artist;
        this.songs = songs;

    }

}
