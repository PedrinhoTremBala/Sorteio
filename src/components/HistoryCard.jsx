/**
 * HistoryCard.jsx
 * Exibe o histórico dos últimos sorteios com horário.
 */
export default function HistoryCard({ history, onClear }) {
  if (!history.length) return null

  return (
    <div className="card">
      <div className="section-label">
        <span>Histórico</span>
        <button
          onClick={onClear}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--muted)', fontSize: '0.72rem', fontWeight: 700,
          }}
        >
          limpar
        </button>
      </div>

      <div className="history">
        {history.map((h, i) => (
          <div className="h-item" key={i}>
            <div className="h-num">{i + 1}</div>
            <div className="h-name">{h.name}</div>
            <div className="h-time">{h.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}