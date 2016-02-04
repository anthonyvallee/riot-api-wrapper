module.exports = {
    _baseurl: 'https://na.api.pvp.net',
    summoner: {
        getSummonersByNames: function(region, summonerNames) {
            return `/api/lol/${ region }/v1.4/summoner/by-name/${ summonerNames }`;
        }
	  },
	  currentGame: {
        getSpectatorGameInfo: function(platformId, summonerId) {
            return `/observer-mode/rest/consumer/getSpectatorGameInfo/${ platformId }/${ summonerId }`;
        }
		}
};
