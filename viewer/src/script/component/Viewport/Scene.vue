<template>
	<div id="container"></div>
</template>

<script>
import Renderer from "../../render/renderer";
import ModelSpace from "../../model/ModelSpace";
function initGrid(_limit, _division) {
	let limit = _limit;
	let division = _division;
	let grid = new THREE.GridHelper(limit * 2, division, "white", "white");

	let moveable = [];
	for (let i = 0; i <= division; i++) {
		moveable.push(1, 1, 0, 0); // move horizontal lines only (1 - point is moveable)
	}

	grid.geometry.addAttribute("moveable", new THREE.BufferAttribute(new Uint8Array(moveable), 1));
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
		return {};
	},
	props: ["geoData"],
	methods: {
		initScene: function() {
			let container = document.getElementById("container");
			let renderer = new Renderer(container);
			renderer.startAnimate();

			renderer.bindModelSpace(ModelSpace);
		}
	},
	mounted() {
		this.initScene();
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
