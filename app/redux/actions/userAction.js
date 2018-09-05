import {FETCH_DATA,EDIT_DATA,ADD_CART} from './actionTypes';
export const userAction = (user_data) =>{
    return{
        type:FETCH_DATA,
        payload:user_data
    }
}

export const editData = (edited_data) =>{
    return{
        type:EDIT_DATA,
        payload:edited_data
    }
}

export const totalCart = (total_cart) =>{
    return{
        type:ADD_CART,
        payload:total_cart
    }
}