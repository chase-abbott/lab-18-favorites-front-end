import { Component } from 'react';
import './FavoritesPage.css';
import { addFavorite, deleteFavorite, getFavorites } from '../Favorites-Api-Utils';



const WHITE_HEART = '🤍';
const RED_HEART = '❤️';

export default class FavoritesPage extends Component {
  
state = {
  favorites: [],
  gifs: []
}

componentDidMount = async () => {
  const response = await getFavorites();
  this.setState({ favorites: response });
  console.log(response);
}

handleFavoriteAdd = async ({ target }) => {
  const { favorites, gifs } = this.state;
  const matchingGif = gifs.find(gif => gif.id === target.value);
  const matchingFavorite = favorites.find(favorite => favorite.id === target.value);
  if (matchingFavorite) {
    await deleteFavorite(matchingFavorite);
    const filteredFavorites = favorites.filter(favorite => favorite.id !== matchingFavorite.id);
    this.setState({ favorites: filteredFavorites });
  }
  if (matchingGif) {
    await addFavorite(matchingGif);
    const updateFavorites = [...favorites, matchingGif];
    this.setState({ favorites: updateFavorites });
  }
}

render() {
  const { favorites } = this.state;
  return (
    <div className="FavoritesPage">
      <h2> Favorites Page </h2>
      <div>
        <ul>
          {favorites.map(gif => (
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
    </div>
  );
}

}