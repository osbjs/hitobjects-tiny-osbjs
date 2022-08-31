import { Vector2 } from '@osbjs/tiny-osbjs'
import { calculateTravelDuration } from 'calculateTravelDuration'
import { createBezierSegmentGroup } from 'curves/createBezierSegmentGroup'
import { createCatmulSegments } from 'curves/createCatmullSegments'
import { createCircleSegments } from 'curves/createCircleSegments'
import { createLineSegments } from 'curves/createLineSegments'
import { getBezierGroupPositionAtDistance } from 'curves/getBezierGroupPositionAtDistance'
import { getPositionAtDistance } from 'curves/getPositionAtDistance'
import { CurveType } from 'types/CurveType'
import { OsuPixel } from 'types/OsuPixel'
import { Segment } from 'types/Segment'
import { Slider } from 'types/Slider'

export function createSlider(
	startTime: number,
	curveType: CurveType,
	points: Vector2[],
	repeatCount: number,
	visualLength: OsuPixel,
	beatLength: number,
	beatMultiplier: number,
	currentMultiplier: number
): Slider {
	const travelDuration = calculateTravelDuration(beatLength, beatMultiplier, currentMultiplier, visualLength)

	const startPoint = points[0],
		endPoint = points[points.length - 1]

	const endTime = startTime + travelDuration * repeatCount

	const segments =
		curveType == CurveType.Bezier
			? createBezierSegmentGroup(points, visualLength)
			: curveType == CurveType.Catmull
			? createCatmulSegments(points, visualLength)
			: curveType == CurveType.Perfect
			? createCircleSegments(points)
			: createLineSegments(points, visualLength)

	return {
		startTime,
		endTime,
		positionAtTime: (time: number) => {
			if (time <= startTime) return startPoint
			if (endTime <= time) return repeatCount % 2 == 0 ? startPoint : endPoint
			let elapsedSinceStart = time - startTime
			let repeatAtTime = 1

			let progressDuration = elapsedSinceStart
			while (progressDuration > travelDuration) {
				progressDuration -= travelDuration
				repeatAtTime++
			}

			const progress = repeatAtTime % 2 != 0 ? progressDuration / travelDuration : 1 - progressDuration / travelDuration

			if (curveType == CurveType.Bezier) {
				return getBezierGroupPositionAtDistance(visualLength * progress, segments as Segment[][])
			} else {
				return getPositionAtDistance(visualLength * progress, segments as Segment[])
			}
		},
	}
}
