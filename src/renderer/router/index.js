import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home-page',
      meta: { title: 'Home', },
      component: require('@/components/Home').default,
    },
    {
      path: '/settings',
      name: 'setting-page',
      meta: { title: 'Settings', },
      component: require('@/components/Settings').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],

});

export default router;