import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/tailwind.css'
import { createWebHistory, createRouter } from "vue-router";
// toasted
import Toaster from "@meforma/vue-toaster";

import Loginpage from "./components/LoginPage.vue"
import HomePage from "./components/HomePage.vue"
import ForgotPassword from "./components/ForgotPassword.vue"
let before_Enter = async (to , from, next)=>{
    if(localStorage?.userInfo){
        next()
    }
    else{
        next('/')
    }
}

const routes = [
    {
        path: "/",
        component: Loginpage,
        // beforeEnter: before_Enter
    },
    {
        path: "/home",
        component: HomePage,
        beforeEnter: before_Enter
    },
    {
        path: "/forgotpassword",
        component: ForgotPassword,
        // beforeEnter: before_Enter
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.use(Toaster)
app.mount('#app')
