import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {

  render() { 
    const { user } = this.props;
    return (
      <header className="Header">

        <h1>React App</h1>
        <div className="nav">
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/"> Home </NavLink>
          {user
            ? <span> Hi {user.name}! </span>
            : <NavLink to="/auth"> My Account </NavLink>
          }
        </div>
        
      </header>
    );
  }

}
 
export default Header;