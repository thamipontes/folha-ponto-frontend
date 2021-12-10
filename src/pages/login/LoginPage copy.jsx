import {Component, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/pageHeader/PageHeader';
import { Usuario } from '../../models/usuario';
import UserService from './../../service/user.service';
import '../../components/pageHeader/PageHeader' 
import './styles.css';




const LoginPage = (props) => {

    const [usuario, setUsuario] = useState(new Usuario('', ''));
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if(UserService.currentUserValue){
            props.history.push('/landing');
            return;
        }
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUsuario((prevState =>{
            return{
                ...prevState,
                [name]: value
            }
        }))
    }


    const handleLogin = (e) =>
    {

        e.preventDefault();

        setSubmitted(true);

        if(!usuario.login || !usuario.senha){
            return;
        }

        setLoading(true);

        UserService.login(usuario)
        .then(
            data => {
                props.history.push('/landing');
        }, error => {
                console.log(error);
                setErrorMessage('Not Valid');
                setLoading(false);
        });
    }


    return (
        <div className="form-container">
            <div className="card custom-card">
                <div className="header-container">
                    <i className= "fa fa-user"/>
                </div>
                {errorMessage && <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                }

                <form onSubmit={(event) => handleLogin(event)}
                    noValidate
                    className={submitted ? 'was-validated' : ''}
                >

                    <div className="form-group">
                        <label htmlFor="login"> Login </label>
                        <input type="text"
                        className="form-control"
                        name="login"
                        required
                        placeholder= "Login"
                        value = {usuario.login}
                        onChange = {(event => handleChange(event))}/>

                        <div className="invalid-feedback">
                            Login Invalido
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha"> Senha </label>
                        <input type="password"
                        className="form-control"
                        name="senha"
                        required
                        placeholder= "Senha"
                        value = {usuario.senha}
                        onChange = {(event => handleChange(event))}/>
                        <div className="invalid-feedback">
                            Senha Invalida
                        </div>
                    </div>
                    <div className="buttons-container">
                    <button className="btn btn-block"
                            onClick={() => setSubmitted(true)}
                            disabled={loading}
                    >
                        Login
                    </button>
                    </div>
                </form>
                <Link to="/register" className="btn btn-link button-reg">Registrar</Link>
            </div>
        </div>
    );
}


export {LoginPage};