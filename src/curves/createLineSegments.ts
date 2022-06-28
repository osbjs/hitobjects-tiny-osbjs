import { Vector2 } from '@osbjs/tiny-osbjs'
import { OsuPixel } from 'types/OsuPixel'
import { Segment } from 'types/Segment'

export function createLineSegments(points: Vector2[], visualLength: OsuPixel): Segment[] {
	const startPoint = points[0],
		endPoint = points[1]
	return [
		{ distance: 0, position: startPoint },
		{ distance: visualLength, position: endPoint },
	]
}
