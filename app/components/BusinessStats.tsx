"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  // Facebook,
  // Twitter,
  // Instagram,
  // Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define animation variants for the cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.2,
    },
  },
};

export default function BusinessStats() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* --- Main Heading --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help! Choose the best way to contact us below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Left Column: Business Info & Contact Details --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              ...cardVariants,
              visible: {
                ...cardVariants.visible,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Card: Visit Our Studio */}
            <motion.div variants={cardVariants}>
              <Card className="bg-white dark:bg-gray-800 hover:border-gold border border-gray-200 dark:border-gray-700 p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardHeader className="p-0 mb-3 flex-row items-center gap-4">
                  <MapPin className="text-gold h-5 w-5" />
                  <CardTitle className="text-lg md:text-xl font-semibold">
                    Visit Our Studio
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <address className="not-italic text-sm text-gray-600 dark:text-gray-400">
                    <p>123 Digital Blvd</p>
                    <p>Tech Hub, CA 90210</p>
                  </address>
                  <a
                    href="https://maps.google.com/?q=123+Digital+Blvd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs font-semibold text-gold border-b border-gold hover:border-gold/50 transition-colors"
                  >
                    Get Directions →
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card: Call Us */}
            <motion.div variants={cardVariants}>
              <Card className="bg-white dark:bg-gray-800  hover:border-gold border border-gray-200 dark:border-gray-700 p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardHeader className="p-0 mb-3 flex-row items-center gap-4">
                  <Phone className="text-gold h-5 w-5" />
                  <CardTitle className="text-lg md:text-xl font-semibold">
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Mon-Fri: 9AM-6PM EST
                  </p>
                  <a
                    href="tel:+15551234567"
                    className="mt-3 inline-block text-xs font-semibold text-gold border-b border-gold hover:border-gold/50 transition-colors"
                  >
                    Call Now →
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card: Email Us */}
            <motion.div variants={cardVariants}>
              <Card className="bg-white dark:bg-gray-800 hover:border-gold border border-gray-200 dark:border-gray-700 p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardHeader className="p-0 mb-3 flex-row items-center gap-4">
                  <Mail className="text-gold h-5 w-5" />
                  <CardTitle className="text-lg md:text-xl font-semibold">
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    info@ignit.com</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Support available 24/7
                  </p>
                  <a
                    href="mailto:info@ignit.com"
                    className="mt-3 inline-block text-xs font-semibold text-gold border-b border-gold hover:border-gold/50 transition-colors"
                  >
                    Send Email →
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Quick Actions, Business Hours, & Socials --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              ...cardVariants,
              visible: {
                ...cardVariants.visible,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Card: Quick Actions */}
            <motion.div variants={cardVariants}>
              <Card className="bg-white dark:bg-gray-800 hover:border-gold border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardHeader className="p-0 mb-4 flex-row items-center gap-4">
                  <CardTitle className="text-xl md:text-2xl font-semibold">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <a
                    href="/schedule-call"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gold/10 dark:hover:bg-gold/10 transition-colors duration-200"
                  >
                    <Phone className="h-5 w-5 text-gold" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Schedule a Call
                    </span>
                  </a>
                  <a
                    href="/quote"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gold/10 dark:hover:bg-gold/10 transition-colors duration-200"
                  >
                    <Mail className="h-5 w-5 text-gold" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Request Quote
                    </span>
                  </a>
                  <Button
                    onClick={() => console.log("Live Chat initiated")}
                    className="flex items-center w-full gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gold/10 dark:hover:bg-gold/10 transition-colors duration-200 justify-start h-auto"
                  >
                    <MessageCircle className="h-5 w-5 text-gold" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Chat on WhatsApp
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card: Business Hours */}
            <motion.div variants={cardVariants}>
              <Card className="bg-white dark:bg-gray-800 hover:border-gold border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardHeader className="p-0 mb-4 flex-row items-center gap-4">
                  <Clock className="text-gold h-6 w-6" />
                  <CardTitle className="text-xl md:text-2xl font-semibold">
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Sunday</span>
                      <span className="italic text-gray-500">Closed</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    <p>Emergency support available 24/7 via email</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card: Social Media */}
            
            {/* <motion.div variants={cardVariants}>
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <CardHeader className="p-0 mb-4 flex-row items-center gap-4">
                  <CardTitle className="text-xl md:text-2xl font-semibold">
                    Connect with Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <a
                    href="https://www.instagram.com/ignit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gold/10 dark:hover:bg-gold/10 transition-colors duration-200"
                  >
                    <Instagram className="h-5 w-5 text-gold" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Instagram
                    </span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/ignit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gold/10 dark:hover:bg-gold/10 transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5 text-gold" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    href="https://twitter.com/ignit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gold/10 dark:hover:bg-gold/10 transition-colors duration-200"
                  >
                    <Twitter className="h-5 w-5 text-gold" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Twitter
                    </span>
                  </a>
                  <a
                    href="https://www.facebook.com/ignit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gold/10 dark:hover:bg-gold/10 transition-colors duration-200"
                  >
                    <Facebook className="h-5 w-5 text-gold" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      Facebook
                    </span>
                  </a>
                </CardContent>
              </Card>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}