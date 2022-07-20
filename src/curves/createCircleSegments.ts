import { lengthSqrVec, subVec, Vector2 } from '@osbjs/tiny-osbjs'
import { Segment } from 'types/Segment'

export function createCircleSegments(points: Vector2[]): Segment[] {
	const startPoint = points[0],
		midPoint = points[1],
		endPoint = points[2]

	const d =
		2 * (startPoint[0] * (midPoint[1] - endPoint[1]) + midPoint[0] * (endPoint[1] - startPoint[1]) + endPoint[0] * (startPoint[1] - midPoint[1]))

	const center: Vector2 = [
		(lengthSqrVec(startPoint) * (midPoint[1] - endPoint[1]) +
			lengthSqrVec(midPoint) * (endPoint[1] - startPoint[1]) +
			lengthSqrVec(endPoint) * (startPoint[1] - midPoint[1])) /
			d,
		(lengthSqrVec(startPoint) * (endPoint[0] - midPoint[0]) +
			lengthSqrVec(midPoint) * (startPoint[0] - endPoint[0]) +
			lengthSqrVec(endPoint) * (midPoint[0] - startPoint[0])) /
			d,
	]

	const radius = lengthSqrVec(subVec(startPoint, center))

	let startAngle = Math.atan2(startPoint[1] - center[1], startPoint[0] - center[0])
	let midAngle = Math.atan2(midPoint[1] - center[1], midPoint[0] - center[0])
	let endAngle = Math.atan2(endPoint[1] - center[1], endPoint[0] - center[0])

	while (midAngle < startAngle) midAngle += 2 * Math.PI
	while (endAngle < startAngle) endAngle += 2 * Math.PI
	if (midAngle > endAngle) endAngle -= 2 * Math.PI

	const length = Math.abs((endAngle - startAngle) * radius)

	const segmentCount = length / 8

	const segments: Segment[] = []

	for (let i = 1; i < segmentCount; i++) {
		const progress = i / segmentCount
		const angle = endAngle * progress + startAngle * (1 - progress)

		const position: Vector2 = [Math.cos(angle) * radius + center[0], Math.sin(angle) * radius + center[1]]

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
		startPoint[0] != midPoint[0] &&
		startPoint[1] != midPoint[1] &&
		midPoint[0] != endPoint[0] &&
		midPoint[1] != endPoint[1] &&
		2 *
			(startPoint[0] * (midPoint[1] - endPoint[1]) +
				midPoint[0] * (endPoint[1] - startPoint[1]) +
				endPoint[0] * (startPoint[1] - midPoint[1])) !=
			0
	)
}
