import {useSelector} from 'react-redux';
import { Fragment } from 'react';
import {Navigate , Route} from 'react-router-dom';
function ProtectedRoute({component : Component , ...rest}) {

    const {loading , isAuthenticated , user} = useSelector(state=>state.user)
    return ( 
        <Fragment>
            {!loading && (
                <Route
                 {...rest}
                 render={(props)=>{
                    if(!isAuthenticated){
                        return <Navigate to='/login' />
                    }

                    return <Component {...props}/>}
                 }/>
            )}
        </Fragment>
     );
}

export default ProtectedRoute;