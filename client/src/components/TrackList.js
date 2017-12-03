import React, {Component} from 'react';
import Track from "./Track.jsx"
// import './TrackList.css'

class TrackList extends Component {
  render() {
    var element = [];
    this.props.tracks.forEach((trackData) => {
      element.push(<Track thumbnail={trackData.track.album.images[2].url} uri={trackData.track.uri} currentUser={this.props.currentUser} />);
    });
    return (
      <p>
        {element}
      </p>
    )
  }
}
export default TrackList;