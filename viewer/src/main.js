import Vue from "vue";
import Viewport from "./script/page/Viewport.vue";
import Antd from "ant-design-vue";
//import "ant-design-vue/dist/antd.css";

Vue.use(Antd);
new Vue({
	el: "#app",
	template: "<Viewport/>",
	components: { Viewport }
});
