import React, { Component } from 'react';
import Header from "./components/Header";
import SearchBar from "./components/SearchBar"
import spotify from './images/spotify.png';
import './App.css';

class App extends Component {
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

          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;

