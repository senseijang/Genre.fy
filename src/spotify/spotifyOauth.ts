/**
 *  NEEDS DOCUMENTATION
 *  TODO: DOCUMENT @boooiil
 */

import cookieParser from "cookie-parser";
import cors from "cors";
import {Application, Request, Response} from "express";
import express from "express";
import querystring from "query-string";
import request from "request";
import spotifyConfig from "../config/spotify.json";

class SpotifyOauth {
    public app!: Application;

    private readonly CLIENT_ID = spotifyConfig.ID;
    private readonly CLIENT_SECRET = spotifyConfig.SECRET;
    private readonly REDIRECT_URI = spotifyConfig.REDIRECT_URI;
    private readonly STATE_KEY = "spotify_auth_state";

    public startExpress() {

        const app = express()
            .use(express.static("public"))
            .use(cors())
            .use(cookieParser());

        app.get("/login", (req, res) => this.getLogin(req, res));
        app.get("/callback", (req, res) => this.getCallback(req, res));
        app.get("/refresh_token", (req, res) => this.getRefreshToken(req, res));

        // tslint:disable-next-line:no-console
        console.log("Listening on 8000");
        app.listen(8000);

        // app.get("/", (request, response) => {

        //     response.sendFile("public/index.html");

        // });

        // app.get("/success", (request, response) => {

        //     response.sendFile("public/success.html")

        // })
    }

    public getLogin(req: Request, res: Response): void {
        const state = this.generateRandomString(16);
        res.cookie(this.STATE_KEY, state);

        // your application requests authorization
        const scope = "user-top-read";
        res.redirect("https://accounts.spotify.com/authorize?" +
            querystring.stringify({
                client_id: this.CLIENT_ID,
                redirect_uri: this.REDIRECT_URI,
                response_type: "code",
                scope,
                state,
            }));
    }

    public getCallback(req: Request, res: Response): void {
        // your application requests refresh and access tokens
        // after checking the state parameter

        const code = req.query.code || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[this.STATE_KEY] : null;

        if (state === null || state !== storedState) {
            res.redirect("/#" +
                querystring.stringify({
                    error: "state_mismatch",
                }));
        } else {
            res.clearCookie(this.STATE_KEY);
            const authOptions = {
                form: {
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: this.REDIRECT_URI,
                },
                headers: {
                    Authorization: "Basic " + (new Buffer(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
                        .toString("base64")),
                },
                json: true,
                url: "https://accounts.spotify.com/api/token",
            };

            request.post(authOptions, (error, response, body) => {
                if (!error && response.statusCode === 200) {

                    const access_token = body.access_token;
                    const refresh_token = body.refresh_token;

                    const options = {
                        headers: {Authorization: "Bearer " + access_token},
                        json: true,
                        url: "https://api.spotify.com/v1/me",
                    };

                    // use the access token to access the Spotify Web API
                    request.get(options, (err, resp, bod) => {
                        // tslint:disable-next-line:no-console
                        console.log(bod);
                    });

                    // we can also pass the token to the browser to make requests from there
                    res.redirect("/#" +
                        querystring.stringify({
                            access_token,
                            refresh_token,
                        }));
                } else {
                    res.redirect("/#" +
                        querystring.stringify({
                            error: "invalid_token",
                        }));
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
            headers: {Authorization: "Basic " + (new Buffer(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
                .toString("base64"))},
            json: true,
            url: "https://accounts.spotify.com/api/token",
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token;
                res.send({
                    access_token,
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
    }}

export default SpotifyOauth;
