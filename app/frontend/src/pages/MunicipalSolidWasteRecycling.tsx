import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import mswImage from '@/images/shrederblade-msw.jpg';

// Import detail images (reused template visuals)
import sharpSteelBladeAngle from '../images/detail/Sharp steel blade angle.jpg';
import cleanPlasticFlakes from '../images/detail/Clean plastic flakes.jpg';
import shreddingPlasticLump from '../images/detail/Shredding plastic lump.jpg';

// Image modules for gallery
const bladeImageModules = import.meta.glob<{ default: string }>(
  '../images/shred-blades/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

const TECHNICAL_HIGHLIGHTS = [
  { label: 'Blade Material', value: 'DC53/Cr12MoV for impact-tough MSW processing.' },
  { label: 'Hardness Range', value: 'Balanced hardness (HRC) to resist shock loads.' },
  { label: 'Cutting Stability', value: 'Optimized tooth geometry for heterogeneous waste.' },
  { label: 'Applications', value: 'Municipal waste, bulky refuse, RDF feed.' },
  { label: 'Cost Efficiency', value: 'Extended service life lowers replacement frequency.' },
];

const PROBLEM_SOLUTIONS = [
  {
    title: 'Prevent Impact Fracture',
    image: shreddingPlasticLump,
    description: 'Toughness-oriented steel and multi-temper heat treatment absorb shock from metal, glass, and dense items to minimize chipping and breakage.'
  },
  {
    title: 'Increase Throughput',
    image: cleanPlasticFlakes,
    description: 'Optimized blade profile maintains material flow and consistent bite, reducing clogging with mixed organic/inorganic waste.'
  },
  {
    title: 'Reduce Wrap & Clogs',
    image: sharpSteelBladeAngle,
    description: 'Edge geometry resists film/plastic wrap around rotors, stabilizing cutting and lowering friction heat.'
  },
];

export default function MunicipalSolidWasteRecycling() {
  const bladeImages = useMemo(() => {
    return Object.entries(bladeImageModules)
      .map(([path, mod]) => {
        const fileName = path.split('/').pop() || 'blade';
        const nameWithoutExt = fileName.replace(/\.[^.]+$/, '');
        const alt = `MSW shredder blade - ${nameWithoutExt.replace(/[-_]+/g, ' ')}`;
        return { src: mod.default, alt, fileName };
      })
      .sort((a, b) => a.fileName.localeCompare(b.fileName));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6 text-slate-900">Shredder Blades for MSW Recycling</h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
            Heavy-duty cutting solutions for heterogeneous municipal waste and RDF preparation
          </p>
        </div>

        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-16">
          <div className="order-2 lg:order-1 h-full">
            <img
              src={mswImage}
              alt="MSW shredder blades handling mixed municipal waste"
              className="rounded-lg shadow-lg w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="order-1 lg:order-2 h-full">
            <div className="bg-slate-50 p-8 h-full flex flex-col justify-center border-l-4 border-blue-900 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 uppercase tracking-widest border-b border-slate-200 pb-4 relative z-10">
                Technical Highlights
              </h3>
              <ul className="space-y-5 relative z-10">
                {TECHNICAL_HIGHLIGHTS.map((item) => (
                  <li key={item.label} className="flex flex-wrap items-center gap-x-3 border-b border-slate-200/50 pb-3 last:border-0 last:pb-0">
                    <span className="font-bold text-gray-900 text-base w-[140px] flex-shrink-0">{item.label}</span>
                    {item.value && <span className="text-base text-gray-700 break-words">{item.value}</span>}
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
              We address MSW blade failure with impact-tough alloys and precise heat treatment, stabilizing cutting while minimizing downtime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PROBLEM_SOLUTIONS.map((solution) => (
              <div key={solution.title} className="flex flex-col h-full">
                <div className="mb-6 aspect-[4/3] overflow-hidden">
                  <img src={solution.image} alt={`MSW blade solution - ${solution.title}`} className="w-full h-full rounded-none object-cover" loading="lazy" decoding="async" />
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
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">A quick look at shredder blades used in MSW and RDF lines.</p>
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

        {/* Product Series Comparison */}
        <section className="mb-16" id="comparison">
          <div className="flex flex-col gap-3 sm:gap-4 mb-8">
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Product Comparison</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">MSW Blade Options</h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">Engineering Comparison: Soft vs. Dense Waste. Select geometry to prevent downtime.</p>
          </div>
          <div className="overflow-x-auto rounded-none border border-slate-300 bg-white mb-16">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-lg font-bold text-slate-900 w-1/4">Feature</th>
                  <th scope="col" className="px-4 py-3 text-left text-lg font-bold text-slate-900">Soft/Mixed Waste</th>
                  <th scope="col" className="px-4 py-3 text-left text-lg font-bold text-slate-900">Dense/Impact Waste</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50">Best For</td>
                  <td className="px-4 py-3 text-slate-700">Films, mixed organics, packaging</td>
                  <td className="px-4 py-3 text-slate-700">Bulky refuse, glass/metal contaminants</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50">Primary Challenge</td>
                  <td className="px-4 py-3 text-slate-700"><span className="font-semibold">Wrapping & Melting</span><br /><span className="text-sm text-slate-600">Material wraps around rotor; friction causes melting</span></td>
                  <td className="px-4 py-3 text-slate-700"><span className="font-semibold">Impact & Breakage</span><br /><span className="text-sm text-slate-600">High shock loads can shatter brittle blades</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50">Blade Geometry</td>
                  <td className="px-4 py-3 text-slate-700"><span className="font-semibold">Acute Angle (Sharp)</span><br /><span className="text-sm text-slate-600">Aggressive shearing to slice through fibers</span></td>
                  <td className="px-4 py-3 text-slate-700"><span className="font-semibold">Obtuse Angle (Reinforced)</span><br /><span className="text-sm text-slate-600">Deep hook to bite and crush solid blocks</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50">Cutting Gap</td>
                  <td className="px-4 py-3 text-slate-700"><span className="font-semibold">Tight (&lt; 0.5mm)</span><br /><span className="text-sm text-slate-600">Precision ground for scissor-cut action</span></td>
                  <td className="px-4 py-3 text-slate-700"><span className="font-semibold">Standard (1.0mm - 2.0mm)</span><br /><span className="text-sm text-slate-600">Larger gap for material flow and torque</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50">Recommended Steel</td>
                  <td className="px-4 py-3 text-slate-700"><span className="font-semibold">SKD-11 / D2</span><br /><span className="text-sm text-slate-600">Focus: Wear Resistance</span></td>
                  <td className="px-4 py-3 text-slate-700"><span className="font-semibold">DC53 / Cr12MoV</span><br /><span className="text-sm text-slate-600">Focus: Impact Toughness</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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
          <div className="grid md:grid-cols-2 gap-8 my-12">
            {/* OEM Card */}
            <div className="bg-white border border-slate-300 border-l-4 border-l-[#1A365D] rounded-none p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-[#1A365D] mr-2"></div>
                <h3 className="text-2xl font-bold text-slate-900">OEM Services</h3>
              </div>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                <span className="font-semibold">Original Equipment Manufacturer</span> — Precision manufacturing to your exact design specifications with guaranteed quality standards.
              </p>
              <ul className="space-y-3">
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
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                <span className="font-semibold">Original Design Manufacturer</span> — End-to-end custom blade design and engineering tailored to your material and machine specifications.
              </p>
              <ul className="space-y-3">
                {[
                  'Custom blade geometry design for your specific needs',
                  'Engineering consultation & feasibility assessment',
                  'Prototype development & performance testing',
                  'Full production ramp-up with technical support'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 bg-amber-700 mt-2 flex-shrink-0"></span>
                    <span className="text-slate-700">{item}</span>
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
