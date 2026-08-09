import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CaretLeft,
  CaretRight,
  Check,
  ClockCountdown,
  ListChecks,
  List,
  Target,
  X,
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const skills = [
  {
    title: 'Plannen',
    copy: 'Vooruitkijken naar huiswerk, toetsen en deadlines in plaats van alleen morgen oplossen.',
    accent: 'Van uitstellen naar beginnen.',
  },
  {
    title: 'Structuur',
    copy: 'Grote hoeveelheden schoolwerk worden kleine, overzichtelijke en haalbare stappen.',
    accent: 'Overzicht maakt ruimte in je hoofd.',
  },
  {
    title: 'Prioriteiten',
    copy: 'Herkennen wat nu belangrijk is, wat later kan en hoeveel tijd een taak echt nodig heeft.',
    accent: 'Eerst wat telt.',
  },
  {
    title: 'Zelfstandig leren',
    copy: 'Eerst zelf zoeken naar een oplossing en ontdekken welke manier van leren het beste werkt.',
    accent: 'Steeds minder hulp nodig.',
  },
]

const perspectives = [
  {
    eyebrow: 'Voor de leerling',
    title: 'Grip op wat er komt.',
    copy: 'Niet meer pas vlak voor een toets ontdekken hoeveel werk er ligt, maar op tijd weten wat de volgende stap is.',
  },
  {
    eyebrow: 'Voor thuis',
    title: 'Meer ruimte voor andere dingen.',
    copy: 'De dagelijkse vragen over huiswerk en toetsen maken plaats voor een planning waar al aan gewerkt is.',
  },
  {
    eyebrow: 'Voor later',
    title: 'Vaardigheden die blijven.',
    copy: 'Het einddoel is niet afhankelijkheid van begeleiding, maar steeds meer verantwoordelijkheid en vertrouwen.',
  },
]

function Brand({ compact = false }) {
  return (
    <a className={`brand ${compact ? 'brand--compact' : ''}`} href="#top" aria-label="Qnapper, terug naar boven">
      <img src="./assets/qnapper-mark.png" alt="" aria-hidden="true" />
      <span><b>iQ</b>NAPPER<small>Huiswerkbegeleiding</small></span>
    </a>
  )
}

