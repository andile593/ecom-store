import { combineReducers } from '@reduxjs/toolkit'
import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer } from './userReducer';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, productReviewsReducer, reviewReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { saveForLaterReducer } from './saveForLaterReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, paymentStatusReducer } from './orderReducer';
import { wishlistReducer } from './wishlistReducer'

export default combineReducers({
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    cart: cartReducer,
    saveForLater: saveForLaterReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    paymentStatus: paymentStatusReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newProduct: newProductReducer,
    product: productReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
    reviews: productReviewsReducer,
    review: reviewReducer,
    wishlist: wishlistReducer,
  })