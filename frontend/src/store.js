import {createStore ,combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productReducer , productDetailsReducer } from './reducers/productReducer';


//this combines all the reducers that are present 
const reducer = combineReducers({

    products:productReducer,
    productDetails :productDetailsReducer

});



let initialState={};

//middleware is some task between the dispatching of the action and  reaching of that to the reducer 
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;