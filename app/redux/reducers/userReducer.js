import {FETCH_DATA,EDIT_DATA} from '../actions/actionTypes'

const initialState={
    user_data: {
        id: null,
        role_id: null,
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        profile_pic: '',
        country_id: null,
        gender: '',
        phone_no: null,
        dob: null,
        is_active: '',
        created: '',
        modified: '',
        access_token: ''
    },
    product_categories:[],
    total_carts   : 0,
    total_orders : 0, 
};

export default (state=initialState,action) => {
    switch(action.type) {
        case FETCH_DATA:
            return {...state,...action.payload};
        case EDIT_DATA:
            return {...state,user_data:action.payload}
        default:
            return state
    }
}