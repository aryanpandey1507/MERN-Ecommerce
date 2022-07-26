import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";
import "./ProductDetails.css";
import MetaData from "../layout/metaData";

function ProductDetails() {
 
  const dispatch = useDispatch();
  const { id } = useParams();

  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
 

  useEffect(() => {
    if (error) {
      alert.error(error);

      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);

  const options = {
    edit: false,
    color: "rgb (20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title = {`${product.name}--Ecommerce`} />
          <div className="ProductDetails">
            <div>
              {/* <Carousel>
                            {product.images && 
                             product.images.map((item,i)=>(
                                <>
                                console.log(product.images[0].url)
                                <img 
                                className="CarouselImage"
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                                />
                                </>
                             ))}
                        </Carousel> */}
              <img src="https://st.depositphotos.com/1008768/4671/i/600/depositphotos_46713379-stock-photo-free-sample.jpg" alt="Samplemage" key="for"/>

           
               
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview"> Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">Reviews</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review , i) => <ReviewCard review={review} key={i} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
