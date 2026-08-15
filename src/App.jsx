import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ClockCountdown,
  EnvelopeSimple,
  List,
  ListChecks,
  Target,
  X,
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const steps = [
  ['Binnenkomen', 'Agenda, Magister, huiswerk en toetsen samen in beeld.'],
  ['Slim plannen', 'We kiezen wat vandaag moet en delen groot werk op.'],
  ['Rustig werken', 'Zelf aan de slag, met persoonlijke hulp binnen bereik.'],
  ['Goed afronden', 'Controleren wat af is en vooruitkijken naar de week.'],
]

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Qnapper, terug naar boven">
      <img src="./assets/qnapper-horizontal-logo.jpg" alt="Qnapper" />
    </a>
  )
}

function App() {
  const root = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState('')

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.from('.hero-reveal', {
      y: 28,
      opacity: 0,
      duration: 0.9,
      stagger: 0.09,
      ease: 'power3.out',
    })

    gsap.from('.hero-visual', {
      scale: 0.96,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
    })

    gsap.utils.toArray('.section-reveal').forEach((element) => {
      gsap.from(element, {
        y: 34,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
    })

    gsap.utils.toArray('.motion-image').forEach((image) => {
      gsap.fromTo(image, { scale: 1.05 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    })
  }, { scope: root })

  const closeMenu = () => setMenuOpen(false)

  const submitForm = async (event) => {
    event.preventDefault()
    setSending(true)
    setFormError('')

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    const isPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname)
      || window.location.hostname.endsWith('github.io')
    const endpoint = isPreview ? 'https://qnapper.nl/api/contact.php' : './api/contact.php'

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) throw new Error(result.message || 'Versturen is niet gelukt.')
      form.reset()
      setSent(true)
    } catch (error) {
      setFormError(`${error.message} Mail anders rechtstreeks naar info@qnapper.nl.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div ref={root}>
      <main id="top" className="page-shell">
        <nav className="nav-wrap" aria-label="Hoofdnavigatie">
          <div className="nav-inner">
            <Brand />
            <div className="nav-links">
              <a href="#begeleiding">Begeleiding</a>
              <a href="#werkwijze">Werkwijze</a>
              <a href="#voor-wie">Voor wie</a>
            </div>
            <a className="button button--dark nav-cta" href="#kennismaken">Meld je aan <ArrowRight aria-hidden="true" /></a>
            <button
              className="menu-button"
              type="button"
              aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-menu">
              <a href="#begeleiding" onClick={closeMenu}>Begeleiding</a>
              <a href="#werkwijze" onClick={closeMenu}>Werkwijze</a>
              <a href="#voor-wie" onClick={closeMenu}>Voor wie</a>
              <a className="button button--green" href="#kennismaken" onClick={closeMenu}>Meld je aan</a>
            </div>
          )}
        </nav>

        <header className="hero chapter">
          <div className="hero-copy">
            <p className="kicker hero-reveal">Persoonlijke huiswerkbegeleiding</p>
            <h1 className="hero-reveal">Meer grip op school. Meer rust thuis.</h1>
            <p className="hero-intro hero-reveal">Qnapper helpt leerlingen plannen, focussen en zelfstandig leren — in een rustige omgeving met persoonlijke aandacht.</p>
            <div className="hero-actions hero-reveal">
              <a className="button button--green" href="#kennismaken">Meld je aan <ArrowRight aria-hidden="true" /></a>
              <a className="text-link" href="#begeleiding">Ontdek onze begeleiding</a>
            </div>
            <div className="hero-proof hero-reveal" aria-label="Voordelen">
              <span><Check aria-hidden="true" /> Kleine groepen</span>
              <span><Check aria-hidden="true" /> Persoonlijke planning</span>
            </div>
          </div>
          <div className="hero-visual">
            <img className="motion-image" src="./assets/student-focus.jpg" alt="Leerling werkt geconcentreerd aan schoolwerk" />
            <div className="hero-note"><b>Stap voor stap</b><span>naar zelfstandig leren</span></div>
          </div>
        </header>

        <section id="begeleiding" className="chapter intro-section">
          <div className="section-heading section-reveal">
            <p className="kicker">Wat Qnapper doet</p>
            <h2>Niet alleen huiswerk af. Leren hoe je het zelf aanpakt.</h2>
            <p>We brengen overzicht in alles wat er speelt en maken de volgende stap klein, duidelijk en haalbaar.</p>
          </div>

          <div className="bento-grid section-reveal">
            <article className="bento-card bento-card--feature">
              <img className="motion-image" src="./assets/personal-planning.jpg" alt="Begeleider en leerling maken samen een planning" />
              <div>
                <CalendarCheck aria-hidden="true" />
                <h3>Eerst overzicht</h3>
                <p>Agenda, toetsen, deadlines en projecten komen samen in één realistische planning.</p>
              </div>
            </article>
            <article className="bento-card bento-card--lime">
              <ClockCountdown aria-hidden="true" />
              <div><h3>Op tijd beginnen</h3><p>Geen stress vlak voor een toets.</p></div>
            </article>
            <article className="bento-card bento-card--dark">
              <Target aria-hidden="true" />
              <div><h3>Focus op wat telt</h3><p>Vandaag, deze week en daarna.</p></div>
            </article>
            <article className="bento-card bento-card--wide">
              <ListChecks aria-hidden="true" />
              <div><h3>Grote taak, kleine stappen</h3><p>We verdelen leerwerk en opdrachten zodat vooruitgang zichtbaar wordt.</p></div>
            </article>
          </div>
        </section>

        <section id="werkwijze" className="chapter process-section">
          <div className="process-heading section-reveal">
            <div>
              <p className="kicker kicker--light">Zo werkt een middag</p>
              <h2>Een vast ritme geeft rust.</h2>
            </div>
            <p>We starten samen, werken gericht en sluiten af met overzicht. Zo wordt begeleiding steeds minder nodig.</p>
          </div>
          <div className="process-grid section-reveal">
            {steps.map(([title, copy], index) => (
              <article className="process-card" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div id="voor-wie" className="audience-strip section-reveal">
            <div className="audience-image"><img className="motion-image" src="./assets/small-group.jpg" alt="Leerlingen werken in een kleine begeleidingsgroep" /></div>
            <div className="audience-copy">
              <p className="kicker">Voor wie?</p>
              <h2>Voor leerlingen die slimmer willen leren.</h2>
              <ul>
                <li><Check aria-hidden="true" /> Bovenbouw basisschool en middelbare school</li>
                <li><Check aria-hidden="true" /> Hulp bij plannen, focus en uitstelgedrag</li>
                <li><Check aria-hidden="true" /> Een rustige plek met hulp dichtbij</li>
              </ul>
              <a className="button button--light" href="#kennismaken">Kijk wat past <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="kennismaken" className="chapter contact-section">
          <div className="contact-intro section-reveal">
            <p className="kicker kicker--light">Vrijblijvend kennismaken</p>
            <h2>Vertel kort waar jullie tegenaan lopen.</h2>
            <p>We nemen persoonlijk contact op om te kijken welke begeleiding het beste past.</p>
            <a className="mail-link" href="mailto:info@qnapper.nl"><EnvelopeSimple aria-hidden="true" /> info@qnapper.nl</a>
          </div>
          <div className="form-panel section-reveal">
            {sent ? (
              <div className="success-message" role="status">
                <Check aria-hidden="true" />
                <div><strong>Bedankt voor uw aanmelding.</strong><span>Uw bericht is verstuurd naar Qnapper. We nemen zo snel mogelijk contact op.</span></div>
              </div>
            ) : (
              <form onSubmit={submitForm}>
                <label>
                  Naam
                  <input name="name" autoComplete="name" placeholder="Uw naam" maxLength="100" required />
                </label>
                <label>
                  E-mailadres
                  <input name="email" type="email" autoComplete="email" placeholder="naam@voorbeeld.nl" maxLength="160" required />
                </label>
                <label>
                  Telefoonnummer <span>(optioneel)</span>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" maxLength="40" />
                </label>
                <label>
                  Klas / niveau <span>(optioneel)</span>
                  <input name="schoolLevel" placeholder="Bijv. 2 havo" maxLength="80" />
                </label>
                <label className="form-wide">
                  Waar kunnen we bij helpen?
                  <textarea name="message" rows="3" placeholder="Vertel kort wat er speelt" maxLength="2000" required />
                </label>
                <label className="honeypot" aria-hidden="true">
                  Website
                  <input name="website" tabIndex="-1" autoComplete="off" />
                </label>
                {formError && <p className="form-error form-wide" role="alert">{formError}</p>}
                <button className="button button--green form-wide" type="submit" disabled={sending}>
                  {sending ? 'Bezig met versturen…' : 'Verstuur mijn aanmelding'}
                  {!sending && <ArrowRight aria-hidden="true" />}
                </button>
                <p className="form-privacy form-wide">Uw gegevens worden alleen gebruikt om contact met u op te nemen.</p>
              </form>
            )}
          </div>
        </section>

        <footer>
          <span className="footer-name">Qnapper Huiswerkbegeleiding</span>
          <p>Meer overzicht. Meer rust. Slimmer leren.</p>
          <div><a href="#begeleiding">Begeleiding</a><a href="#werkwijze">Werkwijze</a><a href="#kennismaken">Contact</a></div>
          <small>© {new Date().getFullYear()} Qnapper</small>
        </footer>
      </main>
    </div>
  )
}

export default App
