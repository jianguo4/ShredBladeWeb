import { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Image modules - 使用shred-blades文件夹作为临时图片源
const bladeImageModules = import.meta.glob<{ default: string }>(
  '../images/double-shaft-shredder-blades/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

export default function DoubleShaftShredderBlades() {
  const [isPageReady, setIsPageReady] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsPageReady(true);
  }, []);

  const bladeImages = useMemo(() => {
    // 为双轴切碎机刀片定义专业的SEO优化alt文本
    const altTextMap: Record<string, string> = {
      'single-shaft-blade-01.jpg': 'Double shaft shredder blade D2 steel for metal scrap processing',
      'single-shaft-blade-02.jpg': 'Replacement double shaft shredder blades set for SSI and Lindner machines',
      'single-shaft-blade-03.jpg': 'Bulk inventory of hook blades for industrial waste shredding',
      'single-shaft-blade-04.jpg': 'Close-up of precision ground tooth geometry on double shaft shredder blade',
      'single-shaft-blade-05.jpg': 'Heat treated surface detail of heavy-duty double shaft shredder blade',
      'single-shaft-blade-06.jpg': 'Industrial grade double shaft shredder blades for MSW processing',
      'single-shaft-blade-07.jpg': 'Custom manufactured shredder knives for construction waste applications',
      'single-shaft-blade-recycling.jpg': 'Professional double shaft shredder blades for high-torque operations'
    };

    return Object.entries(bladeImageModules)
      .map(([path, mod]) => {
        const fileName = path.split('/').pop() || 'blade';
        const alt = altTextMap[fileName] || `Double shaft shredder blade - ${fileName.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')}`;
        return { src: mod.default, alt, fileName };
      })
      .sort((a, b) => a.fileName.localeCompare(b.fileName));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section with Video Background */}
      <section 
        className="relative h-screen bg-gray-900 text-gray-900 overflow-hidden flex items-center justify-end"
        style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
      >
        {/* Static Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
             style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        {/* Video Background */}
        <video
          ref={videoRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            top: 0,
            left: 0,
            zIndex: 0,
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={(e) => {
            console.error('Failed to load video from main source:', e);
            setVideoLoaded(true);
          }}
          onCanPlay={() => {
            setVideoLoaded(true);
            videoRef.current?.play().catch(err => {
              console.log('Video autoplay failed:', err);
            });
          }}
        >
          <source src="/videos/Shredder-machine-running.mp4" type="video/mp4" />
          <source src="/videos/Shredder-machine-running.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black opacity-40" aria-hidden="true"></div>
        {/* Content Area */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full pl-8 pr-4 sm:pl-12 md:pl-20 lg:pl-32 xl:pl-48 text-white transition-all duration-700 max-w-2xl"
          style={{textAlign:'left'}}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Oswald'] uppercase tracking-wider leading-tight drop-shadow-xl">
            Double Shaft Shredder Blades
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-light tracking-wide drop-shadow-lg leading-relaxed">
            Heavy-duty blades for high-torque shredding. Optimized for metal scrap, MSW, and bulky materials with exceptional impact resistance.
          </p>
        </div>
      </section>

      {/* Technical Overview Section */}
      <div className="w-full px-2 sm:px-4 mt-12 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <div className="flex flex-col gap-3 sm:gap-4 mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Technical Overview
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
                Key specifications and materials for double shaft shredder blades.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Applications & Specifications */}
            <div className="bg-slate-50 p-6 border-l-4 border-blue-900 shadow-sm">

              <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-widest border-b border-slate-200 pb-3">
                Applications & Specifications
              </h3>
              <div className="space-y-4">
                <div>
                  <ul className="space-y-2">
                    {['Metal scrap processing', 'Industrial waste reduction', 'MSW & C&D waste'].map((app, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="h-1.5 w-1.5 bg-blue-900 mt-2 flex-shrink-0"></span>
                        <span className="text-slate-700">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Materials & Heat Treatment */}
            <div className="bg-slate-50 p-6 border-l-4 border-amber-600 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-widest border-b border-slate-200 pb-3">
                Materials & Heat Treatment
              </h3>
              <div className="space-y-4">
                <div>
                  <ul className="space-y-2">
                    {['D2 / SKD11 Steel', 'High impact resistance', 'Extended service life'].map((material, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="h-1.5 w-1.5 bg-amber-600 mt-2 flex-shrink-0"></span>
                        <span className="text-slate-700">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section className="mb-16">
          <div className="text-left mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
              Product Showcase
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
              High-Torque Blades for Metal Scrap, Industrial Waste & MSW Processing.
            </p>
          </div>
          {/* 美观统一的图片展示 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {bladeImages.slice(0, 8).map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="group relative overflow-visible bg-white border border-slate-300 rounded-none cursor-pointer"
                style={{ 
                  aspectRatio: '3/2', 
                  width: '100%', 
                  maxWidth: 340, 
                  minWidth: 220, 
                  minHeight: 180, 
                  maxHeight: 240, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px 0 rgba(30,41,59,0.08), 0 4px 8px -2px rgba(30,41,59,0.10)',
                  transition: 'all 350ms cubic-bezier(0.34,1.56,0.64,1)',
                  transform: 'translateZ(0)',
                  perspective: '1000px'
                }}
              >
                {/* 外层深层阴影背景 */}
                <div 
                  className="absolute -inset-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: '0 20px 40px -10px rgba(30,41,59,0.25), 0 12px 24px -8px rgba(30,41,59,0.15)',
                    borderRadius: 0,
                    zIndex: -1
                  }} 
                />
                {/* 精细三层边框系统 */}
                <div 
                  className="absolute inset-0 pointer-events-none group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(30,41,59,0.1),0_0_0_2px_rgba(59,130,246,0.6)]"
                  style={{
                    border: '1px solid #CBD5E1',
                    boxShadow: `
                      inset 0 1px 0 0 rgba(255,255,255,0.8),
                      inset 0 -1px 0 0 rgba(30,41,59,0.05),
                      0 0 0 0 rgba(59,130,246,0)
                    `,
                    transition: 'all 300ms cubic-bezier(0.4,0,0.2,1)',
                    borderRadius: 0
                  }}
                />
                {/* 高光层 */}
                <div 
                  className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent)',
                    borderRadius: 0
                  }}
                />
                {/* 渐变玻璃层效果 */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background: `
                      radial-gradient(circle at 100% 0%, rgba(59,130,246,0.12) 0%, transparent 60%),
                      linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%, rgba(30,41,59,0.04) 100%)
                    `,
                    borderRadius: 0
                  }}
                />
                {/* 内容容器 */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    transform: 'translateZ(0)',
                    transition: 'all 350ms cubic-bezier(0.34,1.56,0.64,1)'
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-125 transition-all duration-500"
                    style={{ borderRadius: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Combined Services Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="text-left flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3 md:mb-2">
                Manufacturing & Support Services
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
                Professional manufacturing with technical support and trial orders.
              </p>
            </div>
            <div className="flex-shrink-0 text-center md:text-right">
              <Link to="/contact-us">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer">
                  Discuss Your Requirements
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Manufacturing Capability */}
            <div className="bg-white border border-slate-300 border-l-4 border-l-[#1A365D] p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-[#1A365D] mr-2"></div>
                <h3 className="text-xl font-bold text-slate-900">Manufacturing</h3>
              </div>
              <ul className="space-y-2">
                {[
                  'Precision CNC machining',
                  'Advanced heat treatment',
                  'Quality control testing'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 bg-blue-900 mt-2 flex-shrink-0"></span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trial Orders & Support */}
            <div className="bg-white border border-slate-300 border-l-4 border-l-amber-700 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-amber-700 mr-2"></div>
                <h3 className="text-xl font-bold text-slate-900">Trial Orders & Support</h3>
              </div>
              <ul className="space-y-2">
                {[
                  'Small trial orders available',
                  'Performance testing',
                  'Technical consultation'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 bg-amber-700 mt-2 flex-shrink-0"></span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}