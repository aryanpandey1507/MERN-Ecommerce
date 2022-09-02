import axios from 'axios';
import { ALL_PRODUCT_FAIL ,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,  PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS} from '../constants/productConstant';

export const getProduct=(keyword="", currentPage="1" , price=[0 ,25000] , category , ratings=0)=>async(dispatch)=>{

        
    try{ 

        dispatch({type:ALL_PRODUCT_REQUEST});
        

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category)
        {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }

        const {data} = await axios.get(link); 

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })


    }catch(err){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:err.response.data.message 
        });
    }
}

export const getProductDetails=(id)=>async(dispatch)=>{
    try{

        dispatch({type:PRODUCT_DETAIL_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);
        console.log(data);

        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,
            payload:data.product
        })


    }catch(err){
        dispatch({
            type:PRODUCT_DETAIL_FAIL,
            payload:err.response.data.message 
        });
    }
}





//Clearing errors
export const clearErrors=()=>async(dispatch)=>{

    dispatch({type:CLEAR_ERRORS})
}
