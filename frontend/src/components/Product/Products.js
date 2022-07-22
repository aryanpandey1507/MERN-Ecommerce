import './Products.css';
import {useSelector , useDispatch} from 'react-redux';
import {getProduct , clearErrors} from '../../actions/productActions';
import {Fragment , useEffect} from 'react'
import ProductCard from '../Home/ProductCard';
import {useParams} from 'react-router-dom';
import Pagination from 'react-js-pagination' 

import Loader from '../layout/Loader/loader';


function Products() {


    const dispatch = useDispatch();
    const {keyword}=useParams();


    const {loading , error ,products , productsCount} = useSelector((state)=>state.products);

    console.log(products)


   useEffect(()=>{

    dispatch(getProduct(keyword))

   },[dispatch]) 
 
 

    return ( 
        <Fragment>
            {loading ? <Loader />:
            <Fragment> 
                <h2 className='productsHeading'>Products</h2>

                <div className='products'>
                    {products && 
                       products.map((product)=>(<ProductCard  key = {product._id}  product={product} />))}

                </div>

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
            </Fragment>}
        </Fragment>
     );
}

export default Products;