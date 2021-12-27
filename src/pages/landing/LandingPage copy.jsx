import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './styles.css'
import landingImg from '../../assets/images/ATA.png';
import givenClassesIcon from '../../assets/images/icons/give-classes.svg';
import { PageHeader } from '../../components/pageHeader/PageHeader';

function LandingPage(){

    return (
        <div>
            <PageHeader></PageHeader>
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <h2>Seja bem-vindo!</h2>
                    <span>Que tal registrar a batida do seu ponto?! Ou você também pode enviar email personalizado
                        para os usuários do projetinho! </span>
                </div>
                <img src={landingImg} alt="Imagem" className="hero-image"/>
                    <div className="row">
                        <div className="col-sm">    
                            <div className="buttons-container">
                                <Link to="/email">
                                    Enviar Email
                                </Link>                    
                            </div>
                        </div>    
                            <div className="col-sm"> 
                                <div className="buttons-container">
                                    <Link to="/batidas">
                                        Registrar Batidas
                                    </Link>                    
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            </div>
    );
   
}

export {LandingPage};