import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ShredderBlades() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-4">
          <h1 className="text-6xl font-bold mb-6 text-slate-900">Industrial Shredder Blades</h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
            <span className="block">Professional shredder blade solutions for various recycling applications.</span>
            <span className="block">Engineered for maximum durability, consistent performance, and cost efficiency.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-12">
          <div className="order-2 lg:order-1 self-start">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/889036/2026-01-08/611e1d38-edc5-461d-8f60-1a1648d6827b.png"
              alt="Industrial shredder blades"
              className="rounded-lg shadow-lg w-full h-auto max-h-[380px] object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="bg-slate-50 p-8 flex flex-col justify-start border-l-4 border-blue-900 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 uppercase tracking-widest border-b border-slate-200 pb-4 relative z-10">
                Why Choose Our Blades
              </h3>
              <ul className="space-y-3 relative z-10">
                <li className="border-b border-slate-200/50 pb-2 last:border-0 last:pb-0">
                  <span className="block text-sm font-semibold tracking-[0.08em] uppercase text-slate-600 mb-1">Manufacturing Quality</span>
                  <span className="block text-base text-slate-800 leading-relaxed">High-quality industrial shredder blades for various recycling applications.</span>
                </li>
                <li className="border-b border-slate-200/50 pb-2 last:border-0 last:pb-0">
                  <span className="block text-sm font-semibold tracking-[0.08em] uppercase text-slate-600 mb-1">Durability Focus</span>
                  <span className="block text-base text-slate-800 leading-relaxed">Engineered for maximum durability and consistent performance.</span>
                </li>
                <li className="border-b border-slate-200/50 pb-2 last:border-0 last:pb-0">
                  <span className="block text-sm font-semibold tracking-[0.08em] uppercase text-slate-600 mb-1">Custom Solutions</span>
                  <span className="block text-base text-slate-800 leading-relaxed">OEM and replacement blades customized for your specific application requirements.</span>
                </li>
                <li className="border-b border-slate-200/50 pb-2 last:border-0 last:pb-0">
                  <span className="block text-sm font-semibold tracking-[0.08em] uppercase text-slate-600 mb-1">Cost Efficiency</span>
                  <span className="block text-base text-slate-800 leading-relaxed">Optimized for cost efficiency with longer service life between maintenance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Blade Types</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Single Shaft Blades</h3>
                <p className="text-gray-700">
                  Designed for single shaft shredders, ideal for processing bulky materials with
                  high torque requirements.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Double Shaft Blades</h3>
                <p className="text-gray-700">
                  Precision-engineered for dual shaft shredders, providing efficient cutting action
                  for various materials.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Granulator Blades</h3>
                <p className="text-gray-700">
                  High-precision blades for granulators, ensuring consistent particle size and
                  minimal dust generation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Quality Standards</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Material Quality</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Premium alloy steel (D2, H13, SKD11)</li>
                  <li>• Controlled heat treatment process</li>
                  <li>• Hardness range: HRC 52-62</li>
                  <li>• Consistent material properties</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Manufacturing Standards</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• CNC precision machining</li>
                  <li>• Dimensional tolerance: ±0.05mm</li>
                  <li>• Surface finish: Ra 0.8-1.6μm</li>
                  <li>• 100% quality inspection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            Need Help Selecting the Right Blade?
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            Our technical team can recommend the optimal blade solution for your application
          </p>
          <Link to="/contact-us">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-none transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700" aria-label="Get a Free Blade Analysis">
              Get a Free Blade Analysis
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}