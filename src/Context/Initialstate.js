import { fetchCart, fetchUser } from "../Utils/FetchlocalstorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const Initialstate = {
    user : userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,
};