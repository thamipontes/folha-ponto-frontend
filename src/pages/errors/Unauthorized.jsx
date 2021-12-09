import {Component} from 'react';
import {Link} from 'react-router-dom';


class Unauthorized extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <span className="display-1">
                            401
                        </span>
                        <div className="mb-4 lead" >
                            Não Pode
                        </div>
                        <Link className="btn btn-link" to="/login"> Back Home </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export {Unauthorized};