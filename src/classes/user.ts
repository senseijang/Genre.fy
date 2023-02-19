import request from "request";
import { log } from "../logging/logger";
import { Artist } from "./artist";

export class User {

    private name: string;
    private token: string;
    private topArtist: Artist;
    private expires: number;

    constructor(token: string) {

        this.token = token;
        this.expires = Date.now() + 3600000

    }

    fetch() {

        request.get('https://api.spotify.com/v1/me', {

            headers: {

                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"

            }

        }, (err, res, body) => {

            if (err) return log(err)

            this.name = body.display_name;

        })

        request.get('https://api.spotify.com/v1/me/top/artists?limit=1', {

            headers: {

                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"

            }

        }, (err, res, body) => {

            if (err) throw log(err)

            body = JSON.parse(body).items[0];

            this.topArtist = new Artist(body.name, body.id, body.external_urls.spotify, body.images[0].url, this.token)
            this.topArtist.fetch()

        })

    }

}