import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
const Home = () => import('../views/Home.vue')
const Answer = () => import('../views/Answer.vue')
const Question = () => import('../views/Question.vue')
const Login = () => import('../views/Login.vue')
const News = () => import('../views/content/News.vue')
const Focus = () => import('../views/content/Focus.vue')
const Posting = () => import('../views/user/Posting.vue')
const Usercenter = () => import('../views/user/Usercenter.vue')
const Newsdetails = () => import('../views/content/Newsdetails.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path:'',
      redirect:'/login'
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'',
          redirect:'news'
        },
        {
          path:'news',
          component:News
        },
        {
          path:'focus',
          component:Focus
        }
      ]
    },
    {
      path:'/answer',
      component:Answer
    },
    {
      path:'/question',
      component:Question
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/posting',
      component:Posting
    },
    {
      path:'/newsdetails',
      name:'newsdetails',
      component:Newsdetails
    },
    {
      path:'/usercenter',
      component:Usercenter
    }
  
  ]

});

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
    console.log('login_page')
      next();
    } else {
     let token = Store.state.token
      // console.log("213:",token)
    if (token === 'null' || token === '') {
       next('/login');
    } else {
       next();
    }
    }
  });

 

  export default router;