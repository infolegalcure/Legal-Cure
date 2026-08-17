import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Building2, Users2, ShieldCheck } from 'lucide-react';

export const BiharStatsBanner: React.FC = () => {
  const { lang } = useApp();

  const stats = [
    {
      icon: MapPin,
      number: '38',
      labelEn: 'Bihar Districts Covered',
      labelHi: 'बिहार के सभी 38 जिले शामिल',
      subEn: 'Patna to Kishanganj',
      subHi: 'पटना से किशनगंज तक'
    },
    {
      icon: Building2,
      number: '135+',
      labelEn: 'Registry & Sub-Offices',
      labelHi: 'निबंधन व अवर-निबंधन कार्यालय',
      subEn: 'Active Office Directory',
      subHi: 'सक्रिय कार्यालय परिसर'
    },
    {
      icon: Users2,
      number: '2,500+',
      labelEn: 'Verified Professionals',
      labelHi: 'प्रमाणित कातिब, वकील व अमीन',
      subEn: 'License & ID Checked',
      subHi: 'लाइसेंस व बार काउंसिल सत्यापित'
    },
    {
      icon: ShieldCheck,
      number: '₹100',
      labelEn: 'Token Protection Guarantee',
      labelHi: 'टोकन सुरक्षा गारंटी',
      subEn: '100% Adjustable / Refundable',
      subHi: 'अंतिम फीस में समायोजित'
    }
  ];

  return (
    <section className="bg-[#F6F8FC] py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl shadow-gray-200/40 flex items-center gap-4 hover:border-blue-200 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B3D91] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#082B63] tracking-tight">
                    {item.number}
                  </div>
                  <div className="text-xs font-bold text-gray-800 leading-tight">
                    {lang === 'hi' ? item.labelHi : item.labelEn}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {lang === 'hi' ? item.subHi : item.subEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
