import {React} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

/**Importando as imagens*/
import backIcon from '../../assets/images/icons/back.svg'

const PageBatidas = (props) => {

        return(    
            <div>
                    <header className="page-header"> 
                    <div className="container">
                    <div className="row">
                    <div className="top-header-batidas">
                    <div className="col-sm">
                    <div className="header-item">
                            <a href="/landing">
                                <span className="fa fa-home"/>
                                &nbsp;Home
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="header-item">
                            <a href="/404">
                                <span className="fa fa-history"/>
                                &nbsp;Relatório
                            </a>
                        </div>
                        </div>
                    <div className="col-sm-1">
                        <Link to="/landing">
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

export {PageBatidas}