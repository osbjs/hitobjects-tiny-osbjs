export function parseSliderMultiplier(raw: string): number {
	const sliderMultiplier = parseFloat(raw.match(/(?<=SliderMultiplier:)\d+\.?\d*/)![0])

	return sliderMultiplier
}
