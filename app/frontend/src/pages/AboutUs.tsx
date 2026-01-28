import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">15+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Countries Exported</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">ISO 9001</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Certified</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/889036/2026-01-08/0b690d86-a11f-49fc-80c8-b3c80e400cd7.png"
              alt="Liqun Machinery factory floor - Heavy duty shredder blade CNC machining center with precision grinding equipment"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Engineering High-Performance Blades Since 2008</h2>
            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Since 2008, Liqun Machinery & Cutting Tools Co., Ltd has been dedicated to overcoming
               the industry's toughest challenge: <strong>eliminating premature blade failure</strong>.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              We focus on engineering-driven solutions that deliver <strong>extending blade lifespan by 30%-50%</strong> compared to standard market options. Leveraging deep expertise
                in blade manufacturing and material science, we analyze the critical wear factors
                 unique to your specific recycling applications.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
              Whether you are shredding <strong>tires, scrap metal, mixed plastics, or municipal solid waste</strong>, we engineer the blade geometry and select optimal materials to minimize wear and maximize throughput.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              At Liqun, we are more than just a manufacturer; we are your strategic partner in
               optimizing shredding operations and maximizing production uptime.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Precision Manufacturing: CNC & Heat Treatment</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-900">Precision Machining</h3>
                <p className="text-gray-700 mb-4">
                  CNC machining centers ensure dimensional accuracy within <strong>±0.05mm tolerance</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span><strong>5-axis CNC machines</strong> for complex geometries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span><strong>Wire EDM capability</strong> for precision cutting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span><strong>Surface grinding</strong> - Surface Roughness: Ra 0.8</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-900">Heat Treatment</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Vacuum Hardening Furnaces & Cryogenic Treatment (-196°C)</strong> for optimal material properties
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span><strong>Vacuum hardening</strong> prevents oxidation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span><strong>Cryogenic treatment</strong> improves toughness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span><strong>Controlled tempering</strong> ensures consistency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-900">Certified Materials</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Certified Steels:</strong> D2 (1.2379), SKD11, Cr12MoV, Hardox, Tungsten Carbide
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span><strong>Hardness testing</strong> (HRC 58-62)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span><strong>Metallographic analysis</strong> verifies structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold">•</span>
                    <span><strong>Chemical composition</strong> certified reports</span>
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
              <img
                src="https://mgx-backend-cdn.metadl.com/generate/images/889036/2026-01-08/0752aeb3-7994-4fef-8f5f-e4fd7476ee6a.png"
                alt="Quality Control Inspection - Hardness testing equipment for SKD11 industrial shredder knives with metallographic microscope"
                className="rounded-lg shadow-lg w-full"
              />
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
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Customer Service Approach</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Material Science Expertise
                </h3>
                <p className="text-gray-700 mb-4">
                  Our engineering team provides application-specific recommendations. We select specifically between <strong>Cr12MoV and SKD11</strong> based on your budget and application requirements.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold mt-1">✓</span>
                    <span><strong>Material selection guidance</strong> - D2, SKD11, Hardox, or Carbide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold mt-1">✓</span>
                    <span><strong>Blade geometry optimization</strong> for specific materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold mt-1">✓</span>
                    <span><strong>Performance troubleshooting</strong> & wear analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold mt-1">✓</span>
                    <span><strong>Cost reduction analysis</strong> - 30-50% longer lifespan</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Flexible Ordering & Fast Response
                </h3>
                <p className="text-gray-700 mb-4">
                  We support both small trial orders and large production quantities. <strong>Response within 24 hours</strong> for all inquiries.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold mt-1">✓</span>
                    <span><strong>Trial orders from 2-4 blades</strong> for testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold mt-1">✓</span>
                    <span><strong>Fast turnaround</strong> - Samples in 7-10 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold mt-1">✓</span>
                    <span><strong>Volume pricing</strong> for production quantities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 font-bold mt-1">✓</span>
                    <span><strong>Reliable delivery</strong> with tracking & insurance</span>
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
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-bold px-8 py-6 text-lg shadow-lg">
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