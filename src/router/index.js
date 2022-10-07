import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('@/views/Main.vue')
// const Home = () => import('@/views/home/Home')
// const Mall = () => import('@/views/mall/Mall')
// const User = () => import('@/views/user/User')
// const Other = () => import('@/views/other/Other')
// const Page1 = () => import('@/views/other/children/Page1')
// const Page2 = () => import('@/views/other/children/Page2')
const Login = () => import('@/views/login/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: './home'
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: Home
      // },
      // {
      //   path: '/mall',
      //   name: 'mall',
      //   component: Mall
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: User
      // },
      // {
      //   path: '/other',
      //   name: 'other',
      //   component: Other,
      //   children: [
      //     {
      //       path: '/page1',
      //       name: 'page1',
      //       component: Page1,
      //     },
      //     {
      //       path: '/page2',
      //       name: 'page2',
      //       component: Page2,
      //     }
      //   ]
      // },

    ]
  },
  {
    path:'/login',
    name:'login', 
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
