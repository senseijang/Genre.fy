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

class SpotifyOauth {
    public app!: Application;

    private AUTH_CODE: string;

    private readonly CLIENT_ID = spotifyConfig.ID;
    private readonly CLIENT_SECRET = spotifyConfig.SECRET;
    private readonly REDIRECT_URI = spotifyConfig.REDIRECT_URI;
    private readonly STATE_KEY = "spotify_auth_state";

    public startExpress() {

        const app = express()
            .use(express.static("static"))
            .use(cors())
            .use(cookieParser());

        app.get("/login", (req, res) => this.getLogin(req, res));
        app.get("/callback", (req, res) => this.getCallback(req, res));
        app.get("/refresh_token", (req, res) => this.getRefreshToken(req, res));

        log(`green Listening on: http://localhost:8000`)
        app.listen(8000);

        app.get("/success", (req, response) => {

            if (!response.req.query.code) return response.send("401 - Not authorized.")

            response.sendFile("./static/success.html", { root: "." });

            this.AUTH_CODE = response.req.query.code.toString();

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

                if (body.access_token) {

                    (InternalState[this.STATE_KEY] = new User(body.access_token)).fetch();

                }

                else response.send("500 - Internal error")

            })

        });
    }

    public getLogin(req: Request, res: Response): void {
        const state = this.generateRandomString(16);
        res.cookie(this.STATE_KEY, state);

        // your application requests authorization
        const scope = "user-top-read";
        res.redirect("https://accounts.spotify.com/authorize?" + `client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=code&scope=${scope}&state=${state}`);
    }

    public getCallback(req: Request, res: Response): void {
        // your application requests refresh and access tokens
        // after checking the state parameter

        const code = req.query.code || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[this.STATE_KEY] : null;

        if (state === null || state !== storedState) {

            res.redirect("/#" + `error=state_mismatch`);

        } else {
            res.clearCookie(this.STATE_KEY);
            const authOptions = {
                form: {
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: this.REDIRECT_URI,
                },
                headers: {
                    Authorization: "Basic " + (Buffer.from(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
                        .toString("base64")),
                },
                json: true,
                url: "https://accounts.spotify.com/api/token",
            };

            request.post(authOptions, (error, response, body) => {
                log("User token:", body.access_token)
                if (!error && response.statusCode === 200) {
                    const USER_TOKEN = body.access_token;
                    const refresh_token = body.refresh_token;
                    log("User token:", USER_TOKEN, "refresh token", refresh_token)

                    const options = {
                        headers: { Authorization: "Bearer " + USER_TOKEN },
                        json: true,
                        url: "https://api.spotify.com/v1/me",
                    };

                    // use the access token to access the Spotify Web API
                    request.get(options, (err, resp, bod) => {
                        // tslint:disable-next-line:no-console
                        console.log(bod);
                    });

                    // we can also pass the token to the browser to make requests from there
                    res.redirect("/#" + `access_token=${USER_TOKEN}&refresh_token=${refresh_token}`);
                } else {
                    res.redirect("/#" + `error=invalid_token`);
                }
            });
        }
    }

    public getRefreshToken(req: Request, res: Response): void {
        // requesting access token from refresh token
        const refresh_token = req.query.refresh_token;
        const authOptions = {
            form: {
                grant_type: "refresh_token",
                refresh_token,
            },
            headers: {
                Authorization: "Basic " + (Buffer.from(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
                    .toString("base64"))
            },
            json: true,
            url: "https://accounts.spotify.com/api/token",
        };

        request.post(authOptions, (error, response, body) => {
            log("User token:", body.access_token)
            if (!error && response.statusCode === 200) {

                const USER_TOKEN = body.access_token;
                log("User token:", USER_TOKEN)

                res.send({
                    access_token: USER_TOKEN,
                });
            }
        });
    }

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
