import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Usuario } from '../../models/usuario';
import UserService from './../../service/user.service';
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import { PageHome } from '../../components/pageHeader/PageHome/PageHome';



const RegisterPage = (props) => {

    const history = useHistory();

    useEffect(() => {
        if(UserService.currentUserValue){
            history.push('/home');
            return;
        }
    }, [])

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    var usuario = "";

    const formik = useFormik({
        initialValues: {
            login: "",
            email: "", 
            nomeCompleto: "",
            senha: "" 
        },
        onSubmit: async (values) => {

            setSubmitted(true);
            setLoading(true);

            usuario = ({
                login: values.login,
                nomeCompleto: values.nomeCompleto,
                senha: values.senha,
                email: values.email
            })            

            await UserService.register(usuario).then(data => {
                alert('Usuário registrado com sucesso');
                UserService.enviarEmailResgitro(usuario.email);
                console.log(usuario.email);
                history.push('/login');
            }, error => {    
                    setErrorMessage(error.response.data.mensagem);
                    setLoading(false);    
            })
        }
    })

    return(
        
            <div className="form-container">
                    <PageHome></PageHome>
                <div className="card custom-card">
                    <div className="header-container">
                        <i className= "fa fa-user-plus"/>
                    </div>
                    {errorMessage && <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <form onSubmit={formik.handleSubmit}
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
                            value = {formik.values.login}
                            onChange = {formik.handleChange}/>

                            <div className="invalid-feedback">
                                Login Inválido
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nomeCompleto"> Nome Completo </label>
                            <input type="text"
                            className="form-control"
                            name="nomeCompleto"
                            required
                            placeholder= "Nome Completo"
                            value = {formik.values.nomeCompleto}
                            onChange = {formik.handleChange}/>

                            <div className="invalid-feedback">
                                Nome necessario
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email"> Email </label>
                            <input type="email"
                            className="form-control"
                            name="email"
                            required
                            placeholder= "Email"
                            value = {formik.values.email}
                            onChange = {formik.handleChange}/>

                            <div className="invalid-feedback">
                                Nome necessario
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha"> Senha </label>
                            <input type="password"
                            className="form-control"
                            name="senha"
                            required
                            placeholder= "Senha"
                            value = {formik.values.senha}
                            onChange = {formik.handleChange}/>
                            <div className="invalid-feedback">
                                Senha Invalida
                            </div>
                        </div>

                        <div className="buttons-container">
                        <button className="btn btn-lock"
                            disabled={loading}
                        >
                            Criar
                        </button>
                        </div>

                    </form>

                    <Link to="/login" className="btn btn-link button-reg">Login</Link>

                </div>
            </div>
        );
    }


export {RegisterPage};