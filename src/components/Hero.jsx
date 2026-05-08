import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&q=80',
    subtitle: 'Discover Southeast Asia',
    title: 'Magical\nMalaysia',
    dest: 'Kuala Lumpur · Langkawi · Penang',
  },
  {
    bg: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&q=80',
    subtitle: 'Land of Smiles',
    title: 'Enchanting\nThailand',
    dest: 'Bangkok · Phuket · Chiang Mai',
  },
  {
    bg: 'https://res.cloudinary.com/dynbpb9u0/image/upload/v1778217302/kazakistan.jpg',
    subtitle: 'The Hidden Gem of Central Asia',
    title: 'Stunning\nKazakhstan',
    dest: 'Almaty · Nur-Sultan · Charyn Canyon',
  },
]

const fadeVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
}

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section id="home" className="relative h-screen min-h-[640px] overflow-hidden">
      {/* Background slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.bg}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Prev/Next */}
      <button
        onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition"
      >
        ←
      </button>
      <button
        onClick={() => setCurrent(c => (c + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition"
      >
        →
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-20 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="font-playfair italic text-gold text-xl lg:text-2xl mb-3 text-shadow-sm">
              {slide.subtitle}
            </p>
            <h1 className="font-playfair font-black text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-tight text-shadow whitespace-pre-line mb-4">
              {slide.title}
            </h1>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-0.5 bg-teal" />
              <p className="text-white/70 font-outfit text-sm lg:text-base tracking-widest uppercase">
                {slide.dest}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tagline block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl"
        >
          <h2 className="font-playfair font-bold text-white text-xl lg:text-2xl mb-3 leading-snug">
            Impeccable Planning for Unforgettable Travel
          </h2>
          <p className="text-white/75 font-outfit text-sm lg:text-base leading-relaxed mb-6">
            We've been where you want to go. We've experienced the destinations, the resorts, the food, and the service — so we know what's real beyond the photos. Through research, connections, and attention to detail, we ensure you know exactly what to expect.
          </p>
          <p className="font-playfair italic text-gold text-base lg:text-lg">
            ✨ Put our expertise to work for you.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex gap-8 flex-wrap"
        >
          {[
            { value: '10+', label: 'Destinations' },
            { value: 'Expert', label: 'Local Knowledge' },
            { value: 'Custom', label: 'Itineraries' },
            { value: '100%', label: 'Tailored Trips' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-playfair font-bold text-gold text-2xl">{stat.value}</div>
              <div className="text-white/60 text-xs font-outfit uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
