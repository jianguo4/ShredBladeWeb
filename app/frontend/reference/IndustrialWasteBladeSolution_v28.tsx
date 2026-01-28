import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import AdsLeadForm from '@/components/AdsLeadForm';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function IndustrialWasteBladeSolution() {
  const bladeProblems = [
    'Blades wear out too fast, increasing replacement frequency',
    'Frequent blade breakage causing unexpected downtime',
    'High blade replacement costs impacting profitability',
    'Inconsistent cutting performance with mixed industrial waste',
  ];

  const wasteTypes = [
    'Industrial packaging waste',
    'Production scrap and rejects',
    'Mixed plastics and rubber',
    'Bulky industrial refuse',
    'Composite or contaminated materials',
  ];

  const bladeDesignFeatures = [
    {
      title: 'Impact-Resistant Design',
      description: 'Thick blade profile engineered to withstand high impact loads from mixed materials',
    },
    {
      title: 'Optimized Tooth Geometry',
      description: 'Specially designed tooth profiles for stable cutting through unpredictable waste streams',
    },
    {
      title: 'Toughness-Oriented Heat Treatment',
      description: 'Advanced heat treatment process prevents blade breakage under shock loads',
    },
    {
      title: 'Extended Wear Life',
      description: 'Balanced hardness distribution ensures longer service life and lower cost per ton',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Industrial Waste Shredding Blade Solution - Double Shaft Blades"
        description="Solve industrial waste blade problems: fast wear, frequent breakage, high costs. Double shaft shredder blade solution with trial orders. Impact-resistant design for mixed materials."
        keywords="industrial waste blade solution, double shaft shredder blades, blade wear problem, blade breakage solution, industrial waste shredding, production scrap blades, trial blade order"
        canonicalUrl="/industrial-waste-shredding-blade-solution"
        ogTitle="Industrial Waste Blade Solution - Stop Fast Wear & Breakage"
        ogDescription="Professional blade solution for industrial waste shredding. Trial orders available (2-4 pcs). Impact-resistant double shaft blades for mixed materials."
      />

      {/* Minimal Header - No Navigation */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Industrial Waste Shredding Blade Solution
            </h2>
          </div>
        </div>
      </header>

      {/* Hero Section - Problem-Focused */}
      <section className="relative bg-gradient-to-br from-red-900 to-red-700 text-white overflow-hidden py-20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url(https://mgx-backend-cdn.metadl.com/generate/images/889036/2026-01-08/d4e17207-558d-47dc-80a9-66254abc60bc.png)',
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <AlertTriangle className="h-12 w-12 text-amber-400 flex-shrink-0 mt-2" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Are Your Industrial Waste Shredder Blades Failing Too Often?
                </h1>
                <p className="text-xl text-red-100 mb-8">
                  Fast wear, frequent breakage, and high replacement costs are common problems when
                  shredding mixed industrial waste.
                </p>
              </div>
            </div>

            <Card className="border-2 border-amber-300 bg-amber-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Common Blade Problems in Industrial Waste Shredding:
                </h3>
                <ul className="space-y-3">
                  {bladeProblems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{problem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
              Double Shaft Shredder Blade Solution
            </h2>
            <p className="text-xl text-gray-700 mb-8 text-center">
              Our double shaft shredder blades are specifically designed to solve these problems
              through optimized material selection, blade geometry, and heat treatment.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {bladeDesignFeatures.map((feature, index) => (
                <Card key={index} className="border-2 border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <CheckCircle2 className="h-6 w-6 text-blue-900 flex-shrink-0 mt-1" />
                      <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-gray-700 ml-9">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <p className="text-lg font-medium text-gray-900">
                Result: Longer blade life, reduced downtime, and lower cost per ton processed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applicable Waste Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
              Suitable for These Industrial Waste Types
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {wasteTypes.map((waste, index) => (
                <Card key={index} className="border-2 border-green-100">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-lg text-gray-700">{waste}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trial Order Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
              Start with a Trial Order
            </h2>
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-8">
                <p className="text-xl text-gray-700 mb-6">
                  For first cooperation, partial trial blade orders are recommended for performance
                  evaluation before bulk replacement.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Small Quantity</p>
                      <p className="text-gray-700">Start with 2-4 pieces</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Test Performance</p>
                      <p className="text-gray-700">Verify in your operation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Compare Results</p>
                      <p className="text-gray-700">Against current blades</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Your Blade Solution Now
            </h2>
            <p className="text-xl text-gray-700">
              Fill out the form below and our blade specialist will contact you within 24 hours
              with a customized solution.
            </p>
          </div>
          <AdsLeadForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}