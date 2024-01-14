import axios from "axios";

export  const baseURL= "http://127.0.0.1:5001/pro-new/us-central1/app";

export const validateUserJWTToken=async (token) =>{
    try{
        const res= await axios.get( `${baseURL}/api/user/jwtVerification`,{
            headers : {Authorization : "Bearer "+ token}
        })
        return res.data.data;
    }
    catch(err){
            return null;
    }
}