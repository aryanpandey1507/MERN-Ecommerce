const express = require('express');
const { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/order/new').post(isAuthenticated,createOrder);

router.route('/order/:id').get(isAuthenticated, getSingleOrder);

router.route('/orders/me').get(isAuthenticated,myOrders);

router.route('/admin/orders').get(isAuthenticated,authorizedRoles("admin"),getAllOrders);

router.route('/admin/orders/:id').put(isAuthenticated,authorizedRoles("admin"),updateOrder).delete(isAuthenticated,authorizedRoles("admin"),deleteOrder);


module.exports = router;