// Import Vue
import { createApp } from 'vue';

// Import Framework7
import Framework7 from './framework7-custom.js';

// Import Framework7-Vue Plugin
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

// Import Framework7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';

// Import App Component
import App from '../components/app.vue';

// Import Tailwind CSS
import '@/assets/app.css';

// Import Mask
import maskDoc from '../directives/maskDoc'

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Init App
const app = createApp(App);

// Register Framework7 Vue components
registerComponents(app);


// Use maskDoc
app.directive('mask-doc', maskDoc)

// Mount the app
app.mount('#app');