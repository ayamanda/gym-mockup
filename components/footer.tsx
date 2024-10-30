import Link from "next/link";
import { Dumbbell } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t px-5">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Dumbbell className="h-6 w-6" />
              <span className="font-bold text-xl">FitMax</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transform your life with premium fitness facilities and expert guidance
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/plans" className="text-sm text-muted-foreground hover:text-primary">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-sm text-muted-foreground hover:text-primary">
                  Our Trainers
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-sm text-muted-foreground hover:text-primary">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                Email: info@fitmax.com
              </li>
              <li className="text-sm text-muted-foreground">
                Phone: (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FitMax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}