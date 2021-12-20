import userEvent from '@testing-library/user-event';
import {Component, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Email } from '../../models/email';
import UserService from '../../service/user.service'

const EmailPage = (props) => {

        const [email, setEmail] = useState(new Email('Thamires Pontes', 'microservice.socorro@gmail.com', '', '', ''));
        const [submitted, setSubmitted] = useState(false);
        const [loading, setLoading] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        useEffect(() => {
            if(UserService.currentUser === null){
                props.history.push('/login');
                return;
            } 
        }, [])


    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmail((prevState =>{
            return{
                ...prevState,
                [name]: value
            }
        }))
    }

    const handleEmail = (e) => {
        e.preventDefault();

        setSubmitted(true);

        setLoading(true);

        UserService.enviarEmail(email).then(data => {
            props.history.push('/home')
        }, error => {
            if(error?.response?.status === 409){
                console.log(error);
                setErrorMessage('Nao pode esse email');
                setLoading(false);
            }else{
                console.log(error);
                setErrorMessage('Algo deu errado');
                setLoading(false);
            }
        })
    }
    
    return (   
            <div className="form-container">
                <div className="card custom-card">
                    <div className="header-container">
                        <i className= "fa fa-paper-plane"/>
                    </div>
                    {errorMessage && <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <form onSubmit={(event) => handleEmail(event)}
                        noValidate
                        className={submitted ? 'was-validated' : ''}
                    >

                        <div className="form-group">
                            <label htmlFor="login"> Email </label>
                            <input type="text"
                            className="form-control"
                            name="emailPara"
                            required
                            placeholder= "Email"
                            value = {email.emailPara}
                            onChange = {(event => handleChange(event))}/>
                        </div>
                      

                        <div className="form-group">
                            <label htmlFor="login"> Assunto </label>
                            <input type="text"
                            className="form-control"
                            name="assunto"
                            required
                            placeholder= "Assunto"
                            value = {email.assunto}
                            onChange = {(event => handleChange(event))}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="login"> Texto </label>
                            <textarea type="text"
                            className="form-control"
                            name="texto"
                            required
                            placeholder= "Texto"
                            value = {email.texto}
                            onChange = {(event => handleChange(event))}></textarea>
                        </div>


                        <div className="buttons-container">
                        <button className="btn btn-lock"
                            disabled={loading}
                        >
                            Enviar
                        </button>
                        </div>

                    </form>          
                </div>
            </div>
    );
}





export {EmailPage};