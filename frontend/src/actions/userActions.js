import {LOGIN_REQUEST , LOGIN_SUCCESS , LOGIN_FAIL , CLEAR_ERRORS} from '../constants/userConstant';

import axios from 'axios';

export const login = (email , password)=> async (dispatch)=>{

    try{

        console.log("called..")
        dispatch({type: LOGIN_REQUEST});

        const config = {headers : {"Content-type": "application/json"}}

        const {data} = await axios.post (`/api/v1/login` , {email, password}, config);
        // console.log(data)

        dispatch({type:LOGIN_SUCCESS , payload:data.user});

    }catch(error){
        dispatch({type: LOGIN_FAIL , payload : error.response.data.message});
    }
}


export const clearErrors=()=>async(dispatch)=>{

    dispatch({type:CLEAR_ERRORS})
}