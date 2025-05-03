import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const WEBHOOK_URL = "https://hook.eu2.make.com/y6uglcn5efu6tp29yts8jgcson5gkiee";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  companyEmail: z.string().email({ message: "Invalid company email" }),
  linkedinUrl: z.string().url({ message: "Invalid LinkedIn URL" }),
  description: z.string().min(10, { message: "Please describe yourself (min 10 characters)" }),
  phone: z.string().min(5, { message: "Valid phone number is required" }),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyEmail: "",
      linkedinUrl: "",
      description: "",
      phone: "",
    },
  });
  
  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormData) => {
    try {
      // Send data to webhook
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.companyEmail,
          linkedin: data.linkedinUrl,
          description: data.description,
          phone: data.phone,
          source: "website",
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      // Show success toast
      toast({
        title: "Form submitted successfully",
        description: "We'll get back to you soon!",
        className: "bg-[var(--comic-cream)] border border-[var(--comic-orange)] text-[var(--comic-brown)]",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto card crt-overlay bg-white/70 p-6 contact-form-container">
      <h3 className="text-2xl font-bold text-[var(--comic-brown)] text-glow-strong mb-6 text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        Register for Free AI Alter Ego
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel className="text-[var(--comic-brown)] text-glow">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="bg-[var(--comic-cream)] border-[var(--comic-brown)]/50 text-[var(--comic-brown)] mobile-input"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[var(--comic-orange)]" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companyEmail"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel className="text-[var(--comic-brown)] text-glow">Company Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@company.com" 
                    className="bg-[var(--comic-cream)] border-[var(--comic-brown)]/50 text-[var(--comic-brown)] mobile-input"
                    type="email"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[var(--comic-orange)]" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel className="text-[var(--comic-brown)] text-glow">LinkedIn URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://linkedin.com/in/username" 
                    className="bg-[var(--comic-cream)] border-[var(--comic-brown)]/50 text-[var(--comic-brown)] mobile-input"
                    type="url"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[var(--comic-orange)]" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel className="text-[var(--comic-brown)] text-glow">Describe Yourself</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about yourself and your company..." 
                    className="bg-[var(--comic-cream)] border-[var(--comic-brown)]/50 text-[var(--comic-brown)] min-h-24 mobile-textarea"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[var(--comic-orange)]" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel className="text-[var(--comic-brown)] text-glow">Phone</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+1 234 567 8900" 
                    className="bg-[var(--comic-cream)] border-[var(--comic-brown)]/50 text-[var(--comic-brown)] mobile-input"
                    type="tel"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[var(--comic-orange)]" />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--comic-orange)] hover:bg-[var(--comic-orange-2)] text-white font-bold py-2 shadow-[4px_4px_0_var(--comic-shadow)] border-2 border-[var(--comic-brown)] form-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Register Now"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
