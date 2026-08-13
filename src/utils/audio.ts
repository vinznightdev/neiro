/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Synthesize dog barks in the browser using the Web Audio API.
// No external assets required, fully robust and customizable.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    // Standard audio context initialization
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Resume if suspended (browser security policies)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Creates noise buffer for the breathy/raspy component of the bark
 */
function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds of noise
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/**
 * Synthesizes a puppy bark based on parameters
 */
export function playBarkSound(
  baseFreq: number, // Base frequency in Hz
  pitchDrop: number, // How much frequency drops (Hz)
  decay: number,     // Bark duration/decay in seconds
  character: 'tiny' | 'playful' | 'big' | 'space'
) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 1. Gain Node for overall envelope
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0, now);
    mainGain.gain.linearRampToValueAtTime(0.8, now + 0.01); // Quick attack
    mainGain.gain.exponentialRampToValueAtTime(0.01, now + decay); // Smooth decay

    // 2. Oscillators for the tonal body of the bark
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const oscGain = ctx.createGain();

    oscGain.gain.setValueAtTime(0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + decay * 0.8);

    // Character adjustments
    if (character === 'tiny') {
      osc1.type = 'triangle';
      osc2.type = 'sine';
      // Pitch envelope - sweeping down rapidly
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq - pitchDrop, now + decay * 0.5);
      osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
      osc2.frequency.exponentialRampToValueAtTime((baseFreq - pitchDrop) * 1.5, now + decay * 0.5);
    } else if (character === 'big') {
      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.linearRampToValueAtTime(baseFreq - pitchDrop, now + decay * 0.6);
      osc2.frequency.setValueAtTime(baseFreq * 0.9, now);
      osc2.frequency.linearRampToValueAtTime((baseFreq - pitchDrop) * 0.9, now + decay * 0.6);
    } else {
      // playful & space
      osc1.type = 'triangle';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq - pitchDrop, now + decay * 0.5);
      osc2.frequency.setValueAtTime(baseFreq * 1.2, now);
      osc2.frequency.exponentialRampToValueAtTime((baseFreq - pitchDrop) * 1.2, now + decay * 0.5);
    }

    osc1.connect(oscGain);
    osc2.connect(oscGain);

    // 3. Noise source for the 'ruff' scratchy texture
    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx);

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    
    // Position filter frequency near the bark pitch
    noiseFilter.frequency.setValueAtTime(baseFreq, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(baseFreq - pitchDrop, now + decay * 0.6);
    noiseFilter.Q.setValueAtTime(2.0, now);

    const noiseGain = ctx.createGain();
    // Tiny dogs have a bit more squeaky/airy noise, big dogs have guttural noise
    const noiseLevel = character === 'tiny' ? 0.35 : character === 'big' ? 0.55 : 0.25;
    noiseGain.gain.setValueAtTime(noiseLevel, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + decay * 0.7);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    // Connect everything to the main gain
    oscGain.connect(mainGain);
    noiseGain.connect(mainGain);

    // 4. Special Space Echo effect node (Delay)
    if (character === 'space') {
      const delay = ctx.createDelay();
      const delayFeedback = ctx.createGain();
      
      delay.delayTime.setValueAtTime(0.12, now); // 120ms echo
      delayFeedback.gain.setValueAtTime(0.4, now); // Moderate echo persistence

      mainGain.connect(delay);
      delay.connect(delayFeedback);
      delayFeedback.connect(delay); // Feedback loop
      
      // Route both dry and wet signals
      mainGain.connect(ctx.destination);
      delay.connect(ctx.destination);
    } else {
      mainGain.connect(ctx.destination);
    }

    // Start & Stop
    osc1.start(now);
    osc2.start(now);
    noise.start(now);

    osc1.stop(now + decay);
    osc2.stop(now + decay);
    noise.stop(now + decay);
  } catch (err) {
    console.warn("Failed to play synthesized audio bark:", err);
  }
}

/**
 * Synthesizes a delightful, crisp organic pop/click sound resembling a soft paw tap
 * triggered instantly on every click on the website.
 */
export function playWebClickSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Rapid pitch sweep for a premium organic "pop" click sound
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.05);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.002); // Quick attack
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05); // Rapid decay

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (err) {
    console.warn("Failed to play pop click audio:", err);
  }
}
