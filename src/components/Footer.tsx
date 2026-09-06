import React from 'react';

const PHONE = '917778979768';
const EMAIL = 'hkproduction379@gmail.com';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

const Footer: React.FC = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi, I'm interested in your photography services");
    window.open(`https://wa.me/${PHONE}?text=${message}`, '_blank', 'noopener');
  };

  const openInstagram = () => {
    window.open('https://instagram.com/hk.weddingfilms', '_blank', 'noopener');
  };

  return (
    <footer className="bg-white border-t border-surface-border px-5 sm:px-8 pt-16 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="HK Production"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              Capturing timeless wedding stories with artistry and precision.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-gold-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink mb-5">
              Connect
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-ink-muted hover:text-gold-600 transition-colors break-all"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${PHONE}`}
                  className="text-sm text-ink-muted hover:text-gold-600 transition-colors"
                >
                  +91 77789 79768
                </a>
              </li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={openWhatsApp}
                className="w-9 h-9 rounded-full border border-surface-border text-ink-muted hover:text-white hover:bg-[#25D366] hover:border-[#25D366] flex items-center justify-center transition-colors"
                aria-label="Contact us on WhatsApp"
              >
                <i className="fab fa-whatsapp" />
              </button>
              <button
                onClick={openInstagram}
                className="w-9 h-9 rounded-full border border-surface-border text-ink-muted hover:text-white hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent flex items-center justify-center transition-colors"
                aria-label="Visit our Instagram"
              >
                <i className="fab fa-instagram" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-7 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-light">
            © {new Date().getFullYear()} HK Production. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
