<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import CamerControl from "../../utils/camera/CamerControl.js";
import ModelOperation from "../tool/ModelOperation";

function initGrid(_limit, _division) {
  let limit = _limit;
  let division = _division;
  let grid = new THREE.GridHelper(limit * 2, division, "white", "white");

  let moveable = [];
  for (let i = 0; i <= division; i++) {
    moveable.push(1, 1, 0, 0); // move horizontal lines only (1 - point is moveable)
  }

  grid.geometry.addAttribute(
    "moveable",
    new THREE.BufferAttribute(new Uint8Array(moveable), 1)
  );
  grid.material = new THREE.ShaderMaterial({
    uniforms: {
      time: {
        value: 0
      },
      limits: {
        value: new THREE.Vector2(-limit, limit)
      },
      speed: {
        value: 5
      }
    },
    vertexShader: `
          uniform float time;
          uniform vec2 limits;
          uniform float speed;
          
          attribute float moveable;
          
          varying vec3 vColor;
        
          void main() {
            vColor = color;
            float limLen = limits.y - limits.x;
            vec3 pos = position;
            if (floor(moveable + 0.5) > 0.5){ // if a point has "moveable" attribute = 1 
              float dist = speed * time;
              float currPos = mod((pos.z + dist) - limits.x, limLen) + limits.x;
              pos.z = currPos;
            } 
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
          }
        `,
    fragmentShader: `
          varying vec3 vColor;
          void main() {
            gl_FragColor = vec4(vColor, 0.1);
          }
        `,
    vertexColors: THREE.VertexColors,
    transparent: true
  });

  return grid;
}

export default {
  name: "Viewport",
  data() {
    return {
      camera: null,
      scene: null,
      sceneHelper: null,
      renderer: null,
      scaleY: 1,
      tranX: 0,
      tranZ: 0
    };
  },
  props: ["geoData"],
  methods: {
    init: function() {
      let container = document.getElementById("container");

      this.camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        1,
        1000000
      );
      this.camera.position.set(0, 1000, 0);
      this.camera.lookAt(0, 0, 0);

      this.scene = new THREE.Scene();
      this.sceneHelper = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      let controls = new CamerControl(this.camera, this.renderer.domElement);
      controls.enableRotate = false;
      controls.addEventListener("change", this._onCameraChange);

      this.grid = initGrid(2000, 50);

      this.sceneHelper.add(this.grid);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.renderer.autoClear = true;
      this.renderer.render(this.sceneHelper, this.camera);
      this.renderer.autoClear = false;
      this.renderer.render(this.scene, this.camera);
    },
    //相机移动事件
    _onCameraChange: function() {
      let sy = Math.abs(this.camera.position.y);
      let k = Math.floor(sy / 800);
      k < 1 ? (k = 1) : (k = k);
      if (Math.abs(k - this.scaleY) > 1) {
        this.grid.scale.x = k;
        this.grid.scale.z = k;
        this.scaleY = k;
      }

      let r = this.camera.position.x < 0;
      let sx = Math.abs(this.camera.position.x);
      k = Math.floor(sx / 40);
      k < 1 ? (k = 1) : (k = k);
      if (Math.abs(k - this.tranX) > 1) {
        let tranX = (k - this.tranX) * 40;
        r ? (tranX = -tranX) : (tranX = tranX);
        this.grid.translateX(tranX);
        this.tranX = k;
      }

      r = this.camera.position.z < 0;
      let sz = Math.abs(this.camera.position.z);
      k = Math.floor(sz / 40);
      k < 1 ? (k = 1) : (k = k);
      if (Math.abs(k - this.tranZ) > 1) {
        let tranZ = (k - this.tranZ) * 40;
        r ? (tranZ = -tranZ) : (tranZ = tranZ);
        this.grid.translateZ(tranZ);
        this.tranZ = k;
      }
    },
    onclick: function() {
      let modelOperation = new ModelOperation();
      modelOperation.loadToScene(this.scene);
    }
  },
  mounted() {
    this.init();
    this.animate();
    window.onresize = () => {
      //重置相机视角范围
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();

      //重置渲染范围
      this.renderer.setSize(container.clientWidth, container.clientHeight);

      //this.renderer.render(this.sceneHelper, this.camera);
    };
  },
  watch: {
    geoData(newValue, oldValue) {
      debugger;
    },
    deep: true
  }
};
</script>
<style>
#container {
  height: 100%;
  width: 100%;
}
</style>
