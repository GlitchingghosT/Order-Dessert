import React from 'react';
import { MapPin, Phone, Clock, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-950 text-amber-100 mt-20 border-t border-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-white">Velvet & Vanilla</h2>
            <p className="text-amber-200/80 text-sm leading-relaxed">
              Crafting unforgettable moments through artisanal pastries, gourmet cakes, and traditional European dessert recipes.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-900/50 p-2.5 rounded-lg border border-amber-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Freshly baked daily • 100% Organic Ingredients</span>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-base">Store Location</h3>
            <ul className="space-y-2.5 text-sm text-amber-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>14 Patisserie Boulevard, Victoria Island, Lagos</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+234 (0) 800-VELVET</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>orders@velvetandvanilla.com</span>
              </li>
            </ul>
          </div>

          {/* Store Hours */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-base">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-amber-200/80">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon - Fri: 7:30 AM - 8:00 PM</span>
              </li>
              <li className="pl-6">Sat - Sun: 8:30 AM - 9:00 PM</li>
            </ul>
          </div>

          {/* Legal / Navigation Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-base">Customer Care</h3>
            <ul className="space-y-2 text-sm text-amber-200/80">
              <li><a href="#allergen-info" className="hover:text-amber-400 transition-colors">Allergen & Dietary Guide</a></li>
              <li><a href="#shipping" className="hover:text-amber-400 transition-colors">Same-Day Delivery Policy</a></li>
              <li><a href="#catering" className="hover:text-amber-400 transition-colors">Custom Events & Catering</a></li>
              <li><a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy & Terms</a></li>
            </ul>
          </div>

        </div>

        {/* Divider & Payment Icons */}
        <div className="pt-8 border-t border-amber-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/60">
          <p>© {new Date().getFullYear()} Velvet & Vanilla Patisserie Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="bg-amber-900 px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider text-amber-200">VISA</span>
            <span className="bg-amber-900 px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider text-amber-200">MASTERCARD</span>
            <span className="bg-amber-900 px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider text-amber-200">PAYSTACK</span>
            <span className="bg-amber-900 px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider text-amber-200">WHATSAPP ORDER</span>
          </div>
        </div>

      </div>
    </footer>
  );
};