"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Wifi, Car, Dumbbell } from "lucide-react";

const locations = [
  {
    name: "FitMax Downtown",
    address: "123 Main Street, Downtown, City",
    phone: "(555) 123-4567",
    hours: "24/7",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    amenities: ["Free Parking", "WiFi", "Locker Rooms", "Sauna", "Cafe", "Personal Training"],
    mapUrl: "https://maps.google.com",
  },
  {
    name: "FitMax Westside",
    address: "456 West Avenue, Westside, City",
    phone: "(555) 234-5678",
    hours: "24/7",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    amenities: ["Free Parking", "WiFi", "Locker Rooms", "Pool", "Spa", "Group Classes"],
    mapUrl: "https://maps.google.com",
  },
  {
    name: "FitMax Eastside",
    address: "789 East Boulevard, Eastside, City",
    phone: "(555) 345-6789",
    hours: "24/7",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    amenities: ["Free Parking", "WiFi", "Locker Rooms", "Basketball Court", "CrossFit Area", "Yoga Studio"],
    mapUrl: "https://maps.google.com",
  },
];

const AmenityIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "Free Parking":
      return <Car className="h-4 w-4" />;
    case "WiFi":
      return <Wifi className="h-4 w-4" />;
    default:
      return <Dumbbell className="h-4 w-4" />;
  }
};

export default function LocationsPage() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Locations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find your nearest FitMax gym and start your fitness journey today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{location.name}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{location.hours}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {location.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <AmenityIcon name={amenity} />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" asChild>
                      <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                        View on Map
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full">
                      Schedule Tour
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}