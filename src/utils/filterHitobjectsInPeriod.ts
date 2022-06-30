import { HitObjects } from 'types/HitObjects'

/**
 * Returns hitobjects in a specific period.
 * @param startTime Start time in millisecond
 * @param endTime End time in millisecond
 * @param hitobjects Array of hit objects
 * @param maxAcceptableOffset Accept result in range [startTime - maxAcceptableOffset, endTime + maxAcceptableOffset]
 */
export function filterHitObjectsInPeriod(startTime: number, endTime: number, hitobjects: HitObjects, maxAcceptableOffset: number = 5): HitObjects {
	const { circles, sliders } = hitobjects
	const filteredCircles = circles.filter((circle) => circle.time >= startTime - maxAcceptableOffset && circle.time <= endTime + maxAcceptableOffset)
	const filteredSliders = sliders.filter(
		(slider) => slider.startTime >= startTime - maxAcceptableOffset && slider.startTime <= endTime + maxAcceptableOffset
	)

	return { circles: filteredCircles, sliders: filteredSliders }
}
