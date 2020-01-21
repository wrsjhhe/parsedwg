class Vector3 {
	constructor(x, y, z) {
		this.x = typeof x === "number" ? x : 0;
		this.y = typeof y === "number" ? y : 0;
		this.z = typeof z === "number" ? z : 0;
	}

	setFromPts(pt1, pt2) {
		this.x = pt2.x - pt1.x;
		this.y = pt2.y - pt1.y;
		this.z = pt2.z - pt1.z;

		return this;
	}

	length() {
		return Math.sqrt(this.dot(this));
	}

	normal() {
		let length = this.length();
		let x = this.x / length;
		let y = this.y / length;
		let z = this.z / length;
		return new Vector3(x, y, z);
	}

	normalize() {
		let length = this.length();
		this.x = this.x / length;
		this.y = this.y / length;
		this.z = this.z / length;
	}

	angleTo(vector3) {
		let cos = (this.x * vector3.x + this.y * vector3.y + this.z * vector3.z) / (this.length() * vector3.length());
		return Math.acos(cos);
	}

	dot(vector3) {
		return this.x * vector3.x + this.y * vector3.y + this.z * vector3.z;
	}

	cross(vector3) {
		return new Vector3(
			this.y * vector3.z - this.z * vector3.y,
			this.z * vector3.x - this.x * vector3.z,
			this.x * vector3.y - this.y * vector3.x
		);
	}
}

Vector3.xAxis = new Vector3(1, 0, 0);
Vector3.yAxis = new Vector3(0, 1, 0);
Vector3.zAxis = new Vector3(0, 0, 1);

export default Vector3;
