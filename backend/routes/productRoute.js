const express= require('express');
const { getAllProducts,createProduct,updateProduct, deleteProduct, getproduct } = require('../controllers/productController');
const { createProductReview, getProductReviews, DeleteReviews } = require('../controllers/userController');
const { isAuthenticated ,authorizedRoles } = require('../middleware/auth');

const router= express.Router();

router.route('/admin/product/new').post(isAuthenticated, authorizedRoles("admin") ,createProduct);
router.route('/products').get(getAllProducts);
router.route('/admin/product/:id').put(isAuthenticated, authorizedRoles("admin") ,updateProduct)
.delete(isAuthenticated, authorizedRoles("admin") ,deleteProduct)


router.route('/product/:id').get(getproduct);

router.route('/review').put(isAuthenticated,createProductReview);

router.route('/reviews').get(getProductReviews).delete(isAuthenticated,DeleteReviews);


module.exports = router; 