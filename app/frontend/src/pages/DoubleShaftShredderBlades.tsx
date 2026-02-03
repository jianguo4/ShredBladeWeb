import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import gallery images using import.meta.glob
const galleryImageModules = import.meta.glob('@/images/double-shaft-shredder-blades/*.{jpg,jpeg,png,webp}', { 
  eager: true 
}) as Record<string, { default: string }>;

// Import application scenario images
import plasticWasteImage from '@/images/Application Scenarios/Plastic Waste.webp';
import metalScrapImage from '@/images/Application Scenarios/Metal Scrap.webp';
import tiresRubberImage from '@/images/Application Scenarios/Tires & Rubbe.webp';
import electronicWasteImage from '@/images/Application Scenarios/Electronic Waste.webp';

export default function DoubleShaftShredderBlades() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Create blade images array from first few images
  const bladeImages = Object.entries(galleryImageModules)
    .filter(([path]) => {
      const fileName = path.split('/').pop() || '';
      return fileName.endsWith('.webp') && 
             !fileName.includes('-w750') && !fileName.includes('-w1200');
    })
    .slice(0, 4)
    .map(([path, mod]) => ({
      src: mod.default,
      alt: `Double shaft shredder blade ${path.split('/').pop()?.replace('.webp', '') || ''}`
    }));

  const galleryDescriptions = [
    'Twin-blade design for counter-rotating shaft systems.',
    'Hook-style teeth optimized for aggressive material engagement.',
    'Reinforced core structure for high-torque applications.',
    'Interlocking geometry prevents material jamming.',
    'Precision-matched pairs ensure synchronized cutting action.',
    'Heat-treated edges resist deformation under shock loads.',
    'Universal mounting patterns fit major OEM equipment.',
    'Quality-tested for balanced wear and extended uptime.'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1200px] mx-auto w-full px-6 lg:px-10 py-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 pb-6">
          <Link to="/" className="text-blue-600 text-sm font-medium leading-normal hover:text-blue-800 transition-colors">
            Home
          </Link>
          <span className="text-gray-500 text-sm font-medium leading-normal">/</span>
          <span className="text-slate-900 text-sm font-medium leading-normal">Double-Shaft Blade</span>
        </div>

        {/* Hero Section with Product Gallery */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col justify-between" style={{ height: '562.5px' }}>
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden" style={{ width: '520px', height: '400px' }}>
              {bladeImages.length > 0 && (
                <img
                  src={bladeImages[selectedImageIndex]?.src}
                  alt={bladeImages[selectedImageIndex]?.alt}
                  className="w-full h-full object-cover"
                  style={{ width: '520px', height: '400px' }}
                />
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {bladeImages.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer bg-cover bg-center rounded-xl border-3 transition-all duration-300 hover:shadow-lg ${
                    selectedImageIndex === index 
                      ? 'border-blue-600 shadow-lg ring-2 ring-blue-200' 
                      : 'border-gray-300 opacity-80 hover:opacity-100 hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{ width: '120px', height: '120px' }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ width: '120px', height: '120px' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                Industrial Grade D2 Series
              </span>
              <h1 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight">
                Precision Double-Shaft Shredder Blades & Knives
              </h1>
              <p className="text-gray-600 text-lg mt-2">
                Heavy-Duty Twin-Blade Systems for Double-Shaft Shredders: Engineered for 40% More Torque Resistance.
              </p>
            </div>

            {/* Key Features */}
            <div className="p-5 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                Key Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-base">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>High-Impact <strong>H13 / DC53 Alloy</strong> Engineered for E-Waste, Tires & Mixed MSW Streams.</span>
                </li>
                <li className="flex items-start gap-3 text-base">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Deep Cryogenic Treatment (60-62 HRC) for Superior Toughness Under Shock Loads.</span>
                </li>
                <li className="flex items-start gap-3 text-base">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Hook-tooth design prevents material bypass and jamming</span>
                </li>
                <li className="flex items-start gap-3 text-base">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Precision-matched blade pairs for synchronized operation</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="mt-4">
              <Link
                to="/contact-us"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Inquire Now
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Specifications Section */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">Technical Specifications</h2>
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-white">
            <table className="w-full text-left text-base">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 font-semibold text-gray-900">Material Grade</th>
                  <th className="px-4 py-2 font-semibold text-gray-900">Hardness (HRC)</th>
                  <th className="px-4 py-2 font-semibold text-gray-900">Impact Toughness</th>
                  <th className="px-4 py-2 font-semibold text-gray-900">Common Applications</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2 font-medium text-gray-600">H13 (Standard)</td>
                  <td className="px-4 py-2">58 - 60</td>
                  <td className="px-4 py-2">Excellent</td>
                  <td className="px-4 py-2">Mixed Waste, Wood Pallets, Bulky Items</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2 font-medium text-gray-600">DC53 (High-End)</td>
                  <td className="px-4 py-2">60 - 62</td>
                  <td className="px-4 py-2">Superior</td>
                  <td className="px-4 py-2">E-Waste, Metal Scrap, Automotive Parts</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-600">Custom Tungsten (Heavy-Duty)</td>
                  <td className="px-4 py-2">62 - 64</td>
                  <td className="px-4 py-2">Extreme</td>
                  <td className="px-4 py-2">OTR Tires, Steel-Reinforced Materials</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600 italic">
            Custom hook angles, blade thickness (15-80mm), and bolt-hole patterns available to match your specific double-shaft rotor configuration.
          </p>
        </div>

        {/* Product Gallery Section */}
        <div className="mt-6 py-10 bg-white">
          <div className="text-left mb-6">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Product Gallery</h2>
            <p className="text-lg text-gray-700 max-w-2xl">
              High-quality images showcasing our precision-manufactured double-shaft shredder blades.
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-8 px-4">
            {Object.entries(galleryImageModules)
              .filter(([path]) => {
                const fileName = path.split('/').pop() || '';
                return fileName.endsWith('.webp') && 
                       !fileName.includes('-w750') && !fileName.includes('-w1200');
              })
              .slice(0, 8)
              .map(([path, mod], index) => {
                const fileName = path.split('/').pop() || '';
                const baseName = fileName.replace('.webp', '');
                
                return (
                  <div
                    key={index}
                    className="group relative bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 cursor-pointer mx-auto"
                    style={{ width: '250px', height: '310px' }}
                  >
                    <div className="overflow-hidden bg-gray-50" style={{ width: '250px', height: '250px' }}>
                      <img
                        src={mod.default}
                        alt={`Double shaft shredder blade ${baseName.replace(/[-_]/g, ' ')}`}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        style={{ width: '250px', height: '250px' }}
                      />
                    </div>
                    <div className="p-3 bg-white" style={{ height: '60px' }}>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {galleryDescriptions[index] || 'Professional grade'}
                      </p>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>

        {/* Application Scenarios Section */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8 shadow-sm">
          <div className="text-left mb-6">
            <h2 className="text-3xl font-bold mb-3 text-slate-900">Application Scenarios</h2>
            <p className="text-lg text-gray-700 max-w-2xl">
              Our double-shaft blades excel at processing bulky, mixed waste streams with aggressive grabbing and tearing action.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Plastic Waste */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-900 hover:shadow-xl transition-shadow duration-300">
              <div 
                className="w-full aspect-[4/5] bg-cover bg-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                style={{ 
                  backgroundImage: `url(${plasticWasteImage})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-xl">Plastic Waste</h4>
                <p className="text-slate-300 text-sm mt-2">Rigid containers, PVC pipes, and bulky injection-molded parts.</p>
              </div>
            </div>

            {/* Metal Scrap */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-900 hover:shadow-xl transition-shadow duration-300">
              <div 
                className="w-full aspect-[4/5] bg-cover bg-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                style={{ 
                  backgroundImage: `url(${metalScrapImage})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-xl">Metal Scrap</h4>
                <p className="text-slate-300 text-sm mt-2">Car bodies, white goods, and heavy steel fabrications.</p>
              </div>
            </div>

            {/* Tires & Rubber */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-900 hover:shadow-xl transition-shadow duration-300">
              <div 
                className="w-full aspect-[4/5] bg-cover bg-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                style={{ 
                  backgroundImage: `url(${tiresRubberImage})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-xl">Tires & Rubber</h4>
                <p className="text-slate-300 text-sm mt-2">Whole tires with steel belts, mining equipment tires, rubber mats.</p>
              </div>
            </div>

            {/* Electronic Waste */}
            <div className="group relative overflow-hidden rounded-xl bg-gray-900 hover:shadow-xl transition-shadow duration-300">
              <div 
                className="w-full aspect-[4/5] bg-cover bg-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                style={{ 
                  backgroundImage: `url(${electronicWasteImage})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-xl">Electronic Waste</h4>
                <p className="text-slate-300 text-sm mt-2">Computer towers, servers, copiers, and large appliances.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12 text-center shadow-sm">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Ready to Upgrade Your Shredding Operation?</h2>
          <p className="text-slate-700 text-lg mb-8 max-w-2xl mx-auto">
            Get expert consultation on selecting the right double-shaft blades for your specific application needs.
          </p>
          <div className="flex justify-center">
            <Link
              to="/contact-us"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Request Quote
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}