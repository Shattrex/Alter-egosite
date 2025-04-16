import React, { useState, useEffect } from "react";
import VideoEmbed from "@/components/VideoEmbed";
import NeonButton from "@/components/NeonButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import ContactForm from "@/components/ContactForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Zap, Eye, MessageCircle, Phone, Mail, Linkedin } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("slide1");
  
  // Show warning tooltip with a timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      toast({
        title: "WARNING",
        description: "May cause unfair competitive advantage",
        className: "bg-black border border-yellow-300 text-yellow-300",
      });
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Logo in top right corner */}
      <div className="fixed top-4 right-4 z-50">
        <a href="https://alantoai.com" target="_blank" rel="noopener noreferrer">
          <img 
            src="/images/alanto-logo-new.svg" 
            alt="Alanto.ai" 
            className="h-16 site-logo" 
          />
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-circuit-board opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-radial from-red-900/40 to-black"></div>
          <div className="absolute right-10 top-10 mercury-bg w-40 h-40 animate-mercury-flow opacity-30"></div>
          <div className="absolute left-20 bottom-20 mercury-bg w-60 h-60 animate-mercury-flow opacity-20" style={{ animationDelay: "-5s" }}></div>
        </div>
        
        {/* AI Character */}
        <div className="relative w-64 h-64 mb-12 animate-float">
          <div className="absolute inset-0 crt-overlay rounded-full bg-gradient-radial from-gray-500/80 to-gray-800/90 border border-red-600/50"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-[60px] w-32 h-4">
            <div className="absolute left-2 w-10 h-3 bg-red-600 rounded-full opacity-80 animate-pulse-eye blur-[2px]"></div>
            <div className="absolute right-2 w-10 h-3 bg-red-600 rounded-full opacity-80 animate-pulse-eye blur-[2px]" style={{ animationDelay: "0.5s" }}></div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-20 h-1 bg-red-600 rounded-full opacity-50"></div>
          <div className="absolute inset-0 binary-code"></div>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl text-center mb-6 z-10 jagged-text animate-glowing crt-text">
          <span className="block md:inline">Build #1 AI</span>
          <span className="block md:inline text-yellow-300 bg-red-600 px-2"> Alter Ego</span>
          <span className="block md:inline"> for CEOs</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-center mb-10 max-w-2xl crt-text">
          The Last Human You'll Ever Need to Scale – 
          <span className="text-white font-bold"> No Cameras, </span>
          <span className="text-yellow-300 font-bold">No Scripts, No Limits</span>
        </p>
        
        {/* Bold Statement and CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-12 z-10">
          <p className="tooltip-warning neon-flicker">
            We don't compete – we obsolete.
          </p>
          <a href="#contact-form-section" onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <NeonButton size="lg">
              <span className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Claim Free Alter Ego
              </span>
            </NeonButton>
          </a>
        </div>
      </section>
      
      {/* Product Showcase Slides */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-10 crt-text">
          <span className="text-yellow-300">Your AI Future</span> Is Here
        </h2>
        
        <Tabs 
          defaultValue="slide1" 
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/30 border border-red-600/30">
            <TabsTrigger value="slide1" className="crt-text data-[state=active]:bg-red-600/20">Create Your AI Shadow</TabsTrigger>
            <TabsTrigger value="slide2" className="crt-text data-[state=active]:bg-red-600/20">Alter Ego Caller</TabsTrigger>
            <TabsTrigger value="slide3" className="crt-text data-[state=active]:bg-red-600/20">Alter Ego Seller</TabsTrigger>
          </TabsList>
          
          <div className="crt-overlay rounded-lg border border-red-600/30 p-1">
            <TabsContent value="slide1" className="rounded-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VideoEmbed 
                  src="https://drive.google.com/file/d/1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu/view" 
                  title="Create Your AI Shadow"
                  className="rounded-lg overflow-hidden h-[600px] mx-auto"
                  vertical={true}
                />
                <div className="flex flex-col justify-center px-6">
                  <h3 className="text-2xl md:text-3xl mb-4 font-bold text-yellow-300 inline-block" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                    Create Your AI Shadow
                  </h3>
                  <p className="text-lg mb-6 crt-text">
                    Clone voice, persona, and expertise in 24hrs
                  </p>
                  <div className="flex gap-3">
                    <div className="flex items-center text-yellow-300 shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                      <Zap className="mr-2 h-5 w-5" />
                      <span>Instant Deployment</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="slide2" className="rounded-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="bg-black/50 border border-red-600/30 rounded-lg p-6">
                  <h3 className="text-2xl md:text-3xl mb-6 font-bold text-yellow-300 inline-block" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                    Alter Ego Caller
                  </h3>
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative w-full max-w-xs">
                      <div className="absolute inset-0 bg-yellow-300/10 rounded-lg blur-md"></div>
                      <div className="relative bg-black/80 p-4 rounded-lg border border-yellow-300/50">
                        <div className="text-center">
                          <p className="text-gray-400 mb-2">Concurrent Calls</p>
                          <AnimatedCounter end={50} />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 w-full">
                      <div className="flex-1 bg-black/80 p-3 rounded-lg border border-red-600/50">
                        <div className="flex items-center justify-center">
                          <Phone className="text-yellow-300 mr-2 h-4 w-4" />
                          <span className="text-sm">Voice Cloning</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-black/80 p-3 rounded-lg border border-red-600/50">
                        <div className="flex items-center justify-center">
                          <MessageCircle className="text-yellow-300 mr-2 h-4 w-4" />
                          <span className="text-sm">Human+ Speed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-xl mb-2 text-yellow-300">Call Performance</h4>
                  <div className="space-y-4">
                    <div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-9/12 bg-red-600 rounded-full flex items-center px-3">
                        <span className="text-xs font-bold">AI Caller</span>
                      </div>
                    </div>
                    <div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-5/12 bg-gray-500 rounded-full flex items-center px-3">
                        <span className="text-xs font-bold">SDR Team</span>
                      </div>
                    </div>
                    <div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-2/12 bg-gray-500 rounded-full flex items-center px-3">
                        <span className="text-xs font-bold whitespace-nowrap">Traditional AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="slide3" className="rounded-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="bg-black/50 border border-red-600/30 rounded-lg p-6">
                  <h3 className="text-2xl md:text-3xl mb-6 font-bold text-yellow-300 inline-block" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                    Alter Ego Seller
                  </h3>
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative w-full max-w-xs">
                      <div className="absolute inset-0 bg-yellow-300/10 rounded-lg blur-md"></div>
                      <div className="relative bg-black/80 p-4 rounded-lg border border-yellow-300/50">
                        <div className="text-center">
                          <p className="text-gray-400 mb-2">Concurrent Chats</p>
                          <AnimatedCounter end={100} />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 w-full">
                      <div className="flex-1 bg-black/80 p-3 rounded-lg border border-red-600/50">
                        <div className="flex items-center justify-center">
                          <Eye className="text-yellow-300 mr-2 h-4 w-4" />
                          <span className="text-sm">24/7 Availability</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-black/80 p-3 rounded-lg border border-red-600/50">
                        <div className="flex items-center justify-center">
                          <MessageCircle className="text-yellow-300 mr-2 h-4 w-4" />
                          <span className="text-sm">Multilingual</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-xl mb-2 text-yellow-300">AI vs. Competition</h4>
                  <div className="space-y-4">
                    <div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-9/12 bg-red-600 rounded-full flex items-center px-3">
                        <span className="text-xs font-bold">Your AI</span>
                      </div>
                    </div>
                    <div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-6/12 bg-gray-500 rounded-full flex items-center px-3">
                        <span className="text-xs font-bold">Generic AI</span>
                      </div>
                    </div>
                    <div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-3/12 bg-gray-500 rounded-full flex items-center px-3">
                        <span className="text-xs font-bold">Human Team</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </section>
      
      {/* Booking & Free Offer Section */}
      <section id="get-free-alter-ego" className="py-16 px-4 max-w-4xl mx-auto">
        <div className="crt-overlay bg-black/50 rounded-lg border border-red-600/50 p-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 crt-text">
            Ready to <span className="text-yellow-300">Transcend Human Limits?</span>
          </h2>
          
          <div className="mb-8">
            <p className="text-lg mb-4">
              Get 3 Core Systems Operational in 20hrs – No Strings
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a href="#contact-form-section" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <NeonButton size="lg" className="w-full sm:w-auto">
                  <span className="flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Claim Free Alter Ego (Worth $4,999)
                  </span>
                </NeonButton>
              </a>
              <a href="#contact-form-section" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <NeonButton size="lg" primary={false} className="w-full sm:w-auto">
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book 15min Power Audit
                  </span>
                </NeonButton>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Registration Form Section */}
      <section id="contact-form-section" className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-10 crt-text">
          Register for <span className="text-yellow-300">Your Free Alter Ego</span>
        </h2>
        <ContactForm />
      </section>
      
      {/* Contact Information & Footer */}
      <footer className="py-12 px-4 border-t border-red-600/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h4 className="text-xl mb-4 text-yellow-300 font-bold">Connect With Us</h4>
              <div className="flex justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/company/alanto-ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white hover:text-yellow-300 transition-colors"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  <span>Alanto AI</span>
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl mb-4 text-yellow-300 font-bold">Contact</h4>
              <div className="space-y-2">
                <p className="flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5 text-red-600" />
                  <span>+44 7492 758066</span>
                </p>
                <p className="flex items-center justify-center">
                  <Mail className="mr-2 h-5 w-5 text-red-600" />
                  <span>Info@alantoai.com</span>
                </p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="crt-text text-lg text-yellow-300 font-matrix mb-4">
                <p className="matrix-font">Digitally Weaponizing Your Potential Since 2024</p>
              </div>
              <a href="https://alantoai.com" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/images/alanto-logo-new.svg" 
                  alt="Alanto.ai" 
                  className="h-12 ml-auto mr-0 md:ml-auto site-logo" 
                />
              </a>
            </div>
          </div>
          
          <div className="border-t border-red-600/30 pt-6 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Alanto AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
