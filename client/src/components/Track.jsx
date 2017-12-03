import React, {Component} from 'react';
// import './TrackList.css'

class Track extends Component {
  render() {
    var iframeSource = `https://open.spotify.com/embed?uri=${this.props.uri}`
    console.log(this.props.currentUser);
    if (this.props.currentUser) {
      return (
        <div>
          <img src={this.props.thumbnail} />
          <iframe src={iframeSource} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
        </div>
      )
    } else {
      return (
        <div>
          <img src={this.props.thumbnail} />
        </div>
      )
    }
  }
}
export default Track;