function App() {
  const root = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSkill, setActiveSkill] = useState(0)
  const [activePerspective, setActivePerspective] = useState(0)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePerspective((current) => (current + 1) % perspectives.length)
    }, 6500)
    return () => window.clearInterval(interval)
  }, [])

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    gsap.from('.hero-reveal', {
      y: 34,
      opacity: 0,
      duration: 1,
      stagger: 0.11,
      ease: 'power3.out',
    })

    gsap.utils.toArray('.motion-image').forEach((image) => {
      gsap.fromTo(image,
        { scale: 0.82, opacity: 0.45 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top 92%',
            end: 'center 48%',
            scrub: true,
          },
        },
      )
      gsap.to(image, {
        opacity: 0.24,
        filter: 'brightness(.72)',
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'bottom 42%',
          end: 'bottom 8%',
          scrub: true,
        },
      })
    })

    const mm = gsap.matchMedia()
    mm.add('(min-width: 960px)', () => {
      ScrollTrigger.create({
        trigger: '.process-layout',
        start: 'top 112px',
        end: 'bottom bottom-=80',
        pin: '.process-sticky',
        pinSpacing: false,
      })
    })

    gsap.utils.toArray('.process-card').forEach((card) => {
      gsap.from(card, {
        y: 62,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 82%' },
      })
    })

    return () => mm.revert()
  }, { scope: root })

  const closeMenu = () => setMenuOpen(false)
  const shiftPerspective = (amount) => {
    setActivePerspective((current) => (current + amount + perspectives.length) % perspectives.length)
  }

  const submitForm = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div ref={root}>
      <main id="top" className="page-shell">
        <nav className="nav-wrap" aria-label="Hoofdnavigatie">
          <div className="nav-inner">
            <Brand compact />
            <div className="nav-links">
              <a href="#begeleiding">Begeleiding</a>
              <a href="#werkwijze">Werkwijze</a>
              <a href="#voor-wie">Voor wie</a>
            </div>
            <a className="button button--dark nav-cta" href="#kennismaken">Kennismaken <ArrowUpRight aria-hidden="true" /></a>
            <button className="menu-button" type="button" aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-menu">
              <a href="#begeleiding" onClick={closeMenu}>Begeleiding</a>
              <a href="#werkwijze" onClick={closeMenu}>Werkwijze</a>
              <a href="#voor-wie" onClick={closeMenu}>Voor wie</a>
              <a className="button button--green" href="#kennismaken" onClick={closeMenu}>Plan een kennismaking</a>
            </div>
          )}
        </nav>

        <header className="hero chapter">
          <div className="hero-copy">
            <p className="kicker hero-reveal">Huiswerkbegeleiding die verder kijkt</p>
            <h1 className="hero-reveal">Meer rust. Meer structuur. <em>Slimmer leren.</em></h1>
            <p className="hero-intro hero-reveal">Qnapper helpt leerlingen grip te krijgen op huiswerk, toetsen en planning. Niet door het werk over te nemen, maar door te leren hoe je het zelf aanpakt.</p>
            <div className="hero-actions hero-reveal">
              <a className="button button--green" href="#kennismaken">Kennismaken met Qnapper <ArrowRight aria-hidden="true" /></a>
              <a className="button button--light" href="#begeleiding">Bekijk onze begeleiding <ArrowDown aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-visual hero-reveal">
            <div className="hero-image-wrap interactive-media">
              <img src="./assets/student-focus.jpg" alt="Een leerling werkt rustig en geconcentreerd aan zijn huiswerk" />
            </div>
            <div className="hero-note">
              <span>Rust in je hoofd</span>
              <p>Een heldere planning maakt van veel schoolwerk kleine, haalbare stappen.</p>
            </div>
          </div>
        </header>

        <section id="begeleiding" className="chapter intro-section">
          <div className="section-heading">
            <p className="kicker">Wat is Qnapper?</p>
            <h2>Een rustige plek waar <span className="inline-image"><img src="./assets/personal-planning.jpg" alt="Leerling en begeleider maken samen een planning" /></span> overzicht ontstaat.</h2>
          </div>
          <div className="intro-grid">
            <p>Weten wat je moet leren is iets anders dan weten hoe je begint. Qnapper helpt bij plannen, prioriteiten stellen en geconcentreerd werken.</p>
            <p>De begeleider houdt overzicht, helpt wanneer iemand vastloopt en geeft leerlingen stap voor stap meer verantwoordelijkheid.</p>
          </div>

          <div className="bento-grid">
            <article className="bento-card bento-card--feature interactive-card">
              <CalendarCheck aria-hidden="true" />
              <div>
                <h3>Eerst overzicht</h3>
                <p>Agenda, Magister, toetsen, deadlines en projecten komen samen in één realistische planning.</p>
              </div>
            </article>
            <article className="bento-card bento-card--lime interactive-card">
              <ClockCountdown aria-hidden="true" />
              <h3>Beginnen op tijd</h3>
              <p>Niet alles op het laatste moment.</p>
            </article>
            <article className="bento-card bento-card--dark interactive-card">
              <Target aria-hidden="true" />
              <h3>Focus op wat telt</h3>
              <p>Vandaag, deze week en daarna.</p>
            </article>
            <article className="bento-card bento-card--wide interactive-card">
              <ListChecks aria-hidden="true" />
              <div>
                <h3>Van grote taak naar haalbare stap</h3>
                <p>We verdelen leerwerk en opdrachten over meerdere dagen, zodat vooruitgang zichtbaar wordt.</p>
              </div>
            </article>
          </div>
        </section>

        <div className="marquee" aria-label="De vijf stappen van Qnapper">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-set" key={copy} aria-hidden={copy === 1}>
                <span>Overzicht</span><i />
                <span>Planning</span><i />
                <span>Uitvoering</span><i />
                <span>Controle</span><i />
                <span>Zelfstandigheid</span><i />
              </div>
            ))}
          </div>
        </div>

        <section id="werkwijze" className="chapter process-section">
          <div className="process-layout">
            <div className="process-sticky">
              <p className="kicker kicker--light">Zo ziet een middag eruit</p>
              <h2>Een vast ritme. Steeds meer zelfstandigheid.</h2>
              <p>We starten samen, de leerling werkt zelfstandig en we sluiten af met helder overzicht voor de rest van de week.</p>
              <div className="process-image interactive-media">
                <img className="motion-image" src="./assets/personal-planning.jpg" alt="Persoonlijke begeleiding bij het maken van een weekplanning" />
              </div>
            </div>
            <div className="process-list">
              {[
                ['Binnenkomen', 'We openen agenda, Magister of de schoolplanning en brengen huiswerk, toetsen en deadlines in beeld.'],
                ['Persoonlijk plannen', 'We kiezen wat vandaag gebeurt en delen grotere taken op over de komende dagen.'],
                ['Geconcentreerd werken', 'De leerling gaat zelfstandig aan de slag in een rustige omgeving, met hulp binnen bereik.'],
                ['Controleren en helpen', 'We volgen de planning en ondersteunen bij uitleg, samenvatten, woordjes leren en prioriteiten.'],
                ['Afronden', 'We bekijken wat af is en wat nog komt. De leerling vertrekt met overzicht over de rest van de week.'],
              ].map(([title, copy], index) => (
                <article className="process-card" key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter skills-section">
          <div className="section-heading section-heading--split">
            <h2>Niet alleen huiswerk af. <em>Leren hoe leren werkt.</em></h2>
            <p>Vaardigheden waar leerlingen hun hele schooltijd iets aan hebben.</p>
          </div>
          <div className="skill-accordion">
            {skills.map((skill, index) => (
              <button
                className={`skill-panel ${activeSkill === index ? 'is-active' : ''}`}
                type="button"
                key={skill.title}
                onClick={() => setActiveSkill(index)}
                onMouseEnter={() => setActiveSkill(index)}
                aria-expanded={activeSkill === index}
              >
                <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="skill-content">
                  <h3>{skill.title}</h3>
                  <p>{skill.copy}</p>
                  <strong>{skill.accent}</strong>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="voor-wie" className="chapter audience-section">
          <div className="audience-image interactive-media">
            <img className="motion-image" src="./assets/small-group.jpg" alt="Drie leerlingen werken geconcentreerd in een kleine begeleidingsgroep" />
          </div>
          <div className="audience-copy">
            <p className="kicker">Kleine groepen, persoonlijke aandacht</p>
            <h2>Rustig en gestructureerd. Nooit schools of streng.</h2>
            <p>Qnapper past bij leerlingen die moeite hebben met plannen, vaak laat beginnen, het overzicht verliezen of gewoon behoefte hebben aan een rustige werkplek.</p>
            <ul>
              <li><Check aria-hidden="true" /> Bovenbouw basisschool en middelbare school</li>
              <li><Check aria-hidden="true" /> Hulp bij concentratie en uitstelgedrag</li>
              <li><Check aria-hidden="true" /> Combineren van toetsen en huiswerk</li>
              <li><Check aria-hidden="true" /> Slimmer en zelfstandiger leren</li>
            </ul>
          </div>
        </section>

        <section className="chapter perspective-section" aria-live="polite">
          <div className="perspective-top">
            <p className="kicker">Wat goede begeleiding verandert</p>
            <div className="carousel-controls">
              <button type="button" aria-label="Vorige" onClick={() => shiftPerspective(-1)}><CaretLeft aria-hidden="true" /></button>
              <button type="button" aria-label="Volgende" onClick={() => shiftPerspective(1)}><CaretRight aria-hidden="true" /></button>
            </div>
          </div>
          <div className="perspective-card" key={activePerspective}>
            <span>{perspectives[activePerspective].eyebrow}</span>
            <h2>{perspectives[activePerspective].title}</h2>
            <p>{perspectives[activePerspective].copy}</p>
          </div>
          <div className="carousel-progress" aria-hidden="true">
            {perspectives.map((item, index) => <i className={index === activePerspective ? 'is-active' : ''} key={item.title} />)}
          </div>
        </section>

        <section id="kennismaken" className="chapter contact-section">
          <div className="contact-brand">
            <img src="./assets/qnapper-logo-transparent.png" alt="iQnapper Huiswerkbegeleiding — Word een snapper bij Qnapper" />
          </div>
          <div className="contact-copy">
            <p className="kicker kicker--light">Vrijblijvend kennismaken</p>
            <h2>Samen kijken waar de meeste winst te behalen is.</h2>
            <p>Vertel kort waar uw zoon of dochter tegenaan loopt. Dan kan Qnapper gericht meedenken over meer overzicht, rust en een slimmere aanpak van school.</p>
            {sent ? (
              <div className="success-message" role="status">
                <Check aria-hidden="true" />
                <div><strong>Uw aanvraag staat klaar.</strong><span>Dit is een lokale demo. Koppel het formulier bij publicatie aan uw eigen e-mailadres.</span></div>
              </div>
            ) : (
              <form onSubmit={submitForm}>
                <label>
                  Naam
                  <input name="name" autoComplete="name" placeholder="Uw naam" required />
                </label>
                <label>
                  E-mailadres
                  <input name="email" type="email" autoComplete="email" placeholder="naam@voorbeeld.nl" required />
                </label>
                <label className="form-wide">
                  Waar kunnen we bij helpen?
                  <textarea name="message" rows="4" placeholder="Vertel kort wat er speelt" required />
                </label>
                <button className="button button--green form-wide" type="submit">Plan een kennismaking <ArrowRight aria-hidden="true" /></button>
              </form>
            )}
          </div>
        </section>

        <footer>
          <Brand compact />
          <p>Meer overzicht. Meer rust. Een slimmere aanpak van school.</p>
          <div><a href="#begeleiding">Begeleiding</a><a href="#werkwijze">Werkwijze</a><a href="#kennismaken">Contact</a></div>
          <span>© {new Date().getFullYear()} Qnapper</span>
        </footer>
      </main>
    </div>
  )
}

export default App
