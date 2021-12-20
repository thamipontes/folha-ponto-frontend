import {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from 'react-router-dom';
import UserService from '../../service/user.service';
import { Role } from '../../models/role';
import { Usuario } from '../../models/usuario';
import './style.css';


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

        <div className="card text-center ">
            <div className="card-body dado-card">
            <h5 class="card-title">{usuario.nomeCompleto}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Seus Dados</h6>
            <div>
                <p class="card-text">{usuario.login}</p>
                
                <p class="card-text">{usuario.role}</p>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm">
                        <button className="btn btn-primary"
                        disabled
                        onClick={() => changeRole()} >
                            Mudar Role
                    </button>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm">
                        <button className="btn btn-primary"
                        disabled
                        onClick={() => changeRole()} >
                            Mudar Senha
                    </button>
                    </div>
                    <div className="col-sm-3"></div>

                
                </div>


            </div>




        </div>


        </div>
    );
}

export {ProfilePage};