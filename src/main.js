import Vue from "vue";
import App from "./App";

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    // 安装全局事件总线 $bus
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
