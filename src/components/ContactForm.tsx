
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
      // Here you would normally send the data to your backend
      console.log("Form submitted with data:", data);
      
      // Show success toast
      toast({
        title: "Form submitted successfully",
        description: "We'll get back to you soon!",
        className: "bg-black border border-yellow-300 text-yellow-300",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto crt-overlay bg-black/70 border border-red-600/30 p-6 rounded-lg">
      <h3 className="text-2xl font-bold text-yellow-300 mb-6 text-center" style={{ fontFamily: "'Press Start 2P', cursive" }}>
        Register for Free Alter Ego
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-yellow-300">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="bg-black border-red-600/50 text-white"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companyEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-yellow-300">Company Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@company.com" 
                    className="bg-black border-red-600/50 text-white"
                    type="email"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-yellow-300">LinkedIn URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://linkedin.com/in/username" 
                    className="bg-black border-red-600/50 text-white"
                    type="url"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-yellow-300">Describe Yourself</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about yourself and your company..." 
                    className="bg-black border-red-600/50 text-white min-h-24"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-yellow-300">Phone</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+1 234 567 8900" 
                    className="bg-black border-red-600/50 text-white"
                    type="tel"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-yellow-300 font-bold py-2 shadow-[0_0_10px_rgba(255,0,0,0.7)]"
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
