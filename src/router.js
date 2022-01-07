import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/views/home'
import Admin from '@/views/admin'
import Test from '@/views/test'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name:'HomeIndex',
    component: HomeIndex,
    redirect:'/index',
    children: [
      { path: '/index', component: () => import('@/views/index') },
      { path: '/about', component: () => import('@/views/about') },
      { path: '/register', component: () => import('@/views/register') },
      { path: '/personCenter', component: () => import('@/views/personCenter') },
      { path: '/leaveCenter', component: () => import('@/views/leaveCenter') },
      { path: '/messageDetail', component: () => import('@/views/messageDetail') },
      { path: '/messageSearch', component: () => import('@/views/messageSearch') },
      { 
				path: '/messageCenter', 
				component: () => import('@/views/messageCenter'),
				redirect:'/manage',
				children:[
					{
						path:'/manage',
						name:'manage',
						component:() => import('@/views/message/messageManage'),
					},
					{
						path:'/send',
						name:'send',
						component:() => import('@/views/message/sendMessage'),
					}
				]
      }
    ]
  },
  {
    path: '/admin',
    name:'admin',
    component: Admin,
    children:[
					{
						path:'/user',
						name:'user',
						component:() => import('@/views/admin/adminUser'),
					},
					{
						path:'/type',
						name:'type',
						component:() => import('@/views/admin/adminType'),
					},
				]
  },
  {
    path: '/test',
    name:'Test',
    component: Test,
  },
]

const router = new Router({
  routes: constantRouterMap
})

export default router
