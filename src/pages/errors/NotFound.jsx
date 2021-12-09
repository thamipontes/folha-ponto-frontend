import {Component} from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <span className="display-1">
                            404
                        </span>
                        <div className="mb-4 lead" >
                            Nada Aqui
                        </div>
                        <Link className="btn btn-link" to="/login"> Back Home </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export {NotFound};