import request from "request";
import { log } from "../logging/logger";
import { Artist } from "./artist";

/**
 * Contains information relating to the user
 */
export class User {

    public name: string;
    public topArtist: Artist;
    public expires: number;

    private readonly token: string;

    constructor(token: string) {

        this.token = token;
        this.expires = Date.now() + 3600000

    }

    // request top artist from spotify
    fetch() {

        // request for user information
        request.get('https://api.spotify.com/v1/me', {

            headers: {

                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"

            }

        }, (err, res, body) => {

            if (err) return log(err)

            body = JSON.parse(body);

            // usename of the provided user
            this.name = body.display_name;

        })

        // request for artist information
        request.get('https://api.spotify.com/v1/me/top/artists?limit=1', {

            headers: {

                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"

            }

        }, (err, res, body) => {

            if (err) throw log(err)

            body = JSON.parse(body).items[0];

            //set the top artist to a new instance of artist
            this.topArtist = new Artist(body.name, body.id, body.external_urls.spotify, body.images[0].url, this.token)
            this.topArtist.fetch()

        })

    }

    getToken() {

        return this.token;

    }
}