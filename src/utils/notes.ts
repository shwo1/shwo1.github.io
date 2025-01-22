export const musicNotes: { [k: string]: number } = {
  // C0: 16.35,
  // D0: 18.35,
  // E0: 20.60,
  // F0: 21.83,
  // G0: 24.50,
  // A0: 27.50,
  // B0: 30.87,
  // C1: 32.70,
  // D1: 36.71,
  // E1: 41.20,
  // F1: 43.65,
  // G1: 49.00,
  // A1: 55.00,
  // B1: 61.74,
  C2: 65.41,
  D2: 73.42,
  E2: 82.41,
  F2: 87.31,
  G2: 98.00,
  A2: 110.00,
  B2: 123.47,
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.00,
  A3: 220.00,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  // E5: 659.25,
  // F5: 698.46,
  // G5: 783.99,
  // A5: 880.00,
  // B5: 987.77,
  // C6: 1046.50,
  // D6: 1174.66,
  // E6: 1318.51,
  // F6: 1396.91,
  // G6: 1567.98,
  // A6: 1760.00,
  // B6: 1975.53,
  // C7: 2093.00,
  // D7: 2349.32,
  // E7: 2637.02,
  // F7: 2793.83,
  // G7: 3135.96,
  // A7: 3520.00,
  // B7: 3951.07,
  // C8: 4186.01,
  // D8: 4698.63,
  // E8: 5274.04,
  // F8: 5587.65,
  // G8: 6271.93,
  // A8: 7040.00,
  // B8: 7902.13,
  // C9: 8372.02
};

export const playNote = (frequency: number) => {
  const audioCtx = new window.AudioContext();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // Create a periodic wave for a more elegant sound
  const real = new Float32Array([0, 1, 0.5, 0.25, 0.125]);
  const imag = new Float32Array(real.length);
  const wave = audioCtx.createPeriodicWave(real, imag);

  oscillator.setPeriodicWave(wave);
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2); // Shorten the duration for a more piano-like decay

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 1.5); // Shorten the duration for a more piano-like decay
};