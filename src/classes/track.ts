export class Track {

    name: string;
    spotifyURL: string;
    imageURL: string;
    length: number;

    constructor(name: string, spotifyURL: string, imageURL: string, length: number) {

        this.name = name;
        this.spotifyURL = spotifyURL;
        this.imageURL = imageURL;
        this.length = length;

    }

}