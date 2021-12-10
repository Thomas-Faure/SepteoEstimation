import {createRouter,createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Salon from '../views/Salon.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component : Home
    },
    {
        path: '/salon/:name',
        name: 'Salon',
        component : Salon
    }

]

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes
})

export default router