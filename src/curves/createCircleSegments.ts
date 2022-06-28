import { Vector2 } from '@osbjs/tiny-osbjs'
import { Segment } from 'types/Segment'
import { lengthSqrVec, subVec } from 'utils/Vector2Math'

export function createCircleSegments(points: Vector2[]): Segment[] {
	const startPoint = points[0],
		midPoint = points[1],
		endPoint = points[2]

	const d = 2 * (startPoint.x * (midPoint.y - endPoint.y) + midPoint.x * (endPoint.y - startPoint.y) + endPoint.x * (startPoint.y - midPoint.y))

	// prettier-ignore
	const center: Vector2 = {
		x: (lengthSqrVec(startPoint) * (midPoint.y - endPoint.y) + lengthSqrVec(midPoint) * (endPoint.y - startPoint.y) + lengthSqrVec(endPoint) * (startPoint.y - midPoint.y)) / d,
		y: (lengthSqrVec(startPoint) * (endPoint.x - midPoint.x) + lengthSqrVec(midPoint) * (startPoint.x - endPoint.x) + lengthSqrVec(endPoint) * (midPoint.x - startPoint.x)) / d,
	}

	const radius = lengthSqrVec(subVec(startPoint, center))

	let startAngle = Math.atan2(startPoint.y - center.y, startPoint.x - center.x)
	let midAngle = Math.atan2(midPoint.y - center.y, midPoint.x - center.x)
	let endAngle = Math.atan2(endPoint.y - center.y, endPoint.x - center.x)

	while (midAngle < startAngle) midAngle += 2 * Math.PI
	while (endAngle < startAngle) endAngle += 2 * Math.PI
	if (midAngle > endAngle) endAngle -= 2 * Math.PI

	const length = Math.abs((endAngle - startAngle) * radius)

	const segmentCount = length / 8

	const segments: Segment[] = []

	for (let i = 1; i < segmentCount; i++) {
		const progress = i / segmentCount
		const angle = endAngle * progress + startAngle * (1 - progress)

		const position: Vector2 = { x: Math.cos(angle) * radius + center.x, y: Math.sin(angle) * radius + center.y }

		segments.push({ distance: progress * length, position })
	}

	segments.push({ distance: length, position: endPoint })

	return segments
}

export function isValidCircleCurve(points: Vector2[]): boolean {
	if (points.length != 3) return false

	const startPoint = points[0],
		midPoint = points[1],
		endPoint = points[2]

	return (
		startPoint.x != midPoint.x &&
		startPoint.y != midPoint.y &&
		midPoint.x != endPoint.x &&
		midPoint.y != endPoint.y &&
		2 * (startPoint.x * (midPoint.y - endPoint.y) + midPoint.x * (endPoint.y - startPoint.y) + endPoint.x * (startPoint.y - midPoint.y)) != 0
	)
}
