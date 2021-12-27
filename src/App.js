import './App.css';
import {Component, useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage copy';
import { RegisterPage } from './pages/register/RegisterPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { NotFound } from './pages/errors/NotFound';
import { Unauthorized } from './pages/errors/Unauthorized';
import {EmailPage} from './pages/email/EmailPage';
import {Batidas} from './pages/batidas/Batidas';
import userService from './service/user.service'


import AuthGuard from './guards/AuthGuard.jsx';


import { Role } from './models/role'
import { PageHeader } from './components/pageHeader/PageHeader';
import { Home } from './pages/Home/Home';
import { LandingPage } from './pages/landing/LandingPage copy';
import { PageHome } from './components/pageHeader/PageHome/PageHome';



function App(){

  return (
    <Router>
        <div className="page-container">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path = "/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <AuthGuard 
              path= "/batidas" 
              roles={[Role.USER, Role.ADMIN]} 
              component={Batidas}/>
            <AuthGuard 
              path= "/email" 
              roles={[Role.ADMIN]} 
              component={EmailPage}/>
            <AuthGuard 
              path= "/landing" 
              roles={[Role.USER, Role.ADMIN]} 
              component={LandingPage}/>
            <AuthGuard 
              path= "/profile" 
              roles={[Role.USER, Role.ADMIN]} 
              component={ProfilePage}/>
            <Route exact path="/404" component={NotFound}/>
            <Route exact path="/401" component={Unauthorized}/>
            <Redirect from="*" to ="/404"/>
      </Switch>
      </div>        
    </Router>
);
}

export default App;
