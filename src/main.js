import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
// import $ from 'jquery'
import VueRouter from 'vue-router'
// 引入公共css
import routes from './routes'
import VueResource from 'vue-resource'
// window.$ = $;
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;


const router = new VueRouter({
    routes
});
router.push("/home");
//
// router.beforeEach((to, from, next) => {
//     //NProgress.start();
//     if (to.path == '/login') {
//         sessionStorage.removeItem('user');
//     }
//     let user = JSON.parse(sessionStorage.getItem('user'));
//     if (!user && to.path != '/login') {
//         next({ path: '/login' })
//     } else {
//         next()
//     }
// })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')






