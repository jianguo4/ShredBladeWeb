import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const [navValue, setNavValue] = useState<string | undefined>(undefined);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const keepProductsOpen = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setNavValue('products');
  };

  const scheduleProductsClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => setNavValue(undefined), 16);
  };

  useEffect(() => () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
  }, []);

  const applicationProducts = [
    { 
      title: 'Plastic Recycling Blades', 
      href: '/plastic-recycling-blades',
      description: 'PET Bottles, Film, Pipes, Lumps | SKD-11, DC53' 
    },
    { 
      title: 'Metal Scrap Shears', 
      href: '/metal-scrap-shears',
      description: 'Car Bodies, UBC (Cans), Aluminum Profiles | H13, 6CrW2Si' 
    },
    { 
      title: 'Tire Shredder Knives', 
      href: '/tire-shredder-knives',
      description: 'Passenger Tires, Truck Tires (TDF) | Hard-facing welding or High-wear alloy' 
    },
    { 
      title: 'Solid Waste & RDF Blades', 
      href: '/solid-waste-rdf-blades',
      description: 'Bulky Waste, Wood Pallets, Mattresses | Durability & Cost-effectiveness' 
    },
    { 
      title: 'E-Waste & Data Destruction', 
      href: '/ewaste-data-destruction',
      description: 'HDD, PCB Boards' 
    },
  ];

  const shaftTypeProducts = [
    { 
      title: 'Single Shaft', 
      href: '/single-shaft-shredder-blades',
      description: 'Optimized for general waste and plastic lumps.'
    },
    { 
      title: 'Double Shaft', 
      href: '/double-shaft-shredder-blades',
      description: 'High-torque shearing for bulky materials.'
    },
    { 
      title: 'Four Shaft', 
      href: '/four-shaft-shredder-blades',
      description: 'Uniform particle size control for fine shredding.'
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold uppercase tracking-wide font-['Oswald'] text-slate-900 leading-tight">
              Liqun Shredder Blades & Knives
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-['Oswald'] uppercase tracking-wide text-base font-bold text-slate-800 hover:text-blue-900 transition-colors leading-none h-auto py-0">
              Home
            </Link>

            <NavigationMenu
              value={navValue}
              onValueChange={(value) => setNavValue(value)}
              onMouseLeave={scheduleProductsClose}
            >
              <NavigationMenuList className="space-x-8">
                <NavigationMenuItem
                  value="products"
                  onMouseEnter={keepProductsOpen}
                  onMouseLeave={scheduleProductsClose}
                >
                  <NavigationMenuTrigger
                    onMouseEnter={keepProductsOpen}
                    className="font-['Oswald'] uppercase tracking-wide text-base font-bold text-slate-800 hover:text-blue-900 bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent h-auto py-0 px-0 transition-colors leading-none flex items-center"
                  >
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent
                    onMouseEnter={keepProductsOpen}
                    onMouseLeave={scheduleProductsClose}
                  >
                    <div className="grid w-[500px] gap-0 p-0 grid-cols-2 bg-white rounded-md overflow-hidden shadow-xl border border-slate-100">
                      
                      {/* Column 1: Applications */}
                      <div className="p-4 bg-slate-50/50 border-r border-slate-100">
                        <div className="mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
                          <div className="h-5 w-1 bg-amber-500 rounded-sm"></div>
                          <h4 className="text-sm font-bold text-slate-900 font-['Oswald'] uppercase tracking-wide">
                            By Applications
                          </h4>
                        </div>
                        <ul className="space-y-1">
                          {applicationProducts.map((item) => (
                            <li key={item.title}>
                              <Link
                                to={item.href}
                                className="group block select-none rounded w-full p-2 leading-none no-underline outline-none transition-all hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 text-sm font-bold text-slate-700 group-hover:text-amber-600 font-['Oswald'] tracking-wide"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: Shaft Type */}
                      <div className="p-4">
                         <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                            <div className="h-5 w-1 bg-blue-700 rounded-sm"></div>
                            <h4 className="text-sm font-bold text-slate-900 font-['Oswald'] uppercase tracking-wide">
                              By Shaft Type
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {shaftTypeProducts.map((item) => (
                              <li key={item.title}>
                              <Link
                                to={item.href}
                                className="group block select-none rounded w-full p-2 leading-none no-underline outline-none transition-all hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 text-sm font-bold text-slate-700 group-hover:text-amber-600 font-['Oswald'] tracking-wide"
                              >
                                {item.title}
                              </Link>
                              </li>
                            ))}
                          </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/about-us" className="font-['Oswald'] uppercase tracking-wide text-base font-bold text-slate-800 hover:text-blue-900 transition-colors leading-none h-auto py-0">
              About Us
            </Link>

            <Link
              to="/contact-us"
              className="font-['Oswald'] uppercase tracking-wide text-base font-bold px-4 py-2 border-2 border-amber-500 rounded-md text-amber-600 bg-white hover:bg-amber-500 hover:text-white shadow-sm transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="text-lg font-medium text-gray-700 hover:text-blue-900">
                  Home
                </Link>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500">Applications</p>
                  {applicationProducts.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block pl-4 text-gray-700 hover:text-blue-900"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500">Products</p>
                  <div className="pl-4 space-y-2">
                    <p className="text-xs font-semibold text-gray-400">By Application</p>
                    {applicationProducts.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="block pl-2 text-sm text-gray-700 hover:text-blue-900"
                      >
                        {item.title}
                      </Link>
                    ))}
                    <p className="text-xs font-semibold text-gray-400 pt-2">By Shaft Type</p>
                    {shaftTypeProducts.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="block pl-2 text-sm text-gray-700 hover:text-blue-900"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/about-us"
                  className="text-lg font-medium text-gray-700 hover:text-blue-900"
                >
                  About Us
                </Link>
                <Link to="/contact-us">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                    Contact Us
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}