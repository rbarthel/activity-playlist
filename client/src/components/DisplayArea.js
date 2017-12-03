import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import TrackList from "./TrackList";

class DisplayArea extends Component {
  render() {
    if (this.props.playlistUri === false) {
      return (<SearchBar handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} value={this.props.value} />)
    } else {
      return (<TrackList playlistUri={this.props.playlistUri} />)
    }
  }
}
export default DisplayArea;