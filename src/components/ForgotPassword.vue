<template>
     <div class="md:flex md:flex-col md:justify-center md:items-center md:h-[100vh]">
        <p class="logintext text-center font-bold text-3xl pt-2 md:pt-0">Forgot Password</p>
        <form @submit.prevent="forgot_pass">
            <section class="flex flex-col w-80 mx-auto sm:w-72 md:w-64">
                <input type="email" placeholder="Enter email" v-model="forgot_email" class="focus:outline-none px-2 rounded border shadow h-[35px] mt-5" required/>
                <div class="relative">
                    <input :type="s_ps ? 'text' : 'password'" placeholder="Enter new password" v-model="new_password" class="w-full focus:outline-none px-2 pr-9 rounded border shadow h-[35px] mt-5" required/>
                    <div class="absolute right-3 bottom-[6px]">
                        <button type="button" @click="showpassword" class="text-slate-400">
                            <i class="fa-regular fa-eye" v-if="s_ps"></i>
                            <i class="fa-regular fa-eye-slash" v-else></i>
                        </button>
                    </div>
                </div>
            </section>
            <div class="mt-4 flex items-center justify-center">
                <button type="submit" class="loginbtn px-4 text-sm py-1.5 text-white font-semibold uppercase rounded">
                    Reset password
                </button>
            </div>
        </form>
        <div class="text-right px-5 mt-2">
            <router-link to="/" class="text-slate-500"> <i class="fa-solid fa-arrow-left-long"></i> back to login</router-link>
        </div>
    </div>
</template>
<script>
import services from "../services/services"
export default {
    data(){
        return{
            new_password: '',
            forgot_email: '',
            s_ps: false,
        }
    },
    methods:{
        async forgot_pass(){
            try{
                let payload = {
                    email: this.forgot_email,
                    password: this.new_password
                }
                let res = await services.user_forgot_password(payload)
                if(res.status == '204'){
                    alert('Entered email not found')
                }
                else if(res.status == '200'){
                    this.forgot_email = ''
                    this.new_password = ''
                    alert('password changed successfully')
                }
            }
            catch(err){
                console.log(err)
            }
        },
        showpassword(){
            this.s_ps = !this.s_ps
        }
    }
}
</script>
<style scoped>
.logintext{
    background: -webkit-linear-gradient(45deg, #09009f, #00ff95 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.loginbtn{
    background: -webkit-linear-gradient(50deg, #08009f71, #00ff95 120%);
}
input{
    box-shadow : 0px 1px 5px #24e3a56b;
}
</style>