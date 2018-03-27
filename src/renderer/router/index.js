import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/Home').default,
    },
    {
      path: '/settings',
      name: 'setting-page',
      component: require('@/components/Settings').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});