/**
 * Contains album information retrieved from Track
 */
export class Album {

    name: string;
    spotifyID: string;
    spotifyURL: string;
    image: string;

    constructor(name: string, spotifyID: string, spotifyURL: string, image: string) {

        this.name = name;
        this.spotifyID = spotifyID;
        this.spotifyURL = spotifyURL;
        this.image = image;

    }

}