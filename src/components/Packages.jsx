import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { tours } from '../data/tours'

const packages = tours.map((t) => ({
  id: t.id,
  slug: t.slug,
  region: t.region,
  title: t.title,
  duration: t.duration,
  places: t.places,
  originalPrice: t.originalPrice,
  price: t.price,
  save: Math.max(0, t.originalPrice - t.price),
  image: t.image,
  tag: '',
}))

const regionColors = {
  'Andaman': 'bg-teal/10 text-teal-dark',
  'Himachal Pradesh': 'bg-blue-50 text-blue-700',
  'Kashmir': 'bg-purple-50 text-purple-700',
  'Kerala': 'bg-green-50 text-green-700',
  'Rajasthan': 'bg-red-50 text-red-700',
  'Uttarakhand': 'bg-emerald-50 text-emerald-700',
  'Bhubaneswar': 'bg-amber-50 text-amber-700',
  'Uttar Pradesh': 'bg-rose-50 text-rose-700',
  'Sri Lanka': 'bg-orange-50 text-orange-700',
  'Malaysia': 'bg-sky-50 text-sky-700',
  'Thailand': 'bg-fuchsia-50 text-fuchsia-700',
  'Vietnam': 'bg-red-50 text-red-700',
  'Japan': 'bg-pink-50 text-pink-700',
  'China': 'bg-red-50 text-red-800',
  'Hong Kong & Macau': 'bg-violet-50 text-violet-700',
  'Bali': 'bg-green-800 text-white',
  'Kazakhstan': 'bg-yellow-50 text-yellow-700',
  'Azerbaijan': 'bg-cyan-50 text-cyan-700',
}

function PackageCard({ pkg, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {pkg.tag && (
          <div className="absolute top-3 left-3 bg-gold text-white text-xs font-outfit font-semibold px-3 py-1 rounded-full">
            {pkg.tag}
          </div>
        )}
        <div className={`absolute bottom-3 left-3 text-xs font-outfit font-semibold px-2.5 py-1 rounded-full ${regionColors[pkg.region] || 'bg-white/90 text-navy'}`}>
          {pkg.region}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-500 text-xs font-outfit mb-1">{pkg.duration}</p>
        <h3 className="font-outfit font-semibold text-navy text-sm leading-snug mb-2 line-clamp-2 group-hover:text-gold transition-colors">
          {pkg.title}
        </h3>
        <div className="inline-block bg-navy/5 text-navy/70 text-xs px-2.5 py-1 rounded-full font-outfit mb-3">
          {pkg.places}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-xs">₹{pkg.originalPrice.toLocaleString()}</span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                SAVE ₹{pkg.save.toLocaleString()}
              </span>
            </div>
            <p className="text-navy font-outfit font-bold text-lg">
              <span className="text-gray-400 text-xs font-normal">Starting from </span>
              ₹{pkg.price.toLocaleString()}
              <span className="text-gray-400 text-xs font-normal">/Person</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href="tel:9971107330"
            className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-gray-500 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </a>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1">
            <Link
              to={`/tour/${pkg.slug}`}
              className="block w-full text-center bg-crimson hover:bg-crimson-dark text-white font-outfit font-semibold text-sm py-2 rounded-full transition-colors"
            >
              View Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Packages() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-playfair italic text-crimson text-xl mb-2">Explore The World</p>
          <h2 className="font-playfair font-black text-navy text-4xl lg:text-5xl mb-4">Awesome Trip With Us</h2>
          <p className="text-gray-500 font-outfit max-w-xl mx-auto">
            Handpicked tour packages across India and beyond — from the Himalayas to Southeast Asia. Every journey crafted with care.
          </p>
          <div className="flex justify-center mt-4">
            <div className="w-16 h-1 bg-gold rounded-full" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          {/* <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-outfit font-semibold px-10 py-3.5 rounded-full transition-all duration-300"
          >
            View All Packages →
          </motion.button> */}
        </motion.div>
      </div>
    </section>
  )
}
