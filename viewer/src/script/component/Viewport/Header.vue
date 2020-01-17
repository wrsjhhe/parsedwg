<template>
  <div>
    <a-button type="primary" @click="onClickUpload">上传</a-button>
  </div>
</template>
<script>
import "ant-design-vue/dist/antd.css";

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
    onFileChange(e) {
      console.log(e);
    }
  }
};
</script>
<style>
</style>
