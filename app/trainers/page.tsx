"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";

const trainers = [
  {
    name: "Sarah Johnson",
    specialty: "Strength & Conditioning",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "NASM certified trainer specializing in strength training and functional fitness.",
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    name: "Michael Chen",
    specialty: "CrossFit & HIIT",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "CrossFit Level 2 trainer with expertise in high-intensity interval training.",
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    name: "Emma Rodriguez",
    specialty: "Yoga & Flexibility",
    experience: "10+ years",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "RYT-500 certified yoga instructor focusing on flexibility and mindfulness.",
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    name: "David Thompson",
    specialty: "Sports Performance",
    experience: "7+ years",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Former athlete turned trainer, specializing in sports-specific training.",
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
];

export default function TrainersPage() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Expert Trainers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet our team of certified professionals dedicated to helping you achieve your fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
                  <p className="text-primary font-medium mb-2">{trainer.specialty}</p>
                  <p className="text-sm text-muted-foreground mb-4">{trainer.experience} experience</p>
                  <p className="text-sm mb-4">{trainer.bio}</p>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="icon">
                      <Instagram className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg">
            Book a Session
          </Button>
        </div>
      </div>
    </div>
  );
}