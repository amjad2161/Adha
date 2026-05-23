let soundEnabled = true;

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
};

export const getSoundEnabled = () => soundEnabled;

export const playSound = (type: 'correct' | 'wrong' | 'whoosh' | 'tada') => {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const t = ctx.currentTime;

    const playTone = (freq: number, type: OscillatorType, start: number, dur: number, vol: number = 0.5) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(vol, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, start + dur);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(start);
      osc.stop(start + dur);
    };

    if (type === 'correct') {
      playTone(659.25, 'sine', t, 0.3, 0.5); // E5
      playTone(880.00, 'sine', t + 0.1, 0.4, 0.5); // A5
    } else if (type === 'wrong') {
      playTone(200, 'sawtooth', t, 0.3, 0.3);
      playTone(150, 'sawtooth', t + 0.1, 0.4, 0.3);
    } else if (type === 'whoosh') {
      // Noise
      const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, t);
      filter.frequency.exponentialRampToValueAtTime(2000, t + 0.1);
      filter.frequency.exponentialRampToValueAtTime(200, t + 0.4);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.1);
      gain.gain.linearRampToValueAtTime(0, t + 0.5);
      
      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      noiseSource.start(t);
    } else if (type === 'tada') {
      playTone(523.25, 'sine', t, 0.2, 0.4); // C5
      playTone(659.25, 'sine', t, 0.2, 0.4); // E5
      playTone(783.99, 'sine', t, 0.2, 0.4); // G5
      
      playTone(523.25, 'sine', t + 0.2, 0.6, 0.5); // C5
      playTone(659.25, 'sine', t + 0.2, 0.6, 0.5); // E5
      playTone(1046.50, 'sine', t + 0.2, 0.8, 0.5); // C6
    }
  } catch (err) {
    console.error('Audio failed', err);
  }
};
