/**
 * WheelPointer.jsx
 * Ponteiro triangular que aponta para baixo, fixo no topo da roleta.
 */
export default function WheelPointer() {
  return (
    <svg
      className="wheelPointer"
      width="22"
      height="32"
      viewBox="0 0 22 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sombra */}
      <path
        d="M11 30 L2 6 Q11 0 20 6 Z"
        fill="rgba(0,0,0,0.12)"
        transform="translate(1,2)"
      />
      {/* Corpo laranja */}
      <path
        d="M11 30 L2 6 Q11 0 20 6 Z"
        fill="#e8703a"
      />
      {/* Highlight interno */}
      <path
        d="M11 24 L5 9 Q11 5 17 9 Z"
        fill="rgba(255,255,255,0.25)"
      />
      {/* Borda branca */}
      <path
        d="M11 30 L2 6 Q11 0 20 6 Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}