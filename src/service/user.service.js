import axios from 'axios';
import {BehaviorSubject} from 'rxjs';


const API_URL = 'https://folha-ponto-backend.herokuapp.com/';

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

        return axios.get(API_URL + 'usuario/login', {headers: headers}).then(response => {
            response.data.senha = usuario.senha;
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            currentUserSubject.next(response.data);
        })
    }

    logOut(){
        return axios.post(API_URL + 'usuario/logout', {}).then(()=>{
            localStorage.removeItem('currentUser');
            currentUserSubject.next(null);
        })

    }

    register(usuario){
        return axios.post(API_URL + 'usuario', usuario);
    }

    changeRole(login, role){
        return axios.put(API_URL + login + 'change' + role, {});
    }

    registrarBatida(momento){
        return axios.post(API_URL + '/batidas', momento);
    }


}

export default new UserService();