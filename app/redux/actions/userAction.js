import {FETCH_DATA,EDIT_DATA} from './actionTypes';
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