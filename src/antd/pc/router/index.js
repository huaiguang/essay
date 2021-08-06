import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/general',
    name: 'general',
    redirect: '/general/button',
    // redirect: { name: 'button' },
    component: () => import('../views/general/Index.vue'),
    children: [
      {
        path: 'button',
        name: 'button',
        component: () => import('../views/general/Button.vue')
      },
      {
        path: 'icon',
        name: 'icon',
        component: () => import('../views/general/Icon.vue')
      }
    ]
  },
  {
    path: '/layout',
    name: 'layout',
    redirect: '/layout/grid',
    component: () => import('../views/layout/Grid.vue'),
    children: [
      // {
      //   path: 'layout',
      //   name: 'layout',
      //   component: () => import('../views/layout/Layout.vue')
      // },
      {
        path: 'space',
        name: 'space',
        component: () => import('../views/layout/Space.vue')
      }
    ]
  },
  {
    path: '/data-entry',
    name: 'data-entry',
    redirect: '/data-entry/auto-complete',
    component: () => import('../views/data-entry/Index.vue'),
    children: [
      {
        path: 'auto-complete',
        name: 'autoComplete',
        component: () => import('../views/data-entry/AutoComplete.vue')
      },
      {
        path: 'cascader',
        name: 'cascader',
        component: () => import('../views/data-entry/Cascader.vue')
      },
      {
        path: 'checkbox',
        name: 'checkbox',
        component: () => import('../views/data-entry/Checkbox.vue')
      }
    ]
  },
  {
    path: '/data-display',
    name: 'data-display',
    redirect: '/data-display/table',
    component: () => import('../views/data-display/Index.vue'),
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import('../views/data-display/Table.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
