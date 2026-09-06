import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = ['Home', 'Services', 'Portfolio', 'Pricing', 'About'];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The nav sits transparent over the hero image, then turns solid white on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId.toLowerCase().replace(' ', '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Solid styling applies once scrolled, and always while the menu is open
  const solid = isScrolled || isMenuOpen;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${solid
            ? 'bg-white/95 backdrop-blur-md border-b border-surface-border shadow-nav'
            : 'bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Brand / Logo */}
            <button
              onClick={() => handleNavClick('Home')}
              className="flex items-center gap-2.5 group"
              aria-label="HK Production — back to top"
            >
              <img
                src="/logo-icon.png"
                alt="HK"
                className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className={`font-display text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                  solid ? 'text-gold-600' : 'text-gold-400'
                }`}
              >
                Production
              </span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-5 lg:gap-9">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`relative text-sm font-medium transition-colors duration-200 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full ${solid ? 'text-ink-muted hover:text-ink' : 'text-white/85 hover:text-white'
                    }`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('Contact')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${solid
                    ? 'bg-gold-500 text-white hover:bg-gold-600'
                    : 'bg-white/95 text-ink hover:bg-white'
                  }`}
              >
                Book Now
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`md:hidden w-10 h-10 -mr-2 flex items-center justify-center transition-colors duration-300 ${solid ? 'text-ink' : 'text-white'
                }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <i className={`fas ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="flex flex-col justify-center h-full px-8 gap-2">
              {[...navItems, 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.3 }}
                  onClick={() => handleNavClick(item)}
                  className="text-left font-display text-3xl font-medium text-ink py-3 border-b border-surface-border"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
