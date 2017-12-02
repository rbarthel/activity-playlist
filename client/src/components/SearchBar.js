import React, {Component} from 'react';
import './SearchBar.css'

class SearchBar extends Component {
  render() {
    return (
      <form>
        <input className='SearchBar-input' type='text' />
        <br />
        <button className='button SearchBar-submit'>Submit</button>
      </form>
    )
  }
}
export default SearchBar;