// import React, {createContext, useContext, useReducer} from "react";
export const actionType = {
    SET_USER : "SET_USER",
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CARTITEMS: 'SET_CARTITEMS'

}
export const Reducer = (state, action) => {
    
    switch(action.type){
        case actionType.SET_USER:
            return{
                ...state,
                user: action.user,
                
            };
            case actionType.SET_FOOD_ITEMS:
            return{
                ...state,
                foodItems: action.foodItems,
            };
            case actionType.SET_CART_SHOW:
            return{
                ...state,
                cartShow: action.cartShow,
            };
            case actionType.SET_CARTITEMS:
            return{
                ...state,
                cartItems: action.cartItems,
            };
            default:
                return state;
    }

};


export default Reducer;















// export const StateContext = createContext();
// export const StateProvider = ({reducer, Initialstate, children}) =>{
//     <StateContext.Provider>
        
//     </StateContext.Provider>
// }