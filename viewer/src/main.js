import Vue from 'vue';
import Viewport from './script/page/Viewport.vue';
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI)
new Vue({
    el: '#app',
    template: '<Viewport/>',
    components: { Viewport }
})