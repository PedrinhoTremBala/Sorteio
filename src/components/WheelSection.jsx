import '../styles/Wheel.css'
import WheelCanvas  from './WheelCanvas'
import WheelPointer from './WheelPointer'

/**
 * WheelSection.jsx
 * Coluna direita: roleta + botão girar + resultado.
 *
 * Props:
 *   items        — array de strings
 *   rotation     — ângulo atual (radianos)
 *   spinning     — boolean
 *   result       — string | null
 *   winnerIdx    — number | null
 *   glowing      — boolean (halo de vitória)
 *   eliminar     — boolean (opção eliminar automático)
 *   onSpin       — fn
 *   onCopy       — fn
 *   onEliminate  — fn
 */
export default function WheelSection({
  items, rotation, spinning, result, winnerIdx,
  glowing, eliminar, onSpin, onCopy, onEliminate,
}) {
  return (
    <div className="card">
      <div className="section-label">Roleta</div>

      <div className="wheelWrap">

        {/* ── Roleta ── */}
        <div className="wheelOuter">
          <WheelPointer />
          <div className={`wheelRing${glowing ? ' glow' : ''}`}>
            <WheelCanvas
              items={items}
              rotation={rotation}
              winnerIdx={spinning ? null : winnerIdx}
            />
          </div>

        </div>

        {/* ── Botão girar ── */}
        <button
          className="btn btn-spin"
          onClick={onSpin}
          disabled={items.length < 2 || spinning}
        >
          {spinning ? '⏳ Girando…' : '🎰 Girar a Roleta!'}
        </button>

        {items.length < 2 && !spinning && (
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center', marginTop: '-6px' }}>
            Adicione pelo menos 2 itens
          </p>
        )}

        {/* ── Resultado ── */}
        {result && !spinning && (
          <div className="resultBox">
            <div className="resultLabel">🏆 Resultado</div>
            <div className="resultValue">{result}</div>

            {eliminar && (
              <div className="resultCountdown">Será removido em 3 segundos…</div>
            )}

            <div className="resultActions">
              <button className="resultCopy" onClick={onCopy}>
                📋 Copiar
              </button>
              {!eliminar && (
                <button className="resultEliminate" onClick={onEliminate}>
                  🗑️ Eliminar
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}