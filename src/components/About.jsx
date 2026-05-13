import { motion } from 'framer-motion'

const features = [
  {
    title: 'Customizable Itineraries',
    desc: 'Every trip is tailored to your family or group — balancing sightseeing, relaxation, and family-friendly activities for a perfect experience.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
  },
  {
    title: 'First-Hand Destination Knowledge',
    desc: "We've personally experienced the destinations, resorts, food, and service — so we know what's truly worth your time and money.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
]

const images = [
  'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
  'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=400,height=265,dpr=2/tour_img/245ba58e6f83f100fc8ab4933813d9bef9f819d84ab03fa55ba8689464e04fb3.jpg',
]

export default function About() {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-2xl overflow-hidden h-64">
                  <img src={images[0]} alt="Travel" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <img src={images[1]} alt="Vietnam" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <img src={images[2]} alt="Thailand" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 bg-navy rounded-2xl p-4 shadow-xl"
              >
                <p className="text-gold font-playfair font-bold text-2xl">10+</p>
                <p className="text-white/80 text-xs font-outfit">Countries</p>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-playfair italic text-crimson text-xl mb-2">About Us</p>
              <h2 className="font-playfair font-black text-navy text-4xl lg:text-5xl mb-4 leading-tight">
                Better Holidays<br />Abroad
              </h2>
              <p className="text-gray-500 font-playfair italic text-base mb-4">
                "Partner with us and invest in the best travel experience."
              </p>
              <p className="text-gray-600 font-outfit mb-6 leading-relaxed">
                At Better Holidays Abroad, we specialize in creating customizable travel experiences for Indian families and groups across Southeast Asia and beyond. Founded with a passion for comfort, culture, and creativity, we design itineraries that balance sightseeing, relaxation, and family-friendly activities.
              </p>
              <p className="text-gray-600 font-outfit mb-8 leading-relaxed">
                We are a Husband-Wife team based in New Delhi but thinking globally — combining local insight with international reach to deliver holidays that are both affordable and unforgettable.
              </p>

              <div className="space-y-6 mb-8">
                {features.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-crimson/10 rounded-xl flex items-center justify-center text-crimson flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-outfit font-bold text-navy mb-1">{f.title}</h4>
                      <p className="text-gray-500 text-sm font-outfit leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white font-outfit font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-crimson/30"
              >
                Get In Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  )
}
