import React, {Component} from 'react';
import Track from "./Track.jsx"
// import './TrackList.css'

class TrackList extends Component {
  render() {
    var uri = `https://open.spotify.com/embed?uri=${this.props.playlistUri}`;
    return (
      <p>
        <iframe src={uri} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
      </p>
    )
  }
}
export default TrackList;