import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  handleSubmit(e) {
    e.preventDefault()
    const valueLog = e.target.elements[0].value;
    const valuePass = e.target.elements[1].value;
    window.localStorage.setItem('rr_login', valueLog)
    window.localStorage.setItem('rr_password', valuePass)

    location.reload();
    
  }
  render() {
    return (
        <form className="login_form" onSubmit={this.handleSubmit}>
          <input type='text' placeholder='login' />
          <input type='text' placeholder='password' />
          <button className="login_button"type='submit'>Send</button>
          <button><Link to='/admin'> Enter </Link></button>
        </form>
    )
  }
}
