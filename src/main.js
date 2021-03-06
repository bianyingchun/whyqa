import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./common/scss/base.scss";
import "./common/iconfont/iconfont.css";

// 自定义插件
import toastRegistry from "./plugins/toast/index";
Vue.use(toastRegistry);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
