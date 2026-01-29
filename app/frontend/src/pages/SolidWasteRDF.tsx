import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import industrialWasteImage from '@/images/industrial-waste.jpg';

import sharpSteelBladeAngle from '../images/detail/Sharp steel blade angle.jpg';
import cleanPlasticFlakes from '../images/detail/Clean plastic flakes.jpg';
import shreddingPlasticLump from '../images/detail/Shredding plastic lump.jpg';

const bladeImageModules = import.meta.glob<{ default: string }>(
  '../images/shred-blades/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

const TECHNICAL_HIGHLIGHTS = [
  { label: 'Blade Material', value: 'DC53/Cr12MoV for bulky and industrial waste.' },
  { label: 'Hardness Range', value: 'Balanced HRC for impact resistance and wear.' },
  { label: 'Cutting Stability', value: 'Tooth geometry maintains flow with irregular feed.' },
  { label: 'Applications', value: 'Bulky waste, pallets, composite industrial scrap.' },
  { label: 'Cost Efficiency', value: 'Lower breakage rate reduces downtime and costs.' },
];

const PROBLEM_SOLUTIONS = [
  {
    title: 'Impact Toughness',
    image: shreddingPlasticLump,
    description: 'Multi-temper treatment and alloy selection resist shock loads from dense items and contaminants.'
  },
  {
    title: 'Consistent Bite',
    image: cleanPlasticFlakes,
    description: 'Profile geometry maintains engagement with uneven, bulky materials to prevent stalls.'
  },
  {
    title: 'Anti-Wrap Edges',
    image: sharpSteelBladeAngle,
    description: 'Edge design mitigates film/plastic wrapping in mixed industrial streams.'
  },
];

export default function SolidWasteRDF() {
  const bladeImages = useMemo(() => {
    return Object.entries(bladeImageModules)
      .map(([path, mod]) => {
        const fileName = path.split('/').pop() || 'blade';
        const nameWithoutExt = fileName.replace(/\.[^.]+$/, '');
        const alt = `RDF shredder blade - ${nameWithoutExt.replace(/[-_]+/g, ' ')}`;
        return { src: mod.default, alt, fileName };
      })
      .sort((a, b) => a.fileName.localeCompare(b.fileName));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-4">
          <h1 className="text-6xl font-bold mb-6 text-slate-900">Solid Waste & RDF Blades</h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
            <span className="block">Heavy-duty cutting solutions for bulky refuse and industrial scrap.</span>
            <span className="block">DC53/Cr12MoV alloy blades engineered for impact resistance and flow stability.</span>
          </p>
        </div>

        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-12">
          <div className="order-2 lg:order-1 self-start">
            <img src={industrialWasteImage} alt="Industrial waste shredder blades" className="rounded-lg shadow-lg w-full h-auto max-h-[380px] object-cover" loading="lazy" decoding="async" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="bg-slate-50 p-8 flex flex-col justify-start border-l-4 border-blue-900 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 uppercase tracking-widest border-b border-slate-200 pb-4 relative z-10">Technical Highlights</h3>
              <ul className="space-y-3 relative z-10">
                {TECHNICAL_HIGHLIGHTS.map((item) => (
                  <li key={item.label} className="border-b border-slate-200/50 pb-2 last:border-0 last:pb-0">
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
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">We solve blade breakage and stalls via impact-tough steels and precise heat treatment.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PROBLEM_SOLUTIONS.map((solution) => (
              <div key={solution.title} className="flex flex-col h-full">
                <div className="mb-5 aspect-[5/4] sm:aspect-[4/3] max-h-[220px] sm:max-h-[240px] overflow-hidden">
                  <img src={solution.image} alt={`RDF blade solution - ${solution.title}`} className="w-full h-full rounded-none object-cover" loading="lazy" decoding="async" />
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">Blade Gallery</h2>
            </div>
            <div>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">Representative blades used in bulky waste and RDF lines.</p>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-3 sm:gap-4 blade-gallery-scroll">
              {[...bladeImages, ...bladeImages].map((image, index) => (
                <div key={`${image.src}-${index}`} className="group flex-shrink-0 w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
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
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-none transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700" aria-label="Free Blade Analysis">
                  Get a Free Blade Analysis
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
                  'Precision manufacturing to existing design specifications',
                  'Material selection & heat treatment optimization',
                  'Tight tolerance control (H7 and tighter)',
                  'Large-volume production with consistent performance'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 bg-blue-900 mt-2 flex-shrink-0"></span>
                    <span className="text-slate-700">{item}</span>
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
                  'Engineering consultation & feasibility assessment',
                  'Prototype development & performance testing',
                  'Full production ramp-up with technical support'
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
