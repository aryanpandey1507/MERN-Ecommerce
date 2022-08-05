
import { ALL_PRODUCT_FAIL ,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS} from '../constants/productConstant';

export const productReducer = (state={products:[]} , action)=>{

    switch(action.type)
    {
        case ALL_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload.products,
                productsCount:action.payload.productsCount,
                resultPerPage:action.payload.resultPerPage,
                filteredProductCount:action.payload.filteredProductCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };

        default:
            return state;
    }

}

export const productDetailsReducer = (state={product:[]} , action)=>{

    switch(action.type)
    {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading:true,
                ...state ,
            };
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading:false,
                product:action.payload,
               
           };
        case PRODUCT_DETAIL_FAIL:
            return {
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };

        default:
            return state;
    }

}