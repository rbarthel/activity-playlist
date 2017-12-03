import React, {Component} from 'react';
// import '../App.css'

class Greeting extends Component {
  render() {
    return (
      <p>{this.props.message}</p>
    )
  }
}
export default Greeting;