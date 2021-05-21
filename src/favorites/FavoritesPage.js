import { Component } from 'react';
import './FavoritesPage.css';
import { deleteFavorite, getFavorites } from '../Favorites-Api-Utils';



const WHITE_HEART = '🤍';
const RED_HEART = '❤️';

export default class FavoritesPage extends Component {
  
state = {
  favorites: [],
}

componentDidMount = async () => {
  const response = await getFavorites();
  this.setState({ favorites: response });
  console.log(response);
}

handleFavoriteDelete = async ({ target }) => {
  const { favorites } = this.state;
  const matchingFavorite = favorites.find(favorite => favorite.url === target.value);
 
  await deleteFavorite(matchingFavorite);
  const filteredFavorites = favorites.filter(favorite => favorite.id !== matchingFavorite.id);
  this.setState({ favorites: filteredFavorites });
  
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
              <button onClick={this.handleFavoriteDelete} className="heart" value={gif.url}>
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