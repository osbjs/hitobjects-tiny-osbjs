import { readFileSync } from 'fs'
import { parseCircles } from 'parseCircles'
import { parseSliderMultiplier } from 'parseSliderMultiplier'
import { parseSliders } from 'parseSliders'
import { parseTimingPoints } from 'parseTimingPoints'
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

	const timingPoints = parseTimingPoints(raw)
	const beatMultiplier = parseSliderMultiplier(raw)
	const sliders = parseSliders(rawHitObjs, beatMultiplier, timingPoints)
	const circles = parseCircles(rawHitObjs)

	return { sliders, circles }
}
