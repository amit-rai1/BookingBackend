const config = {
    local : {
        db :{
            host : "0.0.0.0",
            port : 27017,
            databaseName : "amit123",
            userName:"",
            password:""
        },
        api_port : 5001,
        client_secret_key:"thsgsjs"
    },
    // staging:{
    //     db :{
    //         host :0.0.0.0",
    //         port :27017,
    //         databaseName :"siddhantsingh", 
    //         userName :"siddhantsingh",
    //         password :"siddhantsingh87"
    //     },api_port:9898
    // }
}

export const get = (env) => {
        return config[env]
}
export default get;
