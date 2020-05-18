import Vue from 'vue'
import App from './App.vue'

// 导入 ant-design-vue 组件库
import Antd from 'ant-design-vue'
// 导入组件库的样式表
import 'ant-design-vue/dist/antd.css'
// 导入 store
import store from './store/index'

Vue.config.productionTip = false

Vue.use(Antd) // 安装组件库

new Vue({
    render: h => h(App),
    store
}).$mount('#app')