import { OsuPixel } from 'types/OsuPixel';

export function calculateTravelDuration(beatLength: number, beatmapMultiplier: number, currentMultiplier: number, visualLength: OsuPixel): number {
	return Math.round((beatLength * ((visualLength * currentMultiplier) / beatmapMultiplier)) / 100)
}
