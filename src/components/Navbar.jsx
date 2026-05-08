import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const navLinks = ['Home', 'About Us', 'Destinations', 'Packages', 'Deals', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const targetId = id.toLowerCase().replace(' ', '-').replace(' us', '')

    const attemptScroll = () => {
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(attemptScroll, 120)
    } else {
      attemptScroll()
    }

    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={`w-full max-w-7xl transition-all duration-300 rounded-2xl border overflow-hidden ${
          scrolled
            ? 'bg-white/10 border-white/15 shadow-2xl backdrop-blur-xl backdrop-saturate-150'
            : 'bg-white/7 border-white/10 shadow-xl shadow-black/20 backdrop-blur-lg backdrop-saturate-150'
        }`}
      >
        <div className="px-6 lg:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <button type="button" onClick={() => scrollTo('Home')} className="flex items-center gap-3 group">
               <img src="/logo.jpg" className="w-10 h-10 rounded-full object-cover ring-2 ring-gold/70" alt="Better Holidays Abroad" />
          </button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-black/80 hover:text-gold font-outfit text-sm font-medium transition-colors duration-200 relative group"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full rounded-full" />
                  </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:9971107330"
              className="flex items-center gap-2 text-black/80 hover:text-gold text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              9971107330
            </a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gold hover:bg-gold-dark text-navy font-outfit font-600 text-sm px-6 py-2.5 rounded-full transition-colors duration-200 shadow-lg shadow-gold/30"
            >
              Get In Touch
            </motion.a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-black p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-5 h-0.5 bg-black/85 mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-black/85 mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-black/85 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(link)}
                    className="text-black/80 hover:text-gold text-left font-outfit font-medium transition-colors"
                  >
                    {link}
                  </button>
                ))}
                <a
                  href="#contact"
                  className="bg-gold text-navy font-outfit font-semibold text-sm px-6 py-3 rounded-full text-center mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
