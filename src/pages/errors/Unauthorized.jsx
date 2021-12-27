import {Component} from 'react';
import {Link} from 'react-router-dom';
import { PageVoltar } from '../../components/PageVoltar/PageVoltar';


class Unauthorized extends Component{
    render(){
        return(
            <div>
                <PageVoltar></PageVoltar>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <span className="display-1">
                            401
                        </span>
                        <div className="mb-4 lead" >
                            Desculpa, mas apenas o ADMIN pode realizar essa ação!
                        </div>
                        <Link className="btn btn-link" to="/landing"> Voltar para Home </Link>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export {Unauthorized};