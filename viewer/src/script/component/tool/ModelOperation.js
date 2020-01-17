import * as THREE from "three";

export default class ModelOperation {
	constructor() {}

	loadToScene(scene, objects) {
		/* let geometry = new THREE.BoxGeometry(100, 100, 100);
		let material = new THREE.MeshNormalMaterial();

		let mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh); */

		let meshes = this.transformToGeo(objects);
		for (let mesh of objects) {
			scene.add(mesh);
		}
	}

	transformToGeo(objects) {
		let meshes = [];
		for (let data of objects) {
			switch (data.type) {
				case "LWPolyline": {
					let lineGeometry = new THREE.BufferGeometry();
					lineGeometry.addAttribute(
						"position",
						new THREE.BufferAttribute(new Float32Array(ARC_SEGMENTS * 3), 3)
					);

					break;
				}
				case "Layer": {
					break;
				}
			}
		}
	}
}
