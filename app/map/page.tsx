"use client";

import { useState } from "react";
import { Map, AlertTriangle, Building, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TN_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

// Mock Data for districts
const getDistrictData = (name: string) => ({
  name,
  blackSpots: Math.floor(Math.random() * 20) + 1,
  tollBooths: Math.floor(Math.random() * 5),
  speedZones: Math.floor(Math.random() * 15) + 5,
  policeContact: `044-2${Math.floor(Math.random() * 1000000)}`
});

export default function DistrictMap() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const activeData = selectedDistrict ? getDistrictData(selectedDistrict) : null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 flex justify-center items-center gap-4">
          <Map className="w-10 h-10 text-[var(--color-brand-green)]" /> Tamil Nadu District Map
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Select any of the 38 districts to view local accident black spots, toll booths, and contact info.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-8 relative overflow-hidden">
        
        {/* District Grid (Acts as our map) */}
        <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {TN_DISTRICTS.map((district) => (
            <button
              key={district}
              onClick={() => setSelectedDistrict(district)}
              className={`p-3 rounded-lg text-xs font-bold transition-all border ${
                selectedDistrict === district 
                ? 'bg-[var(--color-brand-green)] text-white border-[var(--color-brand-green)] shadow-lg transform scale-105 z-10' 
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-green-50 hover:text-[var(--color-brand-green)] hover:border-green-200'
              }`}
            >
              {district}
            </button>
          ))}
        </div>

        {/* Info Panel Overlay (Desktop Sidebar / Mobile Modal) */}
        <AnimatePresence>
          {activeData && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="md:w-80 bg-[var(--color-brand-dark)] text-white rounded-2xl p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedDistrict(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/10 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-[var(--color-brand-green-light)]">{activeData.name}</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-sm text-gray-300">Black Spots</span>
                  </div>
                  <span className="font-bold text-red-400 text-lg">{activeData.blackSpots}</span>
                </div>

                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-gray-300">Toll Booths</span>
                  </div>
                  <span className="font-bold text-yellow-400 text-lg">{activeData.tollBooths}</span>
                </div>

                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Map className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-gray-300">Speed Zones</span>
                  </div>
                  <span className="font-bold text-blue-400 text-lg">{activeData.speedZones}</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs text-gray-400 mb-1">Local Traffic Police (HQ)</p>
                <p className="font-mono text-lg">{activeData.policeContact}</p>
              </div>

              <Link href="/laws" className="w-full bg-[var(--color-brand-green)] hover:bg-[var(--color-brand-green-light)] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                View {activeData.name} Rules <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
