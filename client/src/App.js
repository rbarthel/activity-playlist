import React, { Component } from 'react';
import jQuery from 'jquery';
import Header from "./components/Header";
import DisplayArea from "./components/DisplayArea"
import Greeting from './components/Greeting'
import spotify from './images/spotify.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      playlistUri: false,
      currentUser: null,
      greeting: "To get started, what kind of activity are you doing?",
      token: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
   this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (!this.state.value) {
      alert('Please enter a value to search');
    } else {
       jQuery.ajax({
        url: `http://localhost:8080/users/__natsy/playlists/new/${this.state.value}`,
        dataType: "json",
        success: function(data) {
          this.setState({ greeting: `Your curated playlist for ${this.state.value}`, playlistUri: data });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
    event.preventDefault();
  }

  componentWillMount() {
    if (!this.state.token) {
      var tokenRegex = /#access_token=(.*?)&/g;
      var authToken = (tokenRegex.exec(window.location.href));

      if (authToken) {
        this.setState({ token: authToken[1] });
      } else {
        window.location = "https://accounts.spotify.com/en/authorize?client_id=990e9989dedd40b1ad8d494562c74fb6&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback%2F"
      }

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={spotify} className="App-logo" alt="logo" />
          <Header />
        </header>
        <div className='App-search-form'>

          <Greeting message={this.state.greeting}/>

          <DisplayArea currentUser={this.state.currentUser} playlistUri={this.state.playlistUri} handleSubmit={this.handleSubmit} handleChange={this.handleChange} value={this.state.value} />

        </div>
      </div>
    );
  }
}

export default App;

