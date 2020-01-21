import * as THREE from "three";
import Point3 from "./GeoPoint3";
import Point3Array from "./GeoPoint3Array";
import Vector3 from "./GeoVector3";
import { xAxis } from "./GeoVector3";
class Arc {
	constructor(pt1, pt2, center) {
		this.pt1 = pt1;
		this.pt2 = pt2;
		this.center = center;
	}

	setFromBulge(pt1, pt2, bulge) {
		this.pt1 = pt1;
		this.pt2 = pt2;

		let b = 0.5 * (1 / bulge - bulge);
		let x = 0.5 * (pt1.x + pt2.x - b * (pt2.y - pt1.y));
		let y = 0.5 * (pt1.y + pt2.y + b * (pt2.x - pt1.x));
		this.center = new Point3(x, y, 0);
	}

	drawData() {
		if (this.pt1 === undefined || this.pt2 === undefined || this.center === undefined) {
			return null;
		}

		let segment = 20;

		let dis = this.pt1.distanceTo(this.pt2);
		let radius = this.pt1.distanceTo(this.center);

		//求两个点到圆心向量的夹角
		let v1 = new Vector3();
		let v2 = new Vector3();
		v1.setFromPts(this.center, this.pt1).normalize();
		v2.setFromPts(this.center, this.pt2).normalize();
		let angle1 = v1.angleTo(v2);

		//求有向面积判断顺时针逆时针

		let angle2 = Vector3.xAxis.angleTo(v1);
		let vv1 = new THREE.Vector3(1, 0, 0);
		let vv2 = new THREE.Vector3(v1.x, v1.y, v1.z);
		let aaa = vv1.angleTo(vv2);
		let subAngle = angle1 / segment;
		let pts = new Point3Array();
		for (let i = 0; i < segment; ++i) {
			let angle = angle2 - subAngle * i;
			let x = this.center.x + radius * Math.cos(angle);
			let y = this.center.y + radius * Math.sin(angle);
			let z = 0;
			debugger;
			pts.append(x, y, z);
		}

		let vertices = [];
		for (let pt of pts) {
			let glPt = pt.glPoint();
			vertices.push(glPt.x);
			vertices.push(glPt.y);
			vertices.push(glPt.z);
		}

		let lineGeometry = new THREE.BufferGeometry();
		lineGeometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

		let material = new THREE.LineBasicMaterial({ color: 0xffffff });
		let arc = new THREE.Line(lineGeometry, material);
		return arc;
	}
}

export default Arc;
