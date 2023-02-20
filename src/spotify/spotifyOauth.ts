/**
 *  NEEDS DOCUMENTATION
 *  TODO: DOCUMENT @boooiil
 */

import cookieParser from "cookie-parser";
import cors from "cors";
import { Application, Request, Response } from "express";
import express from "express";
import request from "request";
import spotifyConfig from "../config/spotify.json";
import { log } from "../logging/logger";
import { InternalState } from "../objects/state";
import { User } from "../classes/user";
import { Node } from "../classes/node";

class SpotifyOauth {
    public app!: Application;

    // auth code is generated when the user accepts the app's request to access data
    private AUTH_CODE: string;

    // constant vars, spotify specific data
    private readonly CLIENT_ID = spotifyConfig.ID;
    private readonly CLIENT_SECRET = spotifyConfig.SECRET;
    private readonly REDIRECT_URI = spotifyConfig.REDIRECT_URI;
    private readonly STATE_KEY = "spotify_auth_state";

    // start express application
    public startExpress() {

        // create an express application using a static folder
        // that allows us to access without routing
        const app = express()
            .use(express.static("static"))
            .use(cors())
            .use(cookieParser());

        // get login path for spotify oauth
        app.get("/login", (req, res) => this.getLogin(req, res));

        log(`green Listening on: http://localhost:8000`)
        
        // listen the webserver on port
        app.listen(8000);

        // route /success and handle accordingly
        app.get("/success", (req, response) => {

            // if there was no code in the url string
            if (!response.req.query.code) return response.send("401 - Not authorized")

            // send our static success file
            response.sendFile("./static/success.html", { root: "." });

            // apply the new authentication code provided by spotify
            this.AUTH_CODE = response.req.query.code.toString();

            // request a token that we will use to get user data
            request.post(`https://accounts.spotify.com/api/token`, {

                form: {
                    code: this.AUTH_CODE,
                    redirect_uri: this.REDIRECT_URI,
                    grant_type: "authorization_code"
                },
                headers: {

                    "Authorization": "Basic " + (Buffer.from(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
                        .toString("base64"))
                },
                json: true

            }, (err, res, body) => {

                // if the token was obtained successfully
                if (body.access_token) {

                    // create a new node in the internal object
                    (InternalState[req.cookies[this.STATE_KEY]] = new Node(new User(body.access_token))).fetch();


                }

                else response.send("500 - Internal error")

            })

        });
    }

    // login handler for spotify
    public getLogin(req: Request, res: Response): void {

        // generate a random string using [a-A][0-9]
        const state = this.generateRandomString(16);

        // set a cookie in the user's cache
        res.cookie(this.STATE_KEY, state);

        // your application requests authorization
        const scope = "user-top-read";
        res.redirect("https://accounts.spotify.com/authorize?" + `client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=code&scope=${scope}&state=${state}`);
    }

    // generate a string with alphanumeric characters
    private generateRandomString(length: number) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

export default SpotifyOauth;
