import { Circle } from 'types/Circle'
import { Slider } from 'types/Slider'

/**
 * Find the first circle with a specific timestamp.
 * @param time Time in millisecond
 * @param circles Array of circles
 * @param maxAcceptableOffset Accept result in range [time - maxAcceptableOffset, time + maxAcceptableOffset]
 */
export function findCircleAtTime(time: number, circles: Circle[], maxAcceptableOffset: number = 5): Circle | undefined {
	return circles.find((circle) => circle.time <= time + maxAcceptableOffset && circle.time >= time - maxAcceptableOffset)
}

/**
 * Find the first slider with a specific timestamp.
 * @param time Time in millisecond
 * @param sliders Array of sliders
 * @param maxAcceptableOffset Accept result in range [time - maxAcceptableOffset, time + maxAcceptableOffset]
 */
export function findSliderAtTime(time: number, sliders: Slider[], maxAcceptableOffset: number = 5): Slider | undefined {
	return sliders.find((slider) => slider.startTime <= time + maxAcceptableOffset && slider.startTime >= time - maxAcceptableOffset)
}
