import * as THREE from "three";
import Point3 from "./GeoPoint3";
import Point3Array from "./GeoPoint3Array";
import Vector3 from "./GeoVector3";

class Arc {
	constructor() {
		this.start = undefined;
		this.end = undefined;
		this.center = undefined;
		this.clockwise = undefined;
	}

	setFromThreePts(start, mid, end) {
		let e = 1e-6;
		let v1 = Vector3.createByDoublePts(mid, start);
		let v2 = Vector3.createByDoublePts(end, mid);

		if (Math.abs(v1.cross(v2)) < e) {
			throw "three points collinear";
		}

		let x1 = start.x;
		let y1 = start.y;
		let x2 = mid.x;
		let y2 = mid.y;
		let x3 = end.x;
		let y3 = end.y;

		let a = x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - x3 * y2;
		let b = (x1 * x1 + y1 * y1) * (y3 - y2) + (x2 * x2 + y2 * y2) * (y1 - y3) + (x3 * x3 + y3 * y3) * (y2 - y1);
		let c = (x1 * x1 + y1 * y1) * (x2 - x3) + (x2 * x2 + y2 * y2) * (x3 - x1) + (x3 * x3 + y3 * y3) * (x1 - x2);

		let x = -b / (2 * a);
		let y = -c / (2 * a);

		this.start = start;
		this.end = end;
		this.center = new Point3(x, y);
	}

	setFromBulge(pt1, pt2, bulge) {
		this.start = pt1;
		this.end = pt2;

		let b = 0.5 * (1 / bulge - bulge);
		let x = 0.5 * (pt1.x + pt2.x - b * (pt2.y - pt1.y));
		let y = 0.5 * (pt1.y + pt2.y + b * (pt2.x - pt1.x));
		this.center = new Point3(x, y, 0);

		this.clockwise = bulge > 0 ? false : true;
	}

	radius() {
		return this.start.distanceTo(this.center);
	}

	drawData() {
		if (this.start === undefined || this.end === undefined || this.center === undefined) {
			return null;
		}

		let segment = 50;
		let radius = this.radius();

		//保持两个点为逆时针顺序
		let pt1, pt2;
		if (this.clockwise) {
			pt1 = this.end;
			pt2 = this.start;
		} else {
			pt1 = this.start;
			pt2 = this.end;
		}

		//求两个点到圆心向量的夹角
		let v1 = Vector3.createByDoublePts(this.center, pt1).normalize();
		let v2 = Vector3.createByDoublePts(this.center, pt2).normalize();

		let angle1 = v1.counterclockwiseAngleTo(v2);
		let angle2 = Vector3.xAxis.counterclockwiseAngleTo(v1);

		let subAngle = angle1 / segment;
		let pts = new Point3Array();
		for (let i = 0; i < segment + 1; ++i) {
			let angle = angle2 + subAngle * i;
			let x = this.center.x + radius * Math.cos(angle);
			let y = this.center.y + radius * Math.sin(angle);
			let z = 0;

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
