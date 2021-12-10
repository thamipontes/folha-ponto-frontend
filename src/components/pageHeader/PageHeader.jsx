import {React, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import userService from './../../service/user.service'

/**Importando as imagens*/
import backIcon from '../../assets/images/icons/back.svg';
import landingImg from '../../assets/images/ATA.png';

const PageHeader = (props) => {

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
        setErrorMessage('Algo errado aconteceu com o Logout');
      },
      );
    };


    return(
        <div>
            {usuarioAtual &&
        <header className="page-header"> 
            <div className="top-bar-container">
                <a href="https://github.com/thamipontes/folha-ponto-frontend">
                     <img src={landingImg} className="App-logo" alt="logo"/>
                        Java.React.Socorro
                </a>

                <div className="header-item">
                    <a href="/landing">
                        <span className="fa fa-home"/>
                            Home
                    </a>
                </div>

                <div className="header-item">
                    <a href="/profile">
                        <span className="fa fa-user"/>
                            {usuarioAtual.nomeCompleto}
                    </a>
                </div>

                <div className="header-item">
                    <a href="#" onClick={() => lougout()}>
                        <span className="fa fa-sign-out"/>
                            LogOut
                    </a>
                </div>
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
            </div>       
        </header>
            }

            <div>
                {!usuarioAtual &&
                    <header className="page-header"> 
                    <div className="top-bar-container">
                        <a href="https://github.com/thamipontes/folha-ponto-frontend">
                             <img src={landingImg} className="App-logo" alt="logo"/>                          
                        </a>

                        <div className="login-header-button">
                            <a href="/login">
                                <span className="fa fa-user"/>
                                &nbsp;
                                    Login
                            </a>
                        </div>
        
                        <div className="">
                            <a href="/register">
                                <span className="fa fa-plus"/>
                                &nbsp;
                                    Registrar
                            </a>
                        </div>
                    </div>       
                </header>         
                }
            </div>  

        </div>
    );
}

export {PageHeader}