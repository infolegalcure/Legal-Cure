import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BIHAR_DISTRICTS } from '../../constants/biharData';
import { 
  UserCheck, ShieldCheck, Check, X, AlertCircle, Search, 
  MapPin, Building, Eye, ToggleLeft, ToggleRight, FileText
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
      category: 'Deed Writer (Katib)',
      district: 'Patna',
      office: 'Patna Sadar Registry Office',
      licenseNumber: 'BR/PAT/DW/2016/910',
      licenseAuthority: 'District Registry Patna',
      experience: 10,
      dateApplied: '14 Aug 2026',
      status: 'Pending'
    },
    {
      id: 'app-2',
      name: 'Advocate Priya Sharma',
      category: 'Property Lawyer',
      district: 'Muzaffarpur',
      office: 'Muzaffarpur Civil Court',
      licenseNumber: 'BR/BAR/MZP/2018/142',
      licenseAuthority: 'Bar Council of Bihar',
      experience: 8,
      dateApplied: '15 Aug 2026',
      status: 'Pending'
    },
    {
      id: 'app-3',
      name: 'Amin Deendayal Paswan',
      category: 'Amin / Land Surveyor',
      district: 'Bhagalpur',
      office: 'Kahalgaon Sub-Registry & Anchal',
      licenseNumber: 'BHR/AMIN/BGP/8821',
      licenseAuthority: 'Revenue Dept Bihar',
      experience: 14,
      dateApplied: '16 Aug 2026',
      status: 'Pending'
    }
  ]);

  const [districtStatus, setDistrictStatus] = useState<Record<string, boolean>>({
    'Patna': true,
    'Bhagalpur': true,
    'Muzaffarpur': true,
    'Gaya': true,
    'Darbhanga': true,
    'Purnia': true,
    'Begusarai': true,
    'Samastipur': true,
    'Nalanda (Bihar Sharif)': true,
    'Rohtas (Sasaram)': true,
    'Saran (Chhapra)': true,
    'Madhubani': true,
    'Bhojpur (Ara)': true,
    'Vaishali (Hajipur)': true,
    'Siwan': true,
    'Motihari (East Champaran)': true
  });

  const handleApprove = (id: string, name: string) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
    showToast(`Approved ${name}! License verification badge issued.`, 'success');
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
    showToast(`Updated marketplace coverage for ${dName}`, 'info');
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            LegalCure Admin Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1 tracking-tight">
            {lang === 'hi' ? 'विशेषज्ञ सत्यापन व जिला प्रबंधन' : 'Professional Verification & District Management'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review government licenses, Bar Council credentials, and manage active Bihar registry offices.
          </p>
        </div>
      </div>

      {/* Section 1: Verification Queue Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" />
            <h3 className="text-base font-extrabold text-navy">
              Pending Professional License Applications ({applications.filter(a => a.status === 'Pending').length})
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-5 py-3">Professional Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">District & Office</th>
                <th className="px-4 py-3">License & Authority</th>
                <th className="px-4 py-3">Exp</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-navy text-sm">{app.name}</div>
                    <span className="text-[10px] text-slate-400">Applied on {app.dateApplied}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-primary">{app.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div>{app.district}</div>
                    <span className="text-[10px] text-slate-400">{app.office}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-bold text-slate-800">{app.licenseNumber}</div>
                    <span className="text-[10px] text-slate-400">{app.licenseAuthority}</span>
                  </td>
                  <td className="px-4 py-4 font-semibold">{app.experience} Yrs</td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      app.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : app.status === 'Rejected'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {app.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(app.id, app.name)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app.id, app.name)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Activate/Deactivate Bihar Districts & Coverage (Requirement #8) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-navy">
              Bihar Districts & Registry Coverage Controller
            </h3>
            <p className="text-xs text-slate-500">
              Toggle marketplace availability across Bihar's 38 administrative districts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BIHAR_DISTRICTS.map((d) => {
            const isActive = districtStatus[d.name] !== false;
            return (
              <div
                key={d.name}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  isActive ? 'bg-slate-50 border-slate-200' : 'bg-slate-100 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-navy">{d.name}</div>
                  <div className="text-[10px] text-slate-400">{d.registryOffices.length} Sub-Registries</div>
                </div>

                <button
                  onClick={() => toggleDistrict(d.name)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${
                    isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isActive ? 'Active' : 'Paused'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
