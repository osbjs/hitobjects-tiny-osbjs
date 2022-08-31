import { Vector2 } from '@osbjs/tiny-osbjs'
import { OsuPixel } from 'types/OsuPixel'
import { Segment } from 'types/Segment'
import { getPositionAtDistance } from './getPositionAtDistance'

export function getBezierGroupPositionAtDistance(distance: OsuPixel, curves: Segment[][]): Vector2 {
	let _distance = distance
	for (let i = 0; i < curves.length; i++) {
		const segments = curves[i]
		if (_distance < segments[segments.length - 1].distance) return getPositionAtDistance(_distance, segments)

		_distance -= segments[segments.length - 1].distance
	}

	return getPositionAtDistance(_distance, curves[curves.length - 1])
}
