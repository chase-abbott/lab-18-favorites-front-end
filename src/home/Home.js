import { Component } from 'react';
import { addFavorite, getGifs } from '../Favorites-Api-Utils.js';
import request from 'superagent';
import './Home.css';
import FavoritesPage from '../favorites/FavoritesPage.js';

const WHITE_HEART = '🤍';
const RED_HEART = '❤️';

export default class Home extends Component {

  state = {
    search: '',
    gifs: [],
    favorites: []
  }


  handleSearchInput = ({ target }) => {
    this.setState({ search: target.value });
  }

  handleSearch = async () => {
    const { search } = this.state;
    const { userToken } = this.props;
    const response = await request.get('/api/gifs')
      .set('Authorization', userToken)
      .query({ search: search });

    this.setState({ gifs: response.body });
  }

  handleFavoriteAdd = async ({ target }) => {
    const { favorites, gifs } = this.state;
    const matchingGif = gifs.find(gif => gif.id === target.value);
    const newFavorite = await addFavorite(matchingGif);
    const updateFavorites = [...favorites, matchingGif];
    this.setState({ favorites: updateFavorites });
  }

  render() {
    const { gifs } = this.state;


    return (
      <div className="Home">
        <div className="search">
          <input placeholder='Search for a Gif!' value={this.state.search} onChange={this.handleSearchInput} />
          <button onClick={this.handleSearch} >Search!</button>
        </div>

        <ul>
          {gifs.map(gif => (
            <li key={gif.id}>
              <img src={gif.images.original.url} alt={gif.title}></img>
              <button onClick={this.handleFavoriteAdd} className="heart" value={gif.id}>
                {this.state.favorites.find(item => item.id === gif.id)
                  ? RED_HEART
                  : WHITE_HEART}
              </button>
            </li>
          ))}

        </ul>

      </div>
    );
  }

}