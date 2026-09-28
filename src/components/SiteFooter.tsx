import {
  ArrowUpRight,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import footerBackdrop from '../assets/background.png'
import { useTheme } from '../context/ThemeContext'

const quickLinks = [
  ['Home', '/'],
  ['About us', '/about'],
  ['Services', '/services'],
  ['Products', '/products'],
  ['Solutions', '/solutions'],
  ['Contact us', '#contact'],
]

const serviceLinks = [
  ['IT support', '/services'],
  ['Hardware & devices', '/products'],
  ['Network solutions', '/services'],
  ['Software solutions', '/services'],
]

const supportLinks = [
  ['Helpdesk', '#contact'],
  ['Remote support', '#contact'],
  ['Submit a ticket', '#contact'],
  ['Service status', '#contact'],
]

const pixels = [
  { top: '14%', left: '7%', size: 8, delay: '0s' },
  { top: '58%', left: '42%', size: 6, delay: '.7s' },
  { top: '22%', right: '9%', size: 9, delay: '.3s' },
  { bottom: '14%', right: '28%', size: 6, delay: '1s' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/untangleditsolutions',
    kind: 'instagram',
    colour: 'bg-[linear-gradient(135deg,#833AB4,#E1306C,#FCAF45)]',
  },
  {
    label: 'LinkedIn',
    href: 'https://za.linkedin.com/company/untangled-it-solutions',
    kind: 'linkedin',
    colour: 'bg-[#0A66C2]',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/untangleditsolutions',
    kind: 'facebook',
    colour: 'bg-[#1877F2]',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/27643276107',
    kind: 'whatsapp',
    colour: 'bg-[#25D366]',
  },
]

export default function SiteFooter() {
  const { theme } = useTheme()
  const light = theme === 'light'

  return (
    <footer id="contact" className={`relative isolate ${light ? 'bg-[#F7F9F4] text-[#111711]' : 'bg-black text-white'}`}>
      <div className={`relative overflow-hidden ${light ? 'bg-[#EEF3E7]' : 'bg-[#11191D]'}`}>
        <img src={footerBackdrop} alt="" aria-hidden="true" className={`pointer-events-none absolute inset-0 size-full object-cover mix-blend-luminosity animate-footer-drift ${light ? 'opacity-[0.035]' : 'opacity-[0.07]'}`} />
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${light ? 'bg-[radial-gradient(circle_at_10%_20%,rgba(185,215,25,0.18),transparent_30%),linear-gradient(115deg,rgba(247,249,244,0.88),rgba(238,243,231,0.96))]' : 'bg-[radial-gradient(circle_at_10%_20%,rgba(185,215,25,0.16),transparent_28%),linear-gradient(115deg,rgba(17,25,29,0.94),rgba(9,14,17,0.99))]'}`} />
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 [background-size:52px_52px] ${light ? 'opacity-[0.18] [background-image:linear-gradient(rgba(131,151,5,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(131,151,5,0.14)_1px,transparent_1px)]' : 'opacity-[0.08] [background-image:linear-gradient(rgba(185,215,25,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(185,215,25,0.35)_1px,transparent_1px)]'}`} />
        {pixels.map((pixel, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-[2px] bg-[#C9E265] animate-footer-pixel"
            style={{ ...pixel, width: pixel.size, height: pixel.size, animationDelay: pixel.delay }}
          />
        ))}

        <div className="relative mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.35fr_0.8fr_1fr_0.85fr_1.25fr] lg:gap-7 lg:px-8 lg:py-6">
          <div>
            <img src={light ? '/light-logo.svg' : '/dark-logo.svg'} alt="Untangled IT Solutions" className="h-14 w-auto max-w-full object-contain object-left sm:h-16" />
            <p className={`mt-2.5 max-w-xs text-[11px] leading-4 ${light ? 'text-[#4B5563]' : 'text-white/60'}`}>
              Reliable software, infrastructure, hardware procurement and IT consulting for organisations across South Africa.
            </p>
            <p className={`mt-3 text-[10px] font-bold uppercase tracking-[0.16em] ${light ? 'text-[#839705]' : 'text-[#C9E265]'}`}>Follow us</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, kind, colour }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Follow Untangled IT Solutions on ${label}`}
                  title={label}
                  className={`group grid size-9 place-items-center rounded-xl text-white shadow-sm ring-1 transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#839705] sm:size-10 ${colour} ${light ? 'ring-black/10' : 'ring-white/15'}`}
                >
                  <SocialGlyph kind={kind} />
                </a>
              ))}
            </div>
          </div>

          <FooterLinks title="Quick links" links={quickLinks} light={light} />
          <FooterLinks title="Our services" links={serviceLinks} light={light} />
          <FooterLinks title="Support" links={supportLinks} light={light} />

          <div>
            <h2 className={`text-xs font-extrabold uppercase tracking-[0.18em] ${light ? 'text-[#839705]' : 'text-[#C9E265]'}`}>Contact details</h2>
            <ul className={`mt-3 space-y-2 text-[11px] leading-4 ${light ? 'text-[#4B5563]' : 'text-white/65'}`}>
              <li>
                  <a href="https://www.google.com/maps/search/?api=1&query=9611+Goseame+Street+Ivory+Park+Ext+9+Midrand+1685" target="_blank" rel="noreferrer noopener" className="group flex items-start gap-2 hover:text-[#839705]">
                  <MapPin className={`mt-0.5 size-4 shrink-0 ${light ? 'text-[#839705]' : 'text-[#B9D719]'}`} />
                  <span>9611 Goseame Street<br />Ivory Park Ext 9, Midrand, 1685</span>
                  <ArrowUpRight className="mt-0.5 size-3 shrink-0 opacity-50" />
                </a>
              </li>
              <li className="flex items-center gap-2"><Phone className={`size-4 shrink-0 ${light ? 'text-[#839705]' : 'text-[#B9D719]'}`} /><a href="tel:+27107462471" className="hover:text-[#839705]">+27 (10) 746-2471</a></li>
              <li><a href="https://wa.me/27643276107" target="_blank" rel="noreferrer noopener" className="flex items-center gap-2 hover:text-[#25D366]"><span className="grid size-4 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"><SocialGlyph kind="whatsapp" /></span>064 327 6107</a></li>
              <li><a href="mailto:sales@untangledits.co.za" className="flex items-start gap-2 break-all hover:text-[#839705]"><Mail className="mt-0.5 size-4 shrink-0 text-[#839705]" />sales@untangledits.co.za</a></li>
              <li><a href="mailto:zmaredi@untangledits.co.za" className="flex items-start gap-2 break-all hover:text-[#839705]"><Mail className="mt-0.5 size-4 shrink-0 text-[#839705]" />zmaredi@untangledits.co.za</a></li>
              <li><a href="https://www.untangledits.co.za" target="_blank" rel="noreferrer noopener" className="flex items-start gap-2 break-all hover:text-[#839705]"><Globe2 className="mt-0.5 size-4 shrink-0 text-[#839705]" />www.untangledits.co.za</a></li>
            </ul>
          </div>
        </div>

        <div className={`relative border-t ${light ? 'border-[#839705]/20' : 'border-white/10'}`}>
          <div className={`mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-[10px] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 ${light ? 'text-[#6B7280]' : 'text-white/45'}`}>
            <p>© {new Date().getFullYear()} Untangled IT Solutions (Pty) Ltd. All rights reserved. · Reg No. 2016/086055/07 · VAT No. 4110280148</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-[#839705]">Terms &amp; Conditions</a>
              <a href="#" className="hover:text-[#839705]">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({ title, links, light }: { title: string; links: string[][]; light: boolean }) {
  return (
    <div>
      <h2 className={`text-xs font-extrabold uppercase tracking-[0.18em] ${light ? 'text-[#839705]' : 'text-[#C9E265]'}`}>{title}</h2>
      <ul className={`mt-3 space-y-1.5 text-[11px] ${light ? 'text-[#4B5563]' : 'text-white/60'}`}>
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="transition hover:text-[#839705]">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialGlyph({ kind }: { kind: string }) {
  if (kind === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="size-[18px] transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (kind === 'linkedin') {
    return <span className="text-[15px] font-black leading-none tracking-[-0.08em] transition-transform group-hover:scale-110" aria-hidden="true">in</span>
  }

  if (kind === 'facebook') {
    return <span className="text-xl font-black leading-none transition-transform group-hover:scale-110" aria-hidden="true">f</span>
  }

  if (kind === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" className="size-[18px] transition-transform group-hover:scale-110" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.84 9.84 0 0 0-8.48 14.82L2 22l5.32-1.52A9.9 9.9 0 1 0 12.04 2Zm0 17.82a8 8 0 0 1-4.08-1.12l-.29-.17-3.16.9.9-3.07-.19-.31a7.97 7.97 0 1 1 6.82 3.77Zm4.38-5.98c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.64-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42h-.46a.88.88 0 0 0-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    )
  }

  return <MessageCircle className="size-[18px] transition-transform group-hover:scale-110" strokeWidth={2.2} aria-hidden="true" />
}
