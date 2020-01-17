<template>
	<div class="viewport">
		<a-layout>
			<a-layout-header> <viewerHeader /></a-layout-header>

			<a-layout-content>
				<scene :geoData="geoData" />
			</a-layout-content>
			<a-layout-footer></a-layout-footer>
		</a-layout>
	</div>
</template>
<script>
import Scene from "../component/Viewport/Scene.vue";
import Header from "../component/Viewport/Header.vue";
export default {
	name: "Viewport",
	data() {
		return {
			geoData: null
		};
	},
	components: {
		scene: Scene,
		viewerHeader: Header
	},
	methods: {
		finishConvert(response, file, fileList) {
			console.log(response);
			try {
				this.geoData = JSON.parse(response.value);
			} catch (err) {
				console.log(err);
			}
		}
	}
};
</script>

<style>
html,
body,
#app,
.viewport {
	height: 100vh;
	width: 100vw;
	margin: 0px;
	padding: 0px;
}

.viewport {
	overflow: hidden;
}

.ant-layout-header {
	background: rgba(146, 203, 236, 0.133);
	color: #fff;
	height: 10vh;
}

.ant-layout-content {
	background: rgba(16, 142, 233, 1);
	color: #fff;
	top: 140px;
	height: 85vh;
}
.ant-layout-footer {
	height: 5vh;
}
</style>
