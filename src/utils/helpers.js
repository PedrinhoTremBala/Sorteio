/**
 * utils/helpers.js
 * Funções utilitárias reutilizáveis
 */

/** Converte texto (vírgulas ou linhas) em array limpo */
export function parseItems(text) {
  return text
    .split(/[\n,]+/)
    .map(s => s.trim())
    .filter(Boolean)
}

/** Lê do localStorage com fallback seguro */
export function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

/** Salva no localStorage silenciosamente */
export function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

/** Remove do localStorage */
export function lsRemove(key) {
  try { localStorage.removeItem(key) } catch {}
}