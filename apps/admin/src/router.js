
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Article from "./page/Article.vue"
import Member from "./page/Member.vue"
import Manager from "./page/Manager.vue"

export default new Router({
  routes: [{
    path: '/article',
    name: 'article',
    component: Article
  },{
    path: '/member',
    name: 'member',
    component: Member
  },{
    path: '/manager',
    name: 'manager',
    component: Manager
  }]
})