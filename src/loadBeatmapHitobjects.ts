import { readFileSync } from 'fs'
import { parseCircles } from 'parseCircles'
import { parseSliderMultiplier } from 'parseSliderMultiplier'
import { parseSliders } from 'parseSliders'
import { HitObjects } from 'types/HitObjects'

/**
 * Get all beatmap hitobjects.
 * @param filepath Full path to osu file.
 */
export function loadBeatmapHitobjects(filepath: string): HitObjects {
	const raw = readFileSync(filepath, 'utf-8')

	const rawHitObjs = raw
		.match(/(?<=\[HitObjects]\r?\n)(.+\r?\n?)+/g)
		?.toString()
		.trim()

	if (!rawHitObjs) return { sliders: [], circles: [] }

	const beatMultiplier = parseSliderMultiplier(rawHitObjs)
	const sliders = parseSliders(rawHitObjs, beatMultiplier)
	const circles = parseCircles(rawHitObjs)

	return { sliders, circles }
}
