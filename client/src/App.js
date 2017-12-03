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
    this.state = { value: '', tracks: false, currentUser: null, greeting: "To get started, what kind of activity are you doing?"};

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
      var self = this;
      jQuery.ajax({
        url: `http://localhost:8080/search/playlists/${this.state.value}`,
        dataType: 'json',
        success: function(data) {
          this.setState({ currentUser: data[0].user_id, greeting: `Your curated playlist for ${this.state.value}`})
          jQuery.ajax({
            url: `http://localhost:8080/users/${data[0].user_id}/playlists/${data[0].playlist_id}/tracks`,
            dataType: 'json',
            success: function(data) {
              self.setState({tracks: data.items})
            }
          })
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={spotify} className="App-logo" alt="logo" />
          <Header />
        </header>
        <div className='App-search-form'>
          <p className="App-intro">
            <Greeting message={this.state.greeting}/>
          </p>

          <DisplayArea currentUser={this.state.currentUser} tracks={this.state.tracks} handleSubmit={this.handleSubmit} handleChange={this.handleChange} value={this.state.value} />

        </div>
      </div>
    );
  }
}

export default App;

