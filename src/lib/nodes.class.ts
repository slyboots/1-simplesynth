
export class Nodes {

    public static oscillator(ctx: AudioContext, shape: OscillatorType, frequency: number = 1000, detune: number = 0) {
        const oscillator: OscillatorNode = ctx.createOscillator();
        oscillator.type = shape;
        oscillator.frequency.value = frequency;
        oscillator.detune.value = detune;
        return oscillator;
    }
    public static gain(ctx: AudioContext) {
        const gain: GainNode = ctx.createGain();
        gain.gain.value = 0;
        return gain;
    }
}
