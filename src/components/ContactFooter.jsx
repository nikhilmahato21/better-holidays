import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactFooter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', dest: '', msg: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = `Hi, I have an enquiry.%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0ADestination: ${form.dest}%0AMessage: ${form.msg}`
    window.open(`https://wa.me/919971107330?text=${msg}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-navy overflow-hidden relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10" ref={ref}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="font-playfair italic text-gold text-xl mb-2">Get In Touch</p>
              <h2 className="font-playfair font-black text-white text-4xl lg:text-5xl mb-6 leading-tight">
                Plan Your Dream<br />Journey Today
              </h2>
              <p className="text-white/60 font-outfit mb-10 leading-relaxed">
                Ready to explore the world? Our travel experts are here to craft the perfect itinerary for you. Reach out and let's make memories together.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    ),
                    label: 'Location',
                    value: 'C-53, Second Floor, Chander Nagar,\nJanak Puri, New Delhi – 110058',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    ),
                    label: 'Phone',
                    value: '+91 9971107330',
                    href: 'tel:9971107330',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    ),
                    label: 'Email',
                    value: 'anuj@betterholidays.in',
                    href: 'mailto:anuj@betterholidays.in',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-11 h-11 bg-gold/20 rounded-xl flex items-center justify-center text-gold flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/50 font-outfit text-xs uppercase tracking-wider mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white font-outfit hover:text-gold transition-colors whitespace-pre-line">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-outfit text-sm whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/919971107330"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-outfit font-semibold px-6 py-3.5 rounded-full mt-8 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </motion.a>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
            >
              <h3 className="font-playfair font-bold text-white text-2xl mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs font-outfit uppercase tracking-wider block mb-2">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="Your Name"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 font-outfit text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-outfit uppercase tracking-wider block mb-2">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 font-outfit text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-outfit uppercase tracking-wider block mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 font-outfit text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs font-outfit uppercase tracking-wider block mb-2">Dream Destination</label>
                  <input
                    type="text"
                    value={form.dest}
                    onChange={e => setForm({...form, dest: e.target.value})}
                    placeholder="Where do you want to go?"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 font-outfit text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs font-outfit uppercase tracking-wider block mb-2">Message</label>
                  <textarea
                    value={form.msg}
                    onChange={e => setForm({...form, msg: e.target.value})}
                    placeholder="Tell us about your trip..."
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 font-outfit text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-outfit font-semibold text-sm transition-all duration-300 ${
                    sent
                      ? 'bg-green-500 text-white'
                      : 'bg-gold hover:bg-gold-dark text-white shadow-lg shadow-gold/30'
                  }`}
                >
                  {sent ? '✓ Message Sent! We\'ll contact you soon.' : 'Send Message →'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080f22] text-white py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <a href="#home">
                  <img
                    src="https://res.cloudinary.com/dynbpb9u0/image/upload/v1778690151/BHA_LOGO_BLACK_ksguyn.png"
                    className="h-10 w-auto object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                    alt="Better Holidays Abroad"
                  />
                </a>
              </div>
              <p className="text-white/50 font-outfit text-sm leading-relaxed mb-4">
                Impeccable planning for unforgettable international travel. Specialists in Southeast Asia & Central Asia tour packages, flight tickets, and hotel bookings.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {['facebook', 'instagram'].map(s => (
                  <a key={s} href="#" className="w-9 h-9 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-white text-xs">{s === 'facebook' ? 'f' : 'ig'}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-outfit font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <div className="w-8 h-0.5 bg-crimson mb-4" />
              <ul className="space-y-2.5">
                {['Home', 'About Us', 'Services', 'Blogs', 'Tours'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-white/50 hover:text-gold font-outfit text-sm transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="font-outfit font-semibold text-white mb-4 text-sm uppercase tracking-wider">Popular Destinations</h4>
              <div className="w-8 h-0.5 bg-crimson mb-4" />
              <ul className="space-y-2.5">
                {['Sri Lanka', 'Malaysia', 'Thailand', 'Vietnam', 'Japan', 'Bali'].map(d => (
                  <li key={d}>
                    <a href="#" className="text-white/50 hover:text-gold font-outfit text-sm transition-colors">{d}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-outfit font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
              <div className="w-8 h-0.5 bg-crimson mb-4" />
              <ul className="space-y-4 text-white/50 font-outfit text-sm">
                <li className="flex gap-3">
                  <span className="text-gold mt-0.5">📍</span>
                  <span>C-53, Second Floor, Chander Nagar, Janak Puri, New Delhi – 110058</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">📞</span>
                  <a href="tel:9971107330" className="hover:text-gold transition-colors">+91 9971107330</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">✉️</span>
                  <a href="mailto:anuj@betterholidays.in" className="hover:text-gold transition-colors">anuj@betterholidays.in</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 font-outfit text-xs">
              Copyright © 2026 Better Holidays Abroad. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms Of Service', 'Legal Agreement'].map(l => (
                <a key={l} href="#" className="text-white/40 hover:text-gold font-outfit text-xs transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
