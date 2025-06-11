import HomePage from '../pages/home.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
    props: true,
  },
  {
    path: '/porto/:portoId',
    component: HomePage,
    props: true,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
