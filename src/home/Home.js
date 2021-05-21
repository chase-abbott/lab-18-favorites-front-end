import { Component } from 'react';
import { addFavorite, getFavorites } from '../Favorites-Api-Utils.js';
import request from 'superagent';
import './Home.css';


const WHITE_HEART = '🤍';
const RED_HEART = '❤️';

export default class Home extends Component {

  state = {
    search: '',
    gifs: [],
    favorites: []
  }

  componentDidMount = async () => {
    const dbFavorites = await getFavorites();
    this.setState({ favorites: dbFavorites });
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

    const dbFavorites = await getFavorites();
    
    const matchingGif = gifs.find(gif => gif.url === target.value);
    const matchingFavorite = dbFavorites.find(favorite => {
      return favorites.find(f => f.url === favorite.url);
    });

    console.log(matchingFavorite);
    console.log(matchingGif);
    // if (matchingFavorite) {
    //   await deleteFavorite(matchingFavorite);
    //   const newDb = await getFavorites();
    //   this.setState({ favorites: newDb });
    // } else {
    if (matchingGif){
      await addFavorite(matchingGif);
      const updateFavorites = [...favorites, matchingGif];
      this.setState({ favorites: updateFavorites });
    }

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
              <button onClick={this.handleFavoriteAdd} className="heart" value={gif.url}>
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