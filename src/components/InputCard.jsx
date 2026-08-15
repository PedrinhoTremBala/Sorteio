/**
 * InputCard.jsx
 * Card de entrada de itens: textarea, botões Adicionar/Limpar.
 */
export default function InputCard({ input, setInput, savedBadge, onAdd, onReset }) {
  function onKey(e) {
    if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); onAdd() }
  }

  return (
    <div className="card">
      <div className="section-label">
        <span>Adicionar itens</span>
        <span className={`saved-badge${savedBadge ? ' show' : ''}`}>✓ salvo</span>
      </div>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKey}
        placeholder={"Ana, Bruno, Carlos\nou um por linha…"}
      />
      <div className="hint">Separe por vírgula ou linha · Ctrl+Enter para adicionar</div>

      <div className="btn-row">
        <button className="btn btn-add"   onClick={onAdd}   disabled={!input.trim()}>
          + Adicionar
        </button>
        <button className="btn btn-clear" onClick={onReset}>
          Limpar
        </button>
      </div>
    </div>
  )
}