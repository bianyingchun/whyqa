import Vue from 'vue'
import VueRouter from 'vue-router'
import Extact_qa from '../views/Extact_qa.vue'
import Test_q from '../views/Test_q.vue'
import extact_item from '../components/extact_item.vue'
import user_guide from '../components/user_guide.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/extact_qa',
    name:'extact_qa',
    component:Extact_qa,
    children:[
      {
        path:'',
        component:user_guide
      },
      {
        path:'article/:id',
        component:extact_item
      },
      {
        path:'user_guide',
        component:user_guide
      }
    ]
  },
  {
    path:'/test_q',
    name:'test_q',
    component:Test_q
  }
]

const router = new VueRouter({
  routes
})

export default router
