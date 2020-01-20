<template>
	<div>
		<a-button type="primary" @click="onClickUpload">上传</a-button>
	</div>
</template>
<script>
import "ant-design-vue/dist/antd.css";
import { CommonUpload } from "../../utils/file/Upload";
import ModelSpace from "../../model/ModelSpace";
import CadToGeo from "../../geometry/CadJsonToGeometry";
export default {
	name: "viewerHeader",
	methods: {
		onClickUpload() {
			let fileUpload = document.createElement("input");
			fileUpload.setAttribute("type", "file");
			fileUpload.setAttribute("onchange", "this.onFileChange");
			fileUpload.onchange = this.onFileChange;
			fileUpload.click();
		},
		async onFileChange(e) {
			let upload = new CommonUpload(e.target.value, e.target.files[0]);
			let ret = await upload.checkFile();
			ret = await upload.doUpload();
			let geoValue = ret.value;

			let parseCad = new CadToGeo(geoValue);
			parseCad.doParse();
			let geos = parseCad.getGeometries();
			for (let geo of geos) {
				let model = {
					id: null,
					geometry: geo
				};
				ModelSpace.append(model);
			}
		}
	}
};
</script>
<style></style>
