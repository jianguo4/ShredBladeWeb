import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import CookieBanner from './components/CookieBanner';

// Lazy load pages for better performance
const Index = lazy(() => import('./pages/Index'));
const ShredderBlades = lazy(() => import('./pages/ShredderBlades'));
const PlasticRecycling = lazy(() => import('./pages/PlasticRecycling'));
const MetalScrapShears = lazy(() => import('./pages/MetalScrapShears'));
const EWasteDataDestruction = lazy(() => import('./pages/EWasteDataDestruction'));
const TireShredderKnives = lazy(() => import('./pages/TireShredderKnives'));
const SolidWasteRDF = lazy(() => import('./pages/SolidWasteRDF'));
const MunicipalSolidWasteRecycling = lazy(() => import('./pages/MunicipalSolidWasteRecycling'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const SingleShaftShredderBlades = lazy(() => import('./pages/SingleShaftShredderBlades'));
const DoubleShaftShredderBlades = lazy(() => import('./pages/DoubleShaftShredderBlades'));
const FourShaftShredderBlades = lazy(() => import('./pages/FourShaftShredderBlades'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      <p className="mt-4 text-slate-600">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

// 路由变化时滚动到顶部的包装组件
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <HashRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shredder-blades" element={<ShredderBlades />} />
          <Route path="/plastic-recycling-blades" element={<PlasticRecycling />} />
          <Route path="/metal-scrap-shears" element={<MetalScrapShears />} />
          <Route path="/ewaste-data-destruction" element={<EWasteDataDestruction />} />
          <Route path="/tire-shredder-knives" element={<TireShredderKnives />} />
          <Route path="/solid-waste-rdf-blades" element={<SolidWasteRDF />} />
          <Route path="/solid-waste-rdf-blades-msw" element={<MunicipalSolidWasteRecycling />} />
          <Route path="/single-shaft-shredder-blades" element={<SingleShaftShredderBlades />} />
          <Route path="/double-shaft-shredder-blades" element={<DoubleShaftShredderBlades />} />
          <Route path="/four-shaft-shredder-blades" element={<FourShaftShredderBlades />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieBanner />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;