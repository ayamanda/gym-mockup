"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Monthly",
    price: 49.99,
    features: [
      "Full gym access",
      "Basic fitness assessment",
      "Access to group classes",
      "Locker room access",
      "Free WiFi",
    ],
    popular: false,
  },
  {
    name: "Quarterly",
    price: 129.99,
    features: [
      "All Monthly features",
      "Personal trainer consultation",
      "Nutrition guidance",
      "Guest passes (2/month)",
      "Access to all locations",
    ],
    popular: true,
  },
  {
    name: "Annual",
    price: 449.99,
    features: [
      "All Quarterly features",
      "Priority class booking",
      "Unlimited guest passes",
      "Free parking",
      "Exclusive member events",
    ],
    popular: false,
  },
];

export default function PlansPage() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Membership Plans</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-8 relative ${plan.popular ? 'border-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-semibold py-1 px-3 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">
                      {plan.name === "Monthly" ? "/month" : 
                       plan.name === "Quarterly" ? "/quarter" : "/year"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include access to our state-of-the-art facilities and equipment
          </p>
          <Button variant="link" className="text-primary">
            View full comparison
          </Button>
        </div>
      </div>
    </div>
  );
}