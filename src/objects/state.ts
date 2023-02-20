import { User } from "src/classes/user";

export const InternalState: {[cookie: string]: User} = {};

setInterval(() => {

    Object.keys(InternalState).forEach(key => {

        const state = InternalState[key];

        console.log("USER:", state)
        console.log("ARTIST:", state.topArtist)
        console.log("ALBUM:", state.topArtist.tracks[0].album)

    });

}, 5000)