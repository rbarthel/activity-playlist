require('dotenv').config();
const request = require('request');

function extractPlaylistData(data) {
  const parsedData = JSON.parse(data)
  const playlistData = [];
  parsedData.playlists.items.forEach((playlist) => {
    playlistData.push({ playlist_id: playlist.id, user_id: playlist.owner.id })
  })
  return playlistData;
}

function extractTrackIDs(data) {
  const parsedData = JSON.parse(data);
  const trackIDs = [];
  parsedData.items.forEach((track) => {
    trackIDs.push(track.track.id);
  })
  return trackIDs;
}

module.exports = {
  getUserInfo: (token) => {
    return new Promise((resolve, reject) => {
      const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      request(options, function(err, response, body) {
        if (response.statusCode === 200) {
          resolve(JSON.parse(response.body).id);
        } else {
          console.log('it fucking broke @ getUserInfo. status:', response.statusCode);
          reject(err);
        }
      });
    });
  },
  getPlaylistsQuery: (token, query) => {
    return new Promise((resolve, reject) => {
      const options = {
        url: `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=6`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      request(options, function(err, response, body) {
        if (response.statusCode === 200) {
          resolve(extractPlaylistData(body));
        } else {
          console.log('it fucking broke @ getPlaylistsQuery. status:', response.statusCode);
          reject(err);
        }
      });
    });
  },
  getTracksInPlaylist: (token, user_id, playlist_id) => {
    return new Promise((resolve, reject) => {
      const options = {
        url: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks?limit=12`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      request(options, function(err, response, body) {
        if (response.statusCode === 200) {
          resolve(extractTrackIDs(body));
        } else {
          console.log('it fucking broke @ getTracksInPlaylist. status:', response.statusCode);
          reject(err);
        }
      });
    });
  },
  createPlaylist: (token, owner_id, name) => {
    return new Promise((resolve, reject) => {
      const options = {
        url: `https://api.spotify.com/v1/users/${owner_id}/playlists`,
        method: 'POST',
        json: true,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          "description": "created by activity-playlist",
          "public": false,
          "name": name
        }
      };
      request(options, function(err, response, body) {
        if (response.statusCode === 201) {
          resolve(body.id);
        } else {
          console.log('it fucking broke @ createPlaylist. status:', response.statusCode);
          console.log(err);
          reject(err);
        }
      });
    });
  },
  addTracks: (token, user_id, playlist_id, tracks) => {
    const options = {
      url: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
      method: 'POST',
      json: true,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        "uris": tracks
      }
    };
    request(options, function(err, response, body) {
      if (response.statusCode === 201) {
        return body;
      } else {
        console.log('it fucking broke @ addTracks. status:', response.statusCode);
      }
    });
  }
};