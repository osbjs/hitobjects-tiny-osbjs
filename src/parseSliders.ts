import { Vector2 } from '@osbjs/tiny-osbjs'
import { createSlider } from 'createSlider'
import { parseSliderMultiplier } from 'parseSliderMultiplier'
import { parseTimingPoints } from 'parseTimingPoints'
import { CurveType } from 'types/CurveType'
import { Slider } from 'types/Slider'
import { PlayfieldToStoryboardOffset } from 'utils/PlayfieldToStoryboardOffset'
import { addVec } from 'utils/Vector2Math'

export function parseSliders(rawHitObjs: string): Slider[] {
	const timingPoints = parseTimingPoints(rawHitObjs)
	const beatMultiplier = parseSliderMultiplier(rawHitObjs)

	const sliders: Slider[] = []

	const match = rawHitObjs.match(
		/-*\d+,-*\d+,-*\d+,\d+,\d+,(L|B|C|P)(\|-*\d+:-*\d+)+,\d+,\d+\.*\d*(,\d+(\|\d*)*,\d+:\d+(\|\d+:\d+)*,\d+:\d+:\d+:\d+:\w*)*/g
	)

	if (match) {
		for (const sL of match) {
			const sAttr = sL.split(',')

			const startTime = parseInt(sAttr[2])

			const curves = sAttr[5].split('|')
			const curveType = curves[0] as CurveType
			const points = curves
				.slice(1)
				.map((cp): Vector2 => addVec({ x: parseInt(cp.split(':')[0]), y: parseInt(cp.split(':')[1]) }, PlayfieldToStoryboardOffset))
			const repeatCount = parseInt(sAttr[6])
			const visualLength = parseInt(sAttr[7])

			const currentTimingPoint = timingPoints
				.filter((tP) => tP.startTime <= startTime && tP.uninherited)
				.sort((t1, t2) => t2.startTime - t1.startTime)[0]

			const currentMultipliers = timingPoints
				.filter((tP) => tP.startTime <= startTime && !tP.uninherited && tP.startTime >= currentTimingPoint.startTime)
				.sort((t1, t2) => t2.startTime - t1.startTime)
			const currentMultiplier = currentMultipliers.length ? -currentMultipliers[0].beatLength / 100 : 1

			sliders.push(
				createSlider(
					startTime,
					curveType,
					points,
					repeatCount,
					visualLength,
					currentTimingPoint.beatLength,
					beatMultiplier,
					currentMultiplier
				)
			)
		}
	}

	return sliders
}
