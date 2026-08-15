import { useState, useEffect, useRef } from 'react'

import InputCard   from './components/InputCard'
import OptionsCard from './components/OptionsCard'
import ItemsCard   from './components/ItemsCard'
import HistoryCard from './components/HistoryCard'
import WheelSection from './components/WheelSection'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import ContentSection from './components/ContentSection'

import { makeTickFn, playWinChord } from './utils/audio'
import { parseItems, lsGet, lsSet, lsRemove } from './utils/helpers'

/**
 * App.jsx
 * Componente raiz — gerencia todo o estado da aplicação:
 *   • Lista de itens (persistida no localStorage)
 *   • Animação da roleta (requestAnimationFrame)
 *   • Som tick-tick via Web Audio API
 *   • Opções: eliminar após sortear, som ativo
 *   • Importação de arquivo .txt / .csv
 *   • Histórico de sorteios
 */
export default function App() {

  /* ── Estado persistido ── */
  const [items,    setItems]    = useState(() => lsGet('roleta_items',    []))
  const [history,  setHistory]  = useState(() => lsGet('roleta_history',  []))
  const [eliminar, setEliminar] = useState(() => lsGet('roleta_eliminar', false))
  const [somAtivo, setSomAtivo] = useState(() => lsGet('roleta_som',      true))

  /* ── Estado de UI ── */
  const [input,      setInput]      = useState('')
  const [rotation,   setRotation]   = useState(-Math.PI / 2)
  const [spinning,   setSpinning]   = useState(false)
  const [result,     setResult]     = useState(null)
  const [winnerIdx,  setWinnerIdx]  = useState(null)
  const [toast,      setToast]      = useState(null)   // { msg, key }
  const [savedBadge, setSavedBadge] = useState(false)
  const [glowing,    setGlowing]    = useState(false)

  /* ── Refs de animação ── */
  const rafRef     = useRef(null)
  const t0         = useRef(null)
  const fromRot    = useRef(0)
  const toRot      = useRef(0)
  const lastSector = useRef(-1)
  const tickFn     = useRef(null)
  const itemsRef   = useRef(items)   // ref para acessar items dentro do loop RAF
  const somRef     = useRef(somAtivo)

  const DURATION = 4800 // ms da animação

  /* ── Sincroniza refs ── */
  useEffect(() => { itemsRef.current = items  }, [items])
  useEffect(() => { somRef.current   = somAtivo }, [somAtivo])

  /* ── Inicializa Web Audio na primeira interação do usuário ── */
  useEffect(() => { tickFn.current = makeTickFn() }, [])

  /* ── Persiste items ── */
  useEffect(() => {
    lsSet('roleta_items', items)
    if (items.length > 0) {
      setSavedBadge(true)
      const t = setTimeout(() => setSavedBadge(false), 2000)
      return () => clearTimeout(t)
    }
  }, [items])

  /* ── Persiste demais estados ── */
  useEffect(() => { lsSet('roleta_history',  history)  }, [history])
  useEffect(() => { lsSet('roleta_eliminar', eliminar) }, [eliminar])
  useEffect(() => { lsSet('roleta_som',      somAtivo) }, [somAtivo])

  /* ── Easing suave (ease-out cúbico) ── */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3) }

  /* ── Loop de animação ── */
  function animate(ts) {
    if (!t0.current) t0.current = ts
    const p   = Math.min((ts - t0.current) / DURATION, 1)
    const rot = fromRot.current + (toRot.current - fromRot.current) * easeOut(p)
    setRotation(rot)

    /* Som tick-tick: dispara a cada cruzamento de setor */
    const currentItems = itemsRef.current
    if (somRef.current && currentItems.length > 0) {
      const arc    = (Math.PI * 2) / currentItems.length
      const norm   = ((rot % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
      const sector = Math.floor(norm / arc) % currentItems.length
      if (sector !== lastSector.current) {
        const speed = 1 - easeOut(p)          // 1 = início rápido, 0 = fim lento
        const freq  = 500 + speed * 700       // agudo no início, grave no fim
        const vol   = 0.07 + (1 - speed) * 0.13
        tickFn.current(freq, vol)
        lastSector.current = sector
      }
    }

    if (p < 1) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    /* ── Fim da animação: calcula vencedor ── */
    const arc    = (Math.PI * 2) / currentItems.length
    const norm   = ((rot % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    const idx    = Math.floor(((Math.PI * 3 / 2 - norm + Math.PI * 40) % (Math.PI * 2)) / arc) % currentItems.length
    const winner = currentItems[idx]

    setWinnerIdx(idx)
    setSpinning(false)
    setResult(winner)
    setGlowing(true)
    setTimeout(() => setGlowing(false), 2500)

    /* Acorde de vitória */
    if (somRef.current) playWinChord(tickFn.current)

    setHistory(h => [
      { name: winner, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
      ...h,
    ].slice(0, 8))
  }

  /* ── Girar roleta ── */
  function spin() {
    if (!items.length || spinning) return
    setResult(null)
    setWinnerIdx(null)
    setSpinning(true)
    lastSector.current = -1
    t0.current = null
    fromRot.current = rotation

    const extraTurns = (5 + Math.random() * 5) * Math.PI * 2
    const arc        = (Math.PI * 2) / items.length
    const winnerI    = Math.floor(Math.random() * items.length)
    const target     = (Math.PI * 3 / 2) - (winnerI * arc + arc / 2)
    toRot.current    = rotation + extraTurns + ((target - rotation % (Math.PI * 2) + Math.PI * 40) % (Math.PI * 2))

    rafRef.current = requestAnimationFrame(animate)
  }

  /* ── Eliminar vencedor manualmente ── */
  function eliminateWinner() {
    if (result === null) return
    const name = result
    setItems(prev => prev.filter(item => item !== name))
    setResult(null)
    setWinnerIdx(null)
    showToast(`"${name}" removido ✓`)
  }

  /* ── Eliminar automaticamente após 3s (opção ligada) ── */
  useEffect(() => {
    if (eliminar && result !== null && !spinning) {
      const t = setTimeout(() => {
        setItems(prev => prev.filter(item => item !== result))
        setResult(null)
        setWinnerIdx(null)
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [result, spinning, eliminar])

  /* ── Adicionar itens ── */
  function addItems() {
    const parsed = parseItems(input)
    if (!parsed.length) return
    setItems(prev => [...new Set([...prev, ...parsed])])
    setInput('')
    setResult(null)
    setWinnerIdx(null)
  }

  /* ── Remover item individual ── */
  function removeItem(i) {
    setItems(prev => prev.filter((_, j) => j !== i))
    setResult(null)
    setWinnerIdx(null)
  }

  /* ── Reset total ── */
  function reset() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setItems([])
    setInput('')
    setResult(null)
    setSpinning(false)
    setHistory([])
    setRotation(-Math.PI / 2)
    setWinnerIdx(null)
    setGlowing(false)
    lsRemove('roleta_items')
    lsRemove('roleta_history')
  }

  /* ── Copiar resultado ── */
  function copy() {
    if (!result) return
    navigator.clipboard.writeText(result).then(() => showToast('✓ Copiado!'))
  }

  /* ── Toast helper ── */
  function showToast(msg) {
    setToast({ msg, key: Date.now() })
    setTimeout(() => setToast(null), 2300)
  }

  /* ── Limpar histórico ── */
  function clearHistory() {
    setHistory([])
    lsRemove('roleta_history')
  }

  /* ── Cleanup RAF ao desmontar ── */
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  /* ════════════ RENDER ════════════ */
  return (
    <div className="app">

      {/* Cabeçalho */}
      <div className="header">
        <h1><span>Sorteio</span> 🎡</h1>
        <p>Adicione nomes ou números e gire para sortear</p>
      </div>

      <SiteNav />

      <div className="grid">

        {/* ── Coluna esquerda ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <InputCard
            input={input}
            setInput={setInput}
            savedBadge={savedBadge}
            onAdd={addItems}
            onReset={reset}
          />
          <OptionsCard
            eliminar={eliminar} setEliminar={setEliminar}
            somAtivo={somAtivo} setSomAtivo={setSomAtivo}
          />
          <ItemsCard
            items={items}
            winnerIdx={winnerIdx}
            spinning={spinning}
            onRemove={removeItem}
          />
          <HistoryCard history={history} onClear={clearHistory} />
        </div>

        {/* ── Coluna direita: roleta ── */}
        <WheelSection
          items={items}
          rotation={rotation}
          spinning={spinning}
          result={result}
          winnerIdx={winnerIdx}
          glowing={glowing}
          eliminar={eliminar}
          onSpin={spin}
          onCopy={copy}
          onEliminate={eliminateWinner}
        />

      </div>

      {/* Toast de feedback */}
      {toast && <div className="toast" key={toast.key}>{toast.msg}</div>}

      <ContentSection />
      <SiteFooter />
    </div>
  )
}