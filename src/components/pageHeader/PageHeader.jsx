import {React, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import userService from './../../service/user.service'

/**Importando as imagens*/
import backIcon from '../../assets/images/icons/back.svg';

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
                        <Link to="/">
                            <img src={backIcon} alt="Voltar"/>
                        </Link>
                    </div>

                    <div className="header-content">
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
                    </div>         
                </header>
            }

            <div>
                {!usuarioAtual &&
                    <header className="page-header">
                        <div className="top-bar-container">
                            <Link to="/">
                                <img src={backIcon} alt="Voltar"/>
                            </Link>
                        </div>

                        <div className="header-content">
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
                    </header>                
                }
            </div>  

        </div>
    );
}

export {PageHeader}