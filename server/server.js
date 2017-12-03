require('dotenv').config();
const cors = require('cors');
// const bodyParser = require('body-parser');
const helpers = require('./serverHelpers');
const request = require('request');
const express = require('express');
const app = express();

// app.use(bodyParser.json());
app.use(cors());
app.options('*', cors())

// generate a playlist based on a query
app.get('/playlists/new/:query/:token', (req, res) => {
  console.log('15', req.params.token);
  const token = req.params.token;
  helpers.getPlaylistsQuery(token, req.params.query).then((playlistData) => {
    let userID;
    const trackIDs = [];
    const promises = playlistData.map((playlist) => {
      return (
        helpers.getTracksInPlaylist(token, playlist.user_id, playlist.playlist_id).then((tracksInPlaylist) => {
          tracksInPlaylist.forEach((track) => {
            trackIDs.push(`spotify:track:${track}`);
          });
        })
      )
    });
    const newPlaylist = helpers.getUserInfo(token).then((user_id) => {
      userID = user_id;
      helpers.createPlaylist(token, user_id, `Playlist for: ${req.params.query}`).then((data) => {
         helpers.addTracks(token, userID, data, trackIDs);
          res.json(`spotify:user:${userID}:playlist:${data}`);
      });
    })
    .catch(error => {
      console.log('45', error);
      res.sendStatus(400);
    })
  })
  .catch(error => {
    console.log('50', error);
    res.sendStatus(400);
  })
})

app.listen(8080, () => {
  console.log('Listening on port 8080');
});