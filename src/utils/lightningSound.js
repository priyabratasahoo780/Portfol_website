let audioCtx = null;

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
}

/**
 * REALISTIC LIGHTNING STRIKE SOUND:
 * - Crack (sharp transient)
 * - Zap (electric buzz)
 * - Sizzle tail
 * - Low thunder rumble
 */
export function playLightningStrikeSound() {
  ensureAudio();
  const ctx = audioCtx;
  const now = ctx.currentTime;

  // MASTER GAIN
  const master = ctx.createGain();
  master.gain.value = 0.9; // overall control
  master.connect(ctx.destination);

  // tiny stereo randomness for realism
  const pan = ctx.createStereoPanner();
  pan.pan.value = (Math.random() - 0.5) * 0.3;
  pan.connect(master);

  /* ---------------------------
      1) CRACK (Transient snap)
  ---------------------------- */
  {
    const crackOsc = ctx.createOscillator();
    const crackGain = ctx.createGain();
    const crackFilter = ctx.createBiquadFilter();

    crackOsc.type = "square";
    crackOsc.frequency.setValueAtTime(1400, now);
    crackOsc.frequency.exponentialRampToValueAtTime(3200, now + 0.01);

    crackFilter.type = "highpass";
    crackFilter.frequency.value = 900;

    crackGain.gain.setValueAtTime(0.0001, now);
    crackGain.gain.exponentialRampToValueAtTime(0.30, now + 0.002);
    crackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    crackOsc.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(pan);

    crackOsc.start(now);
    crackOsc.stop(now + 0.05);
  }

  /* ---------------------------
      2) ELECTRIC ZAP (buzz)
  ---------------------------- */
  {
    const zapOsc = ctx.createOscillator();
    const zapGain = ctx.createGain();
    const zapFilter = ctx.createBiquadFilter();

    zapOsc.type = "sawtooth";
    zapOsc.frequency.setValueAtTime(220, now);
    zapOsc.frequency.exponentialRampToValueAtTime(1800, now + 0.06);
    zapOsc.frequency.exponentialRampToValueAtTime(360, now + 0.16);

    zapFilter.type = "bandpass";
    zapFilter.frequency.value = 1100;
    zapFilter.Q.value = 0.9;

    zapGain.gain.setValueAtTime(0.0001, now);
    zapGain.gain.exponentialRampToValueAtTime(0.24, now + 0.015);
    zapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    zapOsc.connect(zapFilter);
    zapFilter.connect(zapGain);
    zapGain.connect(pan);

    zapOsc.start(now);
    zapOsc.stop(now + 0.24);
  }

  /* ---------------------------
      3) NOISE SIZZLE (tail)
  ---------------------------- */
  {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // white noise
      output[i] = (Math.random() * 2 - 1) * 0.55;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const sizzleGain = ctx.createGain();
    const sizzleFilter = ctx.createBiquadFilter();

    sizzleFilter.type = "highpass";
    sizzleFilter.frequency.value = 1200;

    sizzleGain.gain.setValueAtTime(0.0001, now);
    sizzleGain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    sizzleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    noise.connect(sizzleFilter);
    sizzleFilter.connect(sizzleGain);
    sizzleGain.connect(pan);

    noise.start(now);
    noise.stop(now + 0.6);
  }

  /* ---------------------------
      4) THUNDER RUMBLE (bass)
  ---------------------------- */
  {
    const rumbleOsc = ctx.createOscillator();
    const rumbleGain = ctx.createGain();
    const rumbleFilter = ctx.createBiquadFilter();

    rumbleOsc.type = "sine";
    rumbleOsc.frequency.setValueAtTime(58, now);
    rumbleOsc.frequency.exponentialRampToValueAtTime(36, now + 1.2);

    rumbleFilter.type = "lowpass";
    rumbleFilter.frequency.value = 180;

    rumbleGain.gain.setValueAtTime(0.0001, now);
    rumbleGain.gain.exponentialRampToValueAtTime(0.08, now + 0.08);
    rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    rumbleOsc.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(pan);

    rumbleOsc.start(now);
    rumbleOsc.stop(now + 1.5);
  }
}
