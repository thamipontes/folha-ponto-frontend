import {Component} from 'react';
import UserService from '../../service/user.service';
import { Role } from '../../models/role';

class ProfilePage extends Component{
    constructor(props){
        super(props)

        if(UserService.currentUserValue){
            this.props.history.push('/login');
            return;
        }

        this.state = {
            usuario: UserService.currentUserValue, 
        };
    }

    changeRole(){
        const {usuario} = this.state;
        const novaRole = usuario.role === Role.ADMIN ? Role.USER : Role.ADMIN;
        UserService.changeRole(usuario.login, novaRole).then((response) => {
            usuario.role = response.data.role;
            localStorage.setItem('currentUser', JSON.stringify(usuario));
            this.setState({usuario});
        })
    }

    render(){
        const {usuario} = this.state;
        return(
            <div className="jumbotron">
                <h1 className="display-4"> Vamos vê se deu bom</h1>
                <p className="lead">Fazendo teste</p>
                <button className="btn btn-primary"
                    onClick={() => this.changeRole()} >
                        Mudar Role
                </button>
            </div>
        );
    }
}

export {ProfilePage};