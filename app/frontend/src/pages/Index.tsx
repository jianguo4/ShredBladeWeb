import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, ArrowUpRight, Clock, AlertTriangle, DollarSign, BarChart3, TrendingUp, Mail, Phone, FileText, Shield, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useRef, useEffect, useMemo } from 'react';

export default function Index() {
  const [isPageReady, setIsPageReady] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manufacturingScrollRef = useRef<HTMLDivElement>(null);

  const scrollManufacturing = (direction: 'prev' | 'next') => {
    const container = manufacturingScrollRef.current;
    if (!container) return;
    const amount = Math.round(container.clientWidth * 0.8);
    container.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // 页面加载后立即标记为就绪，避免闪烁
    setIsPageReady(true);
  }, []);
  const applications = [
    {
      title: 'Plastic Recycling',
      imageFile: 'plastic waste.jpg',
      link: '/plastic-recycling-blades',
    },
    {
      title: 'Metal Recycling',
      imageFile: 'metal waste.jpg',
      link: '/metal-scrap-shears',
    },
    {
      title: 'E-waste Recycling',
      imageFile: 'e-waste.jpg',
      link: '/ewaste-data-destruction',
    },
    {
      title: 'Tire Recycling',
      imageFile: 'tire waste.jpg',
      link: '/tire-shredder-knives',
    },
    {
      title: 'Industrial Waste Recycling',
      imageFile: 'industrial waste.jpg',
      link: '/solid-waste-rdf-blades',
    },
    {
      title: 'Municipal Solid Waste Recycling',
      imageFile: 'Municipal Solid Waste.jpg',
      link: '/solid-waste-rdf-blades-msw',
    },
  ];

  const applicationImageModules = import.meta.glob<{ default: string }>(
    '../images/scene/*.{jpg,jpeg,png,webp}',
    { eager: true }
  );

  const homeImageModules = import.meta.glob<{ default: string }>(
    '../images/home/*.webp',
    { eager: true }
  );

  const getHomeImage = (fileName: string) =>
    homeImageModules[`../images/home/${fileName}`]?.default ?? '';

  const getSceneImage = (fileName: string) =>
    applicationImageModules[`../images/scene/${fileName}`]?.default ?? '';

  const getSceneImageBase = (fileName: string) => fileName.replace(/\.[^.]+$/, '');

  const getSceneImageByExt = (fileName: string, ext: 'webp' | 'jpg' | 'jpeg' | 'png') =>
    applicationImageModules[`../images/scene/${getSceneImageBase(fileName)}.${ext}`]?.default ?? '';

  const shaftTypes = [
    {
      title: 'Single Shaft',
      image: 'single-shredder-blades.webp',
      description: 'Ideal for high-volume processing of plastics, paper, and lightweight materials. Features rotating blades with hydraulic ram feeding system for consistent particle size.'
    },
    {
      title: 'Double Shaft',
      image: 'double-shredder-blades.webp',
      description: 'Versatile solution for mixed waste streams including e-waste, tires, and industrial scrap. Twin counter-rotating shafts provide powerful cutting action with minimal maintenance.'
    },
    {
      title: 'Four Shaft',
      image: 'four-shredder-blades.webp',
      description: 'Premium system for ultra-fine size reduction and homogeneous output. Combines pre-shredding and secondary cutting stages for maximum throughput and precision control.'
    }
  ];

  const manufacturingImageModules = import.meta.glob<{ default: string }>(
    '../images/MANUFACTURING PROCESS/*.webp',
    { eager: true }
  );

  const manufacturingSteps = useMemo(() => {
    const sortOrder = ['material', 'forging', 'heat','cnc', 'grinding',  'wire', 'quality', 'pack'];
    const getSortIndex = (fileName: string) => {
      const name = fileName.toLowerCase();
      const index = sortOrder.findIndex((key) => name.includes(key));
      return index === -1 ? Number.POSITIVE_INFINITY : index;
    };

    return Object.entries(manufacturingImageModules)
      .map(([path, mod]) => {
        const fileName = path.split('/').pop() || 'process';
        const nameWithoutExt = fileName.replace(/\.[^.]+$/, '');
        const title = nameWithoutExt.replace(/[-_]+/g, ' ').trim();
        const alt = `Manufacturing process - ${title}`;
        return { src: mod.default, title, alt, fileName, baseName: nameWithoutExt };
      })
      .sort((a, b) => {
        const orderDiff = getSortIndex(a.fileName) - getSortIndex(b.fileName);
        return orderDiff !== 0 ? orderDiff : a.fileName.localeCompare(b.fileName);
      });
  }, []);

  const heroPosterWebp = getSceneImageByExt('plastic waste.jpg', 'webp');
  const heroPosterJpg = getSceneImageByExt('plastic waste.jpg', 'jpg') || getSceneImage('plastic waste.jpg');

  return (
      <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Header />

      {/* Mobile Sticky CTA */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-amber-500 py-2 px-4 md:hidden shadow-lg">
        <Link to="/contact-us" className="block">
          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold">
            Get a Trial Order Quote
          </Button>
        </Link>
      </div>

      {/* Hero Section with Full-Width Video Background */}
      <section 
        className="relative h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 text-gray-900 overflow-hidden flex items-center justify-end"
      >
        {/* 静态背景 - 始终显示，避免白屏 - 这就是首屏内容 */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950" />
        
        {/* 视频背景 - 异步加载，不阻止首屏渲染 */}
        <video
          ref={videoRef}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Shredder machinery running in a factory environment"
          poster={heroPosterWebp || heroPosterJpg}
          onError={(e) => {
            console.error('Failed to load video:', e);
            setVideoLoaded(true);
          }}
          onCanPlay={() => {
            setVideoLoaded(true);
            videoRef.current?.play().catch(err => {
              console.log('Video autoplay failed:', err);
            });
          }}
        >
          <source src="videos/Shredder-machine-running.webm" type="video/webm" />
          <source src="videos/Shredder-machine-running.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 视频遮罩层 */}
        <div className="absolute inset-0 bg-black opacity-40" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" aria-hidden="true"></div>
        
        {/* 内容区域 - 立即显示，带淡入动画 */}
        <div className={`max-w-4xl mr-8 lg:mr-16 px-4 sm:px-6 lg:px-8 text-left relative z-10 text-white transition-all duration-700 ${
          isPageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-['Oswald'] uppercase tracking-wider leading-tight drop-shadow-xl">
            Engineering The Sharpest Edge for The Toughest Waste
          </h1>
          <p className="text-xl md:text-3xl mb-8 text-slate-200 font-light tracking-widest drop-shadow-lg">
            Maximize your shredder's uptime with replacement blades designed for superior wear resistance
          </p>
          <div className="text-left">
            <Link to="/contact-us">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8">
                Get a Trial Order Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signal Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-2">Facilities Served</p>
              <p className="text-3xl font-bold text-slate-900">1,200+</p>
              <p className="text-sm text-slate-600 mt-2">Global recycling and waste operations</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-2">Quality System</p>
              <p className="text-3xl font-bold text-slate-900">ISO Ready</p>
              <p className="text-sm text-slate-600 mt-2">Traceable metallurgy and QC documentation</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-2">Delivery Lead Time</p>
              <p className="text-3xl font-bold text-slate-900">2-4 Weeks</p>
              <p className="text-sm text-slate-600 mt-2">Rapid production for critical spares</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Problems Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-3xl mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Is Your Shredding Operation Held Back by These Issues?
            </h2>
            <p className="text-xl text-slate-600">
              Inefficient blades don't just cost money,
              <br />
              they cost you production time and peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Problem 1 */}
            <Card className="bg-white border border-slate-200 border-t-4 border-t-[#1A365D] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden rounded-none">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1A365D]/10 flex items-center justify-center mb-6 group-hover:bg-[#1A365D]/20 transition-colors">
                  <Clock className="w-8 h-8 text-[#1A365D]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">Premature Wear</h3>
                <p className="text-slate-600 leading-relaxed">
                  Blades dulling too fast, forcing frequent changeovers and halting production lines.
                </p>
              </CardContent>
            </Card>

            {/* Problem 2 */}
            <Card className="bg-white border border-slate-200 border-t-4 border-t-[#1A365D] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden rounded-none">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1A365D]/10 flex items-center justify-center mb-6 group-hover:bg-[#1A365D]/20 transition-colors">
                  <BarChart3 className="w-8 h-8 text-[#1A365D]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">Unstable Performance</h3>
                <p className="text-slate-600 leading-relaxed">
                  Inconsistent cutting quality leading to material jams and reprocessing needs.
                </p>
              </CardContent>
            </Card>

            {/* Problem 3 */}
            <Card className="bg-white border border-slate-200 border-t-4 border-t-[#1A365D] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden rounded-none">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1A365D]/10 flex items-center justify-center mb-6 group-hover:bg-[#1A365D]/20 transition-colors">
                  <DollarSign className="w-8 h-8 text-[#1A365D]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">Excessive OEM Costs</h3>
                <p className="text-slate-600 leading-relaxed">
                  Paying premium prices for brand-name replacement blades with standard durability.
                </p>
              </CardContent>
            </Card>

            {/* Problem 4 */}
            <Card className="bg-white border border-slate-200 border-t-4 border-t-[#1A365D] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden rounded-none">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#1A365D]/10 flex items-center justify-center mb-6 group-hover:bg-[#1A365D]/20 transition-colors">
                  <AlertTriangle className="w-8 h-8 text-[#1A365D]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 whitespace-nowrap">Quality Variance</h3>
                <p className="text-slate-600 leading-relaxed">
                  Unpredictable lifespan between batches making maintenance planning impossible.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/contact-us">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6">
                Get a Trial Order Quote
              </Button>
            </Link>
            <Link to="/shredder-blades" className="text-slate-700 font-semibold hover:text-amber-600 transition-colors">
              Explore Blade Solutions →
            </Link>
          </div>
        </div>
      </section>

      {/* How We Help Section - Full Width */}
      <section className="py-12 bg-gradient-to-br from-[#1A365D] to-[#0f2944] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title & Description */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                How We Help
              </h3>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                We optimize material selection and heat treatment to match exactly what your equipment needs.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-amber-500"></div>
                <p className="text-slate-400 text-sm">Built for reliability. Designed for results.</p>
              </div>
            </div>

            {/* Right Side - Three Metrics Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/* Metric 1 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg mb-1">30-50% Longer Lifespan</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Extended blade durability reduces replacements and production downtime
                    </p>
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg mb-1">Batch Consistency</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Predictable performance eliminates quality variance between production runs
                    </p>
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <DollarSign className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg mb-1">20-40% Lower TCO</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Superior lifespan and consistency deliver real savings on total costs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Excellence Section - Shaft Types */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Title */}
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Engineered Metallurgy for Different Shaft
            </h2>
            <p className="text-lg text-slate-600">
              Precision-engineered blade solutions optimized for single, double, and four-shaft shredder configurations
            </p>
          </div>

          {/* Shaft Types - 3 Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {shaftTypes.map((shaft, index) => (
              <Card key={index} className="bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getHomeImage(shaft.image)}
                    alt={shaft.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width={640}
                    height={384}
                  />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{shaft.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {shaft.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 bg-slate-50">
        <div className="w-full px-2 sm:px-4">
          <div className="text-left mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shredder Blades Application
            </h2>
            <p className="text-lg text-slate-600">
              Optimized blade performance for every challenge
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-stretch max-w-7xl mx-auto">
            {applications.map((app, index) => (
              <Link key={index} to={app.link} className="group block cursor-pointer w-full">
                <div className="relative overflow-hidden bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-300 w-full aspect-[16/10]">
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gray-700">
                    <picture>
                      {getSceneImageByExt(app.imageFile, 'webp') && (
                        <source
                          srcSet={getSceneImageByExt(app.imageFile, 'webp')}
                          type="image/webp"
                        />
                      )}
                      <img
                        src={getSceneImageByExt(app.imageFile, 'jpg') || getSceneImage(app.imageFile)}
                        alt={app.title}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        fetchPriority="low"
                      />
                    </picture>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>

                  {/* Content Overlay */}
                  <div className="relative h-full flex flex-col justify-between p-6 z-10">
                    {/* Title at top left */}
                    <div>
                      <div className="inline-flex items-center text-xs font-semibold uppercase tracking-widest bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full mb-3">
                        Application
                      </div>
                      <div className="text-sm text-slate-300 font-regular mb-1 group-hover:text-amber-300 transition-colors duration-300">
                        Shredder Blades for
                      </div>
                      <h3 className="text-3xl font-bold text-white leading-tight group-hover:text-amber-400 transition-colors duration-300">
                        {app.title}
                      </h3>
                    </div>

                    {/* CTA Arrow Icon */}
                    <div className="flex items-center justify-end">
                      <ArrowUpRight className="h-8 w-8 text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-amber-500 w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              SHREDDER MACHINE BLADES MANUFACTURING PROCESS
            </h2>
            <p className="text-lg text-slate-600">
              Combining precision hot forging for superior toughness, CNC machining for exacting tolerances, and rigorous QA to guarantee reliable performance in demanding applications.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div 
              ref={manufacturingScrollRef}
              className="flex gap-4 sm:gap-6 blade-gallery-scroll scroll-smooth"
            >
              {[...manufacturingSteps, ...manufacturingSteps].map((step, index) => (
                <div key={`${step.fileName}-${index}`} className="flex-shrink-0 w-64 sm:w-80">
                  <div className="bg-white shadow-lg overflow-hidden border border-slate-200">
                    <img
                      src={step.src}
                      alt={step.alt}
                      className="w-full h-48 sm:h-56 object-cover bg-gray-200"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      width={320}
                      height={224}
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
