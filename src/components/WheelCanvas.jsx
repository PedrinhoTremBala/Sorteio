import { useEffect, useRef } from 'react'

/** Paleta de cores das fatias */
const COLORS = [
  '#f4a87a', '#7bbfe8', '#90de90', '#f4d57a',
  '#c4a0e8', '#e88888', '#7de0ce', '#e8c47a',
]

/**
 * WheelCanvas
 * Desenha a roleta no <canvas> usando a Canvas API.
 *
 * Props:
 *   items      — array de strings a sortear
 *   rotation   — ângulo atual em radianos
 *   winnerIdx  — índice do vencedor (null enquanto girando)
 */
export default function WheelCanvas({ items, rotation, winnerIdx }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const S  = 700          // resolução interna (px)
    const cx = S / 2
    const cy = S / 2
    const r  = S / 2 - 6   // raio deixando margem para a borda

    canvas.width  = S
    canvas.height = S

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, S, S)

    /* ── Estado vazio ── */
    if (!items.length) {
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = '#eeecea'
      ctx.fill()
      ctx.fillStyle = '#aaa8a4'
      ctx.font = 'bold 22px Nunito, sans-serif'
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Adicione itens acima', cx, cy)
      return
    }

    const arc = (Math.PI * 2) / items.length

    items.forEach((item, i) => {
      const start    = rotation + i * arc
      const end      = start + arc
      const isWinner = i === winnerIdx

      /* ── Fatia ── */
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, start, end)
      ctx.closePath()

      if (isWinner) {
        // Overlay branco para "iluminar" o vencedor
        ctx.fillStyle = '#fff'
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, r, start, end)
        ctx.closePath()
        ctx.fillStyle = COLORS[i % COLORS.length] + '80'
      } else {
        ctx.fillStyle = COLORS[i % COLORS.length]
      }
      ctx.fill()

      // Borda entre fatias
      ctx.strokeStyle = 'rgba(255,255,255,0.9)'
      ctx.lineWidth   = isWinner ? 4 : 2
      ctx.stroke()

      /* ── Texto ──
         Tamanho base proporcional ao número de itens,
         mas nunca menor que 13px nem maior que 22px.
         Para poucos itens (≤6) o texto fica grande e legível.
      ── */
      const fontSize = Math.max(20, Math.min(36, 520 / items.length))

      const mid    = start + arc / 2
      const textR  = r * 0.60   // posição radial do texto (60% do raio)

      ctx.save()
      ctx.translate(
        cx + Math.cos(mid) * textR,
        cy + Math.sin(mid) * textR
      )
      ctx.rotate(mid + Math.PI / 2)

      ctx.fillStyle    = isWinner ? '#a02800' : 'rgba(0,0,0,0.70)'
      ctx.font         = `${isWinner ? 'italic ' : ''}bold ${fontSize}px Nunito, sans-serif`
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'

      // Trunca apenas se realmente necessário (muitos itens)
      const maxLen  = items.length <= 6 ? 16 : items.length <= 10 ? 12 : 9
      const label   = item.length > maxLen ? item.slice(0, maxLen - 1) + '…' : item

      // Sombra suave para legibilidade
      ctx.shadowColor   = 'rgba(255,255,255,0.6)'
      ctx.shadowBlur    = 3
      ctx.fillText(label, 0, 0)
      ctx.shadowBlur    = 0

      ctx.restore()
    })
  }, [items, rotation, winnerIdx])

  return <canvas ref={ref} />
}