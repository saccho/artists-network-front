import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/pages/Top'
import Search from '@/pages/Search'
import Network from '@/pages/ArtistsNetwork'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      props: (route) => ({query: route.query.q})
    },
    {
      path: '/network',
      name: 'Network',
      component: Network,
      props: (route) => ({query: route.query.q})
    }
  ]
})
