import React, {Component} from 'react';
// import './GreetingList.css'

class Greeting extends Component {
  render() {
    return (
      <p>{this.props.message}</p>
    )
  }
}
export default Greeting;