import Vue from "vue";
import Viewport from "./script/page/Viewport.vue";
import Antd from "ant-design-vue";

Vue.use(Antd);
new Vue({
	el: "#app",
	template: "<Viewport/>",
	components: { Viewport }
});
