module.exports = {
  extractTrackRequestURLs: (data) => {
    const parsedData = JSON.parse(data)
    const playlistData = [];
    parsedData.playlists.items.forEach((playlist) => {
      playlistData.push({ playlist_id: playlist.id, user_id: playlist.owner.id })
    })
    return playlistData;
  }
};