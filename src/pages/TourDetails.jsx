import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { tours } from '../data/tours'

function Stat({ label, value, icon }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full border border-crimson/30 bg-crimson/5 flex items-center justify-center text-crimson">
        {icon}
      </div>
      <div>
        <div className="text-navy font-outfit font-semibold">{label}</div>
        <div className="text-gray-500 text-sm">{value}</div>
      </div>
    </div>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`font-outfit text-sm px-2 pb-3 transition-colors ${
        active ? 'text-crimson border-b-2 border-crimson' : 'text-gray-500 hover:text-navy border-b-2 border-transparent'
      }`}
    >
      {children}
    </button>
  )
}

function AccordionItem({ open, onToggle, title, children }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between text-left px-6 py-4 font-outfit font-semibold ${
          open ? 'bg-crimson text-white' : 'text-navy hover:bg-gray-100'
        }`}
      >
        <span>{title}</span>
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${open ? 'bg-white/15' : 'bg-white border border-gray-200'}`}>
          <svg
            className={`w-5 h-5 ${open ? 'text-white rotate-180' : 'text-gray-600'} transition-transform`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="px-6"
          >
            <div className="py-5 text-gray-600 leading-relaxed text-sm font-outfit">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SimilarTourCard({ tour }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-52">
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-5">
        <div className="text-gray-500 text-sm font-outfit mb-2">{tour.duration}</div>
        <div className="font-outfit font-semibold text-navy text-lg leading-snug mb-3">{tour.title}</div>
        <div className="flex items-center justify-between">
          <div className="text-navy font-outfit font-bold">
            <span className="text-gray-400 text-xs font-normal">Starting from </span>
            ₹{tour.price.toLocaleString()}
            <span className="text-gray-400 text-sm font-normal">/Person</span>
          </div>
          <Link
            to={`/tour/${tour.slug}`}
            className="bg-crimson hover:bg-crimson-dark text-white font-outfit font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function TourDetails() {
  const { slug } = useParams()
  const tour = useMemo(() => tours.find((t) => t.slug === slug), [slug])

  const [tab, setTab] = useState('itinerary')
  const [openDay, setOpenDay] = useState(1)
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', date: '', message: '' })

  const heroRef = useRef(null)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Parallax: move the image slower than the page scroll
  const heroImageY = useTransform(heroScrollProgress, [0, 1], ['0%', '22%'])

  const similarTours = useMemo(() => {
    if (!tour) return []
    return tours.filter((t) => t.region === tour.region && t.slug !== tour.slug).slice(0, 3)
  }, [tour])

  if (!tour) {
    return (
      <section className="pt-28 pb-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h1 className="font-playfair font-black text-navy text-4xl mb-3">Tour not found</h1>
          <p className="text-gray-500 font-outfit mb-8">The tour you’re looking for doesn’t exist.</p>
          <Link to="/" className="inline-flex items-center justify-center bg-crimson text-white font-outfit font-semibold px-8 py-3 rounded-full">
            Back to Home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section ref={heroRef} className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={tour.image}
            alt={tour.title}
            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover will-change-transform"
            style={{ y: heroImageY }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <h1 className="text-white font-playfair font-black text-5xl lg:text-6xl text-center">Tour Details</h1>
          <div className="mt-5 flex justify-center">
            <div className="bg-white/15 backdrop-blur-md border border-white/15 rounded-full px-5 py-2 text-white/90 font-outfit text-sm">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/60">›</span>
              <span>Tour Details</span>
            </div>
          </div>
        </div>
      </section>

      {/* Title + stats */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <h2 className="font-playfair font-black text-navy text-4xl lg:text-5xl">{tour.title}</h2>
            <button className="border border-crimson/40 text-crimson hover:bg-crimson hover:text-white transition-colors font-outfit font-semibold px-6 py-3 rounded-full flex items-center gap-2">
              Share
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-5.999l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.998a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>

          <div className="mt-10 border-y border-gray-100 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            <Stat
              label="Location"
              value={tour.location}
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.105 0 2-.895 2-2a2 2 0 10-4 0c0 1.105.895 2 2 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9c0 7-7 12-7 12S5 16 5 9a7 7 0 1114 0z" />
                </svg>
              }
            />
            <Stat
              label="Traveler"
              value={tour.travelers}
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-1" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20H2v-2a4 4 0 014-4h1" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              }
            />
            <div className="md:justify-self-end">
              <div className="inline-flex items-center gap-3 bg-crimson text-white font-outfit font-semibold px-7 py-4 rounded-full shadow-lg shadow-crimson/20">
                <span className="text-xl">₹</span>
                <span className="text-lg">Starting from {tour.price.toLocaleString()} / Per Person</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className=' md:flex gap-5 p-10'>
            <div className=' flex flex-col w-1/2 items-start justify-center my-10'>
              <h3 className="font-playfair font-black text-navy text-4xl mb-8">Inclusion</h3>
              <ul className="space-y-3 text-gray-600 font-outfit">
                {tour.inclusion.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>


            <div className=' flex flex-col w-1/2 items-start justify-center'>
              <h3 className="font-playfair font-black text-navy text-4xl mb-8">Exclusion</h3>
              <ul className="space-y-3 text-gray-600 font-outfit">
                {tour.exclusion.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-crimson flex-shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>


          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
            {/* Left */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-10 my-10">

              <div className="flex items-center gap-8 border-b border-gray-100 mb-10 ">
                <TabButton active={tab === 'itinerary'} onClick={() => setTab('itinerary')}>
                  Itinerary
                </TabButton>
                <TabButton active={tab === 'inclusion'} onClick={() => setTab('inclusion')}>
                  Inclusion
                </TabButton>
                <TabButton active={tab === 'exclusion'} onClick={() => setTab('exclusion')}>
                  Exclusion
                </TabButton>
              </div>

              {tab === 'itinerary' && (
                <div>
                  <h3 className="font-playfair font-black text-navy text-4xl mb-8">Itinerary</h3>
                  <div className="space-y-4">
                    {tour.itinerary.map((item) => (
                      <AccordionItem
                        key={item.day}
                        open={openDay === item.day}
                        onToggle={() => setOpenDay((d) => (d === item.day ? 0 : item.day))}
                        title={`Day ${item.day} : ${item.title}`}
                      >
                        {item.details}
                      </AccordionItem>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'inclusion' && (
                <div>
                  <h3 className="font-playfair font-black text-navy text-4xl mb-8">Inclusion</h3>
                  <ul className="space-y-3 text-gray-600 font-outfit">
                    {tour.inclusion.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tab === 'exclusion' && (
                <div>
                  <h3 className="font-playfair font-black text-navy text-4xl mb-8">Exclusion</h3>
                  <ul className="space-y-3 text-gray-600 font-outfit">
                    {tour.exclusion.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-crimson flex-shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right booking */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8 sticky top-28 my-10">
              <h3 className="font-outfit font-bold text-navy text-2xl mb-6">Tour Booking</h3>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-4"
              >
                <input
                  value={booking.name}
                  onChange={(e) => setBooking((b) => ({ ...b, name: e.target.value }))}
                  placeholder="Name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-outfit focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <input
                  value={booking.email}
                  onChange={(e) => setBooking((b) => ({ ...b, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-outfit focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <input
                  value={booking.phone}
                  onChange={(e) => setBooking((b) => ({ ...b, phone: e.target.value }))}
                  placeholder="Phone"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-outfit focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <input
                  value={booking.date}
                  onChange={(e) => setBooking((b) => ({ ...b, date: e.target.value }))}
                  type="date"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-outfit focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <textarea
                  value={booking.message}
                  onChange={(e) => setBooking((b) => ({ ...b, message: e.target.value }))}
                  placeholder="Additional information"
                  rows={5}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-outfit focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-crimson hover:bg-crimson-dark text-white font-outfit font-semibold py-4 rounded-full transition-colors"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>

          {/* Similar tours */}
          {similarTours.length > 0 && (
            <div className="mt-16">
              <h3 className="text-center font-playfair font-black text-navy text-5xl mb-12">Similar Tours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarTours.map((t) => (
                  <SimilarTourCard key={t.slug} tour={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
