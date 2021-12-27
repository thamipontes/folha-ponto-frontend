import {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from 'react-router-dom';
import UserService from '../../service/user.service';
import { Role } from '../../models/role';
import { Usuario } from '../../models/usuario';
import './style.css';
import { PageVoltar } from '../../components/PageVoltar/PageVoltar';


const ProfilePage = (props) => {

    const [usuario, setUsuario] = useState(new Usuario('', ''));


        useEffect(() => {
            if(UserService.currentUser === null){
                props.history.push('/login');
                return;
            }

            UserService.currentUser.subscribe(data => {
                setUsuario(data);
              });
        }, [])

    const changeRole = () => {

        const novaRole = usuario.role === Role.ADMIN ? Role.USER : Role.ADMIN;
        UserService.changeRole(usuario.login, novaRole).then((response) => {
            usuario.role = response.data.role;
            localStorage.setItem('currentUser', JSON.stringify(usuario));
            setUsuario(usuario);
        });

    }

    return(
            
        <div className="card">
            <PageVoltar></PageVoltar>

            <div class="jumbotron">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 text-center">
                <h1 class="display-3">Olá, {usuario.nomeCompleto}</h1>
                  <p class="lead display-6">Seu dados</p>
                  <p class="lead">{usuario.login}</p>                
                <p class="lead">{usuario.role}</p>
                  <hr class="my-4"/>
                  <p>Esta é uma zona de perigo! Mude apenas se tiver certeza!</p>
                  <p class="lead">
                    <a class="btn btn-danger btn-lg" href="#" role="button" onClick={() => changeRole()}>Mudar Role</a>
                  </p> 
                </div>    
                </div>       
                </div>
        </div>
        </div>


    );
}

export {ProfilePage};
