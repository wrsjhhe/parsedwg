import * as THREE from "three";

class MainScene {
	constructor() {
		this.scene = new THREE.Scene();
	}

	addEntityToModelScene(entity) {
		this.scene.add(entity);
	}
}

export default MainScene;
