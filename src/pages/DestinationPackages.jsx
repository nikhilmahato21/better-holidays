import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tours } from '../data/tours'

const slugify = (value) =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function makeDummyPackages(destination) {
  const presets = [
    { title: `Best of ${destination}: Hills, Wildlife & Lakes`, duration: '6 Days & 5 Nights', places: `2N ${destination} · 2N Local · +1 More`, originalPrice: 28900, price: 14000 },
    { title: `${destination} Family Escape – Scenic Highlights`, duration: '5 Days & 4 Nights', places: `3N ${destination} · 1N Nearby`, originalPrice: 21999, price: 15999 },
    { title: `${destination} Weekend Break – Quick Getaway`, duration: '3 Days & 2 Nights', places: `2N ${destination}`, originalPrice: 12999, price: 9999 },
    { title: `${destination} Heritage & Food Trail`, duration: '4 Days & 3 Nights', places: `2N ${destination} · 1N Old City`, originalPrice: 18999, price: 13500 },
    { title: `${destination} Adventure Combo – Limited Seats!`, duration: '5 Days & 4 Nights', places: `3N ${destination} · 1N Camp`, originalPrice: 24999, price: 17999 },
    { title: `${destination} Luxury Retreat – Premium Stay`, duration: '4 Days & 3 Nights', places: `3N ${destination}`, originalPrice: 34999, price: 24999 },
  ]

  return presets.map((p, idx) => ({
    id: Number(`${Date.now()}${idx}`),
    slug: `dummy-${slugify(p.title)}`,
    region: destination,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
    save: Math.max(0, p.originalPrice - p.price),
    ...p,
    isDummy: true,
  }))
}

const regionColors = {
  Andaman: 'bg-teal/10 text-teal-dark',
  'Himachal Pradesh': 'bg-blue-50 text-blue-700',
  Kashmir: 'bg-purple-50 text-purple-700',
  Kerala: 'bg-green-50 text-green-700',
  Rajasthan: 'bg-red-50 text-red-700',
  Uttarakhand: 'bg-emerald-50 text-emerald-700',
  Gujarat: 'bg-amber-50 text-amber-700',
}

function PackageCard({ pkg, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.06 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 border border-gray-100"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className={`absolute bottom-3 left-3 text-xs font-outfit font-semibold px-2.5 py-1 rounded-full ${regionColors[pkg.region] || 'bg-white/90 text-navy'}`}>
          {pkg.region}
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-xs font-outfit mb-1">{pkg.duration}</p>
        <h3 className="font-outfit font-semibold text-navy text-sm leading-snug mb-2 line-clamp-2 group-hover:text-gold transition-colors">
          {pkg.title}
        </h3>
        <div className="inline-block bg-navy/5 text-navy/70 text-xs px-2.5 py-1 rounded-full font-outfit mb-3">
          {pkg.places}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-400 line-through text-xs">₹{pkg.originalPrice.toLocaleString()}</span>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            SAVE ₹{pkg.save.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-navy font-bold text-lg font-outfit">
            <span className="text-gray-400 text-xs font-normal">Starting from </span>
            ₹{pkg.price.toLocaleString()}
            <span className="text-gray-400 text-xs font-normal">/Person</span>
          </p>

          {pkg.isDummy ? (
            <a
              href="tel:9306689751"
              className="bg-crimson hover:bg-crimson-dark text-white text-sm font-outfit font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Enquire
            </a>
          ) : (
            <Link
              to={`/tour/${pkg.slug}`}
              className="bg-crimson hover:bg-crimson-dark text-white text-sm font-outfit font-semibold px-4 py-2 rounded-full transition-colors"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function DestinationPackages() {
  const { destination } = useParams()
  const destinationName = useMemo(() => decodeURIComponent(destination || ''), [destination])

  const packages = useMemo(() => {
    const matched = tours.filter((t) => t.region === destinationName).map((t) => ({
      ...t,
      save: Math.max(0, (t.originalPrice ?? 0) - (t.price ?? 0)),
      isDummy: false,
    }))
    return matched.length > 0 ? matched : makeDummyPackages(destinationName)
  }, [destinationName])

  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-black" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,215,0,0.25),transparent_45%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <h1 className="text-white font-playfair font-black text-4xl lg:text-6xl text-center">{destinationName}</h1>
          <p className="text-white/70 font-outfit text-sm lg:text-base text-center mt-4 max-w-2xl mx-auto">
            Browse packages for {destinationName}. (Dummy packages are shown when no tours exist yet.)
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-2 text-white/90 font-outfit text-sm">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/60">›</span>
              <span>{destinationName}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <div>
              <h2 className="font-playfair font-black text-navy text-3xl lg:text-4xl">Packages</h2>
              <p className="text-gray-500 font-outfit mt-2 text-sm">
                Showing {packages.length} package{packages.length === 1 ? '' : 's'}
              </p>
            </div>
            {/* <Link
              to="/#packages"
              className="text-navy font-outfit font-semibold hover:text-gold transition-colors"
            >
              View all packages →
            </Link> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id ?? pkg.slug ?? i} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
