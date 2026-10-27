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
import FeaturedProducts from '../components/FeaturedProducts';

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

const orbitServices = [Headset, Laptop, Cloud, Network, ShieldCheck, LifeBuoy];

function ServiceOrbitCompact({ theme }: { theme: "light" | "dark" }) {
  return (
    <div className="relative size-[220px] lg:size-[310px] xl:size-[330px]" aria-hidden="true">
      <div className={`absolute inset-[7%] rounded-full border border-dashed animate-spin-slow ${theme === "light" ? "border-black/20" : "border-[#C9E265]/75"}`} />
      <div className={`absolute inset-[24%] rounded-full border border-dashed animate-spin-slow [animation-direction:reverse] ${theme === "light" ? "border-black/10" : "border-white/35"}`} />
      <div className="absolute inset-0 animate-orbit">
        {orbitServices.map((Icon, index) => {
          const angle = (index / orbitServices.length) * Math.PI * 2 - Math.PI / 2;
          const left = 50 + Math.cos(angle) * 43;
          const top = 50 + Math.sin(angle) * 43;

          return (
            <div
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className="animate-orbit-counter">
                <span className={`grid size-8 place-items-center rounded-lg border shadow-lg backdrop-blur-sm lg:size-10 ${theme === "light" ? "border-black/10 bg-white text-[#111111]" : "border-white/25 bg-white/95 text-[#b4d334]"}`}>
                  <Icon className="size-4 lg:size-5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border shadow-[0_0_35px_rgba(201,226,101,0.32)] animate-float-soft lg:size-28 ${
        theme === "light" ? "border-black/10 bg-white/95" : "border-white/20 bg-[#11191D]/95"
      }`}>
        <img
          src={theme === "light" ? "/light-logo.svg" : "/dark-logo.svg"}
          alt=""
          className="size-12 object-contain lg:size-16"
        />
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
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
        <section className={`relative isolate flex min-h-[540px] items-center overflow-hidden md:min-h-[500px] lg:min-h-[500px] ${
          theme === "light" ? "bg-[#d1de39]" : "bg-[#0B0F04]"
        }`}>
          <div className="relative w-full pb-9 pt-24 sm:pb-10 sm:pt-28 md:pt-24 lg:pb-9 lg:pt-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 px-4 sm:px-6 md:grid-cols-[1.03fr_0.97fr] md:gap-6 lg:gap-8 lg:px-2 xl:px-8">
              
              {/* Left Content */}
              <div className={`pt-0 text-left transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                
                <h1 className={`max-w-2xl text-left text-3xl font-extrabold uppercase leading-[1.04] tracking-[-0.025em] sm:text-4xl lg:text-[44px] xl:text-[48px] ${
                  theme === "light" ? "text-[#111111]" : "text-white"
                }`}>
                  <span className="block">Smart IT solutions</span>
                  <span className={`mt-1 block sm:whitespace-nowrap ${theme === "light" ? "text-white" : "text-[#C9E265]"}`}>for a smarter future</span>
                </h1>
                
                <p className={`mt-4 max-w-xl text-left text-xs font-medium leading-relaxed sm:text-sm lg:text-base ${
                  theme === "light" ? "text-[#333333]" : "text-white/80"
                }`}>
                  We help businesses stay connected, secure and productive with reliable IT support,
                  hardware, licensing and cloud solutions.
                </p>
                
                <ul className={`mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold tracking-[0.01em] sm:text-[13px] lg:text-[15px] ${
                  theme === "light" ? "text-[#111111]" : "text-white"
                }`}>
                  {["IT Support", "Hardware", "Microsoft 365", "Network Solutions"].map((item) => (
                    <li key={item} className="flex items-center gap-1.5 whitespace-nowrap sm:gap-2">
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]" /> {item}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 flex flex-wrap justify-start gap-2 sm:gap-3">
                  <a
                    href="#services"
                    className={`rounded-xl px-4 py-2.5 text-xs font-semibold shadow-lg transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm lg:px-7 lg:py-3.5 lg:text-base ${
                      theme === "light" ? "bg-[#111111] text-white hover:bg-black" : "bg-[#b4d334] text-white hover:bg-[#98ab06]"
                    }`}
                  >
                    Our services <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 inline" />
                  </a>
                  <a
                    href="#products"
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors sm:gap-2 sm:px-6 sm:py-3 sm:text-sm lg:px-7 lg:py-3.5 lg:text-base ${
                      theme === "light" ? "border-[#111111] bg-transparent text-[#111111] hover:bg-black/10" : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" /> View products
                  </a>
                </div>
              </div>

              {/* Orbit animation */}
              <div className={`hidden justify-center transition-all duration-1000 delay-150 md:flex lg:justify-end ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <ServiceOrbitCompact theme={theme} />
              </div>
            </div>
          </div>
        </section>

        {/* Trust and service promises - FORCED BLACK IN ALL MODES */}
        <div className="relative z-10 mx-auto -mt-8 max-w-7xl px-3 sm:-mt-9 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10 rounded-xl border border-white/10 bg-[#111111] shadow-[0_8px_30px_rgb(0,0,0,0.08)] sm:grid-cols-[1.25fr_1fr_1fr_1fr] sm:divide-y-0">
            
            <div className="col-span-2 flex min-w-0 items-center gap-2.5 px-4 py-3 sm:col-span-1 sm:px-5 lg:py-3.5">
              <ShieldCheck className="size-6 shrink-0 text-[#b4d334]" />
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase leading-tight tracking-[0.015em] text-white sm:text-sm">Trusted IT partner</p>
                <p className="mt-0.5 text-[9px] leading-tight text-white/60 sm:text-[9px] lg:text-[10px]">Supporting organisations across South Africa.</p>
              </div>
            </div>

            {pillars.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex min-w-0 items-center gap-2 px-3 py-3 sm:gap-2.5 sm:px-5 lg:py-3.5">
                <Icon className="size-5 shrink-0 text-[#b4d334] sm:size-6" />
                <p className="truncate text-xs font-bold uppercase leading-tight tracking-[0.015em] text-white sm:text-sm">
                  {title}<span className="ml-1 font-medium text-white/60">{sub}</span>
                </p>
              </div>
            ))}
            
          </div>
        </div>

        {/* Compact services + featured products */}
        <div
          id="solutions-showcase"
          className={`mt-4 sm:mt-6 xl:grid xl:grid-cols-2 xl:items-stretch ${
            theme === "light" ? "bg-[#F7F9F4]" : "bg-[#0F0F0F]"
          }`}
        >
          <section
            id="solutions"
            className={`w-full py-7 sm:py-8 xl:border-r xl:py-5 ${
              theme === "light" ? "xl:border-[#D7E2C8]" : "xl:border-[#3A4331]"
            }`}
          >
            <div className="mx-auto max-w-3xl px-3 sm:px-6 xl:px-5 2xl:px-8">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between xl:mb-3">
                <div className="max-w-xl">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b4d334]">What we do</span>
                  <h2 className={`mt-1 text-xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-2xl xl:text-xl ${
                    theme === "light" ? "text-[#111111]" : "text-[#F9FAFB]"
                  }`}>
                    Complete IT solutions <span className="text-[#b4d334]">for your business</span>
                  </h2>
                  <p className={`mt-2 max-w-lg text-[11px] leading-relaxed sm:text-xs ${
                    theme === "light" ? "text-[#6B7280]" : "text-[#9CA3AF]"
                  }`}>
                    End-to-end technology for government, state-owned enterprises and private sector organisations.
                  </p>
                </div>
                <a
                  href="#solutions"
                  className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-[#b4d334] px-3 py-2 text-[10px] font-bold uppercase text-[#b4d334] transition hover:bg-[#b4d334] hover:text-white sm:self-auto"
                >
                  See all solutions <ArrowRight className="size-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {offers.map(({ icon: Icon, title, body }) => (
                  <article
                    key={title}
                    className={`min-w-0 rounded-xl border p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md xl:p-2.5 ${
                      theme === "light"
                        ? "border-[#E3E8DA] bg-white"
                        : "border-[#3A4331] bg-[#1A1A1A]"
                    }`}
                  >
                    <div className="grid size-8 place-items-center rounded-lg bg-[#b4d334] text-white xl:size-7">
                      <Icon className="size-4 xl:size-3.5" />
                    </div>
                    <h3 className={`mt-2.5 text-xs font-extrabold leading-tight xl:mt-2 xl:text-[11px] ${
                      theme === "light" ? "text-[#111111]" : "text-[#F9FAFB]"
                    }`}>{title}</h3>
                    <p className={`mt-1 text-[10px] leading-4 xl:text-[9px] xl:leading-3.5 ${
                      theme === "light" ? "text-[#6B7280]" : "text-[#9CA3AF]"
                    }`}>{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <FeaturedProducts />
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