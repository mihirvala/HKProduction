import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { number: '150+', label: 'Projects Completed' },
  { number: '6', label: 'Years of Excellence' },
  { number: '3', label: 'Wedding Packages' },
  { number: '80+', label: 'Portfolio Photographs' }
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-5 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="eyebrow mb-4">About Us</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-5 leading-tight">
              Crafting visual stories since 2019
            </h2>
            <div className="rule-gold mb-7" />

            <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-5">
              At HK Production we believe every moment deserves to be captured
              with artistry and precision. Our team specialises in turning
              ordinary moments into extraordinary memories — with over 150
              successful projects and countless satisfied clients behind us.
            </p>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-8">
              Our approach combines technical excellence with creative vision, so
              every frame tells a compelling story. Whether it's your wedding day,
              a pre-wedding shoot or a portrait session, we capture the essence of
              the moment.
            </p>

            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-ink text-white text-sm font-semibold hover:bg-ink/85 transition-colors"
            >
              Start a conversation
              <i className="fas fa-arrow-right text-xs" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-px bg-surface-border rounded-2xl overflow-hidden border border-surface-border"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-8 md:p-10 text-center">
                <div className="font-display text-4xl md:text-5xl font-semibold text-gold-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-ink-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
