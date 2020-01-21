import Point3 from "./GeoPoint3";
import * as THREE from "three";
class Line {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	drawData() {
		if (this.start === undefined || this.end === undefined) return null;

		let pts = [];
		pts.push(this.start.glPoint());
		pts.push(this.end.glPoint());

		let vertices = [];
		for (let item of pts) {
			vertices.push(item.x, item.y, item.z);
		}

		let lineGeometry = new THREE.BufferGeometry();
		lineGeometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

		let material = new THREE.LineBasicMaterial({ color: 0xffffff });
		let arc = new THREE.Line(lineGeometry, material);
		return arc;
	}
}

export default Line;
