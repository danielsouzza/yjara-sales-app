import HomePage from '../pages/home.vue';
import DynamicRoutePage from '../pages/dynamic-route.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/:portoId?',
    component: HomePage,
    props: true,
  },
  {
    path: '/about/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
