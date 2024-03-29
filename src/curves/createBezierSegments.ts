import { cloneVec, lengthVec, subVec, Vector2 } from '@osbjs/tiny-osbjs'
import { OsuPixel } from 'types/OsuPixel'
import { Segment } from 'types/Segment'

export function createBezierSegments(points: Vector2[], visualLength: OsuPixel): Segment[] {
	const startPoint = points[0],
		endPoint = points[points.length - 1]

	const segments: Segment[] = []
	const segmentCount = visualLength

	let distance = 0
	let prevPosition = startPoint

	for (let i = 1; i <= segmentCount; i++) {
		let delta = i / segmentCount
		let nextPosition = getPositionAtDelta(delta, points)

		distance += lengthVec(subVec(nextPosition, prevPosition))

		segments.push({ distance, position: nextPosition })

		prevPosition = nextPosition
	}

	distance += lengthVec(subVec(endPoint, prevPosition))

	segments.push({ distance, position: endPoint })

	return segments
}

// de_casteljau algorithm
function getPositionAtDelta(delta: number, points: Vector2[]): Vector2 {
	let intermediatePoints = points.map((point) => cloneVec(point))

	for (let i = 1; i < points.length; i++)
		for (let j = 0; j < points.length - i; j++) {
			intermediatePoints[j] = [
				intermediatePoints[j][0] * (1 - delta) + intermediatePoints[j + 1][0] * delta,
				intermediatePoints[j][1] * (1 - delta) + intermediatePoints[j + 1][1] * delta,
			]
		}

	return intermediatePoints[0]
}
