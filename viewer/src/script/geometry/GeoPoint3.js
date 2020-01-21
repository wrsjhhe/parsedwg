import * as THREE from "three";
import Vector3 from "./GeoVector3";
class Point3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	distanceTo(point) {
		let dis = Math.sqrt(
			Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2) + Math.pow(this.z - point.z, 2)
		);
		return dis;
	}

	glPoint() {
		return new THREE.Vector3(this.x, this.z, -this.y);
	}

	clone() {
		return new point3(this.x, this.y, this.z);
	}

	asVector3() {
		return new Vector3(this.x, this.y, this.z);
	}
}

export default Point3;
