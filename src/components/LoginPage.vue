<template>
    <div>
        <div v-if="show_login"
            class="md:flex md:flex-col md:justify-center md:items-center md:h-[100vh]">
             <p class="logintext text-center font-bold text-3xl pt-2 md:pt-0">Login </p>
             <form @submit.prevent="login">
                <section class="flex flex-col w-80 mx-auto sm:w-72 md:w-64">
                    <input type="email" placeholder="Enter email" v-model="email" class="focus:outline-none px-2 rounded border shadow h-[35px] mt-5" required/>
                    <div class="relative">
                        <input :type="s_ps ? 'text' : 'password'" placeholder="Enter password" v-model="password" class="w-full focus:outline-none px-2 pr-9 rounded border shadow h-[35px] mt-5" required/>
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
                        Login
                    </button>
                </div>
            </form>
            <div class="text-right px-5">
                <router-link to="/forgotpassword" class="text-slate-500"> forgot password ?</router-link>
            </div>
             <div class="text-slate-500 mt-3 px-3">
                 Don't have an account ? 
                 <button class="underline"
                     @click="signup_toggle">
                     click here 
                 </button>
                 to create one.
             </div>
        </div>
        <div v-else>
            <div class="md:flex md:flex-col md:justify-center md:items-center md:h-[100vh]">
                <p class="logintext text-center font-bold text-3xl pt-2 md:pt-0">Sign Up</p>
                <form @submit.prevent="signup_page">    
                    <section class="flex flex-col w-80 mx-auto sm:w-72 md:w-64">
                        <input type="email" placeholder="Enter email" v-model="email_signup" class="focus:outline-none px-2 rounded border shadow h-[35px] mt-5" required />
                        <input type="text" placeholder="Enter your name" v-model="name_signup" class="focus:outline-none px-2 rounded border shadow h-[35px] mt-5" required />
                        <input type="text" maxlength="10" placeholder="Enter your phone number" v-model="phone_number_signup" class="focus:outline-none px-2 rounded border shadow h-[35px] mt-5" 
                            @input="()=> this.phone_number_signup = this.phone_number_signup.replace(/\D/g,'')" required/>
                        <div class="relative">
                            <input :type="signup_s_ps ? 'text' : 'password'" placeholder="Enter password" v-model="password_signup" class="w-full focus:outline-none px-2 pr-9 rounded border shadow h-[35px] mt-5" required />
                            <div class="absolute right-3 bottom-[6px]">
                                <button type="button" @click="signup_showpassword" class="text-slate-400">
                                    <i class="fa-regular fa-eye" v-if="signup_s_ps"></i>
                                    <i class="fa-regular fa-eye-slash" v-else></i>
                                </button>
                            </div>
                        </div>
                    </section>
                    <div class="mt-4 flex items-center justify-center">
                        <button type="submit" class="loginbtn px-4 text-sm py-1.5 text-white font-semibold uppercase rounded">
                            sign up
                        </button>
                    </div>
                </form>
                <div class="text-slate-500 mt-3 px-3 text-right">
                    <i class="fa-solid fa-arrow-left-long"></i> Back to
                   <button @click="signup_toggle" class="underline">login</button>
                    page
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import services from "../services/services"
export default {
    beforeRouteEnter(to,from,next){
        if(localStorage.userInfo){
            next('/home')
        }
        else{
            next()
        }
    },
    data(){
        return{
            email: '',
            password: '',
            s_ps: false,
            show_login: true,
            signup_s_ps: false,
            name_signup: '',
            email_signup: '',
            password_signup: '',
            phone_number_signup: '',
        }
    },
    methods:{
        showpassword(){
            this.s_ps = !this.s_ps
        },
        async login(){
            try{
                let res  = await services.login()
                if(res.status == '200'){
                    let matched = res.data.filter((each)=>{
                        return each.email == this.email && each.password == this.password
                    })
                    if(matched != ''){
                        localStorage.setItem('userInfo',JSON.stringify(matched));
                        this.$router.push('/home')
                        this.$toast.clear()
                        this.$toast.success('Logged in successfully', {duration: 2000, position: 'top', pauseOnHover: true})
                    }
                    else{
                        this.$toast.clear()
                        this.$toast.error('Please enter valid details', {duration: 2000, position: 'top', pauseOnHover: true})
                    }
                }
                else if(res.status == "204"){
                    this.$toast.clear()
                    this.$toast.error('No data found', {duration: 2000, position: 'top', pauseOnHover: true})
                }
            }
            catch(err){
                console.log(err)
            }
        },
        signup_toggle(){
            this.show_login = !this.show_login
        },
        signup_showpassword(){
            this.signup_s_ps = !this.signup_s_ps
        },
        async signup_page(){
            try{
                let payload = {
                    name: this.name_signup,
                    email: this.email_signup,
                    password: this.password_signup,
                    phonenumber: this.phone_number_signup,
                }
                let res = await services.signup_user(payload)
                if(res.status == '200'){
                    this.name_signup = ''
                    this.email_signup = ''
                    this.password_signup = ''
                    this.phone_number_signup = ''
                    this.$toast.clear()
                    this.$toast.success('Signed up successfully', {duration: 2000, position: 'top', pauseOnHover: true})
                }
                else{
                    this.$toast.clear()
                    this.$toast.error('Something went wrong', {duration: 2000, position: 'top', pauseOnHover: true})
                }
            }
            catch(err){
                console.log(err)
            }
        },
    },
    mounted(){
        this.show_login = true;
    },
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