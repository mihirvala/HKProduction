import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryPhoto } from '../data/galleryData';

interface GalleryLightboxProps {
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  photo,
  photos,
  isOpen,
  onClose,
  onSelectPhoto,
}) => {
  const [isFullLoaded, setIsFullLoaded] = useState(false);

  // Find index of current photo in filtered list
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < photos.length - 1;

  const handlePrev = React.useCallback(() => {
    if (hasPrev) {
      setIsFullLoaded(false);
      onSelectPhoto(photos[currentIndex - 1]);
    }
  }, [hasPrev, photos, currentIndex, onSelectPhoto]);

  const handleNext = React.useCallback(() => {
    if (hasNext) {
      setIsFullLoaded(false);
      onSelectPhoto(photos[currentIndex + 1]);
    }
  }, [hasNext, photos, currentIndex, onSelectPhoto]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset image loaded state on photo change
  useEffect(() => {
    setIsFullLoaded(false);
  }, [photo?.id]);

  if (!isOpen || !photo) return null;

  const whatsappInquiryUrl =
    'https://wa.me/917778979768?text=' +
    encodeURIComponent(
      `Hi HK Production, I saw this photo (${photo.categoryLabel} - ${photo.title}) in your gallery and would like to inquire about similar wedding coverage.`
    );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md select-none"
        onClick={onClose}
      >
        {/* Top bar */}
        <div
          className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 py-4 text-white/90 bg-gradient-to-b from-black/80 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
              {photo.categoryLabel}
            </span>
            <span className="text-xs text-white/60 font-medium">
              {currentIndex + 1} of {photos.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-xs font-semibold transition-colors shadow-sm"
              title="Inquire about this style on WhatsApp"
            >
              <i className="fab fa-whatsapp text-sm" />
              <span>Inquire This Style</span>
            </a>

            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close photo preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 z-20 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/50 hover:bg-gold-500 text-white border border-white/15 hover:border-gold-500 transition-all shadow-lg hover:scale-105 active:scale-95"
            aria-label="Previous photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 z-20 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/50 hover:bg-gold-500 text-white border border-white/15 hover:border-gold-500 transition-all shadow-lg hover:scale-105 active:scale-95"
            aria-label="Next photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Main image container */}
        <div
          className="relative max-w-6xl max-h-[85vh] p-2 sm:p-4 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Low-res thumbnail as blur preview while full loads */}
          {!isFullLoaded && (
            <img
              src={photo.thumbUrl}
              alt=""
              aria-hidden="true"
              className="max-h-[80vh] max-w-[90vw] object-contain filter blur-md scale-98 transition-all"
            />
          )}

          {/* Full-resolution image */}
          <motion.img
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: isFullLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={photo.fullUrl}
            alt={photo.alt}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onLoad={() => setIsFullLoaded(true)}
            className={`max-h-[82vh] max-w-[92vw] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
              isFullLoaded ? 'relative' : 'absolute'
            }`}
          />
        </div>

        {/* Bottom bar / caption */}
        <div
          className="absolute bottom-0 inset-x-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 px-6 py-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white/80"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-medium text-white tracking-wide">
              {photo.title}
            </h4>
            <p className="text-xs text-white/60">
              HK Production · Authentic Moments & Fine Art Photography
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-white/50">
            <span className="hidden sm:inline">Use ← and → arrows to navigate</span>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500 text-white text-xs font-semibold"
            >
              <i className="fab fa-whatsapp" /> Inquire
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
