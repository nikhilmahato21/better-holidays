import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const whyStats = [
  { icon: '✈️', value: 'International', label: 'Tour Packages' },
  { icon: '🏨', value: 'Hotel', label: 'Bookings' },
  { icon: '🎫', value: 'Flight', label: 'Tickets' },
  { icon: '👨‍👩‍👧‍👦', value: 'Family', label: 'Friendly Trips' },
  { icon: '🗺️', value: 'Custom', label: 'Itineraries' },
  { icon: '🌏', value: '10+', label: 'Countries' },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-playfair italic text-crimson text-xl mb-2">Why Choose Us</p>
            <h2 className="font-playfair font-black text-navy text-4xl lg:text-5xl mb-4">Why Better Holidays Abroad</h2>
            <p className="font-playfair italic text-gray-500 mb-4">
              "We've been where you want to go."
            </p>
            <p className="text-gray-600 font-outfit mb-10 leading-relaxed">
              We combine personal travel experience, strong supplier relationships, and meticulous attention to detail — so every holiday we craft exceeds your expectations, not just matches them.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4">
              {whyStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-crimson rounded-2xl p-4 text-center"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <p className="text-white font-outfit font-bold text-sm">{stat.value}</p>
                  <p className="text-white/70 font-outfit text-xs mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Images collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative grid grid-cols-2 gap-4"
          >
            <div className="rounded-2xl overflow-hidden h-56">
              <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" alt="Japan" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden h-56 mt-8">
              <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" alt="Bali" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden h-56">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Hong Kong" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden h-56 mt-8">
              <img src="https://images.unsplash.com/photo-1562804655-5e947b53bce7?w=600&q=80" alt="Sri Lanka" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
