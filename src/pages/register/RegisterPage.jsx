import userEvent from '@testing-library/user-event';
import {Component} from 'react';
import { Link } from 'react-router-dom';
import { Usuario } from '../../models/usuario';
import UserService from './../../service/user.service'

class RegisterPage extends Component{
    constructor(props){
        super(props)
        if(UserService.currentUserValue){
            this.props.history.push('/profile');
            return;
        }

        this.state = {
            usuario: new Usuario('', '', ''), 
            submitted: false,
            loading: false,
            errorMessage: '',
        };
    }


    handleChange(e){
        const {name, value} = e.target;
        const {usuario} = this.state;
        usuario[name] = value;
        this.setState({usuario: usuario});
    }

    handleRegister(e){
        e.preventDefault();

        this.setState({submitted: true});

        const {usuario} = this.state;

        if(!usuario.login || !usuario.nomeCompleto || !usuario.senha){
            return;
        }

        this.setState({loading: true});

        UserService.register(usuario).then(data => {
            this.props.history.push('/login')
        }, error => {
            if(error?.response?.status === 409){
                this.setState({
                    errorMessage: 'Nao pode esse login',
                    loading: false,
                });
            }else{
                this.setState({
                    errorMessage: 'Algo errado',
                    loading: false,
                });
            }
        })
    }

    render(){
        const {errorMessage, submitted, usuario, loading} = this.state;
        return(
            <div className="form-container">
                <div className="card custom-card">
                    <div className="header-container">
                        <i className= "fa fa-user"/>
                    </div>
                    {errorMessage && <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <form onSubmit={(event) => this.handleRegister(event)}
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
                            onChange = {(event => this.handleChange(event))}/>

                            <div className="invalid-feedback">
                                Login Invalido
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nomeCompleto"> Nome Completo </label>
                            <input type="text"
                            className="form-control"
                            name="nomeCompleto"
                            required
                            placeholder= "Nome Completo"
                            value = {usuario.nomeCompleto}
                            onChange = {(event => this.handleChange(event))}/>

                            <div className="invalid-feedback">
                                Nome necessario
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha"> Senha </label>
                            <input type="text"
                            className="form-control"
                            name="senha"
                            required
                            placeholder= "Senha"
                            value = {usuario.senha}
                            onChange = {(event => this.handleChange(event))}/>
                            <div className="invalid-feedback">
                                Senha Invalida
                            </div>
                        </div>

                        <button className="btn btn-success w-100 mt-3"
                            disabled={loading}

                        >
                            Criar
                        </button>

                    </form>

                    <Link to="/login" className="btn btn-link" style={{color: 'darkgray'}}>Login</Link>

                </div>
            </div>
        );
    }
}

export {RegisterPage};