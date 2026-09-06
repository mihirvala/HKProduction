import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_URL =
  'https://wa.me/917778979768?text=' +
  encodeURIComponent("Hi, I'm interested in your photography services");

const headlines = [
  'Moments Captured for a Lifetime',
  'Crafting Timeless Wedding Stories',
  'Timeless Love, Artfully Captured',
  'Where Every Love Story Begins'
];

const HeroSection: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentHeadline = headlines[headlineIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText === currentHeadline) {
      // Completed full sentence — pause so visitor can read
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2600);
    } else if (isDeleting && displayedText === '') {
      // Finished backspacing — pause briefly then start next sentence
      timer = setTimeout(() => {
        setIsDeleting(false);
        setHeadlineIndex((prev) => (prev + 1) % headlines.length);
      }, 400);
    } else {
      // Typing next character or backspacing
      const speed = isDeleting ? 30 : 65;
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? currentHeadline.substring(0, prev.length - 1)
            : currentHeadline.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, headlineIndex]);

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
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
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

          <div className="min-h-[85px] sm:min-h-[95px] md:min-h-[120px] flex items-start mb-5">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.15] tracking-tight">
              <span>{displayedText}</span>
              <span
                className="inline-block w-[2.5px] sm:w-[3px] md:w-[4px] h-[0.82em] bg-gold-400 ml-1.5 align-baseline animate-pulse shadow-[0_0_8px_rgba(217,188,124,0.75)]"
                aria-hidden="true"
              />
            </h1>
          </div>

          <p className="text-base md:text-lg text-white/80 max-w-xl mb-9 leading-relaxed">
            Bridal, couple and candid wedding photography across India — capturing
            every precious emotion with artistry and elegance.
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
