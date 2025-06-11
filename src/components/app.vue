<template>
  <f7-app v-bind="f7params">
  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" ></f7-view>

  </f7-app>
  <GlobalNotification />
</template>
<script>
  import routes from '../js/routes.js';
  import GlobalNotification from '@/components/ui/GlobalNotification.vue';

  export default {
    components: { GlobalNotification },
    setup() {

      // Framework7 Parameters
      const f7params = {
        name: 'Passagem Express', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes,

        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV ==='production' ? {
          path: '/service-worker.js',
        } : {},
      };

      return {
        f7params
      }
    }
  }
</script>