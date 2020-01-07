import * as THREE from "three";

export default class ModelOperation {
	constructor() {}

	loadToScene(scene, objects) {
		let geometry = new THREE.BoxGeometry(100, 100, 100);
		let material = new THREE.MeshNormalMaterial();

		let mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
	}

	transformToGeo(objects) {
    for (let data of objects) {
      
		}
	}
}
