import axios from "axios"
import backend_url from '../../config'

export default {
    async login(){
        try{
            let res = await axios.get(backend_url.backend_url + "reminder/users/list") 
            return res;
        }
        catch(err){
            console.log(err);
        }
    },
    async user_records(id){
        try{
            let payload = {
                userid: id
            }
            let res = await axios.post(backend_url.backend_url + "reminder/record/list/user/search",payload) 
            return res;
        }
        catch(err){
            console.log(err);
        }
    },
    async saveRecord(payload){
        try{
            let res = await axios.post(backend_url.backend_url + "reminder/record/add/record",payload) 
            return res;
        }
        catch(err){
            console.log(err);
        }
    },
    async deleteRecord(payload){
        try{
            let res = await axios.delete(backend_url.backend_url + "reminder/record/delete",{data:payload}) 
            return res;
        }
        catch(err){
            console.log(err);
        }
    },
    async signup_user(payload){
        try{
            let res = await axios.post(backend_url.backend_url + "reminder/users/add",payload) 
            return res;
        }
        catch(err){
            console.log(err);
        }
    },
    async user_forgot_password(payload){
        try{
            let res = await axios.post(backend_url.backend_url + "reminder/users/forgotpassword",payload) 
            return res;
        }
        catch(err){
            console.log(err);
        }
    },
}