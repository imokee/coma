
import Vue from 'vue'

import Dai from "../../../libs/coma-dai-vue";
import './utils/date-format'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './css/style.css';

import App from './App.vue'
import router from './router';

Vue.use(iView);
Vue.use(Dai);

new Vue({
    el: '#app-container',
    router,
    render: h => h(App)
})