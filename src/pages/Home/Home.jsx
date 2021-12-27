import {Link} from 'react-router-dom';
import './styles.css'
import landingImg from '../../assets/images/ATA.png';

function Home(){

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="text-container">
                    <h2>Site desenvolvido para estudar habilidades de Spring, Java e React.</h2>
                </div>
                <img src={landingImg} alt="Imagem" className="hero-image"/>
                    <div className="row">
                        <div className="col-sm">    
                            <div className="button-home-login">
                                <Link to="/login">
                                   Login
                                </Link>                    
                            </div>
                        </div>    
                            <div className="col-sm"> 
                                <div className="button-home-register">
                                    <Link to="/register">
                                        Registrar
                                    </Link>                    
                                </div>
                            </div>
                    </div>
                </div>
            </div>
    );
   
}

export {Home};