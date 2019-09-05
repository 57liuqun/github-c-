import Vue from 'vue'
import Router from 'vue-router'
import table from '@/table.vue'
import entry from '@/entry.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'entry',
      component: entry
    },
    {
      path: '/table',
      name: 'Table',
      component: table
    }
    // {
    //   path: '/informationEntry',      // 子表
    //   name: 'informationEntry',
    //   component: () => import(/* webpackChunkName: "about" */ '../views/informationEntry/informationEntry.vue')      
    // },
    // {
    //   path: '/tableList',      // 子表
    //   name: 'tableList',
    //   component: () => import(/* webpackChunkName: "about" */ '../views/tableList/tableList.vue')      
    // }
  ]
})
