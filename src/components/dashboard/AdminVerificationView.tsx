import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BIHAR_DISTRICTS } from '../../constants/biharData';
import { 
  UserCheck, 
  ShieldCheck, 
  Check, 
  X, 
  AlertCircle, 
  Search, 
  MapPin, 
  Building, 
  Eye, 
  ToggleLeft, 
  ToggleRight, 
  FileText,
  Sparkles,
  Layers
} from 'lucide-react';

interface PendingApplication {
  id: string;
  name: string;
  category: string;
  district: string;
  office: string;
  licenseNumber: string;
  licenseAuthority: string;
  experience: number;
  dateApplied: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const AdminVerificationView: React.FC = () => {
  const { lang, showToast } = useApp();

  const [applications, setApplications] = useState<PendingApplication[]>([
    {
      id: 'app-1',
      name: 'Rajnish Kumar Mishra',
      category: 'Deed Writer',
      district: 'Patna',
      office: 'Patna Sadar Registry Office (Shed #11)',
      licenseNumber: 'BR/PAT/DW/2016/910',
      licenseAuthority: 'District Registry Patna',
      experience: 10,
      dateApplied: '14 Aug 2026',
      status: 'Pending'
    },
    {
      id: 'app-2',
      name: 'Amin Deendayal Paswan',
      category: 'Amin / Land Surveyor',
      district: 'Bhagalpur',
      office: 'Kahalgaon Anchal & Sub-Registry',
      licenseNumber: 'BHR/AMIN/BGP/8821',
      licenseAuthority: 'Revenue Dept Bihar',
      experience: 14,
      dateApplied: '16 Aug 2026',
      status: 'Pending'
    },
    {
      id: 'app-3',
      name: 'Sunil Kumar Thakur',
      category: 'Deed Writer',
      district: 'Muzaffarpur',
      office: 'Muzaffarpur West Registry Office',
      licenseNumber: 'BR/MZP/DW/2019/332',
      licenseAuthority: 'Registration Dept Bihar',
      experience: 7,
      dateApplied: '17 Aug 2026',
      status: 'Pending'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'queue' | 'districts' | 'compliance'>('queue');
  const [districtSearch, setDistrictSearch] = useState('');

  const [districtStatus, setDistrictStatus] = useState<Record<string, boolean>>({
    'Patna': true,
    'Bhagalpur': true,
    'Muzaffarpur': true,
    'Gaya': true,
    'Darbhanga': true,
    'Purnia': true,
    'Begusarai': true,
    'Samastipur': true,
    'Nalanda': true,
    'Rohtas': true,
    'Saran': true,
    'Madhubani': true,
    'Bhojpur': true,
    'Vaishali': true,
    'Siwan': true,
    'East Champaran': true
  });

  const handleApprove = (id: string, name: string) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
    showToast(`Approved ${name}! License verification badge granted.`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
    showToast(`Application for ${name} rejected.`, 'info');
  };

  const toggleDistrict = (dName: string) => {
    setDistrictStatus(prev => ({
      ...prev,
      [dName]: !prev[dName]
    }));
    showToast(`Updated marketplace status for ${dName}`, 'info');
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Admin Compliance Portal
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-bold text-gray-600">Phase 1: Deed Writer & Amin Focus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] mt-1 tracking-tight">
            {lang === 'hi' ? 'प्रशासनिक सत्यापन एवं अनुपालन' : 'Professional Verification & Compliance'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review government registration licenses, physical shed allocations, and 38-district coverage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
            Escrow Status: <strong className="text-emerald-700">₹100 Safe Hold Active</strong>
          </span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-500 font-bold uppercase">Pending Verification</span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {applications.filter(a => a.status === 'Pending').length} Professionals
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Awaiting Registration Dept KYC</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-500 font-bold uppercase">Active Bihar Districts</span>
          <div className="text-2xl font-black text-[#082B63] mt-1">
            38 / 38 Districts
          </div>
          <p className="text-[11px] text-gray-400 mt-1">100% Bihar Coverage Enabled</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-xs text-gray-500 font-bold uppercase">Phase 1 Active Categories</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            2 Active (Deed Writer & Amin)
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Lawyer & Notary in Phase 2</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('queue')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'queue' 
              ? 'border-[#082B63] text-[#082B63]' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Verification Queue ({applications.filter(a => a.status === 'Pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('districts')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'districts' 
              ? 'border-[#082B63] text-[#082B63]' 
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>38 Districts Coverage Status</span>
        </button>
      </div>

      {activeTab === 'queue' && (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#082B63]">{app.name}</h3>
                  <span className="bg-blue-50 text-[#0B3D91] font-bold text-[10px] px-2 py-0.5 rounded-full border border-blue-200">
                    {app.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                    app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="text-gray-600 flex flex-wrap items-center gap-3 text-[11px]">
                  <span><strong>License:</strong> {app.licenseNumber}</span>
                  <span>•</span>
                  <span><strong>Authority:</strong> {app.licenseAuthority}</span>
                  <span>•</span>
                  <span><strong>Experience:</strong> {app.experience} Years</span>
                </div>

                <div className="text-gray-500 text-[11px]">
                  Office / Shed: <strong>{app.office}</strong> ({app.district})
                </div>
              </div>

              {app.status === 'Pending' && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleApprove(app.id, app.name)}
                    className="bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Verify</span>
                  </button>

                  <button
                    onClick={() => handleReject(app.id, app.name)}
                    className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'districts' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#082B63]">Bihar District Registry Activation</h3>
            <input
              type="text"
              placeholder="Search district..."
              value={districtSearch}
              onChange={(e) => setDistrictSearch(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-gray-300 w-48"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
            {BIHAR_DISTRICTS.filter(d => d.name.toLowerCase().includes(districtSearch.toLowerCase())).map((d) => (
              <div 
                key={d.name} 
                className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-gray-900">{d.name}</div>
                  <div className="text-[10px] text-gray-500">{d.registryOffices.length} Sub-Registries</div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
