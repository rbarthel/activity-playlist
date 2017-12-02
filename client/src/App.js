import React, { Component } from 'react';
import jQuery from 'jquery';
import Header from "./components/Header";
import SearchBar from "./components/SearchBar"
import spotify from './images/spotify.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: ''};

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
        url: `https://localhost:8080/search/playlists/${this.state.value}`,
        dataType: 'json',
        success: function(data) {
          console.log(data);
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
            To get started, what kind of activity are you doing?
          </p>

          <SearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange} value={this.state.value} />
        </div>
      </div>
    );
  }
}

export default App;

