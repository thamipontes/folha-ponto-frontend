import {React} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

/**Importando as imagens*/
import backIcon from '../../../assets/images/icons/back.svg';
import landingImg from '../../../assets/images/ATA.png';

const PageHome = (props) => {

        return(    
            <div>
                    <header className="page-header-entrada"> 
                    <div className="container">
                    <div className="row">
                    <div className="top-header">
                    <div className="col-sm-8">
                        <a href="https://github.com/thamipontes/folha-ponto-frontend">
                            <img src={landingImg} className="App-logo" alt="logo"/>                          
                        </a>
                    </div>
                    <div className="col-sm-1">
                        <Link to="/">
                            <img src={backIcon} alt="Voltar"/>
                        </Link>
                        </div>
                        </div>
                    </div>   
                    </div>

                </header>         
            </div>  

    );
}

export {PageHome}