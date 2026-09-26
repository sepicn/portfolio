/**
 * A small synthwave loop generated with the Web Audio API, so the site ships no audio file
 * and owes nobody a license. A minor, 96 BPM: a detuned saw pad, a plucked bass on eighths,
 * an arpeggio on sixteenths, a low-passed noise "snare" on 2 and 4, and a kick on each beat.
 * Everything runs through a master gain, so muting is a single ramp.
 */
export class SynthwaveLoop {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private echo: DelayNode | null = null;
  private nextBeat = 0;
  private beatIndex = 0;
  private readonly bpm = 96;

  get running() {
    return this.timer !== null;
  }

  async start() {
    if (this.running) return;
    this.ctx ??= new AudioContext();
    if (this.ctx.state === "suspended") await this.ctx.resume();
    if (!this.master) {
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.ratio.value = 4;
      this.master.connect(comp).connect(this.ctx.destination);
      // One shared echo for the arpeggio; per-note delay loops would never be released.
      this.echo = this.ctx.createDelay();
      this.echo.delayTime.value = (60 / this.bpm) * 0.75;
      const feedback = this.ctx.createGain();
      feedback.gain.value = 0.28;
      this.echo.connect(feedback).connect(this.echo);
      this.echo.connect(this.master);
    }
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1.2);
    this.nextBeat = this.ctx.currentTime + 0.05;
    this.beatIndex = 0;
    const tick = () => {
      this.schedule();
      this.timer = window.setTimeout(tick, 120);
    };
    tick();
  }

  stop() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.6);
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private schedule() {
    if (!this.ctx) return;
    const beat = 60 / this.bpm;
    // Schedule a quarter second ahead so timer jitter never causes gaps.
    while (this.nextBeat < this.ctx.currentTime + 0.25) {
      this.playBeat(this.nextBeat, this.beatIndex);
      this.nextBeat += beat;
      this.beatIndex++;
    }
  }

  private playBeat(t: number, i: number) {
    const bar = Math.floor(i / 4) % 4;
    const step = i % 4;
    const beat = 60 / this.bpm;
    // Chord progression: Am, F, C, G (roots as MIDI numbers).
    const roots = [57, 53, 48, 55][bar];
    const chord = [0, 3, 7, 10].map((n) => roots + n);
    if (step === 0) this.pad(t, chord, beat * 4);
    this.kick(t);
    if (step === 1 || step === 3) this.snare(t);
    for (let e = 0; e < 2; e++) this.bass(t + (e * beat) / 2, roots - 24, beat / 2);
    for (let s = 0; s < 4; s++) {
      const note = chord[(i * 4 + s) % chord.length] + 12;
      this.pluck(t + (s * beat) / 4, note, beat / 4);
    }
  }

  private freq(midi: number) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private pad(t: number, notes: number[], dur: number) {
    const ctx = this.ctx!;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, t);
    filter.frequency.linearRampToValueAtTime(1600, t + dur * 0.5);
    filter.frequency.linearRampToValueAtTime(500, t + dur);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.4);
    gain.gain.setValueAtTime(0.08, t + dur - 0.4);
    gain.gain.linearRampToValueAtTime(0, t + dur);
    filter.connect(gain).connect(this.master!);
    for (const n of notes) {
      for (const detune of [-8, 8]) {
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.value = this.freq(n);
        osc.detune.value = detune;
        osc.connect(filter);
        osc.start(t);
        osc.stop(t + dur);
      }
    }
  }

  private bass(t: number, midi: number, dur: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = this.freq(midi);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + dur);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.16, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(filter).connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + dur);
  }

  private pluck(t: number, midi: number, dur: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = this.freq(midi);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur * 1.6);
    osc.connect(gain).connect(this.master!);
    if (this.echo) gain.connect(this.echo);
    osc.start(t);
    osc.stop(t + dur * 1.6);
  }

  private kick(t: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  private snare(t: number) {
    const ctx = this.ctx!;
    const length = Math.floor(ctx.sampleRate * 0.18);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    const gain = ctx.createGain();
    gain.gain.value = 0.22;
    src.connect(filter).connect(gain).connect(this.master!);
    src.start(t);
  }
}
