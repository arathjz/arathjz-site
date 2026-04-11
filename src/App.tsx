const EMAIL = 'me@arathjz.com'

const socials = [
  { name: 'GitHub', icon: '/images/icons/dark/github.svg', url: 'https://github.com/arathjz' },
  { name: 'LinkedIn', icon: '/images/icons/dark/linkedin.svg', url: 'https://www.linkedin.com/in/arathjz' },
  { name: 'Twitter', icon: '/images/icons/dark/twitter.svg', url: 'https://twitter.com/arathjz' },
]

export default function App() {
  return (
    <div className="bg-canvas text-ink min-h-screen">

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center">
        <a href="/" className="t-nav text-accent hover:text-accent-hover">
          ~/arathjz
        </a>
        <nav className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <img src={s.icon} alt={s.name} className="w-5 h-5" />
            </a>
          ))}
        </nav>
      </header>

      <main>

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col justify-center page-container pt-20 pb-16">
          <p className="t-prompt mb-7 fade-in-up animation-delay-100">
            $ whoami
          </p>
          <h1 className="t-display mb-8 fade-in-up animation-delay-200">
            Arath Jimenez<span className="text-accent">.</span>
            <span
              aria-hidden="true"
              className="inline-block bg-accent ml-3 animate-blink"
              style={{ width: '0.08em', height: '0.85em', verticalAlign: '-0.08em' }}
            />
          </h1>
          <p className="t-lead max-w-md mb-12 fade-in-up animation-delay-300">
            Software engineer. Finance enthusiast.
            <br />
            Powered by espresso <span className="text-accent">☕</span>
          </p>
          <div className="flex flex-wrap gap-4 fade-in-up animation-delay-500">
            <a href="#about" className="btn-primary">
              about me
            </a>
            <a href="#contact" className="btn-secondary">
              get in touch
            </a>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────────── */}
        <section id="about" className="section-pad page-container">
          <div className="divider" />
          <p className="t-section-label mb-10">// 01 — about</p>
          <div className="grid md:grid-cols-[1fr_360px] gap-16 lg:gap-24 items-start">
            <div>
              <h2 className="t-headline mb-8">
                I build things with care
                <br className="hidden md:block" /> and intention.
              </h2>
              <p className="t-body mb-5">
                I build software, am a finance enthusiast, and love coffee. I work mainly with
                frontend applications, but I have experience as a full-stack engineer.
              </p>
              <p className="t-body">
                I believe that every application should be easy to use and accessible to anyone,
                which leads me to put special care into user experience, accessibility, and design.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-surface">
              <img
                src="/images/main-picture.jpeg"
                alt="Arath Jimenez"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────────── */}
        <section id="contact" className="section-pad page-container">
          <div className="divider" />
          <p className="t-section-label mb-10">// 02 — contact</p>
          <h2 className="t-headline mb-6">Would you like to chat?</h2>
          <p className="t-body mb-10 max-w-xl">
            Shoot me an email and I'll get back to you.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="font-mono text-2xl md:text-4xl text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-3 group"
          >
            <span className="text-terminal opacity-80">$</span>
            <span className="border-b-2 border-accent/30 group-hover:border-accent transition-colors pb-1">
              {EMAIL}
            </span>
          </a>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="border-t border-hairline px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <span className="t-caption">
            © {new Date().getFullYear()} Arath Jimenez. All rights reserved.
          </span>
          <span className="t-caption">
            Icons by{' '}
            <a href="https://simpleicons.org/" className="hover:text-accent transition-colors">
              Simple Icons
            </a>
          </span>
        </div>
      </footer>

    </div>
  )
}
