import { Album } from "./album";

export class ActiveNode {

    album: Album;

    constructor(spotifyData: any) {

        this.album = new Album()

    }

}