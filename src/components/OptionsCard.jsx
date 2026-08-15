/**
 * OptionsCard.jsx
 * Card com os toggles de opções:
 *   - Eliminar após sortear
 *   - Som ao girar
 */
function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="toggle-row">
      <div>
        <div className="toggle-label">{label}</div>
        {desc && <div className="toggle-desc">{desc}</div>}
      </div>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default function OptionsCard({ eliminar, setEliminar, somAtivo, setSomAtivo }) {
  return (
    <div className="card" style={{ padding: '16px 22px' }}>
      <div className="section-label" style={{ marginBottom: 4 }}>⚙️ Opções</div>
      <Toggle
        label="🗑️ Eliminar após sortear"
        desc="Remove o vencedor automaticamente (3s)"
        checked={eliminar}
        onChange={setEliminar}
      />
      <Toggle
        label="🔊 Som ao girar"
        desc="Tick-tick sincronizado com a velocidade"
        checked={somAtivo}
        onChange={setSomAtivo}
      />
    </div>
  )
}