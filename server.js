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
			var twitterPromise = new Promise((resolve, reject) => {
				twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
					console.log('here! 1')
					resolve({
					requestToken: requestToken,
					requestTokenSecret: requestTokenSecret
					// oauth_verifier: oauth_verifier
					});
					});
				});

					twitterPromise.then((data) => {
						console.log('then! 2', data);
						var twitterAccessToken = new Promise((resolve, reject) => {
						twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
							//user gets redirected to authorization URL
							//this app stores accessToken and accessTokenSecret
							if (accessToken) 
							resolve({
								accessToken: accessToken,
								accessTokenSecret: accessTokenSecret
							});
						});
					})
						.then((data) => {
							console.log('4', data);
						});
					});
				// 	.catch(error => {
				// 	console.log(error);
				// });
		});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));