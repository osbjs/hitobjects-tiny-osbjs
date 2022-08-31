import { addVec, interpolateVec, mulVecScalar, subVec, Vector2 } from '@osbjs/tiny-osbjs'
import { OsuPixel } from 'types/OsuPixel'
import { Segment } from 'types/Segment'

export function getPositionAtDistance(distance: OsuPixel, segments: Segment[]): Vector2 {
	console.log(distance, segments[segments.length - 1].distance)

	if (distance >= segments[segments.length - 1].distance) return segments[segments.length - 1].position
	if (distance <= segments[0].distance) return segments[0].position

	const nextSegmentIndex = segments.findIndex((segment) => segment.distance > distance)
	const { distance: nextDistance, position: nextPosition } = segments[nextSegmentIndex]
	const { distance: prevDistance, position: prevPosition } = segments[nextSegmentIndex - 1]

	// linearly interpolate
	const alpha = (distance - prevDistance) / (nextDistance - prevDistance)
	const positionAtDistance: Vector2 = interpolateVec(prevPosition, nextPosition, alpha)

	return positionAtDistance
}
