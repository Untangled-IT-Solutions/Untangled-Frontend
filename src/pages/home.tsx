// src/pages/home.tsx
import { useEffect, useState } from 'react';
import { 
  ShoppingCart,
  Laptop,
  Network,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  LifeBuoy,
  Headset,
  ShieldCheck,
  Users,
  Cloud,
  Clock3,
  Trophy,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PARTNERS = [
  { name: "Dell", logo: "/partners/dell.svg" },
  { name: "HP", logo: "/partners/hp.svg" },
  { name: "Lenovo", logo: "/partners/lenovo.svg" },
  { name: "ASUS", logo: "/partners/asus.svg", invertOnDark: true },
  { name: "Huawei", logo: "/partners/huawei.svg" },
  { name: "Hikvision", logo: "/partners/hikvision.svg" },
  { name: "Eaton", logo: "/partners/eaton.svg" },
  { name: "Brother", logo: "/partners/brother.svg" },
  { name: "Bixolon", logo: "/partners/bixolon.svg" },
  { name: "Datalogic", logo: "/partners/datalogic.svg" },
  { name: "ATEN", logo: "/partners/aten.jpg" },
  { name: "G&G", logo: "/partners/gg.png" },
];

const offers = [
  { icon: Headset, title: "IT support & managed services", body: "Proactive monitoring and support that keeps your business running smoothly." },
  { icon: Cloud, title: "Microsoft 365 solutions", body: "Boost productivity and collaboration with secure cloud services." },
  { icon: Laptop, title: "Hardware & devices", body: "Quality laptops, desktops, monitors, printers and accessories." },
  { icon: KeyRound, title: "Microsoft licensing", body: "Microsoft 365, Windows Server and volume agreements sized correctly." },
  { icon: Network, title: "Network & security", body: "Switching, segmentation and secure design with clean documentation." },
  { icon: LifeBuoy, title: "Managed support", body: "SLA-backed support for users, endpoints and infrastructure." },
];

const pillars = [
  { icon: Headset, title: "Fast", sub: "response" },
  { icon: ShieldCheck, title: "Reliable", sub: "& secure" },
  { icon: Users, title: "Expert", sub: "team" },
];

const stats = [
  { icon: Users, value: "150+", label: "Happy clients" },
  { icon: Laptop, value: "1000+", label: "Devices deployed" },
  { icon: ShieldCheck, value: "99.9%", label: "Uptime support" },
  { icon: Clock3, value: "2hr", label: "Average response" },
  { icon: Trophy, value: "10+", label: "Years experience" },
];

const HERO_LAPTOPS = [
  { 
    id: '1', 
    tag: 'Demo unit', 
    name: 'Dell Latitude 5430', 
    specs: ['Intel Core i5 12th Gen', '16GB RAM', '512GB NVMe SSD', '14” FHD Display', 'Windows 11 Pro', '3-Year Next Business Day Warranty'],
    price: 'R15 950.00', 
    img: '/products/dell-latitude-5430.webp' 
  },
  { 
    id: '2', 
    tag: 'Demo unit', 
    name: 'Dell Latitude 5420', 
    specs: ['Intel Core i5 11th Gen', '16GB RAM', '512GB NVMe SSD', '14” FHD Display', 'Windows 11 Pro', '3-Year Next Business Day Warranty'],
    price: 'R13 950.00', 
    img: '/products/dell-latitude-5420.webp' 
  },
  { 
    id: '3', 
    tag: 'Brand new', 
    name: 'Dell Latitude 5440', 
    specs: ['Intel Core i5 13th Gen', '16GB RAM', '512GB NVMe SSD', '14” FHD Display', 'Windows 11 Pro', '3-Year Next Business Day Warranty'],
    price: 'R18 950.00', 
    img: '/products/dell-latitude-5440.webp' 
  },
  { 
    id: '4', 
    tag: 'Special deal', 
    name: 'Dell 24” Monitor – P2422H', 
    specs: ['24” FHD IPS Display', '1920 × 1080 Resolution', 'HDMI, DisplayPort, VGA', 'Height Adjustable', '3-Year Warranty'],
    price: 'R2 950.00', 
    img: '/products/dell-p2422h.webp' 
  },
];

export default function Home() {
  const { theme } = useTheme();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsInView(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex min-h-screen flex-col ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <main>
        
        {/* Dynamic hero section */}
        <section className={`relative isolate flex items-start overflow-hidden pb-10 pt-24 md:pt-28 lg:pb-16 lg:pt-28 min-h-[750px] ${
          theme === "light" ? "bg-[#d1de39]" : "bg-[#0B0F04]"
        }`}>
          <div className="relative w-full mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.2fr] md:gap-6 lg:gap-8">
              
              {/* Left Column: Text, Buttons, Trust Bar */}
              <div className={`flex flex-col h-full text-left transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                
                <h1 className={`max-w-xl text-left text-3xl font-extrabold uppercase leading-[1.04] tracking-[-0.025em] sm:text-4xl lg:text-[46px] xl:text-[50px] ${
                  theme === "light" ? "text-[#111111]" : "text-white"
                }`}>
                  <span className="block">Smart IT solutions</span>
                  <span className={`mt-1 block sm:whitespace-nowrap ${theme === "light" ? "text-white" : "text-[#C9E265]"}`}>for a smarter future</span>
                </h1>
                
                <p className={`mt-5 max-w-lg text-left text-sm font-medium leading-relaxed sm:text-base ${ 
                  theme === "light" ? "text-[#333333]" : "text-white/80"
                }`}>
                  We help businesses stay connected, secure and productive with reliable IT support,
                  hardware, licensing and cloud solutions.
                </p>
                
                <ul className={`mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold tracking-[0.01em] sm:text-[14px] ${ 
                  theme === "light" ? "text-[#111111]" : "text-white"
                }`}>
                  {["IT Support", "Hardware", "Microsoft 365", "Network Solutions"].map((item) => (
                    <li key={item} className="flex items-center gap-2 whitespace-nowrap">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> {item}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 flex flex-wrap justify-start gap-2 sm:gap-3">
                  <a
                    href="#services"
                    className={`rounded-xl px-4 py-2.5 text-xs font-semibold shadow-lg transition-transform hover:-translate-y-0.5 sm:px-5 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 lg:text-base ${
                      theme === "light" ? "bg-[#111111] text-white hover:bg-black" : "bg-[#b4d334] text-white hover:bg-[#98ab06]"
                    }`}
                  >
                    Our services <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 inline" />
                  </a>
                  <a
                    href="#products"
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 lg:text-base ${
                      theme === "light" ? "border-[#111111] bg-transparent text-[#111111] hover:bg-black/10" : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" /> View products
                  </a>
                </div>

                {/* Trust Bar */}
                <div className="mt-auto pt-8">
                  <div className="grid grid-cols-2 divide-x divide-y divide-white/10 rounded-xl border border-white/10 bg-[#111111] shadow-[0_8px_30px_rgb(0,0,0,0.15)] sm:grid-cols-[1.25fr_1fr_1fr_1fr] sm:divide-y-0 max-w-md">
                    
                    <div className="col-span-2 flex min-w-0 items-center gap-2 px-3 py-2 sm:col-span-1 sm:px-3">
                      <ShieldCheck className="size-4 shrink-0 text-[#b4d334]" />
                      <div className="min-w-0">
                        <p className="text-[9px] font-extrabold uppercase leading-tight tracking-[0.015em] text-white sm:text-[10px]">Trusted IT partner</p>
                        <p className="mt-0.5 text-[8px] leading-tight text-white/60">Supporting organisations across SA.</p>
                      </div>
                    </div>

                    {pillars.map(({ icon: Icon, title, sub }) => (
                      <div key={title} className="flex min-w-0 items-center gap-1 px-2 py-2 sm:gap-1.5 sm:px-2">
                        <Icon className="size-3 shrink-0 text-[#b4d334] sm:size-4" />
                        <p className="truncate text-[8px] font-bold uppercase leading-tight tracking-[0.015em] text-white sm:text-[9px]">
                          {title}<span className="ml-1 font-medium text-white/60">{sub}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Image and Laptops */}
              <div className={`flex flex-col transition-all duration-1000 delay-150 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                
                {/* 3D Monitor Image */}
                <div className="relative w-full max-w-[600px] mx-auto md:ml-auto md:mr-0 mb-6">
                  <img 
                    src="/image.png" 
                    alt="Smart IT Setup" 
                    className="w-full h-auto object-contain drop-shadow-2xl" 
                  />
                </div>

                {/* 4 Laptops under the image */}
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111]">Featured products</span>
                    <a href="#products" className="text-[10px] font-bold text-[#111111] hover:underline flex items-center gap-1">
                      View all <ArrowRight className="size-3" />
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                    {HERO_LAPTOPS.map((laptop) => (
                      <div key={laptop.id} className="bg-white rounded-lg p-2 shadow-sm flex flex-col border border-gray-100">
                        <span className="text-[7px] font-bold uppercase bg-[#d1de39] px-1 py-0.5 rounded text-[#111] self-start mb-1">{laptop.tag}</span>
                        
                        <div className="w-full h-16 mb-1 flex items-center justify-center">
                          <img src={laptop.img} alt={laptop.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        
                        <h3 className="text-[10px] font-bold text-gray-900 leading-tight mb-1 truncate">{laptop.name}</h3>
                        
                        <ul className="text-[7px] text-gray-500 leading-tight mb-2 flex-grow">
                          {laptop.specs.slice(0, 3).map((spec, i) => (
                            <li key={i} className="truncate">• {spec}</li>
                          ))}
                        </ul>
                        
                        <div className="mt-auto">
                          <p className="text-[10px] font-extrabold text-gray-900">{laptop.price}</p>
                          <p className="text-[7px] text-gray-500 mb-1">ex VAT</p>
                          <button className="w-full bg-[#111] text-white text-[8px] font-bold py-1 rounded flex items-center justify-between px-2">
                            View details <ArrowRight className="size-2" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* What we do (Reduced size & compact) */}
        <div
          id="solutions-showcase"
          className={`mt-4 sm:mt-6 ${
            theme === "light" ? "bg-[#F7F9F4]" : "bg-[#0F0F0F]"
          }`}
        >
          <section
            id="solutions"
            className={`w-full py-6 sm:py-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}
          >
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#b4d334]">What we do</span>
                <h2 className={`mt-1 text-lg font-extrabold uppercase leading-[1.05] tracking-tight sm:text-xl lg:text-2xl ${
                  theme === "light" ? "text-[#111111]" : "text-[#F9FAFB]"
                }`}>
                  Complete IT solutions <span className="text-[#b4d334]">for your business</span>
                </h2>
                <p className={`mt-1.5 max-w-lg text-[11px] leading-relaxed sm:text-xs ${
                  theme === "light" ? "text-[#6B7280]" : "text-[#9CA3AF]"
                }`}>
                  End-to-end technology for government, state-owned enterprises and private sector organisations.
                </p>
              </div>
              <a
                href="#solutions"
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-[#b4d334] px-3 py-1.5 text-[9px] font-bold uppercase text-[#b4d334] transition hover:bg-[#b4d334] hover:text-white sm:self-auto"
              >
                See all solutions <ArrowRight className="size-2.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className={`min-w-0 rounded-lg border p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    theme === "light"
                      ? "border-[#E3E8DA] bg-white"
                      : "border-[#3A4331] bg-[#1A1A1A]"
                  }`}
                >
                  <div className="grid size-8 place-items-center rounded-md bg-[#b4d334] text-white">
                    <Icon className="size-4" />
                  </div>
                  <h3 className={`mt-2 text-xs font-extrabold leading-tight ${
                    theme === "light" ? "text-[#111111]" : "text-[#F9FAFB]"
                  }`}>{title}</h3>
                  <p className={`mt-1 text-[10px] leading-relaxed ${
                    theme === "light" ? "text-[#6B7280]" : "text-[#9CA3AF]"
                  }`}>{body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* STATS SECTION */}
        <section className={`px-3 py-4 sm:px-6 lg:py-3.5 ${
          theme === "light" ? "bg-[#d1de39] text-[#111711]" : "bg-[#b4d334] text-[#111711]"
        }`}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-black/15">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center justify-center gap-2.5 px-2 text-left">
                <Icon className="size-7 shrink-0 stroke-[1.8] sm:size-8" />
                <div>
                  <p className="text-lg font-extrabold leading-none sm:text-xl">{value}</p>
                  <p className="mt-1 text-[10px] font-semibold leading-none opacity-80 sm:text-[11px]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OEM PARTNERS SECTION */}
        <section className={`w-full border-y ${
          theme === "light"
            ? "border-[#D7E2C8] bg-white"
            : "border-[#3A4331] bg-black"
        }`}>
          <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8 lg:py-3.5">
            <p className={`text-left text-[9px] font-bold uppercase tracking-[0.18em] sm:text-[10px] ${
              theme === "light" ? "text-[#6B7280]" : "text-[#9CA3AF]"
            }`}>
              Trusted OEM partners
            </p>
            <div className="mt-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <div className="flex w-max animate-marquee items-center gap-6 pr-6 sm:gap-8 sm:pr-8 lg:gap-10 lg:pr-10">
                {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                  <div
                    key={`${partner.name}-${i}`}
                    className="flex h-10 w-24 shrink-0 items-center justify-center px-1 sm:w-28 lg:h-11 lg:w-32"
                    aria-hidden={i >= PARTNERS.length}
                  >
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      decoding="async"
                      className={`h-6 w-full object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-[filter] duration-300 lg:h-7 dark:drop-shadow-[0_1px_2px_rgba(255,255,255,0.16)] ${
                        partner.invertOnDark ? "dark:brightness-0 dark:invert" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}