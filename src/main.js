import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/tailwind.css'
import { createWebHistory, createRouter } from "vue-router";

import Loginpage from "./components/LoginPage.vue"
import HomePage from "./components/HomePage.vue"
import ForgotPassword from "./components/ForgotPassword.vue"

const routes = [
    {
        path: "/",
        component: Loginpage,
    },
    {
        path: "/home",
        component: HomePage,
    },
    {
        path: "/forgotpassword",
        component: ForgotPassword,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
