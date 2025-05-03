import React from "react";
import NeonButton from "./NeonButton";
import { Zap, Phone, Bot, Calendar } from "lucide-react";

const Header = () => {
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-cream shadow-[0_2px_0_var(--comic-shadow)]" style={{ backgroundColor: "var(--comic-cream-light)" }}>
      <div className="container mx-auto px-4 py-3">
        {/* Main navigation row */}
        <div className="flex justify-end items-center">
          <nav className="hidden md:flex items-center space-x-4">
            <a 
              href="#ai-shadow" 
              onClick={scrollToSection('slide1')}
              className="text-[var(--comic-brown)] hover:text-[var(--comic-orange)] font-bold transition-colors"
            >
              AI Shadow
            </a>
            <a 
              href="#ai-caller" 
              onClick={scrollToSection('slide2')}
              className="text-[var(--comic-brown)] hover:text-[var(--comic-orange)] font-bold transition-colors"
            >
              AI Caller
            </a>
            <a 
              href="#ai-seller" 
              onClick={scrollToSection('slide3')}
              className="text-[var(--comic-brown)] hover:text-[var(--comic-orange)] font-bold transition-colors"
            >
              AI Seller
            </a>
            <a
              href="#get-free-alter-ego"
              onClick={scrollToSection('get-free-alter-ego')}
              className="text-[var(--comic-brown)] hover:text-[var(--comic-orange)] font-bold transition-colors"
            >
              Pricing
            </a>
            <a href="#contact-form-section" onClick={scrollToSection('contact-form-section')}>
              <NeonButton size="sm">
                <span className="flex items-center">
                  <Zap className="mr-1 h-4 w-4" />
                  Get Started
                </span>
              </NeonButton>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <a href="#contact-form-section" onClick={scrollToSection('contact-form-section')}>
              <NeonButton size="sm">Get Started</NeonButton>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 