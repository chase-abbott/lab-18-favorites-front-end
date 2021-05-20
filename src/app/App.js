import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import AuthPage from '../auth/AuthPage';
import FavoritesPage from '../favorites/FavoritesPage';

class App extends Component {

  state = {
    user: null,
    token: window.localStorage.getItem('TOKEN'),
  }

  handleUser = user => {
    window.localStorage.setItem('TOKEN', user.token);
    this.setState({ token: user.token, user: user });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header user={this.state.user} />
          <main>

            <Switch>
              <Route path="/" exact={true}
                render={routerProps => (
                  this.state.token
                    ? <Home {...routerProps} userToken={this.state.token}/>
                    : <Redirect to="/auth"/>
                
                )}
              />

              <Route path="/auth" exact={true}
                render={routerProps => (
                  <AuthPage onUser={this.handleUser} {...routerProps} />

                )}
              />

              <Route path="/favorites"
                render={routerProps => (
                  this.state.token
                    ? <FavoritesPage {...routerProps}/>
                    : <Redirect to="/auth"/>
                )}
              />

              <Redirect to="/" />

            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }

}

export default App;
