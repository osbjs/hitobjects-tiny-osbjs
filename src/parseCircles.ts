import { Circle } from 'types/Circle'
import { PlayfieldToStoryboardOffset } from 'utils/PlayfieldToStoryboardOffset'
import { addVec, Vector2 } from '@osbjs/tiny-osbjs'

export function parseCircles(rawHitObjs: string): Circle[] {
	const circles: Circle[] = []

	const match = rawHitObjs.match(/-*\d+,-*\d+,-*\d+,\d+,\d+,\d+:\d+:\d+:\d+:\w*/g)

	if (match) {
		for (const cL of match) {
			const cAttr = cL.split(',')

			const playfieldPosition: Vector2 = [parseInt(cAttr[0]), parseInt(cAttr[1])]

			circles.push({
				position: addVec(playfieldPosition, PlayfieldToStoryboardOffset),
				time: parseInt(cAttr[2]),
			})
		}
	}

	return circles
}
