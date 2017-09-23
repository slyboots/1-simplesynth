import { Observable, bindValue } from "./observable.funtions";
export type Waveform = "sine" | "square" | "sawtooth" | "triangle";

export class SynthInternal {
    //Constructor
    constructor(context: AudioContext, wave: Waveform = "sine", gain: number = 0, pitch: number = 1000) {

        this.wave = wave;
        this.gain = gain;
        this.pitch = pitch;
        this.muteNode.connect(this.context.destination);
        this.gainNode.connect(this.muteNode);
        this.oscillatorNode.connect(this.gainNode)
    }
    
    //Public Fields
    public get muted(): boolean { return this.muteNode.gain.value === 1? false : true; }

    public set wave(shape: OscillatorType) { this.oscillatorNode.type = shape; }
    public get wave(): OscillatorType { return this.oscillatorNode.type; }

    public set gain(level: number) { this.gainNode.gain.value = level; }
    public get gain(): number { return this.gainNode.gain.value; }

    public set pitch(frequency: number) { this.oscillatorNode.frequency.value = frequency; }
    public get pitch(): number { return this.oscillatorNode.frequency.value; }
    //Public Methods
    public start() { this.muteNode.gain.value = 1; }
    public stop() { this.muteNode.gain.value = 0; }
    //Private Fields
    private context: AudioContext;
    private gainNode: GainNode;
    private muteNode: GainNode;
    private oscillatorNode: OscillatorNode;
    //Private Methods
    private init(context: AudioContext) {
        this.context = context
    }
    
}