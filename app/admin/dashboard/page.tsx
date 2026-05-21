"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { ShieldAlert, LogOut, Plus, Trash2 } from "lucide-react"

const TN_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
]

export default function AdminDashboard() {
  const { user, logout, laws, addLaw, deleteLaw, fetchLaws } = useStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const [newLaw, setNewLaw] = useState({
    tier: 'state' as 'state'|'local',
    district: 'Chennai',
    title: '',
    desc: '',
    authority: 'TN Transport Dept.',
    penalty: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && user.role !== 'admin') {
      router.push('/admin/login')
    }
  }, [user, mounted, router])

  if (!mounted || user.role !== 'admin') return null

  const handleAddLaw = (e: React.FormEvent) => {
    e.preventDefault()
    addLaw({
      tier: newLaw.tier,
      district: newLaw.tier === 'state' ? 'All' : newLaw.district,
      title: newLaw.title,
      desc: newLaw.desc,
      authority: newLaw.authority,
      penalty: newLaw.penalty
    })
    setNewLaw({ ...newLaw, title: '', desc: '', penalty: '' })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-12 h-12 bg-[var(--color-brand-dark)] rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-sm">Traffic Regulation Management System</p>
          </div>
        </div>
        <button 
          onClick={() => { logout(); router.push('/') }}
          className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Secure Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Add New Rule Form */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[var(--color-brand-green)]" /> Publish New Rule
            </h2>
            
            <form onSubmit={handleAddLaw} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tier</label>
                <select 
                  value={newLaw.tier}
                  onChange={(e) => setNewLaw({ ...newLaw, tier: e.target.value as any })}
                  className="w-full text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brand-green)] outline-none"
                >
                  <option value="state">Statewide (All TN)</option>
                  <option value="local">Local District</option>
                </select>
              </div>

              {newLaw.tier === 'local' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">District</label>
                  <select 
                    value={newLaw.district}
                    onChange={(e) => setNewLaw({ ...newLaw, district: e.target.value })}
                    className="w-full text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brand-green)] outline-none"
                  >
                    {TN_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Rule Title</label>
                <input 
                  type="text" required
                  value={newLaw.title}
                  onChange={(e) => setNewLaw({ ...newLaw, title: e.target.value })}
                  placeholder="e.g. No Helmet"
                  className="w-full text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brand-green)] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  required rows={3}
                  value={newLaw.desc}
                  onChange={(e) => setNewLaw({ ...newLaw, desc: e.target.value })}
                  placeholder="Official legal description..."
                  className="w-full text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brand-green)] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Enforcing Authority</label>
                <input 
                  type="text" required
                  value={newLaw.authority}
                  onChange={(e) => setNewLaw({ ...newLaw, authority: e.target.value })}
                  className="w-full text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brand-green)] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Penalty / Fine</label>
                <input 
                  type="text" required
                  value={newLaw.penalty}
                  onChange={(e) => setNewLaw({ ...newLaw, penalty: e.target.value })}
                  placeholder="e.g. ₹1000"
                  className="w-full text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brand-green)] outline-none"
                />
              </div>

              <button type="submit" className="w-full bg-[var(--color-brand-dark)] hover:bg-black text-white font-bold py-4 rounded-xl transition-colors mt-4">
                Publish to Public
              </button>
            </form>
          </div>
        </div>

        {/* Manage Existing Rules */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Active Regulations Database</h2>
          <div className="space-y-4">
            {laws.map(law => (
              <div key={law.id} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row justify-between gap-6 hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-green)] bg-green-50 px-2 py-1 rounded">
                      {law.tier} {law.tier === 'local' && `- ${law.district}`}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{law.authority}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{law.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{law.desc}</p>
                  <p className="font-extrabold text-red-600 mt-3 text-lg">Penalty: {law.penalty}</p>
                </div>
                <button 
                  onClick={() => deleteLaw(law.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors self-start sm:self-center p-2 rounded-xl hover:bg-red-50"
                  title="Revoke Rule"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            
            {laws.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
                <ShieldAlert className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No active regulations found. Add a new rule to populate the public database.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
