"use strict";
/**
 *  NEEDS DOCUMENTATION
 *  TODO: DOCUMENT @boooiil
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var query_string_1 = __importDefault(require("query-string"));
var request_1 = __importDefault(require("request"));
var spotify_json_1 = __importDefault(require("../config/spotify.json"));
var SpotifyOauth = /** @class */ (function () {
    function SpotifyOauth() {
        this.CLIENT_ID = spotify_json_1["default"].ID;
        this.CLIENT_SECRET = spotify_json_1["default"].SECRET;
        this.REDIRECT_URI = spotify_json_1["default"].REDIRECT_URI;
        this.STATE_KEY = "spotify_auth_state";
    }
    SpotifyOauth.prototype.startExpress = function () {
        var _this = this;
        var app = (0, express_1["default"])()
            .use(express_1["default"].static("public"))
            .use((0, cors_1["default"])())
            .use((0, cookie_parser_1["default"])());
        app.get("/login", function (req, res) { return _this.getLogin(req, res); });
        app.get("/callback", function (req, res) { return _this.getCallback(req, res); });
        app.get("/refresh_token", function (req, res) { return _this.getRefreshToken(req, res); });
        // tslint:disable-next-line:no-console
        console.log("Listening on 8000");
        app.listen(8000);
        app.get("/", function (request, response) {
            response.sendFile("./src/static/index.html", { root: '.' });
        });
        app.get("/success", function (request, response) {
            response.sendFile("./src/static/success.html", { root: '.' });
        });
    };
    SpotifyOauth.prototype.getLogin = function (req, res) {
        var state = this.generateRandomString(16);
        res.cookie(this.STATE_KEY, state);
        // your application requests authorization
        var scope = "user-top-read";
        res.redirect("https://accounts.spotify.com/authorize?" +
            query_string_1["default"].stringify({
                client_id: this.CLIENT_ID,
                redirect_uri: this.REDIRECT_URI,
                response_type: "code",
                scope: scope,
                state: state
            }));
    };
    SpotifyOauth.prototype.getCallback = function (req, res) {
        // your application requests refresh and access tokens
        // after checking the state parameter
        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[this.STATE_KEY] : null;
        if (state === null || state !== storedState) {
            res.redirect("/#" +
                query_string_1["default"].stringify({
                    error: "state_mismatch"
                }));
        }
        else {
            res.clearCookie(this.STATE_KEY);
            var authOptions = {
                form: {
                    code: code,
                    grant_type: "authorization_code",
                    redirect_uri: this.REDIRECT_URI
                },
                headers: {
                    Authorization: "Basic " + (new Buffer(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
                        .toString("base64"))
                },
                json: true,
                url: "https://accounts.spotify.com/api/token"
            };
            request_1["default"].post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var access_token = body.access_token;
                    var refresh_token = body.refresh_token;
                    var options = {
                        headers: { Authorization: "Bearer " + access_token },
                        json: true,
                        url: "https://api.spotify.com/v1/me"
                    };
                    // use the access token to access the Spotify Web API
                    request_1["default"].get(options, function (err, resp, bod) {
                        // tslint:disable-next-line:no-console
                        console.log(bod);
                    });
                    // we can also pass the token to the browser to make requests from there
                    res.redirect("/#" +
                        query_string_1["default"].stringify({
                            access_token: access_token,
                            refresh_token: refresh_token
                        }));
                }
                else {
                    res.redirect("/#" +
                        query_string_1["default"].stringify({
                            error: "invalid_token"
                        }));
                }
            });
        }
    };
    SpotifyOauth.prototype.getRefreshToken = function (req, res) {
        // requesting access token from refresh token
        var refresh_token = req.query.refresh_token;
        var authOptions = {
            form: {
                grant_type: "refresh_token",
                refresh_token: refresh_token
            },
            headers: { Authorization: "Basic " + (new Buffer(this.CLIENT_ID + ":" + this.CLIENT_SECRET)
                    .toString("base64")) },
            json: true,
            url: "https://accounts.spotify.com/api/token"
        };
        request_1["default"].post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token;
                res.send({
                    access_token: access_token
                });
            }
        });
    };
    SpotifyOauth.prototype.generateRandomString = function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    return SpotifyOauth;
}());
exports["default"] = SpotifyOauth;
