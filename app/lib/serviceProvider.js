export var user_data={

        first_name:'',
        last_name:'',
        dob:'',
        profile_pic:'',
        total_carts:0,
        user_details:{},
        
}

export const serviceProvider={
    setData:(key,value)=>{
        user_data[key]=value
    },
}