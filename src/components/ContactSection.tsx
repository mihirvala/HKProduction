import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PHONE = '917778979768';
const EMAIL = 'hkproduction379@gmail.com';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-surface-border bg-white text-ink text-sm placeholder:text-ink-light focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200 transition-colors';

const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Wedding',
    message: '',
    contactMethod: 'WhatsApp'
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const messageContent = `Hi, I'm ${formData.fullName} and I'm interested in ${formData.service} photography services.

Message: ${formData.message}
Email: ${formData.email}
Phone: ${formData.phone}`;

    if (formData.contactMethod === 'Email') {
      const subject = encodeURIComponent(`Photography Inquiry - ${formData.service}`);
      const body = encodeURIComponent(messageContent);
      window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank');
      return;
    }

    // WhatsApp and Phone both hand off to WhatsApp so the enquiry isn't lost
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(messageContent)}`,
      '_blank',
      'noopener'
    );
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi, I'm interested in your photography services");
    window.open(`https://wa.me/${PHONE}?text=${message}`, '_blank', 'noopener');
  };

  const openInstagram = () => {
    window.open('https://instagram.com/hk_weddingstudio', '_blank', 'noopener');
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-5 sm:px-8 bg-surface-soft">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <div className="eyebrow mb-4">Get In Touch</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-5 leading-tight">
            Let's capture your day
          </h2>
          <div className="rule-gold mx-auto mb-6" />
          <p className="text-base md:text-lg text-ink-muted leading-relaxed">
            Tell us about your celebration and we'll get back to you with
            availability and a tailored quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-2"
          >
            <div className="h-full bg-white rounded-2xl border border-surface-border shadow-card p-7 md:p-9">
              <h3 className="font-display text-xl font-semibold text-ink mb-7">
                Contact Information
              </h3>

              <div className="space-y-5 mb-9">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start gap-4 group"
                >
                  <span className="w-10 h-10 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                    <i className="fas fa-envelope text-sm" />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-light mb-0.5">Email</span>
                    <span className="text-sm text-ink group-hover:text-gold-600 transition-colors break-all">
                      {EMAIL}
                    </span>
                  </span>
                </a>

                <a href={`tel:+${PHONE}`} className="flex items-start gap-4 group">
                  <span className="w-10 h-10 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                    <i className="fas fa-phone text-sm" />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-light mb-0.5">Phone</span>
                    <span className="text-sm text-ink group-hover:text-gold-600 transition-colors">
                      +91 77789 79768
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                    <i className="fas fa-location-dot text-sm" />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-light mb-0.5">Based in</span>
                    <span className="text-sm text-ink">India</span>
                  </span>
                </div>
              </div>

              <div className="pt-7 border-t border-surface-border">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-4">
                  Quick Contact
                </h4>
                <div className="flex gap-3">
                  <button
                    onClick={openWhatsApp}
                    className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:brightness-95 transition"
                    aria-label="Contact us on WhatsApp"
                  >
                    <i className="fab fa-whatsapp text-lg" />
                  </button>
                  <button
                    onClick={openInstagram}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center hover:brightness-95 transition"
                    aria-label="Visit our Instagram"
                  >
                    <i className="fab fa-instagram text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-surface-border shadow-card p-7 md:p-9"
            >
              <h3 className="font-display text-xl font-semibold text-ink mb-7">
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Couple / Pre-Wedding">Couple / Pre-Wedding</option>
                    <option value="Product">Product</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell us your date, venue and what you have in mind…"
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contactMethod" className={labelClass}>
                    Preferred Contact Method
                  </label>
                  <select
                    id="contactMethod"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-7 py-3.5 rounded-full bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors"
              >
                Send Message
              </button>

              <p className="text-xs text-ink-light text-center mt-4">
                Submitting opens {formData.contactMethod === 'Email' ? 'your email app' : 'WhatsApp'}{' '}
                with your message ready to send.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
