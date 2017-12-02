require('dotenv').config();
const request = require('request');
const express = require('express');
const app = express();


app.put('/users/:owner_id/playlists/:playlist_id/followers', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/users/${req.params.owner_id}/playlists/${req.params.playlist_id}/followers`,
    method: 'PUT',
    json: true,
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_AUTH}`
    },
    body: {
      'public': false
    }
  };
  request(options, function(err, response, body) {
    if (response.statusCode === 200) {
      res.send(body);
    } else {
      res.sendStatus(400);
    }
  });
})

app.delete('/users/:owner_id/playlists/:playlist_id/followers', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/users/${req.params.owner_id}/playlists/${req.params.playlist_id}/followers`,
    method: 'DELETE',
    json: true,
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_AUTH}`
    },
    body: {
      'public': false
    }
  };
  request(options, function(err, response, body) {
    if (response.statusCode === 200) {
      res.send(body);
    } else {
      res.sendStatus(400);
    }
  });
})

app.get('/search/playlists/:query', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/search?q=${req.params.query}&type=playlist`,
    headers: {
      'Authorization': 'Bearer BQB7J1lIf8LoUSg1REIGEVxnmMcfFGcbrc5bJfKV3S11WhYkCUW1FyhuX2zww_Yzcz_mnsRfvdQ2OnyJ7hEznvLROKDvC21O_c-Rl-wOg2V8RtRSIOnGcnX0p0z0dkJIPb6IIWfwOgOEev7ImzLHrkEG3Fb1m13cyadOqXBmwiZLWJXkj6Yx3y6aLVqqVoU4xdA'
    }
  };
  request(options, function(err, response, body) {
    if (response.statusCode === 200) {
      res.send(body);
    } else {
      res.sendStatus(400);
    }
  });
})

app.post('/users/:owner_id/playlists/new/:playlist_name', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/users/${req.params.owner_id}/playlists`,
    method: 'POST',
    json: true,
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_AUTH}`
    },
    body: {
      "description": "created by activity-playlist",
      "public": false,
      "name": req.params.playlist_name
    }
  };
  request(options, function(err, response, body) {
    if (response.statusCode === 201) {
      res.send(body);
    } else {
      res.sendStatus(400);
    }
  });
})

app.listen(8080, () => {
  console.log('Listening on port 8080');
});

// @ - PUT     /v1/users/{owner_id}/playlists/{playlist_id}/followers // follows a playlist
// @ - DELETE /v1/users/{owner_id}/playlists/{playlist_id}/followers // unfollows a playlist
// @ - GET     /v1/search?type=playlist // search for a playlist
// - POST    /v1/users/{user_id}/playlists // create a playlist
// - POST    /v1/users/{user_id}/playlists/{playlist_id}/tracks // add tracks to a playlist
// - PUT     /v1/users/{user_id}/playlists/{playlist_id} // update playlist details
// - DELETE /v1/users/{user_id}/playlists/{playlist_id}/tracks // remove tracks from a playlist