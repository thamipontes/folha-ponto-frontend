import './App.css';
import {Component, useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage copy';
import { RegisterPage } from './pages/register/RegisterPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { LandingPage } from './pages/landing/LandingPage';
import { NotFound } from './pages/errors/NotFound';
import { Unauthorized } from './pages/errors/Unauthorized';
import landingImg from './assets/images/ATA.png';


import AuthGuard from './guards/AuthGuard.jsx';


import { Role } from './models/role'
import userService from './service/user.service';
import { PageHeader } from './components/pageHeader/PageHeader';

function Content() {
  const history = useHistory();

  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    userService.currentUser.subscribe(data => {
      setUsuarioAtual(data);
    });
  }, []);

  const lougout = () => {
    userService.logOut().then(
      data => {
      history.push('/login');
    }, error => {
      setErrorMessage('Algo aconteceu');
    },
    );
  };

  return(
    <div>
      <div>
        {usuarioAtual &&
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand" href="https://github.com/thamipontes/folha-ponto-frontend">
              <img src={landingImg} className="App-logo" alt="logo"/>
              Java.React.Socorro
            </a>
                <li className="navbar-item">
                  <a className="nav-link" href="/landing">
                    <span className="fa fa-home"/>
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    <span className="fa fa-user"/>
                    {usuarioAtual.nomeCompleto}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => lougout()}>
                    <span className="fa fa-sign-out"/>
                    LogOut
                  </a>
                </li>
          </nav>
        
        }
      </div>


      <div>
        {!usuarioAtual &&
          <nav className="navbar navbar-expand navbar-default">
            <a className="navbar-brand" href="https://reactjs.org">
              <img src={landingImg} className="App-logo" alt="logo"/>
              Java.React.Socorro
            </a>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  <span className="fa fa-user-plus"/>
                  &nbsp;
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <span className="fa fa-sign-in"/>
                  Login
                </a>
              </li>
            </div>
          </nav>        
        }
      </div>
    </div>
  );

}



function App(){
  return (
    <Router>
        <PageHeader></PageHeader>
        <div className="page-container">
        <Switch>
            <Route exact path="/" component={LoginPage}/>
          <Route exact path = "/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <AuthGuard 
              path= "/landing" 
              roles={[Role.USER]} 
              component={LandingPage}/>
            <AuthGuard 
              path= "/profile" 
              roles={[Role.USER, Role.ADMIN]} 
              component={ProfilePage}/>
            <Route exact path="/404"ccomponent={NotFound}/>
            <Route exact path="/401" component={Unauthorized}/>
            <Redirect from="*" to ="/404"/>
      </Switch>
      </div>        
    </Router>
);
}

export default App;
