import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import detail images (Note: Ensure actual image files are updated to show METAL scrap)
import heavyDutyShearEdge from '../images/detail/Sharp steel blade angle.jpg';
import cleanCutSteelScrap from '../images/detail/Clean plastic flakes.jpg';
import impactResistantAlloy from '../images/detail/Shredding plastic lump.jpg';

// Image modules for gallery
const bladeImageModules = import.meta.glob<{ default: string }>(
  '../images/shred-blades/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

// Hero image
const metalHero = "https://mgx-backend-cdn.metadl.com/generate/images/889036/2026-01-08/2e0664f6-f1d8-44dd-903d-561e7d7e13fb.png";

const TECHNICAL_HIGHLIGHTS = [
  { label: 'Alloy Composition', value: 'Premium H13 (1.2344) or Custom HMB Modified for heavy shear.' },
  { label: 'Hardness Profile', value: '55-58 HRC (Through-hardened) to prevent edge rolling.' },
  { label: 'Heat Treatment', value: 'Vacuum Hardening + Triple Tempering + Cryo (-196°C).' },
  { label: 'Scrap Types', value: 'HMS #1/#2, I-Beams, Rebar, Car Bodies, Aluminum Bales.' },
  { label: 'Performance', value: 'Engineered to process 5,000+ tons before rotation (depending on material).' },
];

const PROBLEM_SOLUTIONS = [
  {
    title: 'Stop Catastrophic Blade Failure',
    image: impactResistantAlloy,
    description: 'Scrap metal often hides "unshreddables" (hardened shafts). Our modified H13 alloy absorbs extreme shock loads, preventing dangerous blade shattering and protecting your shear ram.'
  },
  {
    title: 'Eliminate Edge Rolling',
    image: heavyDutyShearEdge,
    description: 'Soft blades roll over; too hard blades crack. We hit the metallurgical "Sweet Spot" (56-58 HRC) to ensure clean shearing of rebar and structural steel without frequent gap adjustments.'
  },
  {
    title: 'Precision Shim Fitting',
    image: cleanCutSteelScrap,
    description: 'Loose blades destroy gibs. Our blades are ground to ±0.01mm tolerance, ensuring a perfect fit with your shims for tight, powerful shearing action.'
  },
];

export default function MetalScrapShears() {
  const bladeImages = useMemo(() => {
    return Object.entries(bladeImageModules)
      .map(([path, mod]) => {
        const fileName = path.split('/').pop() || 'blade';
        const nameWithoutExt = fileName.replace(/\.[^.]+$/, '');
        const alt = `Heavy Duty Scrap Shear Blade Replacement - ${nameWithoutExt.replace(/[-_]+/g, ' ')} - Metal Recycling Plant Part`;
        return { src: mod.default, alt, fileName };
      })
      .sort((a, b) => a.fileName.localeCompare(b.fileName));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-4">
          <h1 className="text-6xl font-bold mb-6 text-slate-900">Replacement Blades for Scrap Metal Shears & Balers</h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
            <span className="block">Maximize your tonnage. High-performance H13/HMB alloy blades compatible with Harris, Metso, Lindemann, and generic alligator shears.</span>
          </p>
        </div>

        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-12">
          <div className="order-2 lg:order-1 h-full">
            <img
              src={metalHero}
              alt="Metal scrap shear blades"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 h-full">
            <div className="bg-slate-50 p-8 h-full flex flex-col justify-center border-l-4 border-blue-900 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 uppercase tracking-widest border-b border-slate-200 pb-4 relative z-10">
                Technical Highlights
              </h3>
              <ul className="space-y-5 relative z-10">
                {TECHNICAL_HIGHLIGHTS.map((item) => (
                  <li key={item.label} className="border-b border-slate-200/50 pb-3 last:border-0 last:pb-0">
                    <span className="block text-sm font-semibold tracking-[0.08em] uppercase text-slate-600 mb-1">{item.label}</span>
                    {item.value && <span className="block text-base text-slate-800 leading-relaxed">{item.value}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Problem-Solver Bar */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Problem &amp; Technical Solution</h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
              Metal scrap shearing demands extreme toughness to withstand heavy impact forces. We address edge fracture and shock absorption with specialized alloy and heat treatment.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PROBLEM_SOLUTIONS.map((solution) => (
              <div key={solution.title} className="flex flex-col h-full">
                <div className="mb-5 aspect-[5/4] sm:aspect-[4/3] max-h-[220px] sm:max-h-[240px] overflow-hidden">
                  <img src={solution.image} alt={`Metal blade solution - ${solution.title}`} className="w-full h-full rounded-none object-cover" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{solution.title}</h3>
                <p className="text-slate-700 leading-relaxed flex-grow">{solution.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blade Gallery Section */}
        <section className="mb-16">
          <div className="flex flex-col gap-3 sm:gap-4 mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">Blade Gallery</h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">A quick look at shear blades used in metal recycling and scrap processing.</p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-3 sm:gap-4 blade-gallery-scroll">
              {[...bladeImages, ...bladeImages].map((image, index) => (
                <div key={`${image.src}-${index}`} className="group flex-shrink-0 w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3 md:mb-2">
                OEM & ODM Services
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto md:mx-0">
                Tailored manufacturing solutions designed for your unique requirements. From standard specifications to fully custom designs, we deliver precision-engineered blades at scale.
              </p>
            </div>
            <div className="flex-shrink-0 text-center md:text-right">
              <Link to="/contact-us">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-none transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700" aria-label="Discuss Your Custom Solution">
                  Discuss Your Custom Solution
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
          {/* OEM and ODM Cards */}
          <div className="grid md:grid-cols-2 gap-8 my-2">
            {/* OEM Card */}
            <div className="bg-white border border-slate-300 border-l-4 border-l-[#1A365D] rounded-none p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-[#1A365D] mr-2"></div>
                <h3 className="text-2xl font-bold text-slate-900">OEM Services</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-5">
                <span className="font-semibold">Original Equipment Manufacturer</span> — Precision manufacturing to your exact design specifications with guaranteed quality standards.
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-slate-800 leading-relaxed">
                {[
                  'Direct replacements for Metso, Harris, Lefort, & Bonfiglioli shears',
                  'Stock program for standard alligator shear blades (600mm - 1200mm)',
                  'Tight tolerance control (H7 and tighter)',
                  'Large-volume production with consistent performance'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 bg-blue-900 mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* ODM Card */}
            <div className="bg-white border border-slate-300 border-l-4 border-l-amber-700 rounded-none p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-amber-700 mr-2"></div>
                <h3 className="text-2xl font-bold text-slate-900">ODM Services</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-5">
                <span className="font-semibold">Original Design Manufacturer</span> — End-to-end custom blade design and engineering tailored to your material and machine specifications.
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-slate-800 leading-relaxed">
                {[
                  'Custom blade geometry design for your specific needs',
                  'Worn Blade Mapping: Send us your old blade, we recreate the blueprint',
                  'Prototype development & performance testing',
                  'Upgrade Analysis: We analyze your wear pattern to suggest better alloys'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 bg-amber-700 mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}