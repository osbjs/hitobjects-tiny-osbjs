import { Vector2 } from '@osbjs/tiny-osbjs'

export type Slider = {
	startTime: number
	endTime: number
	positionAtTime: (time: number) => Vector2
}
