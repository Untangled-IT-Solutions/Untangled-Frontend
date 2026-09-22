import { ArrowRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const products = [
  {
    name: 'Dell Latitude 5430',
    price: 'R15 950.00',
    badge: 'Demo unit',
    image: '/products/dell-latitude-5430.webp',
    specs: ['Intel Core i5 12th Gen', '16GB RAM', '512GB NVMe SSD', '14” FHD Display', 'Windows 11 Pro', '3-Year Next Business Day Warranty'],
  },
  {
    name: 'Dell Latitude 5420',
    price: 'R13 950.00',
    badge: 'Demo unit',
    image: '/products/dell-latitude-5420.webp',
    specs: ['Intel Core i5 11th Gen', '16GB RAM', '512GB NVMe SSD', '14” FHD Display', 'Windows 11 Pro', '3-Year Next Business Day Warranty'],
  },
  {
    name: 'Dell Latitude 5440',
    price: 'R18 950.00',
    badge: 'Brand new',
    image: '/products/dell-latitude-5440.webp',
    specs: ['Intel Core i5 13th Gen', '16GB RAM', '512GB NVMe SSD', '14” FHD Display', 'Windows 11 Pro', '3-Year Next Business Day Warranty'],
  },
  {
    name: 'Dell 24” Monitor – P2422H',
    price: 'R2 950.00',
    badge: 'Special deal',
    image: '/products/dell-p2422h.webp',
    specs: ['24” FHD IPS Display', '1920 × 1080 Resolution', 'HDMI, DisplayPort, VGA', 'Height Adjustable', '3-Year Warranty'],
  },
]

function DeviceVisual({ image, name, badge }: { image: string; name: string; badge: string }) {
  return (
    <div className="relative grid h-20 place-items-center overflow-hidden rounded-lg bg-white p-1.5 sm:h-24 xl:h-16">
      <span className="absolute left-1 top-1 z-10 rounded bg-[#C9E265] px-1.5 py-0.5 text-[7px] font-extrabold uppercase tracking-wide text-[#111111] shadow-sm">
        {badge}
      </span>
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        className="size-full max-h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:max-h-20 xl:max-h-12"
      />
    </div>
  )
}

export default function FeaturedProducts() {
  const { theme } = useTheme()
  const light = theme === 'light'

  return (
    <section id="products" className={`overflow-hidden border-t xl:border-t-0 ${light ? 'border-[#D7E2C8] bg-[#F7F9F4]' : 'border-[#3A4331] bg-[#0F0F0F]'}`}>
      <div className="mx-auto max-w-3xl px-3 py-7 sm:px-6 sm:py-8 xl:px-5 xl:py-5 2xl:px-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between xl:mb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#839705]">Featured products</p>
            <h2 className={`mt-1 text-xl font-extrabold uppercase leading-[1.05] sm:text-2xl xl:text-xl ${light ? 'text-[#111111]' : 'text-white'}`}>
              Quality devices. <span className="text-[#839705]">Great prices.</span>
            </h2>
          </div>
          <a href="#products" className="inline-flex shrink-0 items-center gap-1.5 self-start text-[10px] font-bold uppercase text-[#839705] hover:underline sm:self-auto">
            View all products <ArrowRight className="size-3" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-2.5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-2">
          {products.map((product) => (
            <article
              key={product.name}
              className={`group flex min-w-0 flex-col rounded-xl border p-2 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md xl:p-1.5 ${
                light ? 'border-[#D7E2C8] bg-white' : 'border-[#3A4331] bg-[#151515]'
              }`}
            >
              <DeviceVisual image={product.image} name={product.name} badge={product.badge} />
              <h3 className={`mt-2 break-words text-xs font-extrabold leading-tight xl:mt-1.5 xl:text-[10px] ${light ? 'text-[#111111]' : 'text-white'}`}>{product.name}</h3>
              <ul className={`mt-1.5 flex-1 space-y-0 text-[9px] leading-[1.3] sm:text-[10px] xl:mt-1 xl:text-[8px] xl:leading-[1.2] ${light ? 'text-[#4B5563]' : 'text-[#B6B9BE]'}`}>
                {product.specs.map((spec) => <li key={spec}>• {spec}</li>)}
              </ul>
              <div className="mt-2 xl:mt-1.5">
                <p className="text-base font-extrabold leading-none text-[#839705] xl:text-sm">{product.price}</p>
                <p className={`mt-0.5 text-[8px] uppercase ${light ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>ex VAT</p>
                <a
                  href={`mailto:sales@untangledits.co.za?subject=${encodeURIComponent(`Product enquiry: ${product.name}`)}`}
                  className="mt-2 flex min-h-8 w-full items-center justify-center gap-1 rounded-md bg-[#111711] px-2 py-1.5 text-[9px] font-bold uppercase text-white transition hover:bg-[#839705] xl:mt-1.5 xl:min-h-7 xl:py-1"
                >
                  View details <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
