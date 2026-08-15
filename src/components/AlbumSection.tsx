import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Page = { slug: string; label: string };

// Real spreads from delivered albums, ordered the way an album reads
const pages: Page[] = [
  { slug: 'title', label: 'Title page' },
  { slug: 'cover', label: 'Cover portrait' },
  { slug: 'bride', label: 'Full-bleed portrait' },
  { slug: 'adorned', label: 'Editorial spread' },
  { slug: 'collage', label: 'Multi-photo layout' },
  { slug: 'serenity', label: 'Quote page' },
  { slug: 'queen', label: 'Framed portrait' },
  { slug: 'grid', label: 'Contact-sheet page' }
];

const src = (slug: string, w: 560 | 1000) => `/album/${slug}-${w}.jpg`;

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 70 : -70,
    opacity: 0,
    rotateY: dir > 0 ? -14 : 14
  }),
  center: { x: 0, opacity: 1, rotateY: 0 },
  exit: (dir: number) => ({
    x: dir > 0 ? -70 : 70,
    opacity: 0,
    rotateY: dir > 0 ? 14 : -14
  })
};

const AlbumSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + pages.length) % pages.length);
  }, []);

  const jumpTo = (target: number) => {
    setDirection(target > index ? 1 : -1);
    setIndex(target);
  };

  // Warm the neighbouring pages so a turn never shows an empty frame
  useEffect(() => {
    [(index + 1) % pages.length, (index - 1 + pages.length) % pages.length].forEach((i) => {
      const img = new Image();
      img.src = src(pages[i].slug, 1000);
    });
  }, [index]);

  // Arrow keys are scoped to the focused stage, so they never hijack page scroll
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const page = pages[index];

  return (
    <section id="album" className="py-24 md:py-32 px-5 sm:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <div className="eyebrow mb-4">What You Take Home</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-5 leading-tight">
            The Album
          </h2>
          <div className="rule-gold mx-auto mb-6" />
          <p className="text-base md:text-lg text-ink-muted leading-relaxed">
            Every package includes a printed album, designed page by page — not a
            folder of files. Turn through pages from albums we have delivered.
          </p>
        </motion.div>

        {/* Stage */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-60px' }}
          className="relative"
        >
          <div
            ref={stageRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            role="group"
            aria-roledescription="carousel"
            aria-label="Album pages"
            className="relative rounded-2xl bg-surface-soft border border-surface-border select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            style={{ perspective: '1600px' }}
          >
            {/* Drag lives on this wrapper, not on the image. The page-turn
                variants animate `x` on the image itself, and a drag gesture on
                the same element loses to that animation. */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -400) go(1);
                else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
              }}
              className="relative h-[380px] sm:h-[500px] lg:h-[600px] flex items-center justify-center px-14 sm:px-20 py-8 cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={page.slug}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  src={src(page.slug, 1000)}
                  srcSet={`${src(page.slug, 560)} 560w, ${src(page.slug, 1000)} 1000w`}
                  sizes="(min-width: 1024px) 520px, 90vw"
                  alt={`Album page — ${page.label}`}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  // Pages vary from 0.56 to 0.82 aspect: contain, never crop,
                  // or the set type on the designed pages gets sliced off.
                  className="h-full w-auto max-w-full object-contain rounded-sm shadow-[0_18px_50px_-18px_rgba(26,24,21,0.45)] pointer-events-none"
                />
              </AnimatePresence>
            </motion.div>

            {/* Arrows */}
            <button
              onClick={() => go(-1)}
              aria-label="Previous page"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur border border-surface-border text-ink hover:bg-white hover:text-gold-600 shadow-card transition-colors flex items-center justify-center"
            >
              <i className="fas fa-chevron-left text-sm" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next page"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur border border-surface-border text-ink hover:bg-white hover:text-gold-600 shadow-card transition-colors flex items-center justify-center"
            >
              <i className="fas fa-chevron-right text-sm" />
            </button>
          </div>

          {/* Caption + counter */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="text-sm text-ink">{page.label}</span>
            <span className="w-px h-4 bg-surface-border" />
            <span className="text-sm text-ink-light tabular-nums" aria-live="polite">
              Page {index + 1} of {pages.length}
            </span>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {pages.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => jumpTo(i)}
                aria-label={`Go to page ${i + 1}, ${p.label}`}
                aria-current={i === index}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-6 h-1.5 bg-gold-500'
                    : 'w-1.5 h-1.5 bg-surface-border hover:bg-gold-300'
                }`}
              />
            ))}
          </div>

          <p className="text-center text-xs text-ink-light mt-5">
            Drag, swipe, or use the arrow keys to turn pages
          </p>
        </motion.div>

        {/* Tie back to what the packages actually include */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 md:mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-surface-border rounded-2xl overflow-hidden border border-surface-border">
            {[
              { pkg: 'Silver', detail: '30 pages · 250 photos' },
              { pkg: 'Gold', detail: '30 pages · 300 photos' },
              { pkg: 'Diamond', detail: '40 pages · 400 photos + pen drive' }
            ].map((row) => (
              <div key={row.pkg} className="bg-white px-5 py-6">
                <div className="text-xs font-semibold uppercase tracking-eyebrow text-gold-600 mb-2">
                  {row.pkg}
                </div>
                <div className="text-sm text-ink-muted leading-snug">{row.detail}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mt-8 px-7 py-3.5 rounded-full bg-ink text-white text-sm font-semibold hover:bg-ink/85 transition-colors"
          >
            See full packages
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AlbumSection;
