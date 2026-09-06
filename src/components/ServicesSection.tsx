import React from 'react';
import { motion } from 'framer-motion';

type ServiceData = {
  title: string;
  description: string;
  points: string[];
  cover: string | null;
  // fallback panel props (only used when cover is null)
  icon?: string;
  bgColor?: string;
  hatching?: string;
  iconBg?: string;
  iconBorder?: string;
  iconColor?: string;
  labelColor?: string;
  accentColor?: string;
  label?: string;
};

const services: ServiceData[] = [
  {
    title: 'Bridal Photography',
    description:
      'Portrait sessions that hold the detail of the day — the jewellery, the mehndi, the quiet moment before it all begins.',
    cover: '/services-bridal.jpg',
    points: ['Traditional & candid portraits', 'Studio and on-location', 'Retouched and album ready']
  },
  {
    title: 'Couple Photography',
    description:
      'Candid and cinematic coverage of the two of you, from the pre-wedding shoot through to the last dance.',
    cover: '/services-couple.jpg',
    points: ['Pre-wedding shoots', 'Cinematic highlights & teaser', 'Drone coverage available']
  },
  {
    title: 'Product Photography',
    description:
      'Clean, commercial product shots for catalogues, listings and campaigns — styled, lit and retouched in studio.',
    cover: '/services-product.jpg',
    points: ['Catalogue & listing images', 'Styled studio lighting', 'Bulk shoot pricing']
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-5 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <div className="eyebrow mb-4">What We Do</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-5 leading-tight">
            Our Services
          </h2>
          <div className="rule-gold mb-6" />
          <p className="text-base md:text-lg text-ink-muted leading-relaxed">
            Professional photography tailored to capture your most precious
            moments — shot, edited and delivered by our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col rounded-2xl overflow-hidden bg-white border border-surface-border shadow-card"
            >
              {/* Cover */}
              <div className="relative overflow-hidden">
                {service.cover ? (
                  <img
                    src={service.cover}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className={`relative w-full aspect-[4/3] flex flex-col items-center justify-center gap-3 ${service.bgColor} overflow-hidden`}>
                    <div
                      className="absolute inset-0 opacity-[0.5]"
                      style={{
                        backgroundImage:
                          `repeating-linear-gradient(45deg, transparent 0 10px, ${service.hatching} 10px 11px)`
                      }}
                      aria-hidden="true"
                    />
                    <span className={`relative w-14 h-14 rounded-full ${service.iconBg} border ${service.iconBorder} flex items-center justify-center`}>
                      <i className={`${service.icon} text-xl ${service.iconColor}`} />
                    </span>
                    <span className={`relative text-[11px] font-semibold uppercase tracking-eyebrow ${service.labelColor}`}>
                      {service.label}
                    </span>
                    <span className={`relative w-8 h-px ${service.accentColor}`} aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-col flex-grow p-6 md:p-7">
                <h3 className="font-display text-xl font-semibold text-ink mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="space-y-2 mt-auto">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-ink-muted">
                      <i className="fas fa-check text-[10px] text-gold-500 mt-1.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

