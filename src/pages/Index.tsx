import React, { useState, useEffect, useRef } from "react";
import VideoEmbed from "@/components/VideoEmbed";
import NeonButton from "@/components/NeonButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Zap, 
  Eye, 
  MessageCircle, 
  Phone, 
  Mail, 
  Linkedin, 
  Loader2, 
  Brain,
  Clock, 
  Bot, 
  FileText, 
  Mic, 
  Globe,
  LucideIcon
} from "lucide-react";

interface FunctionFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("slide1");
  const [callerMetricsLoaded, setCallerMetricsLoaded] = useState(false);
  const [sellerMetricsLoaded, setSellerMetricsLoaded] = useState(false);
  const [shadowFeaturesVisible, setShadowFeaturesVisible] = useState(false);
  
  // AI Shadow features
  const aiShadowFeatures: FunctionFeature[] = [
    {
      icon: Mic,
      title: "Voice Cloning",
      description: "Perfect replication of your voice tone, accent & patterns."
    },
    {
      icon: Brain,
      title: "Expertise Transfer",
      description: "Technical knowledge & domain expertise digitally mapped."
    },
    {
      icon: Bot,
      title: "Persona Matching",
      description: "Communication style, decision patterns & mannerisms."
    },
    {
      icon: Clock,
      title: "24hr Turnaround",
      description: "Complete deployment within 24 hours of onboarding."
    },
    {
      icon: Globe,
      title: "Multilingual",
      description: "Operate in multiple languages with native fluency."
    },
    {
      icon: FileText,
      title: "Content Creation",
      description: "Generate on-brand content across various formats."
    }
  ];

  // Reset loading states when tab changes
  useEffect(() => {
    if (activeTab === "slide1") {
      // Show AI Shadow features with delay
      setShadowFeaturesVisible(false);
      const timer = setTimeout(() => setShadowFeaturesVisible(true), 500);
      return () => clearTimeout(timer);
    } else if (activeTab === "slide2") {
      setCallerMetricsLoaded(false);
      // Slightly faster loading
      setTimeout(() => setCallerMetricsLoaded(true), 200);
    } else if (activeTab === "slide3") {
      setSellerMetricsLoaded(false);
      setTimeout(() => setSellerMetricsLoaded(true), 200);
    }
  }, [activeTab]);
  
  // Show warning tooltip with a timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      toast({
        title: "WARNING",
        description: "May cause unfair competitive advantage",
        className: "bg-[var(--comic-cream)] border border-[var(--comic-orange)] text-[var(--comic-brown)]",
      });
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="min-h-screen bg-[var(--comic-cream)] text-[var(--comic-brown)] overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-circuit-board opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-[var(--comic-cream)]"></div>
          <div className="absolute right-10 top-10 mercury-bg w-40 h-40 animate-mercury-flow opacity-30"></div>
          <div className="absolute left-20 bottom-20 mercury-bg w-60 h-60 animate-mercury-flow opacity-20" style={{ animationDelay: "-5s" }}></div>
        </div>
        
        {/* AI Character */}
        <div className="relative w-64 h-64 mb-12 animate-float">
          <div className="absolute inset-0 crt-overlay rounded-full bg-gradient-radial from-yellow-300/90 to-yellow-400/70 border border-yellow-500/70 animate-pulse-glow"></div>
          {/* Black Eyes */}
          <div className="absolute top-1/3 left-1/2 -translate-x-[60px] w-32 h-4">
            <div className="absolute left-2 w-10 h-4 bg-black rounded-full"></div>
            <div className="absolute right-2 w-10 h-4 bg-black rounded-full"></div>
          </div>
          {/* Changing Smile */}
          <div className="absolute bottom-1/3 left-1/2 w-24 h-1 smile-animation"></div>
          <div className="absolute inset-0 binary-code text-[#000]/10"></div>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl text-center mb-10 z-10 font-bold leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          <span className="block text-[var(--comic-brown)] py-1">Building the #1 AI Alter Ego</span>
          <span className="block text-[var(--comic-brown)] py-1 mt-3">for CEOs and Executives</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-center mb-10 max-w-2xl text-[var(--comic-brown)] text-glow">
          The Last Human You'll Ever Need to Scale – 
          <span className="text-[var(--comic-brown)] font-bold"> No Cameras, </span>
          <span className="text-[var(--comic-brown)] font-bold">No Scripts, No Limits</span>
        </p>
        
        {/* Bold Statement and CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-12 z-10">
          <p className="tooltip-warning neon-flicker text-glow">
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
        <h2 className="text-3xl md:text-4xl text-center mb-10 text-[var(--comic-brown)] text-glow-strong" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          <span>Your AI Future</span> Is Here
        </h2>
        
        <Tabs 
          defaultValue="slide1" 
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-[var(--comic-cream)]/30 border border-[var(--comic-orange)]/30">
            <TabsTrigger value="slide1" className="text-[var(--comic-brown)] data-[state=active]:bg-[var(--comic-orange)]/20 text-glow">Create Your AI Shadow</TabsTrigger>
            <TabsTrigger value="slide2" className="text-[var(--comic-brown)] data-[state=active]:bg-[var(--comic-orange)]/20 text-glow">AI Alter Ego Caller</TabsTrigger>
            <TabsTrigger value="slide3" className="text-[var(--comic-brown)] data-[state=active]:bg-[var(--comic-orange)]/20 text-glow">AI Alter Ego Seller</TabsTrigger>
          </TabsList>
          
          <div className="crt-overlay card p-1">
            <TabsContent value="slide1" id="slide1" className="rounded-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="rounded-lg overflow-hidden card" style={{ backgroundColor: "var(--comic-cream)" }}>
                  <div className="aspect-9-15">
                    <VideoEmbed 
                      src="https://drive.google.com/file/d/1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu/view" 
                      title="Create Your AI Shadow"
                      className="rounded-lg overflow-hidden vertical"
                      vertical={true}
                      aspectRatio="9/15"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col justify-start px-6">
                  <h3 className="text-2xl md:text-3xl mb-4 font-bold text-[var(--comic-brown)] text-glow-strong" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Create Your AI Shadow
                  </h3>
                  <p className="text-lg mb-4 text-[var(--comic-brown)] text-glow">
                    Clone voice, persona, and expertise in 24hrs
                  </p>
                  <div className="flex items-center mb-6 text-[var(--comic-brown)] shadow-[0_0_10px_rgba(248,161,63,0.3)] text-glow">
                    <Zap className="mr-2 h-5 w-5 text-[var(--comic-orange)]" />
                    <span>Instant Deployment</span>
                  </div>
                  
                  {/* Function Matrix */}
                  {!shadowFeaturesVisible ? (
                    <div className="function-matrix">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="function-item loading-shimmer" style={{ height: '120px' }}></div>
                      ))}
                    </div>
                  ) : (
                    <div className="function-matrix">
                      {aiShadowFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                          <div 
                            key={index} 
                            className="function-item animate-fade-in" 
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="function-icon">
                              <Icon className="h-5 w-5 text-[var(--comic-brown)]" />
                            </div>
                            <h4 className="font-bold mb-1 text-[var(--comic-brown)]">{feature.title}</h4>
                            <p className="text-sm text-[var(--comic-brown)]/80">{feature.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="slide2" id="slide2" className="rounded-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="bg-[var(--comic-cream)]/50 border border-[var(--comic-brown)] shadow-[4px_4px_0_var(--comic-shadow)] rounded-lg p-6">
                  <h3 className="text-2xl md:text-3xl mb-6 font-bold text-[var(--comic-brown)] text-glow-strong" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    AI Alter Ego Caller
                  </h3>
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative w-full max-w-xs">
                      <div className="absolute inset-0 bg-[var(--comic-orange-2)]/10 rounded-lg blur-md"></div>
                      <div className="relative bg-white/80 p-4 rounded-lg border border-[var(--comic-brown)]/50">
                        <div className="text-center">
                          <p className="text-[var(--comic-brown)] mb-2 text-glow">Concurrent Calls</p>
                          <AnimatedCounter end={50} key={activeTab === "slide2" ? "active" : "inactive"} />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 w-full">
                      <div className="flex-1 bg-white/80 p-3 rounded-lg border border-[var(--comic-brown)]/50">
                        <div className="flex items-center justify-center">
                          <Phone className="text-[var(--comic-orange)] mr-2 h-4 w-4" />
                          <span className="text-sm text-[var(--comic-brown)] text-glow">Voice Cloning</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-white/80 p-3 rounded-lg border border-[var(--comic-brown)]/50">
                        <div className="flex items-center justify-center">
                          <MessageCircle className="text-[var(--comic-orange)] mr-2 h-4 w-4" />
                          <span className="text-sm text-[var(--comic-brown)] text-glow">Human+ Speed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-xl mb-2 text-[var(--comic-brown)] text-glow-strong" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Call Performance
                    {!callerMetricsLoaded && (
                      <span className="ml-2 inline-flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin text-[var(--comic-orange)]" />
                        <span className="ml-1 text-sm">Loading metrics...</span>
                      </span>
                    )}
                  </h4>
                  <div className="space-y-4">
                    {!callerMetricsLoaded ? (
                      <div className="space-y-4">
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden loading-shimmer"></div>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden loading-shimmer"></div>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden loading-shimmer"></div>
                      </div>
                    ) : (
                      <>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 h-full animate-progress-bar progress-bar-delay-1 bg-[var(--comic-orange)] rounded-full flex items-center px-3" style={{"--progress-width": "75%"} as React.CSSProperties}>
                            <span className="text-xs font-bold animate-slide-in">AI Caller</span>
                          </div>
                        </div>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 h-full animate-progress-bar progress-bar-delay-2 bg-gray-500 rounded-full flex items-center px-3" style={{"--progress-width": "42%"} as React.CSSProperties}>
                            <span className="text-xs font-bold animate-slide-in">SDR Team</span>
                          </div>
                        </div>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 h-full animate-progress-bar progress-bar-delay-3 bg-gray-500 rounded-full flex items-center px-3" style={{"--progress-width": "18%"} as React.CSSProperties}>
                            <span className="text-xs font-bold whitespace-nowrap animate-slide-in">Traditional AI</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="slide3" id="slide3" className="rounded-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="bg-[var(--comic-cream)]/50 border border-[var(--comic-brown)] shadow-[4px_4px_0_var(--comic-shadow)] rounded-lg p-6">
                  <h3 className="text-2xl md:text-3xl mb-6 font-bold text-[var(--comic-brown)] text-glow-strong" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    AI Alter Ego Seller
                  </h3>
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative w-full max-w-xs">
                      <div className="absolute inset-0 bg-[var(--comic-orange-2)]/10 rounded-lg blur-md"></div>
                      <div className="relative bg-white/80 p-4 rounded-lg border border-[var(--comic-brown)]/50">
                        <div className="text-center">
                          <p className="text-[var(--comic-brown)] mb-2">Concurrent Chats</p>
                          <AnimatedCounter end={100} key={activeTab === "slide3" ? "active" : "inactive"} />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 w-full">
                      <div className="flex-1 bg-white/80 p-3 rounded-lg border border-[var(--comic-brown)]/50">
                        <div className="flex items-center justify-center">
                          <Eye className="text-[var(--comic-orange)] mr-2 h-4 w-4" />
                          <span className="text-sm text-[var(--comic-brown)] text-glow">24/7 Availability</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-white/80 p-3 rounded-lg border border-[var(--comic-brown)]/50">
                        <div className="flex items-center justify-center">
                          <MessageCircle className="text-[var(--comic-orange)] mr-2 h-4 w-4" />
                          <span className="text-sm text-[var(--comic-brown)] text-glow">Multilingual</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-xl mb-2 text-[var(--comic-brown)] text-glow-strong" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    AI vs. Competition
                    {!sellerMetricsLoaded && (
                      <span className="ml-2 inline-flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin text-[var(--comic-orange)]" />
                        <span className="ml-1 text-sm">Loading metrics...</span>
                      </span>
                    )}
                  </h4>
                  <div className="space-y-4">
                    {!sellerMetricsLoaded ? (
                      <div className="space-y-4">
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden loading-shimmer"></div>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden loading-shimmer"></div>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden loading-shimmer"></div>
                      </div>
                    ) : (
                      <>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 h-full animate-progress-bar progress-bar-delay-1 bg-[var(--comic-orange)] rounded-full flex items-center px-3" style={{"--progress-width": "75%"} as React.CSSProperties}>
                            <span className="text-xs font-bold animate-slide-in">Your AI</span>
                          </div>
                        </div>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 h-full animate-progress-bar progress-bar-delay-2 bg-gray-500 rounded-full flex items-center px-3" style={{"--progress-width": "50%"} as React.CSSProperties}>
                            <span className="text-xs font-bold animate-slide-in">Generic AI</span>
                          </div>
                        </div>
                        <div className="relative w-full h-8 bg-gray-300 rounded-full overflow-hidden">
                          <div className="absolute top-0 left-0 h-full animate-progress-bar progress-bar-delay-3 bg-gray-500 rounded-full flex items-center px-3" style={{"--progress-width": "25%"} as React.CSSProperties}>
                            <span className="text-xs font-bold animate-slide-in">Human Team</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </section>
      
      {/* Booking & Free Offer Section */}
      <section id="get-free-alter-ego" className="py-16 px-4 max-w-4xl mx-auto">
        <div className="card crt-overlay bg-white/50 p-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-[var(--comic-brown)] text-glow-strong" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Ready to <span className="font-bold">Transcend Human Limits?</span>
          </h2>
          
          <div className="mb-8">
            <p className="text-lg mb-4 text-[var(--comic-brown)] text-glow">
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
                    Claim Free AI Alter Ego (Worth $4,999)
                  </span>
                </NeonButton>
              </a>
              <a href="#contact-form-section" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <NeonButton size="lg" className="w-full sm:w-auto">
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
        <h2 className="text-3xl md:text-4xl text-center mb-10 text-[var(--comic-brown)] text-glow-strong" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          Register for <span className="font-bold">Your Free AI Alter Ego</span>
        </h2>
        <ContactForm />
      </section>
      
      {/* Contact Information & Footer */}
      <footer className="py-12 px-4 footer-cream border-t border-[var(--comic-brown)]" style={{ backgroundColor: "var(--comic-cream-light)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h4 className="text-xl mb-4 text-[var(--comic-brown)] text-glow-strong font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>CONNECT WITH US</h4>
              <div className="flex justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/company/alanto-ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--comic-brown)] hover:text-[var(--comic-orange)] transition-colors text-glow"
                >
                  <Linkedin className="mr-2 h-5 w-5 text-[var(--comic-orange)]" />
                  <span>Alanto AI</span>
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl mb-4 text-[var(--comic-brown)] text-glow-strong font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>CONTACT</h4>
              <div className="space-y-2">
                <p className="flex items-center justify-center text-glow">
                  <Phone className="mr-2 h-5 w-5 text-[var(--comic-orange)]" />
                  <span>+44 7492 758066</span>
                </p>
                <p className="flex items-center justify-center text-glow">
                  <Mail className="mr-2 h-5 w-5 text-[var(--comic-orange)]" />
                  <span>Info@alantoai.com</span>
                </p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-lg text-[var(--comic-brown)] mb-4 text-glow">
                <p style={{ fontFamily: "'Bebas Neue', sans-serif" }}>DIGITALLY WEAPONIZING YOUR POTENTIAL SINCE 2024</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[var(--comic-brown)]/30 pt-6 text-center">
            <p className="text-sm text-[var(--comic-brown)] text-glow">© {new Date().getFullYear()} Alanto AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
