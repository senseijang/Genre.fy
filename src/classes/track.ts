import { Album } from "./album";

export class Track {

    public name: string;
    public spotifyID: string;
    public spotifyURL: string;
    public imageURL: string;
    public length: number;
    public album: Album;

    constructor(name: string, spotifyID: string, spotifyURL: string, imageURL: string, length: number, album: Album) {

        this.name = name;
        this.spotifyID = spotifyID;
        this.spotifyURL = spotifyURL;
        this.imageURL = imageURL;
        this.length = length;
        this.album = album;

    }

}
