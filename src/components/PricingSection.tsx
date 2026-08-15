import React from 'react';
import { motion } from 'framer-motion';

const packages = [
  {
    name: 'Silver',
    duration: '2 days',
    price: '₹ 75,000',
    features: [
      'Traditional Photography',
      'Traditional Videography',
      '30 Pages Album (250 Photos)',
      'Full Movie – 2.5 to 3 Hours'
    ],
    highlighted: false
  },
  {
    name: 'Gold',
    duration: '2 days',
    price: '₹ 1,75,000',
    features: [
      'Traditional Photography',
      'Traditional Videography',
      'Cinematic Videography',
      'Candid Shoot',
      'Drone Shoot – 1 Day',
      'Album – 30 Pages (300 Photos)',
      'Highlight + Teaser',
      'Full Movie – 2.5 to 3 Hours'
    ],
    highlighted: true
  },
  {
    name: 'Diamond',
    duration: '2 days',
    price: '₹ 2,55,000',
    features: [
      'Traditional Photography',
      'Traditional Videography',
      'Cinematic Videography',
      'Candid Shoot',
      'Crowd Capture (Extra Photographer)',
      'AI Photo Scan',
      'Drone Shoot – 1 Day',
      'Album – 40 Pages (400 Photos) + Pen Drive',
      'Pre-Wedding Shoot – 1 Day',
      'Count Down 10-Days Photos + Cinematic Video',
      'Highlight + Teaser',
      'Full Movie – 2.5 to 3 Hours'
    ],
    highlighted: false
  }
];

const CheckIcon: React.FC<{ highlighted: boolean }> = ({ highlighted }) => (
  <svg
    className={`w-4 h-4 mt-0.5 shrink-0 ${highlighted ? 'text-gold-500' : 'text-gold-400'}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const PricingSection: React.FC = () => {
  const bookPackage = (name: string) => {
    const message = encodeURIComponent(
      `Hi! I am interested in the ${name} Package for my wedding.`
    );
    window.open(`https://wa.me/917778979768?text=${message}`, '_blank', 'noopener');
  };

  return (
    <section id="pricing" className="py-24 md:py-32 px-5 sm:px-8 bg-surface-soft">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <div className="eyebrow mb-4">Investment</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-5 leading-tight">
            Wedding Packages
          </h2>
          <div className="rule-gold mx-auto mb-6" />
          <p className="text-base md:text-lg text-ink-muted leading-relaxed">
            Three complete packages covering photography, videography and albums.
            Every package can be tailored to your celebration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              viewport={{ once: true, margin: '-60px' }}
              className={`relative flex flex-col h-full rounded-2xl bg-white transition-shadow duration-300 ${
                pkg.highlighted
                  ? 'border-2 border-gold-400 shadow-card-hover lg:-mt-4'
                  : 'border border-surface-border shadow-card hover:shadow-card-hover'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 rounded-full bg-gold-500 text-white text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div
                className={`px-7 pt-9 pb-7 text-center border-b ${
                  pkg.highlighted ? 'border-gold-200 bg-gold-50 rounded-t-2xl' : 'border-surface-border'
                }`}
              >
                <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-600 mb-4">
                  {pkg.name} Package
                </h3>
                <div className="font-display text-4xl font-semibold text-ink mb-2">
                  {pkg.price}
                </div>
                <div className="text-sm text-ink-light">{pkg.duration}</div>
              </div>

              {/* Features */}
              <ul className="flex-grow px-7 py-7 space-y-3.5">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon highlighted={pkg.highlighted} />
                    <span className="text-sm text-ink-muted leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="px-7 pb-7">
                <button
                  onClick={() => bookPackage(pkg.name)}
                  className={`w-full py-3.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    pkg.highlighted
                      ? 'bg-gold-500 text-white hover:bg-gold-600'
                      : 'bg-ink text-white hover:bg-ink/85'
                  }`}
                >
                  Book This Package
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-ink-light mt-10">
          Need something different?{' '}
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="text-gold-600 font-medium hover:text-gold-700 underline underline-offset-4"
          >
            Ask for a custom quote
          </button>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
