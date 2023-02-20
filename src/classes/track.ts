export class Track {

    public name: string;
    public spotifyURL: string;
    public imageURL: string;
    public length: number;

    constructor(name: string, spotifyURL: string, imageURL: string, length: number) {

        this.name = name;
        this.spotifyURL = spotifyURL;
        this.imageURL = imageURL;
        this.length = length;

    }

}
