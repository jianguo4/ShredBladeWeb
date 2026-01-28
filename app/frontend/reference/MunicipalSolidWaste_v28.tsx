import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function MunicipalSolidWaste() {
  const challenges = [
    'Highly heterogeneous material composition',
    'Frequent impact from hard or unshreddable objects',
    'Severe blade wear and unpredictable load conditions',
    'High maintenance cost and downtime',
  ];

  const doubleShaftBenefits = [
    'Stable cutting behavior',
    'Strong resistance to impact and shock loads',
    'Improved operational safety and reliability',
  ];

  const bladeDesignFeatures = [
    'Thick, heavy-duty blade structure',
    'Tooth profiles optimized for mixed waste',
    'Toughness-oriented heat treatment',
    'Balanced wear resistance to extend service life',
  ];

  const typicalMaterials = [
    'Household waste',
    'Commercial waste',
    'Organic and inorganic mixed materials',
    'Packaging waste and bulky refuse',
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="MSW Shredder Blades | Municipal Solid Waste Shredding Solutions"
        description="Professional shredder blades for municipal solid waste (MSW) processing. Heavy-duty double shaft blade solutions for household waste, commercial waste, and mixed materials. Toughness-oriented design for reliable performance."
        keywords="MSW shredder blades, municipal solid waste blades, household waste shredding, commercial waste blades, mixed waste shredder, double shaft MSW blades, waste management blades, refuse shredder blades, municipal waste processing"
        canonicalUrl="/municipal-solid-waste-shredding"
        ogTitle="Municipal Solid Waste Shredder Blades - MSW Processing Solutions"
        ogDescription="Reliable MSW shredder blade solutions for highly mixed municipal waste. Heavy-duty construction with toughness-oriented heat treatment for stable cutting and extended service life."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Municipal Solid Waste Shredding Blade Solution
            </h1>
            <p className="text-2xl text-blue-100">
              Reliable blade solutions for highly mixed municipal solid waste materials
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Industry Background */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Industry Background
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 mb-8 text-center">
              Municipal solid waste (MSW) consists of highly mixed materials collected from residential, commercial and public facilities.
            </p>
            <Card className="border-2 border-amber-200 bg-amber-50">
              <CardContent className="p-8">
                <div className="flex items-start gap-3 mb-6">
                  <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <p className="text-xl font-semibold text-gray-900">
                    Typical challenges in MSW shredding include:
                  </p>
                </div>
                <ul className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2: Recommended Shredding Configuration */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Recommended Shredding Configuration
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 mb-8 text-center">
              For MSW processing, double shaft shredders are commonly adopted due to their ability to handle mixed waste under low-speed, high-torque conditions.
            </p>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                  This shredding method provides:
                </h3>
                <ul className="space-y-4 mb-6">
                  {doubleShaftBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-blue-50 rounded-lg p-6 mt-6">
                  <p className="text-lg text-gray-900 mb-3">
                    Learn more about our blade solutions designed specifically for double shaft shredders:
                  </p>
                  <Link to="/double-shaft-shredder-blades">
                    <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                      View Double Shaft Shredder Blades →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: Blade Solution for MSW Applications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Blade Solution for MSW Applications
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 mb-8 text-center">
              Based on MSW characteristics, shredder blades should prioritize toughness and structural strength rather than extreme hardness.
            </p>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                  Our recommended blade design features:
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {bladeDesignFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-blue-900 flex-shrink-0 mt-1" />
                      <p className="text-lg text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: Typical MSW Materials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Typical MSW Materials
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {typicalMaterials.map((material, index) => (
              <Card key={index} className="border-2 border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-700">{material}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Trial Order & Cooperation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Trial Order & Cooperation
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-8">
                <p className="text-xl text-gray-700 mb-6">
                  Due to the complex nature of MSW, we recommend partial trial blade orders to evaluate performance before bulk replacement.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Blade dimensions and materials can be adjusted after trial feedback to achieve optimal results.
                </p>
                <div className="bg-white rounded-lg p-6 mt-6">
                  <p className="text-lg text-gray-900 mb-4">
                    Learn more about our specialized blade solutions:
                  </p>
                  <Link to="/double-shaft-shredder-blades">
                    <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                      View Double Shaft Shredder Blades →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Looking for a reliable blade solution for MSW shredding?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact us to discuss your MSW shredding application
          </p>
          <Link to="/contact-us">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8">
              Get Blade Recommendation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}