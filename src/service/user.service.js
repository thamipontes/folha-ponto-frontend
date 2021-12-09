import axios from 'axios';
import {BehaviorSubject} from 'rxjs';


const API_URL = 'http://localhost:8080/usuario/';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

class UserService{
    get currentUserValue(){
        return currentUserSubject.value;
    }

    get currentUser(){
        return currentUserSubject.asObservable();
    }

    login(usuario){
        const headers = {
            'Authorization': 'Basic' + ' ' + Buffer.from(usuario.login + ':' + usuario.senha, 'utf8').toString('base64')
        }

        return axios.get(process.env.API_URL + 'usuario/login', {headers: headers}).then(response => {
            response.data.senha = usuario.senha;
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            currentUserSubject.next(response.data);
        })
    }

    logOut(){
        return axios.post(process.env.API_URL + 'usuario/logout', {}).then(()=>{
            localStorage.removeItem('currentUser');
            currentUserSubject.next(null);
        })

    }

    register(usuario){
        return axios.post(process.env.API_URL + 'usuario', usuario);
    }

    changeRole(login, role){
        return axios.put(process.env.API_URL + 'usuario' + login + 'change' + role, {});
    }


}

export default new UserService();