import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Index from './pages/Index';
import ShredderBlades from './pages/ShredderBlades';
import PlasticRecycling from './pages/PlasticRecycling';
import MetalScrapShears from './pages/MetalScrapShears';
import EWasteDataDestruction from './pages/EWasteDataDestruction';
import TireShredderKnives from './pages/TireShredderKnives';
import SolidWasteRDF from './pages/SolidWasteRDF';
import MunicipalSolidWasteRecycling from './pages/MunicipalSolidWasteRecycling';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SingleShaftShredderBlades from './pages/SingleShaftShredderBlades';
import DoubleShaftShredderBlades from './pages/DoubleShaftShredderBlades';
import FourShaftShredderBlades from './pages/FourShaftShredderBlades';
import NotFound from './pages/NotFound';

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
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;