import { lengthVec, subVec, Vector2 } from '@osbjs/tiny-osbjs'
import { OsuPixel } from 'types/OsuPixel'
import { Segment } from 'types/Segment'

export function createCatmulSegments(points: Vector2[], visualLength: OsuPixel): Segment[] {
	const startPoint = points[0],
		endPoint = points[points.length - 1]

	const segmentCountEachGroup = visualLength / points.length
	const segments: Segment[] = []

	let distance = 0.0
	let prevPosition = startPoint
	for (let lineIndex = 0; lineIndex < points.length - 1; lineIndex++) {
		for (let i = 1; i <= segmentCountEachGroup; i++) {
			let delta = i / (segmentCountEachGroup + 1)

			const p1 = lineIndex > 0 ? points[lineIndex - 1] : points[lineIndex],
				p2 = points[lineIndex],
				p3 = points[lineIndex + 1],
				p4 = lineIndex < points.length - 2 ? points[lineIndex + 2] : p3

			let nextPosition = getPositionAtDelta(delta, p1, p2, p3, p4)

			distance += lengthVec(subVec(nextPosition, prevPosition))

			segments.push({ distance, position: nextPosition })

			prevPosition = nextPosition
		}
	}

	distance += lengthVec(subVec(endPoint, prevPosition))

	segments.push({ distance, position: endPoint })

	return segments
}

function getPointPositionAtDelta(delta: number, p1: number, p2: number, p3: number, p4: number) {
	return (
		0.5 * ((-p1 + 3 * p2 - 3 * p3 + p4) * delta * delta * delta + (2 * p1 - 5 * p2 + 4 * p3 - p4) * delta * delta + (-p1 + p3) * delta + 2 * p2)
	)
}

function getPositionAtDelta(delta: number, p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2): Vector2 {
	return [getPointPositionAtDelta(p1[0], p2[0], p3[0], p4[0], delta), getPointPositionAtDelta(p1[1], p2[1], p3[1], p4[1], delta)]
}
