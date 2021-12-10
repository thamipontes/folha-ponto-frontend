import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './styles.css'
import landingImg from '../../assets/images/ATA.png';
import givenClassesIcon from '../../assets/images/icons/give-classes.svg';

function LandingPage(){

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <h2>Site desenvolvido para estudar habilidades de Spring, Java e React.</h2>
                </div>
                <img src={landingImg} alt="Imagem" className="hero-image"/>
                <div className="buttons-container">
                    <Link to="/login" className="login-button">
                        <img src={givenClassesIcon} alt="Login"/>
                        Login
                    </Link>                    
                </div>
            </div>
        </div>
    );
   
}

export {LandingPage};