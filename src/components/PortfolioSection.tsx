import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_CATEGORIES, GALLERY_PHOTOS, GalleryPhoto, GalleryCategory } from '../data/galleryData';
import { GalleryLightbox } from './GalleryLightbox';

const WHATSAPP_URL =
  'https://wa.me/917778979768?text=' +
  encodeURIComponent("Hi, I saw your work on the website and I'd like to book a date.");

const INITIAL_BATCH_SIZE = 16;
const LOAD_MORE_INCREMENT = 16;

const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory['id']>('all');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Filter photos based on active category
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') {
      return GALLERY_PHOTOS;
    }
    return GALLERY_PHOTOS.filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory]);

  // Sliced photos for progressive loading
  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  const hasMore = visibleCount < filteredPhotos.length;
  const remainingCount = filteredPhotos.length - visibleCount;

  // Handle category switch
  const handleCategoryChange = (catId: GalleryCategory['id']) => {
    setSelectedCategory(catId);
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_INCREMENT, filteredPhotos.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredPhotos.length);
  };

  const openLightbox = (photo: GalleryPhoto) => {
    setActivePhoto(photo);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setActivePhoto(null);
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-surface-soft">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <div className="eyebrow mb-3">Our Portfolio</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-4 leading-tight">
            Recent Photographs
          </h2>
          <div className="rule-gold mx-auto mb-5" />
          <p className="text-base md:text-lg text-ink-muted leading-relaxed">
            Browse our complete photo archive categorized by wedding celebrations, bridal
            portraits, pre-wedding romance, and groom portraits — all shot and retouched in house.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 md:mb-12"
        >
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gold-500 text-white shadow-md shadow-gold-500/20 scale-[1.02]'
                    : 'bg-white text-ink-muted hover:text-ink hover:bg-white/80 border border-surface-border'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-black/20 text-white'
                      : 'bg-surface-soft text-ink-muted'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Status indicator / Counter bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-ink-muted mb-6 px-1 border-b border-surface-border/60 pb-3">
          <div>
            Showing <strong className="text-ink font-semibold">{displayedPhotos.length}</strong> of{' '}
            <strong className="text-ink font-semibold">{filteredPhotos.length}</strong> photographs
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gold-600 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Click any photo to view full size</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
        >
          <AnimatePresence>
            {displayedPhotos.map((photo, index) => {
              const isLoaded = loadedImages[photo.id];
              return (
                <motion.figure
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min((index % 12) * 0.03, 0.3) }}
                  onClick={() => openLightbox(photo)}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
                >
                  {/* Aspect Ratio Container (Portrait 2:3) */}
                  <div className="relative w-full aspect-[2/3] bg-surface-border/40 overflow-hidden">
                    {/* Skeleton loader until image loads */}
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-surface-border/30 via-surface-border/60 to-surface-border/30 animate-pulse" />
                    )}

                    <img
                      src={photo.thumbUrl}
                      alt={photo.alt}
                      loading={index < 8 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onLoad={() => handleImageLoad(photo.id)}
                      className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.05] ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Gradient Overlay & Hover Information */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4">
                      {/* Top badge */}
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-gold-300 backdrop-blur-sm border border-gold-400/30">
                          {photo.categoryLabel}
                        </span>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold-500/90 text-white flex items-center justify-center shadow-md">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom title */}
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-white truncate">
                          {photo.title}
                        </p>
                        <p className="text-[10px] sm:text-xs text-white/70">
                          Click to preview
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More & Pagination Controls */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={handleLoadMore}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold text-sm transition-all shadow-md shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Load More Photos</span>
              <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs">
                +{Math.min(LOAD_MORE_INCREMENT, remainingCount)}
              </span>
            </button>

            {remainingCount > LOAD_MORE_INCREMENT && (
              <button
                onClick={handleShowAll}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-surface-border/50 text-ink font-semibold text-sm border border-surface-border transition-colors"
              >
                Show All ({filteredPhotos.length})
              </button>
            )}
          </motion.div>
        )}

        {/* Finished viewing banner & Booking CTA */}
        {!hasMore && filteredPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-14 text-center max-w-xl mx-auto p-6 rounded-2xl bg-white border border-surface-border/80 shadow-sm"
          >
            <p className="text-sm text-ink-muted mb-4">
              You've viewed all <strong>{filteredPhotos.length}</strong> photographs in{' '}
              <span className="text-gold-600 font-semibold">
                {selectedCategory === 'all'
                  ? 'All Categories'
                  : GALLERY_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
              </span>
              . Ready to capture your wedding story?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold transition-all shadow-sm"
              >
                <i className="fab fa-whatsapp text-base" />
                <span>Book on WhatsApp</span>
              </a>
              <button
                onClick={() =>
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-6 py-3 rounded-full border border-surface-border text-ink text-sm font-semibold hover:bg-surface-soft transition-colors"
              >
                View Packages
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        photo={activePhoto}
        photos={filteredPhotos}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onSelectPhoto={(photo) => setActivePhoto(photo)}
      />
    </section>
  );
};

export default PortfolioSection;
