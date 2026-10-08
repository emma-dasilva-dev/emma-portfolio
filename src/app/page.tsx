export default function Home() {
  return (
    <main className="shell">
      <header className="header"><a className="brand" href="#accueil">Emma DaSilva<span>.</span></a><span className="stage">Portfolio · En construction</span></header>
      <section id="accueil" className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">CYBERSÉCURITÉ · DÉVELOPPEMENT WEB</p>
        <h1 id="hero-title">Bonjour, moi c&apos;est <em>Emma DaSilva.</em></h1>
        <p className="intro">Un nouvel espace personnel prend forme. Une approche centrée sur la cybersécurité, la programmation et la curiosité technique.</p>
        <div className="links"><a href="mailto:emma.dasilva.dev@gmail.com">Me contacter ↗</a><a href="https://github.com/emma-dasilva-dev" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
      </section>
      <footer>© 2026 Emma DaSilva · Cotonou, Bénin</footer>
    </main>
  );
}
