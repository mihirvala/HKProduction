import React from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_URL =
  'https://wa.me/917778979768?text=' +
  encodeURIComponent("Hi, I saw your work and I'd like to book a date.");

type Shot = {
  slug: string;
  category: 'Bridal' | 'Couple';
  alt: string;
};

// Curated selection — real photographs, ordered to alternate bridal and couple
const shots: Shot[] = [
  { slug: 'bridal-garden', category: 'Bridal', alt: 'Bride in a maroon lehenga in a sunlit garden' },
  { slug: 'couple-tree', category: 'Couple', alt: 'Couple face to face beneath a large tree' },
  { slug: 'bridal-archway', category: 'Bridal', alt: 'Bride walking through a decorated archway' },
  { slug: 'couple-peach', category: 'Couple', alt: 'Couple in peach outfits, foreheads touching' },
  { slug: 'bridal-diyas', category: 'Bridal', alt: 'Bride holding lit diyas' },
  { slug: 'couple-mandap', category: 'Couple', alt: 'Couple at a floral mandap at night' },
  { slug: 'bridal-veil', category: 'Bridal', alt: 'Bride in profile wearing an embroidered veil' },
  { slug: 'couple-chandelier', category: 'Couple', alt: 'Couple embracing beneath a chandelier' },
  { slug: 'bridal-twilight', category: 'Bridal', alt: 'Bride photographed outdoors at twilight' },
  { slug: 'couple-rooftop', category: 'Couple', alt: 'Couple holding hands on a rooftop terrace' },
  { slug: 'bridal-mehndi', category: 'Bridal', alt: 'Close detail of mehndi and bridal jewellery' },
  { slug: 'couple-evening', category: 'Couple', alt: 'Couple in evening wear among greenery' }
];

const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 px-5 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <div className="eyebrow mb-4">Our Work</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-5 leading-tight">
            Recent Photographs
          </h2>
          <div className="rule-gold mx-auto mb-6" />
          <p className="text-base md:text-lg text-ink-muted leading-relaxed">
            A selection from recent weddings — traditional portraits, candid
            moments and the small details, shot and retouched in house.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {shots.map((shot, index) => (
            <motion.figure
              key={shot.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
              viewport={{ once: true, margin: '-40px' }}
              className="group relative overflow-hidden rounded-xl bg-surface-soft"
            >
              <img
                src={`/portfolio/${shot.slug}-1000.jpg`}
                srcSet={`/portfolio/${shot.slug}-560.jpg 560w, /portfolio/${shot.slug}-1000.jpg 1000w`}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                alt={shot.alt}
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-white">
                  {shot.category}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-ink-muted mb-6">
            Like what you see? Tell us your date and we'll check availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors"
            >
              Book on WhatsApp
            </a>
            <button
              onClick={() =>
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-7 py-3.5 rounded-full border border-surface-border text-ink text-sm font-semibold hover:bg-surface-soft transition-colors"
            >
              See Packages
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
