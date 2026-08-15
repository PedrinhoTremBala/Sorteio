/**
 * ItemsCard.jsx
 * Exibe as tags dos itens adicionados à roleta.
 * A tag vencedora recebe destaque (classe "winner").
 */
export default function ItemsCard({ items, winnerIdx, spinning, onRemove }) {
  return (
    <div className="card">
      <div className="section-label">
        <span>Na roleta</span>
        <span style={{ fontWeight: 800, color: items.length ? 'var(--accent)' : 'var(--muted)' }}>
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="empty">Nenhum item ainda…</p>
      ) : (
        <div className="tags">
          {items.map((item, i) => (
            <span
              key={i}
              className={`tag${i === winnerIdx && !spinning ? ' winner' : ''}`}
            >
              {item}
              <button className="tag-x" onClick={() => onRemove(i)}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}