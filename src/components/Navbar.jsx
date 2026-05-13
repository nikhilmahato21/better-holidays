import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Destinations', id: 'destinations' },
  { label: 'Packages', id: 'packages' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const scrollTo = (id) => {
    const attemptScroll = () => {
      const el = document.getElementById(id)
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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
      <div className="w-full bg-white shadow-md">
        <div className="px-6 lg:px-10 h-[72px] flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <button type="button" onClick={() => scrollTo('home')} className="flex items-center">
            <img
              src="https://res.cloudinary.com/dynbpb9u0/image/upload/v1778690151/BHA_LOGO_BLACK_ksguyn.png"
              className="h-10 w-auto object-contain"
              alt="Better Holidays Abroad"
            />
          </button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="text-gray-700 hover:text-gold font-outfit text-sm font-medium transition-colors duration-200 relative group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full rounded-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:9971107330"
              className="flex items-center gap-2 text-gray-700 hover:text-gold text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              9971107330
            </a>
            <motion.button
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gold hover:bg-gold-dark text-navy font-outfit font-semibold text-sm px-6 py-2.5 rounded-full transition-colors duration-200 shadow-lg shadow-gold/30"
            >
              Get In Touch
            </motion.button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-gray-800 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-5 h-0.5 bg-gray-800 mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-gray-800 mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-gray-800 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 overflow-hidden bg-white"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map(({ label, id }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-gray-700 hover:text-gold text-left font-outfit font-medium transition-colors"
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo('contact')}
                  className="bg-gold text-navy font-outfit font-semibold text-sm px-6 py-3 rounded-full text-center mt-2"
                >
                  Get In Touch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
