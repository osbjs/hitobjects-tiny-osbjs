import { areEqualVecs, cloneVec, Vector2 } from '@osbjs/tiny-osbjs'
import { OsuPixel } from 'types/OsuPixel'
import { Segment } from 'types/Segment'
import { createBezierSegments } from './createBezierSegments'

export function createBezierSegmentGroup(points: Vector2[], visualLength: OsuPixel): Segment[][] {
	const curves: Segment[][] = []
	const startPoint = points[0]

	let _points: Vector2[] = [startPoint]

	let prevPoint = startPoint

	points.forEach((currentPoint) => {
		if (areEqualVecs(currentPoint, prevPoint)) {
			if (_points.length > 1) curves.push(createBezierSegments(_points, visualLength))
			_points = []
		} else {
			_points.push(cloneVec(currentPoint))
		}

		prevPoint = currentPoint
	})

	if (_points.length > 1) curves.push(createBezierSegments(_points, visualLength))

	return curves
}
