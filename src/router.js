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
      { path: '/secondHand', component: () => import('@/views/secondHand') },
      { path: '/secondHandDetail', component: () => import('@/views/secondHandDetail') },
      { path: '/messageMore', component: () => import('@/views/messageMore') },
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
    redirect:'/user',
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
					{
						path:'/area', 
						name:'area',
						component:() => import('@/views/admin/adminArea'),
					},
					{
						path:'/oldValue', 
						name:'oldValue',
						component:() => import('@/views/admin/adminOldValue'),
					},
					{
						path:'/salesType', 
						name:'salesType',
						component:() => import('@/views/admin/adminSalesType'),
					},
					{
						path:'/message', 
						name:'message',
						component:() => import('@/views/admin/adminMessage'),
					},
					{
						path:'/comment', 
						name:'comment',
						component:() => import('@/views/admin/adminComment'),
					},
					{
						path:'/article', 
						name:'article',
						component:() => import('@/views/admin/adminArticle'),
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
