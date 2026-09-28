// src/lib/store-data.ts
export type Availability = "in-stock" | "low-stock" | "on-order";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  segment: "products" | "business" | "refurbished";
  shortDescription: string;
  specs: string[];
  price: number | null; // null = quote only
  availability: Availability;
  quoteOnly?: boolean;
  condition?: string;
  grade?: string;
  warranty?: string;
  keywords?: string[];
};

export const PRODUCT_CATEGORIES = [
  "Laptops",
  "Desktops",
  "Workstations",
  "Monitors",
  "Docks",
  "Computer Accessories",
  "Input Devices",
  "Networking Equipment",
  "Storage",
  "Cables",
  "Other IT Hardware",
] as const;

export const REFURB_CATEGORIES = [
  "Refurbished Laptops",
  "Refurbished Desktops",
  "Refurbished Monitors",
  "Refurbished Workstations",
  "Refurbished Servers",
] as const;

export const BRANDS = ["Dell", "Lenovo", "HP", "Logitech", "Ubiquiti", "Samsung", "Kingston", "APC"];

export const availabilityLabel: Record<Availability, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "on-order": "On order",
};

export const products: Product[] = [
  // ============================================================
  // BUSINESS LAPTOPS
  // ============================================================
  {
    id: "lat-5440",
    name: "Dell Latitude 5440",
    brand: "Dell",
    category: "Laptops",
    segment: "products",
    shortDescription: "Business laptop with Intel Core i5/i7, 16GB RAM, 512GB SSD, Windows 11 Pro",
    specs: ["Intel Core i5/i7", "16GB RAM", "512GB SSD", "Windows 11 Pro"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year ProSupport",
    keywords: ["business", "laptop", "dell", "latitude", "windows"],
  },
  {
    id: "tp-t14",
    name: "Lenovo ThinkPad T14",
    brand: "Lenovo",
    category: "Laptops",
    segment: "products",
    shortDescription: "Business laptop with Intel Core i5/i7, 16GB RAM, 512GB SSD, TPM 2.0",
    specs: ["Intel Core i5/i7", "16GB RAM", "512GB SSD", "TPM 2.0"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year on-site",
    keywords: ["business", "laptop", "lenovo", "thinkpad", "tpm"],
  },
  {
    id: "lat-7440",
    name: "Dell Latitude 7440",
    brand: "Dell",
    category: "Laptops",
    segment: "products",
    shortDescription: "Premium business laptop with Intel Core i7-1365U, 32GB RAM, 1TB NVMe SSD",
    specs: ["Intel Core i7-1365U", "32GB RAM", "1TB NVMe SSD", '14" FHD+ Display', "Wi-Fi 6E + Thunderbolt 4"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year ProSupport Plus",
    keywords: ["business", "premium", "laptop", "dell", "latitude"],
  },

  // ============================================================
  // DESKTOPS AND WORKSTATIONS
  // ============================================================
  {
    id: "opti-7010-new",
    name: "Dell OptiPlex 7010",
    brand: "Dell",
    category: "Desktops",
    segment: "products",
    shortDescription: "Business desktop with Intel Core i7, 16GB RAM, 1TB SSD, Windows 11 Pro",
    specs: ["Intel Core i7", "16GB RAM", "1TB SSD", "Windows 11 Pro"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year on-site",
    keywords: ["desktop", "business", "dell", "optiplex", "windows"],
  },
  {
    id: "ts-p3",
    name: "Lenovo ThinkStation P3",
    brand: "Lenovo",
    category: "Workstations",
    segment: "products",
    shortDescription: "Professional workstation with Intel Xeon, 32GB RAM, 1TB SSD, NVIDIA Graphics",
    specs: ["Intel Xeon", "32GB RAM", "1TB SSD", "NVIDIA Graphics"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year on-site",
    keywords: ["workstation", "professional", "lenovo", "thinkstation", "xeon"],
  },
  {
    id: "prec-3660-new",
    name: "Dell Precision 3660",
    brand: "Dell",
    category: "Workstations",
    segment: "products",
    shortDescription: "High-performance workstation with Intel Core i9, 64GB RAM, 2TB NVMe SSD, NVIDIA RTX A2000",
    specs: ["Intel Core i9", "64GB RAM", "2TB NVMe SSD", "NVIDIA RTX A2000", "TPM 2.0 + ProSupport Ready"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year ProSupport Plus",
    keywords: ["workstation", "high-performance", "dell", "precision", "rtx"],
  },

  // ============================================================
  // PROFESSIONAL DISPLAYS
  // ============================================================
  {
    id: "dell-u2723qe-new",
    name: "Dell UltraSharp 27\"",
    brand: "Dell",
    category: "Monitors",
    segment: "products",
    shortDescription: '27" IPS Panel, QHD Resolution, USB-C Docking, Height Adjustable',
    specs: ['27" IPS Panel', "QHD Resolution", "USB-C Docking", "Height Adjustable"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year exchange",
    keywords: ["monitor", "display", "dell", "ultrasharp", "4k"],
  },
  {
    id: "lenovo-p27h",
    name: "Lenovo ThinkVision P27h-30",
    brand: "Lenovo",
    category: "Monitors",
    segment: "products",
    shortDescription: '27" QHD IPS, USB-C 100W Power Delivery, 99% sRGB Color, Daisy Chain',
    specs: ['27" QHD IPS', "USB-C 100W Power Delivery", "99% sRGB Color", "Daisy Chain + Ergonomic Stand"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year warranty",
    keywords: ["monitor", "display", "lenovo", "thinkvision", "usb-c"],
  },
  {
    id: "dell-u3423we",
    name: "Dell UltraSharp 34\" Curved",
    brand: "Dell",
    category: "Monitors",
    segment: "products",
    shortDescription: '34" WQHD Curved Panel, USB-C Hub + RJ45, Built for Multi-screen Productivity',
    specs: ['34" WQHD Curved Panel', "USB-C Hub + RJ45", "Dual HDMI/DP Inputs", "Built for Multi-screen Productivity"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year exchange",
    keywords: ["monitor", "curved", "dell", "ultrasharp", "productivity"],
  },

  // ============================================================
  // ACCESSORIES
  // ============================================================
  {
    id: "dell-ud22",
    name: "Dell Universal Dock UD22",
    brand: "Dell",
    category: "Docks",
    segment: "products",
    shortDescription: "Multi-port USB-C Dock, HDMI + DisplayPort Outputs, Gigabit Ethernet",
    specs: ["Multi-port USB-C Dock", "HDMI + DisplayPort Outputs", "Gigabit Ethernet + USB Expansion", "Office and Hybrid-Work Ready"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year warranty",
    keywords: ["dock", "docking station", "dell", "usb-c", "hybrid"],
  },
  {
    id: "lenovo-dock-gen2",
    name: "Lenovo ThinkPad USB-C Dock Gen 2",
    brand: "Lenovo",
    category: "Docks",
    segment: "products",
    shortDescription: "USB-C Single Cable Docking, Dual Display Support, Multiple USB + LAN Ports",
    specs: ["USB-C Single Cable Docking", "Dual Display Support", "Multiple USB + LAN Ports", "Designed for ThinkPad Ecosystems"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "3-year warranty",
    keywords: ["dock", "docking station", "lenovo", "thinkpad", "usb-c"],
  },
  {
    id: "dell-headset",
    name: "Dell Pro Stereo Headset",
    brand: "Dell",
    category: "Computer Accessories",
    segment: "products",
    shortDescription: "Wired over-ear stereo headset, Noise-reducing boom microphone",
    specs: ["Wired over-ear stereo headset", "Noise-reducing boom microphone", "3.5mm + USB adapter support", "Built for meetings and daily calls"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "1-year warranty",
    keywords: ["headset", "audio", "dell", "meetings", "calls"],
  },
  {
    id: "lenovo-combo",
    name: "Lenovo Professional Wireless Combo",
    brand: "Lenovo",
    category: "Input Devices",
    segment: "products",
    shortDescription: "Wireless Keyboard + Mouse Set, Compact Receiver Connectivity",
    specs: ["Wireless Keyboard + Mouse Set", "Compact Receiver Connectivity", "Quiet-Touch Keys and Precision Tracking", "Clean Desk Deployment Ready"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "1-year warranty",
    keywords: ["keyboard", "mouse", "wireless", "lenovo", "combo"],
  },

  // ============================================================
  // TECHNICAL SERVICES (kept as products for consistency)
  // ============================================================
  {
    id: "service-deployment",
    name: "Device Setup and Deployment",
    brand: "Untangled IT",
    category: "Other IT Hardware",
    segment: "products",
    shortDescription: "New device preparation and rollout, OS and business app setup, user handover",
    specs: ["New device preparation and rollout", "OS and business app setup", "User handover and readiness checks", "Branch and office deployment support"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "Service-based",
    keywords: ["service", "deployment", "setup", "rollout"],
  },
  {
    id: "service-lifecycle",
    name: "Device Lifecycle Optimization",
    brand: "Untangled IT",
    category: "Other IT Hardware",
    segment: "products",
    shortDescription: "Performance restoration, hardware health assessment, storage and memory upgrades",
    specs: ["Performance restoration and cleanup", "Hardware health assessment", "Storage and memory upgrades", "Quality checks before handover"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "Service-based",
    keywords: ["service", "lifecycle", "optimization", "upgrade"],
  },
  {
    id: "service-troubleshooting",
    name: "Hardware and Software Troubleshooting",
    brand: "Untangled IT",
    category: "Other IT Hardware",
    segment: "products",
    shortDescription: "Fault isolation and diagnostics, endpoint performance remediation, software issue resolution",
    specs: ["Fault isolation and diagnostics", "Endpoint performance remediation", "Software issue resolution", "Preventive maintenance guidance"],
    price: null,
    availability: "in-stock",
    quoteOnly: true,
    warranty: "Service-based",
    keywords: ["service", "troubleshooting", "diagnostics", "repair"],
  },
];

export type ServiceItem = {
  id: string;
  name: string;
  description: string;
  group: "software" | "support" | "solutions";
};

export const services: ServiceItem[] = [
  // Software Services
  { id: "website-development", name: "Website Development", description: "Business websites built to convert and easy to maintain.", group: "software" },
  { id: "web-applications", name: "Web Applications", description: "Browser-based tools tailored to how your business works.", group: "software" },
  { id: "mobile-applications", name: "Mobile Applications", description: "iOS and Android apps for staff or customers.", group: "software" },
  { id: "custom-software", name: "Custom Software", description: "Software built specifically around your processes.", group: "software" },
  { id: "system-integration", name: "System Integration", description: "Connect the systems you already run so data flows.", group: "software" },
  { id: "api-integrations", name: "API Integrations", description: "Link third-party services and internal platforms.", group: "software" },
  { id: "business-automation", name: "Business Automation", description: "Remove repetitive manual admin with automation.", group: "software" },
  { id: "crm-solutions", name: "CRM Solutions", description: "Track customers, deals and follow-ups in one place.", group: "software" },
  { id: "sharepoint", name: "SharePoint / Document Management", description: "Structured document storage, sharing and approval.", group: "software" },
  { id: "workflow-solutions", name: "Workflow Solutions", description: "Digitise approvals, forms and internal workflows.", group: "software" },

  // Support Services
  { id: "hardware-troubleshooting", name: "Hardware Troubleshooting", description: "Something not working? We diagnose the hardware.", group: "support" },
  { id: "software-troubleshooting", name: "Software Troubleshooting", description: "Errors, crashes, updates and application problems.", group: "support" },
  { id: "laptop-repair", name: "Laptop Repair", description: "Screens, keyboards, batteries, hinges and ports.", group: "support" },
  { id: "hardware-replacement", name: "Hardware Replacement", description: "Replace failed parts or whole devices quickly.", group: "support" },
  { id: "device-diagnostics", name: "Device Diagnostics", description: "Full health check before you spend on repairs.", group: "support" },
  { id: "endpoint-support", name: "Endpoint Support", description: "Ongoing support for staff laptops and desktops.", group: "support" },
  { id: "it-consulting-support", name: "IT Consulting", description: "Advice on what to buy, replace or change.", group: "support" },
  { id: "technical-support", name: "Technical Support", description: "General technical help for your team.", group: "support" },
  { id: "device-deployment-support", name: "Device Deployment", description: "Setup, imaging and handover of new devices.", group: "support" },
  { id: "lifecycle-support", name: "Lifecycle Support", description: "Manage devices from purchase to retirement.", group: "support" },

  // Solutions Services
  { id: "it-infrastructure", name: "IT Infrastructure", description: "Servers, storage, connectivity and the racks between.", group: "solutions" },
  { id: "hardware-procurement", name: "Hardware Procurement", description: "Sourcing and supplying hardware at scale.", group: "solutions" },
  { id: "device-deployment", name: "Device Deployment", description: "Roll out devices across sites and teams.", group: "solutions" },
  { id: "networking", name: "Networking", description: "Switching, Wi-Fi, firewalls and cabling.", group: "solutions" },
  { id: "enterprise-hardware", name: "Enterprise Hardware", description: "Servers, workstations and enterprise-grade equipment.", group: "solutions" },
  { id: "licensing", name: "Licensing", description: "Microsoft and vendor licensing, correctly sized.", group: "solutions" },
  { id: "system-integration-solutions", name: "System Integration", description: "Make separate business systems work as one.", group: "solutions" },
  { id: "it-consulting", name: "IT Consulting", description: "Strategy, budgets and roadmaps for your IT.", group: "solutions" },
  { id: "cybersecurity", name: "Cybersecurity", description: "Protect endpoints, email, data and access.", group: "solutions" },
  { id: "business-technology", name: "Business Technology Solutions", description: "End-to-end solutions built around business outcomes.", group: "solutions" },
];

export function formatPrice(value: number) {
  return "R " + value.toLocaleString("en-ZA");
}

export function searchAll(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { products: [] as Product[], services: [] as ServiceItem[] };
  const matchedProducts = products.filter((p) =>
    [p.name, p.brand, p.category, p.shortDescription, ...(p.specs || []), ...(p.keywords || [])]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
  const matchedServices = services.filter((s) =>
    [s.name, s.description, s.group].join(" ").toLowerCase().includes(q),
  );
  return { products: matchedProducts, services: matchedServices };
}