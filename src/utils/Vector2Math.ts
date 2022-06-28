import { Vector2 } from '@osbjs/tiny-osbjs'

export function subVec(v1: Vector2, v2: Vector2): Vector2 {
	return {
		x: v1.x - v2.x,
		y: v1.y - v2.y,
	}
}

export function addVec(v1: Vector2, v2: Vector2): Vector2 {
	return {
		x: v1.x + v2.x,
		y: v1.y + v2.y,
	}
}

export function mulVecScalar(v: Vector2, s: number): Vector2 {
	return {
		x: v.x * s,
		y: v.y * s,
	}
}

export function lengthSqrVec(v: Vector2): number {
	return v.x * v.x + v.y * v.y
}

export function lengthVec(v: Vector2): number {
	return Math.sqrt(lengthSqrVec(v))
}

export function isVecEqual(v1: Vector2, v2: Vector2): boolean {
	return v1.x === v2.x && v1.y === v2.y
}
