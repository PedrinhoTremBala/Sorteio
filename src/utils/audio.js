/**
 * utils/audio.js
 * Cria e retorna uma função tick() que toca um beep curto
 * via Web Audio API. Retorna silêncio se não houver suporte.
 */
export function makeTickFn() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    return function tick(freq = 900, vol = 0.15) {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(vol, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.07)
    }
  } catch {
    return () => {} // sem suporte: silencioso
  }
}

/**
 * Toca um acorde de vitória (3 notas em sequência)
 */
export function playWinChord(tickFn) {
  ;[523, 659, 784].forEach((f, i) =>
    setTimeout(() => tickFn(f, 0.18), i * 90)
  )
}