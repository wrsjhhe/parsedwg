<template>
  <div>
    <div id="container"></div>
  </div>
</template>
 
<script>
import * as THREE from "three";
import CamerControl from "./utils/CamerControl";

function initGrid() {
  let limit = 2000;
  let division = 50;
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
            gl_FragColor = vec4(vColor, 0.3);
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
      renderer: null,
      mesh: null,
      scale: 1
    };
  },
  methods: {
    init: function() {
      let container = document.getElementById("container");

      this.camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        1,
        1000000
      );
      this.camera.position.set(0, 1000, 50);
      this.camera.lookAt(0, 0, 0);

      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      let controls = new CamerControl(this.camera, this.renderer.domElement);
      controls.addEventListener("change", this._onCameraChange);

      this.grid = initGrid();

      this.scene.add(this.grid);

      let geometry = new THREE.BoxGeometry(100, 100, 100);
      let material = new THREE.MeshNormalMaterial();

      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
    //相机移动事件
    _onCameraChange: function() {
      let m = Math.sqrt(
        Math.pow(this.camera.position.x, 2) +
          Math.pow(this.camera.position.y, 2) +
          Math.pow(this.camera.position.z, 2)
      );

      let k = Math.floor(m / 1000);
      k < 1 ? (k = 1) : (k = k);
      if (Math.abs(k - this.scale) > 1) {
        this.grid.scale.x = k;
        this.grid.scale.z = k;
        this.scale = k;
      }
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

      this.renderer.render(this.scene, this.camera);
    };
  }
};
</script>
