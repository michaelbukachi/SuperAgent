import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import RegisterForm from '@/components/RegisterForm'
import RegisterSuccess from '@/components/RegisterSuccess'
import Home from '@/components/Home'

Vue.use(Router)

const defaultTitle = 'Super Agent'
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: `${defaultTitle} - Login`
      }
    },
    {
      path: '/register',
      component: Register,
      children: [
        {
          path: '/',
          name: 'register',
          component: RegisterForm,
          meta: {
            title: `${defaultTitle} - Sign up today and track your coins easily!`
          }
        },
        {
          path: 'success',
          name: 'register-success',
          component: RegisterSuccess,
          meta: {
            title: `${defaultTitle} - Registration successful`
          }
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
        title: `${defaultTitle} - Manage and track your cryptocurrency portfolio`
      }
    }
  ]
})
