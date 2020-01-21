import * as THREE from "three";
import Point3 from "./GeoPoint3";
class Point3Array {
	constructor() {
		this.points = [];
	}
	[Symbol.iterator]() {
		return this.points.values();
	}

	assign(pts) {
		for (let point of pts) {
			this.points.push(point.clone());
		}
	}

	append(...arg) {
		if (arguments.length === 1) {
			this.points.push(arguments[0].clone());
		} else if (arguments.length === 3) {
			let x = arguments[0];
			let y = arguments[1];
			let z = arguments[2];
			let point = new Point3(x, y, z);
			this.points.push(point);
		}
	}

	size() {
		return this.points.length;
	}

	at(index) {
		return this.points[index];
	}

	glPoints() {
		let _glPoints = [];
		for (let point of this.points) {
			_glPoints.push(new THREE.Vector3(point.x, point.z, -point.y));
		}
		return _glPoints;
	}
}
export default Point3Array;
