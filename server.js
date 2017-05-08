const express = require('express');
const app = express();
app.use(express.static('views'));

const twitterAPI = require('node-twitter-api');

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
			twitter.getAuthUrl(requestToken);
		}
	});
	});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));