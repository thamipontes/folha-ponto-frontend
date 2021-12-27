import {Component, useEffect, useState} from 'react';
import UserService from '../../service/user.service'
import { Subscription } from 'rxjs';
import { useHistory } from 'react-router-dom';
import { useFormik } from "formik";
import { PageHome } from '../../components/pageHeader/PageHome/PageHome';
import { PageHeader } from '../../components/pageHeader/PageHeader';
import { PageBatidas } from '../../components/PageBatidas/PageBatidas';


const Batidas = (props) => {

    const history = useHistory();

        const [submitted, setSubmitted] = useState(false);
        const [loading, setLoading] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        var momento = '';
        const formik = useFormik({
            initialValues: {
                data: "",
                hora: "" 
            },
            onSubmit: async (values) => {

                var dataAmerican = new Date(values.data).toISOString().slice(0, 10)

                momento = ({dataHora: dataAmerican + 'T' + values.hora + ':00'});
                setSubmitted(true);

                setLoading(true);
        
                await UserService.registrarBatida(momento).then(data => {
                    alert('Registro realizado com sucesso!');
                    history.push('/landing');
                }, error => {
        
                    if(error?.response?.status === 403){
                        console.log(error);
                        setErrorMessage(error.response.data.mensagem);
                        setLoading(false);
                    }else{
                        console.log(error);
                        setErrorMessage(error.response.data.mensagem);
                        setLoading(false);
                    }
        
                })
            }
        });


    
        useEffect(() => {
            if(UserService.currentUser === null){
                props.history.push('/login');
                return;
            } 
        }, [])

    
    return (  
        <div className="form-container">
            <PageBatidas></PageBatidas>
                <div className="card custom-card">
                    <div className="header-container">
                        <i className= "fa fa-clock-o"/>
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
                            <label htmlFor="data"> Data </label>
                            <input type="date"
                            className="form-control"
                            name="data"
                            required
                            placeholder= "aaaa-mm-dd"
                            value = {formik.values.data}
                            onChange = {formik.handleChange}/>
                        </div>
                      

                        <div className="form-group">
                            <label htmlFor="hora"> Horário </label>
                            <input type="text"
                            className="form-control"
                            name="hora"
                            required
                            placeholder= "hh:mm"
                            value = {formik.values.hora}
                            onChange = {formik.handleChange}/>
                        </div>

                        <div className="buttons-container">
                        <button type= "submit" 
                            className="btn btn-lock"
                            disabled={loading}
                        >
                            Registrar Batida
                        </button>
                        </div>

                    </form>          
                </div>

            </div> 

            
    );
}

export {Batidas};