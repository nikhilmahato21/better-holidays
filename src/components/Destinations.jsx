import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const destinations = [
  {
    name: 'Bali, Indonesia',
    link: '/destination/Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    tag: 'Island Paradise',
    size: 'large',
  },
  {
    name: 'Thailand',
    link: '/destination/Thailand',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80',
    tag: 'Land of Smiles',
    size: 'medium',
  },
  {
    name: 'Malaysia',
    link: '/destination/Malaysia',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80',
    tag: 'Southeast Asia',
    size: 'medium',
  },
  {
    name: 'Japan',
    link: '/destination/Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
    tag: 'Land of Rising Sun',
    size: 'medium',
  },
  {
    name: 'Vietnam',
    link: '/destination/Vietnam',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    tag: 'Hidden Gem',
    size: 'medium',
  },
  {
    name: 'Sri Lanka',
    link: '/destination/Sri Lanka',
    image: 'https://images.tripadeal.com.au/cdn-cgi/image/format=auto,width=800/https://cstad.s3.ap-southeast-2.amazonaws.com/4904_5+star+Sri+Lanka+_WEB_HERO_1.jpg',
    tag: 'Pearl of the Indian Ocean',
    size: 'medium',
  },
  {
    name: 'Hong Kong & Macau',
    link: '/destination/Hong Kong & Macau',
    image: 'https://travelandlifewithroaz.com/wp-content/uploads/2025/08/pexels-photo-3038813.jpeg',
    tag: 'City of Lights',
    size: 'medium',
  },
  {
    name: 'China',
    link: '/destination/China',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80',
    tag: 'Ancient Wonders',
    size: 'medium',
  },
  {
    name: 'Kazakhstan',
    link: '/destination/Kazakhstan',
    image: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=400,height=265,dpr=2/tour_img/245ba58e6f83f100fc8ab4933813d9bef9f819d84ab03fa55ba8689464e04fb3.jpg',
    tag: 'Central Asia',
    size: 'medium',
  },
  {
    name: 'Azerbaijan',
    link: '/destination/Azerbaijan',
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/10/0b/fc.jpg',
    tag: 'Land of Fire',
    size: 'medium',
  },
]

function DestCard({ dest, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Link to={dest.link}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay }}
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{ height: dest.size === 'large' ? '100%' : '220px' }}
      >
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
        <div className="absolute bottom-4 left-4">
          <p className="text-white/70 text-xs font-outfit uppercase tracking-wider">{dest.tag}</p>
          <h3 className="text-white font-outfit font-bold text-lg">{dest.name}</h3>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </motion.div>
    </Link>
  )
}

export default function Destinations() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, x: -30 }}
            animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-playfair italic text-crimson text-xl mb-1">International Destinations</p>
            <h2 className="font-playfair font-black text-navy text-4xl lg:text-5xl">Where We Take You</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-500 font-outfit max-w-sm text-sm leading-relaxed"
          >
            From the temples of Southeast Asia to the steppes of Central Asia — we craft holidays that go beyond the brochure.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large left card */}
          <div className="lg:row-span-2" style={{ minHeight: '460px' }}>
            <DestCard dest={destinations[0]} delay={0} />
          </div>

          {/* Right 2x2 */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {destinations.slice(1, 5).map((dest, i) => (
              <DestCard key={dest.name} dest={dest} delay={0.1 + i * 0.08} />
            ))}
          </div>

          {/* Bottom row */}
          <div className="lg:col-span-2">
            <DestCard dest={destinations[5]} delay={0.4} />
          </div>
        </div>

        {/* Second row of destinations */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {destinations.slice(6).map((dest, i) => (
            <DestCard key={dest.name} dest={dest} delay={0.5 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
