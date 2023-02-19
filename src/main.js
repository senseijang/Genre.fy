"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var spotifyOauth_1 = __importDefault(require("./spotify/spotifyOauth"));
var app = new spotifyOauth_1["default"]();
app.startExpress();
