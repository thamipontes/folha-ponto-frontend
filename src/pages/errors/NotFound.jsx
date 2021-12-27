import {Component} from 'react';
import {Link} from 'react-router-dom';
import { PageVoltar } from '../../components/PageVoltar/PageVoltar';

class NotFound extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <PageVoltar></PageVoltar>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <span className="display-1">
                            404
                        </span>
                        <div className="mb-4 lead" >
                            Ainda em construção no projetinho!
                        </div>
                        <Link className="btn btn-link" to="/landing"> Voltar para Home </Link>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export {NotFound};