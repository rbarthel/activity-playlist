// follows a playlist
app.put('/users/:owner_id/playlists/:playlist_id/followers', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/users/${req.params.owner_id}/playlists/${req.params.playlist_id}/followers`,
    method: 'PUT',
    json: true,
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_AUTH}`
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

// unfollows a playlist
app.delete('/users/:owner_id/playlists/:playlist_id/followers', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/users/${req.params.owner_id}/playlists/${req.params.playlist_id}/followers`,
    method: 'DELETE',
    json: true,
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_AUTH}`
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


// search for a playlist based on a query
app.get('/search/playlists/:query', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/search?q=${req.params.query}&type=playlist`,
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_AUTH}`
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

// get tracks in a playlist
app.get('/users/:user_id/playlists/:playlist_id/tracks', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/users/${req.params.user_id}/playlists/${req.params.playlist_id}/tracks`,
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_AUTH}`
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

// create a playlist
app.post('/users/:owner_id/playlists/new/:playlist_name', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/users/${req.params.owner_id}/playlists`,
    method: 'POST',
    json: true,
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_AUTH}`
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

// add tracks to a playlist
app.post('/users/:user_id/playlists/:playlist_id/tracks/:track_uris', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/users/${req.params.user_id}/playlists/${req.params.playlist_id}/tracks?uris=${req.params.track_uris}`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_AUTH}`
    },
  };
  request(options, function(err, response, body) {
    if (response.statusCode === 201) {
      res.send(body);
    } else {
      res.sendStatus(400);
    }
  });
})