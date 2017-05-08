const express = require('express');
const app = express();
app.use(express.static('views'));

const twitterAPI = require('node-twitter-api');

var authUrl;
var requestToken;
var requestTokenSecret;
var oauth_verifier;

var twitter = new twitterAPI({
	consumerKey: '',
	consumerSecret: '',
	callback: 'https://ljyockey.github.io/disney-quiz/views/index.html'
});

		app.get('/twitter', (req, res) => {
				twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
		if(error) {
			console.log(error);
		}
		else {
			console.log('here');
			authUrl = twitter.getAuthUrl(requestToken);
			requestToken = requestToken;
			requestTokenSecret = requestTokenSecret;
			oauth_verifier = oauth_verifier;

		}
	});
		twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
			if (error) {
				console.log(error);
			}
			else {
				console.log(accessToken);
			}
		});
	});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));