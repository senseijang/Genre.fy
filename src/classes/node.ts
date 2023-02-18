import { Album } from "./album";
import { InactiveNode } from "./inactiveNode";

export class ActiveNode extends InactiveNode {

    album: Album;

    constructor(spotifyData: any) {

        super(spotifyData);

    }

}