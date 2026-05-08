import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { tours } from '../data/tours'

const deals = [
  {
    id: 1,
    tourSlug: tours.find((t) => t.region === 'Himachal Pradesh')?.slug,
    ends: Date.now() + 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: 2,
    tourSlug: tours.find((t) => t.region === 'Andaman')?.slug,
    ends: Date.now() + 1 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000,
  },
  {
    id: 3,
    tourSlug: tours.find((t) => t.region === 'Kashmir')?.slug,
    ends: Date.now() + 3 * 24 * 60 * 60 * 1000,
  },
]

function useCountdown(target) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 })
  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, target - Date.now())
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

function DealCard({ deal, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const time = useCountdown(deal.ends)
  const tour = tours.find((t) => t.slug === deal.tourSlug)

  if (!tour) return null

  const save = Math.max(0, (tour.originalPrice ?? 0) - (tour.price ?? 0))

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Countdown */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-2 flex justify-around">
            {[
              { val: String(time.h).padStart(2, '0'), label: 'HRS' },
              { val: String(time.m).padStart(2, '0'), label: 'MIN' },
              { val: String(time.s).padStart(2, '0'), label: 'SEC' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="font-outfit font-bold text-white text-lg leading-none">{val}</div>
                <div className="text-white/60 text-[10px] font-outfit mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-crimson text-white text-xs font-outfit font-bold px-2.5 py-1 rounded-full">
          FLASH DEAL
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-400 text-xs font-outfit mb-1">{tour.duration}</p>
        <h3 className="font-outfit font-semibold text-navy text-sm leading-snug mb-2">{tour.title}</h3>
        <div className="bg-navy/5 text-navy/70 text-xs px-2.5 py-1 rounded-full font-outfit inline-block mb-3">
          {tour.places}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-400 line-through text-xs">₹{tour.originalPrice.toLocaleString()}</span>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            SAVE ₹{save.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-navy font-bold text-lg font-outfit">
            ₹{tour.price.toLocaleString()}
            <span className="text-gray-400 text-xs font-normal">/Person</span>
          </p>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex"
          >
            <Link
              to={`/tour/${tour.slug}`}
              className="bg-crimson hover:bg-crimson-dark text-white text-sm font-outfit font-semibold px-4 py-2 rounded-full transition-colors"
            >
              View
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Deals() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section id="deals" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left banner */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-72 flex-shrink-0 bg-crimson rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-10 -translate-x-10" />
            <div className="relative z-10">
              <p className="font-playfair italic text-white/80 text-lg mb-2">Deals &amp; Offers</p>
              <h2 className="font-playfair font-black text-white text-5xl leading-tight">Hurry!<br />Deals<br />Live</h2>
            </div>
            <div className="relative z-10">
              <p className="text-white/70 font-outfit text-sm mb-4">Last-Minute Deals – Don't Miss Out!</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-crimson font-outfit font-bold px-6 py-3 rounded-full text-sm w-full"
              >
                View All Deals →
              </motion.button>
            </div>
          </motion.div>

          {/* Right: cards */}
          <div className="flex-1 overflow-hidden">
            <motion.div
              ref={headRef}
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="font-playfair font-bold text-navy text-2xl">Last-Minute Deals – Don't Miss Out!</h3>
            </motion.div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {deals.map((deal, i) => (
                <DealCard key={deal.id} deal={deal} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
