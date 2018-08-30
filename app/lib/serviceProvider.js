export var user_data={
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
}

export const serviceProvider={
    setData:(key,value)=>{
        user_data[key]=value
    },
    setUsrData:(value)=>{
        user_data=value
    }
}