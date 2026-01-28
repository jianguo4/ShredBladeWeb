import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A365D] text-gray-300 w-full">
      <div className="w-full pl-3 sm:pl-5 lg:pl-6 xl:pl-8 pr-0 py-10">
        <div className="grid items-start grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-y-8 md:gap-y-8 gap-x-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-white text-xl font-bold tracking-[0.08em] whitespace-nowrap">Liqun Machinery & Cutting Tools Co., Ltd</h3>
            <p className="text-sm leading-8 text-gray-200 whitespace-normal max-w-none md:max-w-[52ch] lg:max-w-[50ch] xl:max-w-[48ch] 2xl:max-w-[46ch]">
              Liqun provides professional shredder blade solutions. We eliminate premature wear and blade failure through custom-engineered alloys and precision heat treatment, drastically extending cutting life and maximizing your shredder's throughput.
            </p>
          </div>

          {/* Applications (Combined) */}
          <div className="space-y-3">
            <h4 className="text-white text-xl font-bold">Applications</h4>
            <ul className="space-y-2.5 text-sm text-gray-200">
              <li>
                <Link
                  to="/plastic-recycling-blades"
                  className="hover:text-white transition-colors duration-200"
                >
                  Plastic Recycling Blades
                </Link>
              </li>
              <li>
                <Link
                  to="/metal-scrap-shears"
                  className="hover:text-white transition-colors duration-200"
                >
                  Metal Scrap Shears
                </Link>
              </li>
              <li>
                <Link
                  to="/ewaste-data-destruction"
                  className="hover:text-white transition-colors duration-200"
                >
                  E-Waste & Data Destruction
                </Link>
              </li>
              <li>
                <Link
                  to="/tire-shredder-knives"
                  className="hover:text-white transition-colors duration-200"
                >
                  Tire Shredder Knives
                </Link>
              </li>
              <li>
                <Link
                  to="/solid-waste-rdf-blades"
                  className="hover:text-white transition-colors duration-200"
                >
                  Solid Waste & RDF Blades
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-xl font-bold">Contact</h4>
            <ul className="space-y-2.5 text-sm text-gray-200">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@shredderblades.com" className="hover:text-white transition-colors duration-200">
                  info@shredderblades.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-white transition-colors duration-200">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-sm text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Industrial Shredder Blades. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}