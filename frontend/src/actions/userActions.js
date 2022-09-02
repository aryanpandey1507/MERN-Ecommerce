import {LOGIN_REQUEST , LOGIN_SUCCESS , LOGIN_FAIL , CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL , LOAD_USER_REQUEST , LOAD_USER_SUCCESS , LOAD_USER_FAIL , LOGOUT_SUCCESS , LOGOUT_FAIL,
    UPDATE_PROFILE_FAIL , UPDATE_PROFILE_SUCCESS , UPDATE_PROFILE_REQUEST,UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_RESET,UPDATE_PASSWORD_FAIL} from '../constants/userConstant';

import axios from 'axios';

//login

export const login = (email , password)=> async (dispatch)=>{

    try{

        dispatch({type: LOGIN_REQUEST});

        const config = {headers : {"Content-type": "application/json"}}

        const {data} = await axios.post (`/api/v1/login` , {email, password}, config);
        // console.log(data)

        dispatch({type:LOGIN_SUCCESS , payload:data.user});

    }catch(error){
        dispatch({type: LOGIN_FAIL , payload : error.response.data.message});
    }
}

//register
export const register = (userData)=> async (dispatch)=>{

    try{

        dispatch({type: REGISTER_USER_REQUEST});

        const config = {headers : {"Content-type": "multipart/form-data"}}

        const {data} = await axios.post (`/api/v1/register` , userData, config);
        // console.log(data)

        dispatch({type:REGISTER_USER_SUCCESS , payload:data.user});

    }catch(error)
    {

        dispatch({type: REGISTER_USER_FAIL , payload : error.response.data.message});

    }
}

//Load user
export const loadUser = ()=> async (dispatch)=>{

    try{

        dispatch({type: LOAD_USER_REQUEST});



        const {data} = await axios.get (`/api/v1/me`);
        // console.log(data)

        dispatch({type:LOAD_USER_SUCCESS , payload:data.user});

    }catch(error){
        dispatch({type: LOAD_USER_FAIL , payload : error.response.data.message});
    }
}


//logout

export const logout = ()=> async (dispatch)=>{

    try{

         await axios.get (`/api/v1/logout`);
        // console.log(data)

        dispatch({type:LOGOUT_SUCCESS });

    }catch(error){
        dispatch({type: LOGOUT_FAIL , payload : error.response.data.message});
    }
}


//update profile
export const updateProfile = (userData)=> async (dispatch)=>{

    try{

        dispatch({type: UPDATE_PROFILE_REQUEST});

        const config = {headers : {"Content-type": "multipart/form-data"}}

        const {data} = await axios.put(`/api/v1/me/update` , userData, config);
        // console.log(data)

        dispatch({type:UPDATE_PROFILE_SUCCESS , payload:data.success});

    }catch(error)
    {

        dispatch({type: UPDATE_PROFILE_FAIL , payload : error.response.data.message});

    }
}


//update password
export const updatePassword = (userData)=> async (dispatch)=>{

    try{

        dispatch({type: UPDATE_PASSWORD_REQUEST});

        const config = {headers : {"Content-type": "multipart/form-data"}}

        const {data} = await axios.put(`/api/v1/password/forget` , userData, config);
        // console.log(data)

        dispatch({type:UPDATE_PROFILE_SUCCESS , payload:data.success});

    }catch(error)
    {

        dispatch({type: UPDATE_PROFILE_FAIL , payload : error.response.data.message});

    }
}








export const clearErrors=()=>async(dispatch)=>{

    dispatch({type:CLEAR_ERRORS})
}