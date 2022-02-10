import Vue from 'vue'
import VCalendar from 'v-calendar';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import locale from 'element-ui/lib/locale/lang/en';
import { LoginPage, JoinPage,SchedulePage, DiaryPage, RecordPage } from './pages';

Vue.config.productionTip = false
Vue.use(ElementUI,{locale} );
Vue.use(VueRouter);
Vue.use(VCalendar);

const router = new VueRouter({
  routes:[
    {path:'/login', component:LoginPage},
    {path:'/join', component:JoinPage},
    {path:'/schedule', component:SchedulePage},
    {path:'/diary', component:DiaryPage},
    {path:'/record', component:RecordPage},
    {path:'/record/:id', component:RecordPage}
  ]
})

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});


new Vue({
  el:'#app',
  render: h => h(App),
  router
}).$mount('#app')
