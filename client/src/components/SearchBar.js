import React, {Component} from 'react';
import './SearchBar.css'

class SearchBar extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input className='SearchBar-input' type='text' value={this.props.value} onChange={this.props.handleChange}/>
        <br />
        <button type='submit' value='Submit' className='button SearchBar-submit'>Submit</button>
      </form>
    )
  }
}
export default SearchBar;