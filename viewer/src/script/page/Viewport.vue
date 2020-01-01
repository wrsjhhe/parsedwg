<template>
  <div class="viewport">
    <el-container>
      <!--   <el-aside width="200px"></el-aside> -->
      <el-container>
        <el-header>
          <el-row :gutter="10" type="flex" justify="start">
            <el-col :span="2">
              <div class="top-grid">
                <el-upload
                  class="btn-upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <scene />
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style>
html,
body,
#app,
.viewport,
.el-container {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
}

.el-header {
  background-color: #8f8d8d;
  color: #333;
}
.el-footer {
  background-color: #8f8d8d;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #dbdbd4;
  color: #333;
  height: 100%;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  height: 100%;
  width: 100%;
}
.el-col {
  border-radius: 4px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.top-grid {
  height: 100%;
  width: 100%;
  border-radius: 7px;
}

.btn-upload {
  padding-top: 7px;
  height: 100%;
  width: 100%;
  border-radius: 7px;
}
</style>

<script>
import Scene from "../component/Scene.vue";

export default {
  name: "Viewport",
  data() {
    return {};
  },
  components: {
    scene: Scene
  }
};
</script>