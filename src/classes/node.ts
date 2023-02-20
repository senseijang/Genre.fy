import request from "request";
import { log } from "../logging/logger";
import { Artist } from "./artist";
import { User } from "./user";

/**
 * Stores information related to the user and recommended artists based on genre
 */
export class Node {

    public user: User
    public nextArtists: Artist[]

    constructor(user: User) {

        this.nextArtists = [];
        this.user = user;
        user.fetch();

    }

    // fetch our recommended artists
    fetch() {

        request.get('https://api.spotify.com/v1/me/top/artists?limit=6', {

            headers: {

                "Authorization": `Bearer ${this.user.getToken()}`,
                "Content-Type": "application/json"

            }

        }, (err, res, body) => {

            if (err) throw log(err)

            body = JSON.parse(body).items;

            // iterate over the array of given artists
            body.forEach((index: number, item: any) => {

                if (index == 0) return;

                let artist = new Artist(item.name, item.id, item.external_urls.spotify, item.images[0].url, this.user.getToken())
                artist.fetch()

                this.nextArtists.push(artist)

            });

        })

    }

}
