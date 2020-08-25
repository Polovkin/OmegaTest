//import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueMask, {
    placeholders: {
        D: /\d/,
    }
})


new Vue({
    render: (h) => h(App),
}).$mount('#app');


