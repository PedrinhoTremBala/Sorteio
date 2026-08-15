# 🎡 Roleta Sortuda

Sorteador visual com roleta animada — React + Vite.

---

## 🚀 Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev

# 3. Acesse no navegador
# http://localhost:5173
```

Para gerar a versão de produção:
```bash
npm run build
npm run preview
```

---

## 📁 Estrutura do projeto

```
roleta-sortuda/
├── index.html                  ← Entry point do Vite
├── vite.config.js              ← Configuração do Vite
├── package.json
│
└── src/
    ├── main.jsx                ← Monta o React no DOM
    ├── App.jsx                 ← Componente raiz (toda a lógica)
    │
    ├── components/
    │   ├── WheelCanvas.jsx     ← Desenha a roleta via Canvas API
    │   ├── WheelCenter.jsx     ← Estrela SVG no centro da roleta
    │   ├── WheelPointer.jsx    ← Ponteiro triangular SVG
    │   ├── WheelSection.jsx    ← Coluna direita (roleta + resultado)
    │   ├── InputCard.jsx       ← Campo de entrada de itens
    │   ├── OptionsCard.jsx     ← Toggles de opções
    │   ├── ItemsCard.jsx       ← Lista de tags dos itens
    │   └── HistoryCard.jsx     ← Histórico de sorteios
    │
    ├── styles/
    │   ├── global.css          ← Reset, variáveis CSS, layout geral
    │   └── Wheel.css           ← Estilos específicos da roleta
    │
    └── utils/
        ├── audio.js            ← Web Audio API (tick + acorde vitória)
        └── helpers.js          ← parseItems, localStorage helpers
```

---

## ✨ Funcionalidades

| Feature | Descrição |
|---|---|
| ✏️ Adicionar itens | Vírgula, linha ou Ctrl+Enter |
| 📂 Importar arquivo | Arraste ou selecione `.txt` / `.csv` |
| 🎡 Roleta animada | Canvas API com easing suave |
| 🔊 Som tick-tick | Web Audio API sincronizado com velocidade |
| 🏆 Destaque vencedor | Fatia iluminada + tag pulsando + halo na roleta |
| 🗑️ Eliminar após sortear | Automático (3s) ou manual |
| 💾 Persistência | localStorage — lista e histórico sobrevivem ao refresh |
| 📋 Copiar resultado | Um clique copia para a área de transferência |
| 📜 Histórico | Últimos 8 sorteios com horário |
| 📱 Responsivo | Funciona em celular e desktop |