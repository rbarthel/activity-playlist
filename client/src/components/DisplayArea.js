import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import TrackList from "./TrackList";

class DisplayArea extends Component {
  render() {
    if (this.props.tracks === false) {
      return (<SearchBar handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} value={this.props.value} />)
    } else {
      return (<TrackList tracks={this.props.tracks} currentUser={this.props.currentUser}/>)
    }
  }
}
export default DisplayArea;