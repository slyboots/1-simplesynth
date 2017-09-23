import { Nodes } from "./nodes.class";
import { SynthInternal, Waveform } from "./synth.class";
export type Wave = "sine" | "square" | "sawtooth"

export class SimpleSynth {
    constructor() {
        try {
            window.AudioContext = AudioContext || webkitAudioContext;
            this.internalSynth = new SynthInternal();
        }
        catch (err) {
            alert("The Web Audio API is not supported on this browser!");
        }
    }

    init() {
        this.volume = Nodes.gain(this.context)
        this.volume.gain.value = this.getVolume();
        this.volume.connect(this.context.destination);
    }

    toggle() {
        if (!this.playing) {
            this.oscillator = Nodes.oscillator(this.context, "sine");
            this.oscillator.frequency.value = this.getFrequency();
            this.volume.gain.value = this.getVolume();
            this.oscillator.connect(this.volume);
            this.oscillator.start(0);
            this.playing = true;
            console.info("SimpleSynth oscillator started.");
        }
        else {
            this.oscillator.stop(0);
            this.playing = false;
            console.info("SimpleSynth oscillator stopped.");
        }
    }

    updateFrequency(target: HTMLInputElement) {
        this.oscillator.frequency.value = target.valueAsNumber;
        console.log("Oscillator frequency changed to " + target.value);
    }
    updateVolume(target: HTMLInputElement) {
        this.volume.gain.value = target.valueAsNumber;
        console.log("Oscillator gain changed to " + target.value);
    }
    updateWaveform(shape: Wave) {
        if (shape != this.activeWaveform) {
            let activeClass = "bg-dark-gray";
            let inactiveClass = "bg-black";
    
            let oldWaveform = document.getElementById(this.activeWaveform) as HTMLButtonElement;
            let newWaveform = document.getElementById(shape) as HTMLButtonElement;
            oldWaveform.classList.remove(activeClass);
            oldWaveform.classList.add(inactiveClass);
            newWaveform.classList.remove(inactiveClass);
            newWaveform.classList.add(activeClass);
            this.oscillator.type = shape as OscillatorType;
            this.activeWaveform = shape;
            console.log("Waveform changed to " + shape);
        }
    }
    // PUBLIC PROPERTIES
    public readonly context: AudioContext;

    // PRIVATE PROPERTIES
    private internalSynth: SynthInternal;

    private oscillator: OscillatorNode;
    private volume: GainNode;
    private playing: boolean = false;
    private activeWaveform: Wave = "sine"
    private getVolume() {
        const volumeControl: HTMLInputElement = document.getElementById('volume') as HTMLInputElement;
        return volumeControl.valueAsNumber;
    }
    private getFrequency() {
        const pitchControl: HTMLInputElement = document.getElementById('pitch') as HTMLInputElement;
        return pitchControl.valueAsNumber;
    }
}