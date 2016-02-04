# Riot API Wrapper
This is a simple to use Node.js wrapper for League of Legends' REST API.

[![NPM](https://nodei.co/npm/riot-api-wrapper.png)](https://www.npmjs.com/package/riot-api-wrapper)

**Documentation will be added soon. For now, this project is still a WIP.**

## Installation
```shell
npm install -g riot-api-wrapper
```

## How to use

You will first need to import the module:
```js
var RiotAPI = require('riot-api-wrapper');
```

Then instanciate the RiotAPI object and give it your Riot API key, using:
```js
// key is a string that contains the api key
var api = new RiotAPI(key);
```
