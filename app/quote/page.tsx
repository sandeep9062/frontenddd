"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Phone, Mail, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// Import your services data
import { services } from "../services/services-data";

const Quote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    budget: "",
    timeline: "",
    files: null as FileList | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Quote request submitted!", {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#333',
        color: '#fff',
      },
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      description: "",
      budget: "",
      timeline: "",
      files: null,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    "Free consultation & strategy session",
    "Expert technical recommendations",
    "Tailored solutions for your business goals",
    "Clear communication & project management",
    "Competitive and transparent pricing",
    "Long-term partnership & support"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const budgetOptions = [
    { value: "500-2500", label: "$500 - $2,500" },
    { value: "2500-5000", label: "$2,500 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-25000", label: "$10,000 - $25,000" },
    { value: "over-25000", label: "Over $25,000" },
    { value: "not-sure", label: "Not sure" },
  ];

  return (
    <div className="bg-white mt-10 pb-20 dark:bg-darkbg1 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 mt-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your{" "}
            <span className="text-gradient">Custom Quote</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tell us about your project and we'll provide you with a detailed quote tailored to your specific needs and budget.
          </p>
        </motion.div>

        {/* Main Grid Container with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Quote Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Project Details</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Provide as much detail as possible to help us give you an accurate quote.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        placeholder="Your full name"
                        className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2 ">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus-visible:ring-primary"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => handleInputChange("projectType", value)}
                      required
                    >
                      <SelectTrigger className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus-visible:ring-primary">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                        {services.map((service) => (
                          <SelectItem key={service.slug} value={service.slug}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                      rows={4}
                      placeholder="Please describe your project, including technologies, goals, and any specific requirements."
                      className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range (Optional)</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleInputChange("budget", value)}
                      >
                        <SelectTrigger className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus-visible:ring-primary">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                          {budgetOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline *</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => handleInputChange("timeline", value)}
                        required
                      >
                        <SelectTrigger className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus-visible:ring-primary">
                          <SelectValue placeholder="When do you need this?" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                          <SelectItem value="rush">Rush (1-2 weeks)</SelectItem>
                          <SelectItem value="standard">Standard (1-2 months)</SelectItem>
                          <SelectItem value="flexible">Flexible (2-3 months)</SelectItem>
                          <SelectItem value="planning">Planning ahead (3+ months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="files">Upload Reference Files (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Upload wireframes, design mockups, or project briefs.
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                        Supported formats: PDF, ZIP, JPG, PNG, AI, Sketch (Max 25MB total)
                      </p>
                      <Input
                        id="files"
                        type="file"
                        multiple
                        accept=".pdf,.zip,.jpg,.jpeg,.png,.ai,.sketch"
                        onChange={(e) => setFormData(prev => ({ ...prev, files: e.target.files }))}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("files")?.click()}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Choose Files
                      </Button>
                    </div>
                    {formData.files && formData.files.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-semibold">Selected file(s):</p>
                        <ul className="list-disc list-inside space-y-1">
                          {Array.from(formData.files).map((file, index) => (
                            <li key={index} className="truncate">{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gold text-black hover:bg-gold/80 dark:bg-gold dark:text-black dark:hover:bg-gold/80">
                    Submit Quote Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* What You Get */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-gold" />
                    What You Get
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-gold mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Response Time */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <CardHeader>
                  <CardTitle>Quick Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    We typically respond to quote requests within **24 hours** during business days.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    For urgent projects, call us directly for immediate assistance.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gold" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">Call Us</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gold" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">Email Us</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">info@ignit.com</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FileText className="h-4 w-4 text-gold mr-2" />
                      Download Project Brief
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Quote;