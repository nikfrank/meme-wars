import React from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    toVote: false,
  }

  setUsername = (event)=>
    this.setState({ username: event.target.value })

  setPassword = (event)=>
    this.setState({ password: event.target.value })

  login = ()=> {
    fetch('/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.username,
                             password: this.state.password }),
    }).then(response => response.status < 300 ?
                                          response.json() :
                                          response.json()
                                                  .then(err => Promise.reject(err)))
      .then(jsonResponse => {
        console.log('response from create user', jsonResponse);
        
        localStorage.userId = jsonResponse.userId;
        this.setState({ toVote: true });
      })
      .catch(err => console.error('create user failed with', err));
  }

  componentDidMount(){
    console.log('Login mount');
  }

  componentWillUnmount(){
    console.log('Login unmount');
  }

  render(){
    if( this.state.toVote ) return (<Redirect to='/vote'/>);

    return (
      <div className='Login Page'>
        <div className='login-box'>
          <label>
            <span>Username</span>
            <input value={this.state.username}
                   onChange={this.setUsername}/>
          </label>
          <label>
            <span>Password</span>
            <input type='password'
                   value={this.state.password}
                   onChange={this.setPassword}/>
          </label>
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
};

export default Login;
