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
    trackIDs.push(track.id);
  })
  return trackIDs;
}

module.exports = {
  getPlaylistsQuery: (query) => {
    const options = {
      url: `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=3`,
      headers: {
        'Authorization': `Bearer ${process.env.SPOTIFY_AUTH}`
      }
    };
    request(options, function(err, response, body) {
      if (response.statusCode === 200) {
        const playlistData = extractPlaylistData(body);
        console.log(playlistData);
        return playlistData;
      } else {
        console.log('error: it fucking broke (getPlaylistsQuery)');
      }
    });
  },
  getTracksInPlaylist: (user_id, playlist_id) => {
    const options = {
      url: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
      headers: {
        'Authorization': `Bearer ${process.env.SPOTIFY_AUTH}`
      }
    };
    request(options, function(err, response, body) {
      if (response.statusCode === 200) {
        return extractTrackIDs(body);
      } else {
        console.log('error: it fucking broke (getTracksInPlaylist)');
      }
    });
  }
};