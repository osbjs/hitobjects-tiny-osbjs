import { createContext, createSprite, fade, generateStoryboardOsb, Layer, move, Origin, useContext } from '@osbjs/tiny-osbjs'
import { writeFileSync } from 'fs'
import path from 'path'
import { loadBeatmapHitobjects } from '../src/index'
console.log('restart')

useContext(createContext())
const folder = 'D:\\Games\\osu!\\Songs\\beatmap-637975065178251483-01. Hello, Morning'
const { sliders } = loadBeatmapHitobjects(path.join(folder, 'Kizuna AI - Hello, Morning (Laquarius) [d].osu'))

const timestep = 500 - 406

sliders.forEach((slider) => {
	createSprite('ring.png', Layer.Background, Origin.Centre, slider.positionAtTime(slider.startTime), () => {
		fade([slider.startTime, slider.endTime], 1, 1)

		const startTime = slider.startTime
		const totalStep = Math.round((slider.endTime - slider.startTime) / timestep)

		for (let i = 0; i < totalStep; i++) {
			const prevEndTime = startTime + timestep * i
			const currentEndTime = startTime + timestep * (i + 1)
			const startPosition = slider.positionAtTime(prevEndTime)
			const endPosition = slider.positionAtTime(currentEndTime)
			move([prevEndTime, currentEndTime], startPosition, endPosition)
		}
	})
})

writeFileSync(path.join(folder, 'Kizuna AI - Hello, Morning (Laquarius).osb'), generateStoryboardOsb(), 'utf8')
