'use strict';

var request = require('request');
var apiTree = require('./templates');

function RiotAPI(key) {
    if (!_isString(key)) { throw Error('the given api key must be a string'); }
    this.key = key;
    this._endpoints = apiTree;
    this._baseurl = apiTree._baseurl;
}

// TODO Wed Feb 3 22:25:10 EST 2015 : Will have to take care of error handling in another function.
RiotAPI.prototype.getSpectatorGameInfo = function(platformId, summonerId, callback) {
    platformId = platformId.toUpperCase();
    var templater = this._getTemplater('currentGame', 'getSpectatorGameInfo');
    var endpoint = this._buildEndpoint(templater(platformId, summonerId));
    request.get(endpoint, function(error, response, body) {
        if (error) { return callback(error, null); }
        else if (response.statusCode === 401) { return callback(new Error('unauthorized'), null); }
        else if (response.statusCode === 404) { return callback(new Error('summoner name not found'), null); }
        else if (response.statusCode === 429) { return callback(new Error('rate limit exceeded'), null); }
        else if (response.statusCode === 500) { return callback(new Error('riot api internal server error'), null); }
        else if (response.statusCode === 503) { return callback(new Error('riot api service unavailable'), null); }
        var parsedResponse = JSON.parse(body);
        return callback(null, parsedResponse);
    });
};

// TODO Wed Feb 3 22:25:10 EST 2015 : Will have to take care of error handling in another function.
RiotAPI.prototype.getSummonersByNames = function(region, summonerNames, callback) {
    region = region.toLowerCase();
    summonerNames = summonerNames.toLowerCase();
    var templater = this._getTemplater('summoner', 'getSummonersByNames');
    var endpoint = this._buildEndpoint(templater(region, summonerNames));
    request.get(endpoint, function(error, response, body) {
        if (error) { return callback(error, null); }
        else if (response.statusCode === 401) { return callback(new Error('unauthorized'), null); }
        else if (response.statusCode === 404) { return callback(new Error('summoner name not found'), null); }
        else if (response.statusCode === 429) { return callback(new Error('rate limit exceeded'), null); }
        else if (response.statusCode === 500) { return callback(new Error('riot api internal server error'), null); }
        else if (response.statusCode === 503) { return callback(new Error('riot api service unavailable'), null); }
        var parsedResponse = JSON.parse(body);
        return callback(null, parsedResponse);
    });
};

// Internal methods

RiotAPI.prototype._getTemplater = function(category, func) {
    return this._endpoints[category][func];
};

RiotAPI.prototype._buildEndpoint = function(template) {
    return this._baseurl + template + '?api_key=' + this.key;
};

function _isString(value) {
    return (typeof value === 'string' || value instanceof String);
}

module.exports = RiotAPI;
