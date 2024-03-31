import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo=fetchCart();

export const initialState  = {
    user : userInfo,
    footItems : null,
    cartShow: false,
    cartItems:cartInfo,    
};