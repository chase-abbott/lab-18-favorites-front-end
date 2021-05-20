import { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';
import './Home.css';

export default class Home extends Component {
  
state = {
  search: '',
  gifs: []
}

handleSearchInput = ({ target }) => {
  this.setState({ search: target.value });
}

handleSearch = async () => {
  const { search, gifs } = this.state;
  const { userToken } = this.props;
  const response = await request.get('/api/gifs')
    .set('Authorization', userToken)
    .query({ search: search });
  const updatedGifs = [...gifs, response.body];
  this.setState({ gifs: updatedGifs });
}

render() {
  const { gifs } = this.state;

  return (
    <div className="Home">
      <div>
        <input placeholder='Search for a Gif!' value={this.state.search} onChange={this.handleSearchInput}/>
        <button onClick={this.handleSearch} >Search!</button>
      </div>
        
      <ul>
        {gifs.map(gif => {
          <li key={gif.id}>
            <p>Title</p>
            <image src={gif.images.url}></image>
            <p>Rating</p> 
          </li>;
        })}
        
      </ul>

    </div>
  );
}

}