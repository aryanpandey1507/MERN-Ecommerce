import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
function ProtectedRoute({component : Component , ...rest}) {

    const { isAuthenticated , user} = useSelector(state=>state.user)
    return ( 
       

        isAuthenticated ? <Outlet /> : <Navigate to ='/login'/>
     );
}

export default ProtectedRoute;