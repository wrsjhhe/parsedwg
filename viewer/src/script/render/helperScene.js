import * as THREE from "three";

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

class HelperScene {
	constructor() {
		this.scene = new THREE.Scene();
		this.grid = initGrid(2000, 50);
		this.scaleY = 1;
		this.tranX = 0;
		this.tranZ = 0;
		this.axesHelper = new THREE.AxesHelper(50);

		this.scene.add(this.grid);
		this.scene.add(this.axesHelper);
	}

	dynamicGrid(camera) {
		let sy = Math.abs(camera.position.y);
		let k = Math.floor(sy / 800);
		k < 1 ? (k = 1) : (k = k);
		if (Math.abs(k - this.scaleY) > 1) {
			this.grid.scale.x = k;
			this.grid.scale.z = k;
			this.scaleY = k;

			this.axesHelper.scale.x = k;
			this.axesHelper.scale.y = k;
			this.axesHelper.scale.z = k;
		}

		let r = camera.position.x < 0;
		let sx = Math.abs(camera.position.x);
		k = Math.floor(sx / 40);
		k < 1 ? (k = 1) : (k = k);
		if (Math.abs(k - this.tranX) > 1) {
			let tranX = (k - this.tranX) * 40;
			r ? (tranX = -tranX) : (tranX = tranX);
			this.grid.translateX(tranX);
			this.tranX = k;
		}

		r = camera.position.z < 0;
		let sz = Math.abs(camera.position.z);
		k = Math.floor(sz / 40);
		k < 1 ? (k = 1) : (k = k);
		if (Math.abs(k - this.tranZ) > 1) {
			let tranZ = (k - this.tranZ) * 40;
			r ? (tranZ = -tranZ) : (tranZ = tranZ);
			this.grid.translateZ(tranZ);
			this.tranZ = k;
		}
	}
}

export default HelperScene;
