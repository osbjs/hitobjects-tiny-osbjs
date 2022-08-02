# hitobjects-tiny-osbjs
Hit objects parser for tiny-osbjs. This plugin only parses time and position needed to create hit objects highlight effect.

## Install
```bash
npm i @osbjs/tiny-osbjs @osbjs/hitobjects-tiny-osbjs
```

## Usage
Note that this plugin does not handle the case where you manually edit the osu file so it might return unexpected result for that case.
```js
import { loadBeatmapHitobjects } from '@osbjs/hitobjects-tiny-osbjs'

const { sliders, circles } = loadBeatmapHitobjects('path/to/osu/file')

circles.forEach((circle) => {
	createSprite('ring.png', Layer.Background, Origin.Centre, circle.position, () => {
		fade([circle.time, circle.time + 100], 1, 0)
		scale([circle.time, circle.time + 100], 0, 1)
	})
})

const timestep = 300

sliders.forEach((slider) => {
	createSprite('ring.png', Layer.Background, Origin.Centre, slider.positionAtTime(slider.startTime), () => {
		fade([slider.startTime, slider.startTime + 100], 1, 0)
		scale([slider.startTime, slider.startTime + 100], 0, 1)
	})

	createSprite('beam.png', Layer.Background, Origin.Centre, slider.positionAtTime(slider.startTime), () => {
		fade([slider.startTime, slider.endTime], 1, 0)

		const startTime = slider.startTime
		const totalStep = Math.round((slider.endTime - slider.startTime) / timestep)

		for (let i = 0; i < totalStep; i++) {
			const prevEndTime = startTime + timestep * i
			const endTime = startTime + timestep * (i + 1)
			const startPosition = slider.positionAtTime(prevEndTime)
			const endPosition = slider.positionAtTime(endTime)
			move([prevEndTime, endTime], startPosition, endPosition)
		}
	})
})
```

## API documentation
### loadBeatmapHitobjects
```ts
function loadBeatmapHitobjects(filepath: string): HitObjects
type HitObjects = {
	sliders: Slider[]
	circles: Circle[]
}
type Slider = {
	startTime: number
	endTime: number
	positionAtTime: (time: number) => Vector2
}
type Circle = {
	position: Vector2
	time: number
}
```
Get all beatmap hitobjects.

### Finding hit object
```ts
function findCircleAtTime(
	time: number, 
	circles: Circle[], 
	maxAcceptableOffset: number = 5
): Circle | undefined
function findSliderAtTime(
	time: number, 
	sliders: Slider[], 
	maxAcceptableOffset: number = 5
): Slider | undefined
```
Get the circle/slider at a specific timestamp.

```ts
function filterHitObjectsInPeriod(
	startTime: number,
	endTime: number,
	hitobjects: HitObjects,
	maxAcceptableOffset: number = 5
): HitObjects
```
Returns hitobjects in a specific period.
