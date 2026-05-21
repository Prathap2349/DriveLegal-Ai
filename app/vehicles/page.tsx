import { AlertTriangle, Car, Truck, Bus } from "lucide-react";

export default function VehiclesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl flex-1">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Vehicle Specific Rules</h1>
        <p className="text-gray-600 max-w-xl mx-auto">Tamil Nadu traffic regulations categorized by vehicle type.</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0"><AlertTriangle className="w-6 h-6" /></div>
          <div>
            <h3 className="text-xl font-bold mb-2">2-Wheelers (Bikes & Scooters)</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
              <li>Helmets are mandatory for BOTH rider and pillion passenger across all TN districts.</li>
              <li>Maximum 2 persons allowed per vehicle (No triple riding).</li>
              <li>Saree guards and grab rails are mandatory for registration.</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
          <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shrink-0"><Car className="w-6 h-6" /></div>
          <div>
            <h3 className="text-xl font-bold mb-2">Auto Rickshaws</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
              <li>Digital fare meters must be installed and active (Strictly enforced in Chennai).</li>
              <li>Maximum capacity: Driver + 3 adult passengers.</li>
              <li>Commercial permit must be visibly displayed.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
          <div className="bg-orange-100 p-3 rounded-xl text-orange-600 shrink-0"><Truck className="w-6 h-6" /></div>
          <div>
            <h3 className="text-xl font-bold mb-2">Commercial Lorries & Trucks</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
              <li>Heavy vehicles are banned from entering city limits during peak hours (8 AM - 11 AM & 4 PM - 8 PM).</li>
              <li>Strict weight limit checks at NH toll plazas (Overloading fine: ₹20,000 + ₹2,000/tonne).</li>
              <li>Reflective tapes mandatory on all sides.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
          <div className="bg-green-100 p-3 rounded-xl text-green-600 shrink-0"><Bus className="w-6 h-6" /></div>
          <div>
            <h3 className="text-xl font-bold mb-2">School Vans & Buses</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
              <li>Vehicle must be painted in standard yellow color with "School Bus" clearly written.</li>
              <li>Speed governors must be installed limiting speed to 40 km/h.</li>
              <li>An attendant must be present to help children board and alight.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
