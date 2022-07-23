import './Products.css';
import {useSelector , useDispatch} from 'react-redux';
import {getProduct , clearErrors} from '../../actions/productActions';
import {Fragment , useEffect, useState} from 'react'
import ProductCard from '../Home/ProductCard';
import {useParams} from 'react-router-dom';
import Pagination from 'react-js-pagination' ;
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/styles/createTypography';

import Loader from '../layout/Loader/loader';



function Products() {

    const [currentPage ,setCurrentPage] = useState(1);
    const [price , setPrice]= useState([0,25000]);


    const dispatch = useDispatch();
    const {keyword}=useParams();



    const {loading , error ,products , productsCount ,resultPerPage} = useSelector((state)=>state.products);


    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    
    const priceHandler=(event , newPrice)=>{
        setPrice(newPrice)
    }
    


   useEffect(()=>{

    dispatch(getProduct(keyword ,currentPage))

   },[dispatch , keyword , currentPage]) 
 
 

    return ( 
        <Fragment>
            {loading ? <Loader />:
            <Fragment> 
                <h2 className='productsHeading'>Products</h2>

                <div className='products'>
                    {products && 
                       products.map((product)=>(<ProductCard  key = {product._id}  product={product} />))}

                </div>

                <div className='filterBox'>
                 <Typography>Price</Typography>
                 <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay= "auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                  />
                </div>

                   {resultPerPage<productsCount && (

                   <div className='paginationBox'>
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText='Next'
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass='page-item'
                      linkClass='page-link' 
                      activeClass='page-item-active'
                      activeLinkClass='pageLinkActive'
                    />
                    
                </div>
             )}
            </Fragment>}
        </Fragment>
     );
}

export default Products;