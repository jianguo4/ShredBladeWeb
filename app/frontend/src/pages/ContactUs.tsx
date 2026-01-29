import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, MapPin, CheckCircle2, ShieldCheck, Clock3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './ContactUs.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiBase = import.meta.env.VITE_API_BASE || window.location.origin;
    try {
      const response = await fetch(`${apiBase}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({
            name: '',
            phone: '',
            email: '',
            message: '',
          });
          setSubmitted(false);
        }, 3000);
      } else {
        console.error('Error:', result.error);
        alert('Failed to submit inquiry: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Network error:', error);
      alert(`Network error. Make sure the backend server is reachable at ${apiBase}`);
    }
  };

  const contactCards = [
    {
      label: 'Whatsapp',
      line1: '(+86)15551757389',
      line2: 'WhatsApp available',
      icon: <MessageSquare className="w-5 h-5" />,
      link: 'https://wa.me/8615551757389',
    },
    {
      label: 'General Inquiries',
      line1: 'info@shredderbladesdirect.com',
      line2: 'sales@shredderbladesdirect.com',
      icon: <Mail className="w-5 h-5" />,
    },
    {
      label: 'Factory Address',
      line1: "Bowang High-tech Industrial Development Zone",
      line2: "Ma'anshan City, China",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section - Aligned with Home Page Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 contact-hero">
        <div className="px-4 py-32 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">
              We're Ready to Help
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 font-['Oswald'] tracking-wider">
              Get Your Blade Solution Today
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
              Whether you need trial orders, custom designs, or technical support, our specialists are here to deliver fast, reliable solutions for your shredding operation.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section - Two Column Layout */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Inquiry Form */}
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">Send Us Your Inquiry</h2>
              </div>

              {submitted ? (
                <div className="text-center py-16 bg-white rounded-xl p-8 lg:p-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h2>
                  <p className="text-slate-600">Your inquiry has been received. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-3 lg:p-5 rounded-xl shadow-sm border border-slate-200">
                  {/* Message Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full bg-[#1A365D] text-white flex items-center justify-center text-xs font-bold">1</div>
                      <h3 className="text-base font-bold text-slate-900">What can we do for you</h3>
                    </div>
                    <div>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={3}
                        placeholder="Describe your requirements, inquiry type, or what you need..."
                        className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-[#1A365D] focus:outline-none focus:ring-2 focus:ring-[#1A365D]/20 transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full bg-[#1A365D] text-white flex items-center justify-center text-xs font-bold">2</div>
                      <h3 className="text-base font-bold text-slate-900">How can we get in touch</h3>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      {/* Name */}
                      <div>
                        <Label htmlFor="name" className="text-sm font-semibold text-slate-700 mb-1.5 block">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 font-medium focus:border-[#1A365D] focus:outline-none focus:ring-2 focus:ring-[#1A365D]/20 transition-all"
                          placeholder="Your full name"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 mb-1.5 block">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          required
                          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 font-medium focus:border-[#1A365D] focus:outline-none focus:ring-2 focus:ring-[#1A365D]/20 transition-all"
                          placeholder="+1 234-567-8900"
                        />
                      </div>

                      {/* Email */}
                        <div className="md:col-span-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-1.5 block">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 font-medium focus:border-[#1A365D] focus:outline-none focus:ring-2 focus:ring-[#1A365D]/20 transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy & Submit */}
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        className="w-auto px-12 bg-[#1A365D] hover:bg-[#0f2944] text-white font-bold py-2 text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Send Inquiry
                      </Button>
                    </div>

                    <p className="text-xs text-slate-500 text-center">
                      We respect your privacy. Your data will only be used to respond to your inquiry.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column - Contact Card */}
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">Let's get in touch！</h2>
              </div>

              <Card className="border-l-4 border-l-[#1A365D] bg-white shadow-lg h-full">
                <CardContent className="p-6 space-y-5 h-full flex flex-col">
                  {contactCards.map((card) => {
                    const content = (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#1A365D]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A365D]/20 transition-colors">
                          <div className="text-[#1A365D]">{card.icon}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-slate-900 mb-1">{card.label}</h3>
                          <p className="text-slate-700 font-semibold text-sm mb-1">{card.line1}</p>
                          <p className="text-slate-600 text-sm">{card.line2}</p>
                        </div>
                        {card.link && (
                          <Button
                            variant="outline"
                            className="border-[#1A365D] text-[#1A365D] hover:bg-[#1A365D] hover:text-white transition-all duration-200 flex-shrink-0 mr-20 px-6 py-2 text-base font-semibold"
                          >
                            Chat Now
                          </Button>
                        )}
                      </div>
                    );

                    return card.link ? (
                      <a
                        key={card.label}
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:bg-slate-50 rounded-lg p-3 -m-3 transition-all duration-200 cursor-pointer border border-transparent hover:border-[#1A365D]/20"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={card.label} className="p-3 -m-3">{content}</div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
