import React, {Component} from 'react';
// import './TrackList.css'

class Track extends Component {
  render() {
    return (
      <img src={this.props.thumbnail} />
    )
  }
}
export default Track;