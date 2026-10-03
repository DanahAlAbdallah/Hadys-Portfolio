import { useState, useEffect } from 'react'
import { content, PHOTO, CONTACT } from './content.js'

export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'en' } catch { return 'en' }
  })
  const [open, setOpen] = useState(false)
  const c = content[lang]
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])
  const ids = ['about', 'experience', 'interests', 'contact']
  const go = () => setOpen(false)

  return (
    <>
      <header className="nav">
        <a href="#about" className="logo">{c.name.split(' ')[0]}</a>
        <nav className={open ? 'links open' : 'links'}>
          {ids.map(i => <a key={i} href={'#' + i} onClick={go}>{c.nav[i]}</a>)}
        </nav>
        <div className="nav-right">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
            <button className={lang === 'ru' ? 'on' : ''} onClick={() => setLang('ru')}>RU</button>
          </div>
          <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </header>

      <main>
        <section id="about" className="hero">
          <div className="hero-text">
            <p className="role">{c.role}</p>
            <h1>{c.name}</h1>
            <p className="lead">{c.about}</p>
            <a className="btn" href="#contact">{c.cta}</a>
          </div>
          <div className="photo"><img src={PHOTO} alt={c.name} /></div>
        </section>

        <section id="experience" className="sec">
          <h2>{c.expTitle}</h2>
          <ol className="timeline">
            {c.exp.map(e => (
              <li key={e.title}>
                <span className="when">{e.when}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="interests" className="sec alt">
          <h2>{c.intTitle}</h2>
          <div className="grid">
            {c.ints.map(i => (
              <div className="card" key={i.t}>
                <span className="icon">{i.icon}</span>
                <h3>{i.t}</h3>
                <p>{i.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="sec">
          <h2>{c.conTitle}</h2>
          <p className="lead">{c.conText}</p>
          <div className="contacts">
            <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>
            <a href={'tel:' + CONTACT.phone}>{CONTACT.phone}</a>
            <a href={CONTACT.instagram}>Instagram</a>
            <a href={CONTACT.linkedin}>LinkedIn</a>
          </div>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} {c.name}. {c.foot}</footer>
    </>
  )
}
