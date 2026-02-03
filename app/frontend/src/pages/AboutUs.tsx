import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import factoryImage from '../images/about-us/factory.jpg';
import factoryImageWebp from '../images/about-us/factory.webp';
import qualityInspectionImage from '../images/about-us/Quality-Inspection.jpg';
import qualityInspectionImageWebp from '../images/about-us/Quality-Inspection.webp';
import cncMachiningImage from '../images/MANUFACTURING PROCESS/CNC Machining.webp';
import cncMachiningImageWebp from '../images/MANUFACTURING PROCESS/CNC Machining.webp';
import heatTreatmentImage from '../images/MANUFACTURING PROCESS/Heat Treatment.webp';
import heatTreatmentImageWebp from '../images/MANUFACTURING PROCESS/Heat Treatment.webp';
import rawMaterialImage from '../images/MANUFACTURING PROCESS/Raw Material Selection.webp';
import rawMaterialImageWebp from '../images/MANUFACTURING PROCESS/Raw Material Selection.webp';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-relaxed">
          Liqun Machinery: Manufacturer of Industrial Shredder Blades & Precision Cutting Tools
        </h1>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-3 gap-6 mb-16 py-8 border-y border-amber-300">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">15+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Years Experience</div>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Countries Exported</div>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">ISO 9001</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Certified</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="self-start">
            <picture>
              <source srcSet={factoryImageWebp} type="image/webp" />
              <img
                src={factoryImage}
                alt="Liqun Machinery factory floor - Heavy duty shredder blade CNC machining center with precision grinding equipment"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Engineering High-Performance Blades Since 2008</h2>
            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Since 2008, Liqun Machinery & Cutting Tools has been at the forefront of tackling the industry's most persistent challenge: <strong>premature blade failure</strong>.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              We deliver engineering-driven solutions that <strong>extend blade service life by 30%-50%</strong> compared to conventional market standards. By merging material science with precision manufacturing, we analyze the specific wear patterns of your recycling applications. Whether processing <strong>tires, scrap metal, plastics, or MSW</strong>, we optimize blade geometry and metallurgy to minimize wear and maximize throughput.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              At Liqun, we don't just supply blades; we are your strategic partner in <strong>maximizing production uptime and optimizing shredding efficiency</strong>.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Precision Manufacturing: CNC & Heat Treatment</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Certified Materials with Background Image */}
            <Card className="overflow-hidden relative group">
              <div className="absolute inset-0">
                <picture>
                  <source srcSet={rawMaterialImageWebp} type="image/webp" />
                  <img src={rawMaterialImage} alt="Raw Material" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" decoding="async" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A365D]/70 to-[#1A365D]/50 group-hover:from-[#1A365D]/20 group-hover:to-[#1A365D]/10 transition-all duration-300"></div>
              </div>
              <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-bold mb-3 text-amber-300">Certified Materials</h3>
                <p className="text-amber-100 mb-4">
                  <strong>Certified Steels:</strong> D2 (1.2379), SKD11, Cr12MoV, Hardox, Tungsten Carbide
                </p>
                <ul className="text-sm text-amber-100 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Hardness testing</strong> (HRC 58-62)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Metallographic analysis</strong> verifies structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Chemical composition</strong> certified reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            {/* Card 2: Heat Treatment with Background Image */}
            <Card className="overflow-hidden relative group">
              <div className="absolute inset-0">
                <picture>
                  <source srcSet={heatTreatmentImageWebp} type="image/webp" />
                  <img src={heatTreatmentImage} alt="Heat Treatment" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" decoding="async" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A365D]/70 to-[#1A365D]/50 group-hover:from-[#1A365D]/20 group-hover:to-[#1A365D]/10 transition-all duration-300"></div>
              </div>
              <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-bold mb-3 text-amber-300">Heat Treatment</h3>
                <p className="text-amber-100 mb-4">
                  <strong>Vacuum Hardening & Cryogenic Treatment (-196°C)</strong> for optimal material properties
                </p>
                <ul className="text-sm text-amber-100 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Vacuum hardening</strong> prevents oxidation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Cryogenic treatment</strong> improves toughness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Controlled tempering</strong> ensures consistency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            {/* Card 3: CNC Machining with Background Image */}
            <Card className="overflow-hidden relative group">
              <div className="absolute inset-0">
                <picture>
                  <source srcSet={cncMachiningImageWebp} type="image/webp" />
                  <img src={cncMachiningImage} alt="CNC Machining" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" decoding="async" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A365D]/70 to-[#1A365D]/50 group-hover:from-[#1A365D]/20 group-hover:to-[#1A365D]/10 transition-all duration-300"></div>
              </div>
              <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-bold mb-3 text-amber-300">Precision Machining</h3>
                <p className="text-amber-100 mb-4">
                  CNC machining centers ensure dimensional accuracy within <strong>±0.05mm tolerance</strong>
                </p>
                <ul className="text-sm text-amber-100 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>5-axis CNC machines</strong> for complex geometries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Wire EDM capability</strong> for precision cutting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Surface grinding</strong> - Ra 0.8</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Quality Control</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <picture>
                <source srcSet={qualityInspectionImageWebp} type="image/webp" />
                <img
                  src={qualityInspectionImage}
                  alt="Quality Control Inspection - Hardness testing equipment for SKD11 industrial shredder knives with metallographic microscope"
                  className="rounded-lg shadow-lg w-full"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Quality Process</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-900 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Incoming Material Inspection</h4>
                  <p className="text-gray-700">
                    All raw materials are verified for <strong>chemical composition and mechanical
                    properties</strong> before processing. Each batch includes certified mill test reports.
                  </p>
                </div>
                <div className="border-l-4 border-blue-700 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">In-Process Control</h4>
                  <p className="text-gray-700">
                    Critical dimensions and heat treatment parameters are monitored throughout
                    production. <strong>Real-time data logging</strong> ensures traceability.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Final Inspection</h4>
                  <p className="text-gray-700">
                    <strong>100% inspection</strong> of finished blades including hardness (HRC 58-62), dimensions (±0.05mm), and surface
                    finish (Ra 0.8).
                  </p>
                </div>
                <div className="border-l-4 border-blue-300 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Documentation & Traceability</h4>
                  <p className="text-gray-700">
                    Complete traceability with <strong>material certificates, inspection reports, and heat treatment curves</strong> for every order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Service Process</h2>
          <div className="bg-slate-50 rounded-lg p-8">
            {/* Horizontal Process Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-[#1A365D] hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#1A365D] text-white rounded-full font-bold text-xl mb-4 mx-auto">1</div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Requirement Consultation</h3>
                  <p className="text-sm text-gray-600 text-center">Share your material type, machine model, and performance issues</p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-400 text-2xl">→</div>
              </div>
              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-amber-600 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl mb-4 mx-auto">2</div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Engineering & Drawing</h3>
                  <p className="text-sm text-gray-600 text-center">Custom blade design with material selection within 24-48 hours</p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-400 text-2xl">→</div>
              </div>
              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-[#1A365D] hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#1A365D] text-white rounded-full font-bold text-xl mb-4 mx-auto">3</div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Sample Testing</h3>
                  <p className="text-sm text-gray-600 text-center">Trial order production and on-site performance validation</p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-400 text-2xl">→</div>
              </div>
              {/* Step 4 */}
              <div>
                <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-amber-600 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl mb-4 mx-auto">4</div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Volume Production</h3>
                  <p className="text-sm text-gray-600 text-center">Scalable manufacturing with guaranteed quality and delivery</p>
                </div>
              </div>
            </div>
            
            {/* Key Benefits Below */}
            <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-[#1A365D]">
                  Technical Support
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1A365D] font-bold mt-1">✓</span>
                    <span><strong>Material selection guidance</strong> - D2, SKD11, Hardox, or Carbide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1A365D] font-bold mt-1">✓</span>
                    <span><strong>Blade geometry optimization</strong> for specific materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1A365D] font-bold mt-1">✓</span>
                    <span><strong>Performance troubleshooting</strong> & wear analysis</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-amber-600">
                  Fast & Flexible
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-1">✓</span>
                    <span><strong>Trial orders from 2-4 blades</strong> for testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-1">✓</span>
                    <span><strong>Fast turnaround</strong> - Samples in 7-10 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-1">✓</span>
                    <span><strong>Volume pricing</strong> for production quantities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1A365D] rounded-lg p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Improve Your Blade Performance?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Contact us to discuss your application requirements and receive a customized solution
          </p>
          <div className="flex flex-col gap-2 justify-center items-center">
            <Link to="/contact-us">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-6 text-lg shadow-lg">
                Request a Free Drawing & Quote
              </Button>
            </Link>
            <p className="text-gray-300 text-sm mt-2">Response within 24 Hours</p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}