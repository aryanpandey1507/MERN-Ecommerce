import React ,{Fragment , useEffect} from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/metaData';
import './Home.css';
import { clearErrors , getProduct } from '../../actions/productActions';
import {useDispatch, useSelector} from 'react-redux';
import Product from './ProductCard.js';
import Loader from '../layout/Loader/loader';
import { useAlert } from 'react-alert';

function Home() {

    const alert = useAlert();
    const dispatch = useDispatch();
    

    const {loading , error , products , productsCount} = useSelector((state)=>state.products )
  

    useEffect(()=>{
       
    if(error)
    {
        alert.error(error);

        dispatch(clearErrors())
    }
    
      
       dispatch(getProduct());
       

    },[dispatch , error, alert ])

    return ( 
        <Fragment>
            {loading ? <Loader />:

            <Fragment>
            <MetaData title="E-commerce"/>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>Find amazing product below</h1>

                <a href="#container">
                    <button>
                    Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className='homeHeading'>Featured Products</h2>

            <div className="container" id="container">
                {products && products.map((product)=><Product product={product}/>)}
                
            </div>
        </Fragment>}

        </Fragment>
     );
}

export default Home;