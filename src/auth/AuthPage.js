import { Component } from 'react';
import './AuthPage.css';

export default class AuthPage extends Component {
  
  state = {
    isSignUp: true,
    name: '',
    email: '',
    password: ''
  }

  handleNameChange = ({ target }) => {
    this.setState({ name : target.value });
  } 


  handleEmailChange = ({ target }) => {
    this.setState({ email : target.value });
  } 


  handlePasswordChange = ({ target }) => {
    this.setState({ password : target.value });
  } 

  handleSignUpToggle = (e) => {
    e.preventDefault();
    this.setState({ isSignUp : !this.state.isSignUp });
  }


  handleSubmit = (e) => {
    e.preventDefault();
  } 

  render() {



    return (
      <div className="AuthPage">
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
                Name
              <input required placeholder='Enter Your Name' value={this.state.name} onChange={this.handleNameChange}/>
            </label>
          </p>
          <p>
            <label>
                  Email
              <input required placeholder='Enter Your email address' value={this.state.email} onChange={this.handleEmailChange}/>
            </label>
          </p>
          <p>
            <label>
                  Password
              <input required placeholder='Enter Your Password' type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
            </label>
          </p>
             
          <button>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <button onClick={this.handleSignUpToggle}>{this.state.isSignUp ? 'Already have an account?' : 'Create an Account'}</button>
      </div>
    );
  }

}

