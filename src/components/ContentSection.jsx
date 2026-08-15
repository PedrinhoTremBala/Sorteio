export default function ContentSection() {
  return (
    <section className="content-section" aria-labelledby="como-funciona">
      <h2 id="como-funciona">Como funciona a Roleta Sortuda</h2>
      <p>
        A Roleta Sortuda é uma ferramenta gratuita para realizar sorteios de forma visual e divertida.
        Basta digitar os nomes, números ou itens que deseja sortear — um por linha, ou separados por
        vírgula — e girar a roleta. O sistema distribui os itens em fatias proporcionais, gira com uma
        animação suave e aponta o vencedor ao final, com efeito sonoro opcional.
      </p>
      <p>
        Todo o processamento acontece no seu próprio navegador: a lista de itens e o histórico de
        sorteios ficam salvos apenas localmente, no seu dispositivo, e nenhum dado é enviado para
        servidores externos.
      </p>

      <h3>Para que usar</h3>
      <div className="use-grid">
        <div className="use-card"><b>Sorteios entre amigos</b><span>Quem paga a conta, quem escolhe o filme, brincadeiras em grupo.</span></div>
        <div className="use-card"><b>Salas de aula</b><span>Escolher aluno para responder, formar grupos de trabalho.</span></div>
        <div className="use-card"><b>Times e jogos</b><span>Definir ordem de jogadas, escalar equipes rapidamente.</span></div>
        <div className="use-card"><b>Brindes e promoções</b><span>Sortear ganhadores em listas de participantes.</span></div>
      </div>

      <h3>Perguntas frequentes</h3>
      <div className="faq-item">
        <b>A roleta é realmente aleatória?</b>
        <p>Sim. O resultado é definido por um sorteio aleatório no momento em que a roleta é girada, sem qualquer favorecimento de item.</p>
      </div>
      <div className="faq-item">
        <b>Meus dados ficam salvos em algum servidor?</b>
        <p>Não. A lista de itens e o histórico de sorteios são salvos apenas no armazenamento local do seu navegador e podem ser apagados a qualquer momento.</p>
      </div>
      <div className="faq-item">
        <b>Posso remover um item automaticamente depois de sorteado?</b>
        <p>Sim, há uma opção para eliminar automaticamente o item sorteado, útil para sorteios sequenciais sem repetição.</p>
      </div>
      <div className="faq-item">
        <b>O uso é gratuito?</b>
        <p>Sim, a Roleta Sortuda é totalmente gratuita e não exige cadastro.</p>
      </div>
    </section>
  )
}
