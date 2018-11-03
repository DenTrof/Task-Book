import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import HomePage from 'containers/HomePage';
import Login from 'containers/Login';
import Admin from 'containers/Admin';

import { Link } from 'react-router-dom';


export default class AppRoutePages extends React.Component {
    
    render() {
        const login = window.localStorage.getItem('rr_login')

        return (
            <HashRouter>
                <div>
                    <div className="header">
                        <Link to='/'><div className="header-link"> HOME </div></Link>
                        <Login />
                    </div>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/login' component={Login} />
                    <Route path='/admin' render={() => ((login !== 'admin' && password !== '123') ? (<Redirect to="/" />) : (<Admin />))} />
                </div>
            </HashRouter>
        )
    }
}

