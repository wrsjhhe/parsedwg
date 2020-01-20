import * as THREE from "three";
import MainScene from "./mainScene";
import HelperScene from "./helperScene";
import CamerControl from "./camerControl";

class Renderer {
	constructor(document) {
		this.document = document;

		this.mainScene = new MainScene();
		this.helperScene = new HelperScene();

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(this.document.clientWidth, this.document.clientHeight);
		this.document.appendChild(this.renderer.domElement);

		this.camera = new THREE.PerspectiveCamera(
			60,
			this.document.clientWidth / this.document.clientHeight,
			1,
			1000000
		);
		this.camera.position.set(0, 1000, 0);
		this.camera.lookAt(0, 0, 0);

		let controls = new CamerControl(this.camera, this.renderer.domElement);
		controls.enableRotate = false;
		controls.addEventListener("change", () => {
			this.onCameraChange();
		});

		window.onresize = () => {
			this.onResize();
		};

		this.onCameraChange = this.onCameraChange.bind(this);
		this.startAnimate = this.startAnimate.bind(this);

		this.initLight();
	}

	initLight() {
		let light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
		light.position.set(100, 100, 200);
		this.mainScene.scene.add(light);
	}
	startAnimate() {
		requestAnimationFrame(this.startAnimate);
		this.renderer.autoClear = true;
		this.renderer.render(this.helperScene.scene, this.camera);
		this.renderer.autoClear = false;
		this.renderer.render(this.mainScene.scene, this.camera);
	}

	onCameraChange() {
		this.helperScene.dynamicGrid(this.camera);
	}

	onResize() {
		//重置相机视角范围
		this.camera.aspect = this.document.clientWidth / this.document.clientHeight;
		this.camera.updateProjectionMatrix();

		//重置渲染范围
		this.renderer.setSize(this.document.clientWidth, this.document.clientHeight);
	}

	addEntity(entity) {
		this.mainScene.addEntityToModelScene(entity);
	}

	bindModelSpace(modelSpace) {
		this.modelSpace = modelSpace;
		this.modelSpace.setRenderer(this);
	}
}

export default Renderer;
