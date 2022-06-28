import { TimingPoint } from 'types/TimingPoint'

export function parseTimingPoints(raw: string): TimingPoint[] {
	let match = raw
		.match(/(?<=\[TimingPoints]\n)(-?\d+,-?\d+\.?\d*,\d+,\d+,\d+,\d+,\d+,\d+\n)+/g)
		?.toString()
		.match(/-?\d+,-?\d+\.?\d*,\d+,\d+,\d+,\d+,\d+,\d+/g)

	const timingPoints: TimingPoint[] = []

	if (match) {
		for (const timingPointLine of match) {
			const timingPointAttr = timingPointLine.split(',')

			timingPoints.push({
				startTime: parseInt(timingPointAttr[0]),
				beatLength: parseFloat(timingPointAttr[1]),
				uninherited: timingPointAttr[6] === '1',
			})
		}
	}

	return timingPoints
}
