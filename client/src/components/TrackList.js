import React, {Component} from 'react';
import Track from "./Track.jsx"
// import './TrackList.css'

class TrackList extends Component {
  render() {
    var element = [];
    this.props.tracks.forEach((trackData) => {
      console.log(trackData.track.album.images[2].url);
      element.push(<Track thumbnail={trackData.track.album.images[2].url} />);
    });
    return (
      <p>
        {element}
      </p>
    )
  }
}
export default TrackList;