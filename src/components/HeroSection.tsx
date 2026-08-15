import React from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_URL =
  'https://wa.me/917778979768?text=' +
  encodeURIComponent("Hi, I'm interested in your photography services");

const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink">
      {/* Full-bleed photograph. Phones get a portrait crop — the landscape
          frame centre-crops to the couple's hands and loses both faces. */}
      <picture className="absolute inset-0 block">
        <source
          media="(max-width: 767px)"
          srcSet="/hero/hero-mobile-720.jpg 720w, /hero/hero-mobile-1080.jpg 1080w"
          sizes="100vw"
        />
        <source
          srcSet="/hero/hero-1280.jpg 1280w, /hero/hero-2400.jpg 2400w"
          sizes="100vw"
        />
        <img
          src="/hero/hero-2400.jpg"
          alt="A bride and groom on their wedding day"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Bottom scrim keeps the headline legible over a bright photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
      {/* Top scrim keeps the nav legible where the photo is pale */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/55 to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pb-20 md:pb-28 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold-300" />
            <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-200">
              Wedding Photography · Since 2019
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05] mb-5">
            HK Production
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-xl mb-9 leading-relaxed">
            Capturing moments that tell timeless stories — bridal, couple and
            candid photography across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('services')}
              className="px-7 py-3.5 rounded-full bg-white text-ink text-sm font-semibold hover:bg-gold-50 transition-colors duration-200"
            >
              View Our Work
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full border border-white/45 text-white text-sm font-semibold text-center hover:bg-white/10 transition-colors duration-200"
            >
              Book on WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => scrollTo('services')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="hidden md:flex absolute right-8 bottom-24 flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
          aria-label="Scroll to services"
        >
          <span className="text-[10px] font-medium uppercase tracking-eyebrow [writing-mode:vertical-rl]">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-white/50"
          />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
