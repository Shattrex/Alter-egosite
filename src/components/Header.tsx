import React from "react";

const Header = () => {
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDF6E9] shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/assets/alanto-logo.png" 
              alt="Alanto AI" 
              className="h-16 w-auto"
            />
          </a>
          <nav className="flex items-center space-x-6">
            <a 
              href="#your-ai-future" 
              onClick={scrollToSection('your-ai-future')}
              className="text-[var(--comic-brown)] hover:text-[var(--comic-orange)] font-medium transition-colors"
            >
              About
            </a>
            <a 
              href="#contact-form-section" 
              onClick={scrollToSection('contact-form-section')}
              className="text-[var(--comic-brown)] hover:text-[var(--comic-orange)] font-medium transition-colors"
            >
              Demo
            </a>
            <a 
              href="#contact-form-section" 
              onClick={scrollToSection('contact-form-section')}
              className="text-[var(--comic-brown)] hover:text-[var(--comic-orange)] font-medium transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 