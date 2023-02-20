import request from "request";
import { log } from "../logging/logger";
import { Album } from "./album";
import { Track } from "./track";

export class Artist {

    public name: string;
    public spotifyID: string;
    public spotifyURL: string;
    public imageURL: string;
    public tracks: Track[];

    private readonly token: string;

    constructor(name: string, spotifyID: string, spotifyURL: string, imageURL: string, token: string) {

        this.name = name;
        this.spotifyID = spotifyID;
        this.spotifyURL = spotifyURL;
        this.imageURL = imageURL;
        this.token = token;
        this.tracks = []

    }

    fetch() {

        request.get(`https://api.spotify.com/v1/artists/${this.spotifyID}/top-tracks?market=US`, {

            headers: {

                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"

            }

        }, (err, res, body) => {

            if (err) throw log(err)

            body = JSON.parse(body).tracks;

            for(let i = 0; i < 5; i++) {

                if (body[i]) {

                    this.tracks.push(new Track(
                        body[i].artists.map((artist: any) => artist.name).toString().replace(/,/g, ", "),
                        body[i].id,
                        body[i].external_urls.spotify,
                        body[i].album.images[0].url,
                        body[i].duration_ms,
                        new Album(
                            body[i].album.name,
                            body[i].id,
                            body[i].album.external_urls.spotify,
                            body[i].album.images[0].url
                        )
                    ))

                }

            }

        })

    }

}
