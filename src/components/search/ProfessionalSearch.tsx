import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BIHAR_DISTRICTS, 
  PHASE_1_PROFESSIONAL_TYPES, 
  getSubRegistryOfficesForDistrict, 
  getBlocksForDistrict 
} from '../../constants/biharData';
import { getLocationConfig } from '../../services/locationService';
import { SearchQueryObject } from '../../types';
import { Search, MapPin, Building, Briefcase, ChevronDown, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

interface ProfessionalSearchProps {
  initialQuery?: SearchQueryObject | null;
  onSearchSubmit?: (query: SearchQueryObject) => void;
  variant?: 'hero' | 'page' | 'compact';
  autoFocus?: boolean;
}

export const ProfessionalSearch: React.FC<ProfessionalSearchProps> = ({
  initialQuery,
  onSearchSubmit,
  variant = 'page'
}) => {
  const { lang, executeSearchQuery, activeSearchQuery } = useApp();

  // Local 3-level dropdown state
  const [selectedProType, setSelectedProType] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoadingLocations, setIsLoadingLocations] = useState<boolean>(false);

  // 1. Sorted Phase 1 Professional Types (A → Z)
  const professionalTypeOptions = useMemo(() => {
    return [...PHASE_1_PROFESSIONAL_TYPES].sort((a, b) => 
      a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
    );
  }, []);

  // 2. Sorted Bihar Districts (A → Z)
  const districtOptions = useMemo(() => {
    return [...BIHAR_DISTRICTS].sort((a, b) => 
      a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
    );
  }, []);

  // Sync from initialQuery or activeSearchQuery
  useEffect(() => {
    const query = initialQuery || activeSearchQuery;
    if (query) {
      if (query.professionalType) setSelectedProType(query.professionalType);
      if (query.district && query.district !== 'All') setSelectedDistrict(query.district);
      if (query.location && query.location !== 'All') setSelectedLocation(query.location);
    }
  }, [initialQuery, activeSearchQuery]);

  // 3. Dynamic Location Config & Label (Deed Writer → SRO, Amin → Block)
  const locationConfig = useMemo(() => {
    return getLocationConfig(selectedProType);
  }, [selectedProType]);

  // 4. Strictly District-Bound & Profession-Bound Location Options (A → Z)
  const locationOptions = useMemo(() => {
    if (!selectedDistrict || !selectedProType) return [];
    
    const norm = selectedProType.toLowerCase();
    if (norm.includes('deed') || norm.includes('कातिब') || norm.includes('katib')) {
      // Sub-Registry Offices of this district only, sorted A-Z
      return getSubRegistryOfficesForDistrict(selectedDistrict);
    } else if (norm.includes('amin') || norm.includes('surveyor') || norm.includes('अमीन')) {
      // Revenue Blocks of this district only, sorted A-Z
      return getBlocksForDistrict(selectedDistrict);
    }
    return [];
  }, [selectedProType, selectedDistrict]);

  // Handle Professional Type Change -> Resets District and Location (both disabled / unselected)
  const handleProTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedProType(val);
    setSelectedDistrict('');
    setSelectedLocation('');
    setValidationError(null);
  };

  // Handle District Change -> Resets Location
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedDistrict(val);
    setSelectedLocation('');
    setValidationError(null);
    if (val) {
      setIsLoadingLocations(true);
      setTimeout(() => setIsLoadingLocations(false), 120);
    }
  };

  // Handle Location Change
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
    setValidationError(null);
  };

  // Reset entire search bar
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProType('');
    setSelectedDistrict('');
    setSelectedLocation('');
    setValidationError(null);
  };

  // Handle Submit Search
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProType) {
      setValidationError(
        lang === 'hi'
          ? 'कृपया पहले विशेषज्ञ (Deed Writer अथवा Amin) चुनें।'
          : 'Please select a professional type (Deed Writer or Amin).'
      );
      return;
    }

    if (!selectedDistrict) {
      setValidationError(
        lang === 'hi'
          ? 'कृपया बिहार का जिला चुनें।'
          : 'Please select a district in Bihar.'
      );
      return;
    }

    setValidationError(null);

    const query: SearchQueryObject = {
      professionalType: selectedProType,
      district: selectedDistrict,
      location: selectedLocation
    };

    if (onSearchSubmit) {
      onSearchSubmit(query);
    } else {
      executeSearchQuery(query);
    }
  };

  const isDistrictDisabled = !selectedProType;
  const isLocationDisabled = !selectedDistrict || isDistrictDisabled || isLoadingLocations;

  return (
    <div className={`w-full ${variant === 'hero' ? '' : 'max-w-5xl mx-auto'}`} id="phase1-professional-search-container">
      <form
        onSubmit={handleSubmit}
        className={`bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 sm:p-6 transition-all ${
          variant === 'hero' ? 'ring-1 ring-black/5' : ''
        }`}
        id="professional-search-form"
        role="search"
        aria-label={lang === 'hi' ? 'विशेषज्ञ खोज' : 'Find Professional Search'}
      >
        {/* Step Indicator Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#082B63] border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B3D91] animate-pulse"></span>
              {lang === 'hi' ? 'फेज 1 सत्यापित खोज' : 'Phase 1 Verified Search'}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              {lang === 'hi' ? '3-स्तरीय सटीक मिलान' : '3-Step District Bound Matching'}
            </span>
          </div>

          {(selectedProType || selectedDistrict || selectedLocation) && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
              title={lang === 'hi' ? 'रीसेट करें' : 'Reset search fields'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'रीसेट' : 'Reset'}</span>
            </button>
          )}
        </div>

        {/* 3-Level Dropdown Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 items-end">
          
          {/* 1. PROFESSIONAL DROPDOWN */}
          <div className="space-y-1.5" id="field-group-professional">
            <label 
              htmlFor="search-professional-type" 
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#0B3D91]" />
              <span>{lang === 'hi' ? '1. विशेषज्ञ चुनें' : '1. Select Professional'}</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="search-professional-type"
                name="professionalType"
                value={selectedProType}
                onChange={handleProTypeChange}
                className="w-full h-12 pl-3.5 pr-10 text-sm font-medium bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#082B63] focus:border-[#082B63] transition-all appearance-none cursor-pointer"
                required
              >
                <option value="">
                  {lang === 'hi' ? '-- विशेषज्ञ चुनें (Deed Writer / Amin) --' : 'Select Professional'}
                </option>
                {professionalTypeOptions.map((opt) => (
                  <option key={opt.id} value={opt.category}>
                    {lang === 'hi' ? opt.nameHi : opt.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 2. DISTRICT DROPDOWN */}
          <div className="space-y-1.5" id="field-group-district">
            <label 
              htmlFor="search-district" 
              className={`block text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDistrictDisabled ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isDistrictDisabled ? 'text-slate-400' : 'text-[#0B3D91]'}`} />
              <span>{lang === 'hi' ? '2. जिला चुनें' : '2. Select District'}</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="search-district"
                name="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={isDistrictDisabled}
                className={`w-full h-12 pl-3.5 pr-10 text-sm font-medium border rounded-xl transition-all appearance-none ${
                  isDistrictDisabled
                    ? 'bg-slate-100/70 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-[#082B63] focus:border-[#082B63] cursor-pointer'
                }`}
                required
              >
                <option value="">
                  {isDistrictDisabled 
                    ? (lang === 'hi' ? 'पहले विशेषज्ञ चुनें' : 'Select Professional First') 
                    : (lang === 'hi' ? '-- बिहार का जिला चुनें --' : 'Select District')}
                </option>
                {districtOptions.map((d) => (
                  <option key={d.name} value={d.name}>
                    {lang === 'hi' ? `${d.nameHi} (${d.name})` : d.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 3. CONDITIONAL LOCATION DROPDOWN (SRO for Deed Writer, Block for Amin) */}
          <div className="space-y-1.5" id="field-group-location">
            <label 
              htmlFor="search-location" 
              className={`block text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isLocationDisabled ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              <Building className={`w-3.5 h-3.5 ${isLocationDisabled ? 'text-slate-400' : 'text-[#0B3D91]'}`} />
              <span>
                {selectedProType
                  ? (lang === 'hi' ? `3. ${locationConfig.labelHi}` : `3. ${locationConfig.labelEn}`)
                  : (lang === 'hi' ? '3. स्थान चुनें' : '3. Select Location')}
              </span>
            </label>
            <div className="relative">
              <select
                id="search-location"
                name="location"
                value={selectedLocation}
                onChange={handleLocationChange}
                disabled={isLocationDisabled}
                className={`w-full h-12 pl-3.5 pr-10 text-sm font-medium border rounded-xl transition-all appearance-none ${
                  isLocationDisabled
                    ? 'bg-slate-100/70 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 border-slate-300 focus:ring-2 focus:ring-[#082B63] focus:border-[#082B63] cursor-pointer'
                }`}
              >
                <option value="">
                  {isLocationDisabled
                    ? (!selectedProType 
                        ? (lang === 'hi' ? 'विशेषज्ञ चुनें' : 'Select Professional First') 
                        : (lang === 'hi' ? 'जिला चुनें' : 'Select District First'))
                    : (selectedProType.includes('Deed')
                        ? (lang === 'hi' ? '-- उप-पंजीकरण कार्यालय चुनें (वैकल्पिक) --' : 'Select Sub-Registry Office')
                        : (lang === 'hi' ? '-- प्रखंड चुनें (वैकल्पिक) --' : 'Select Block'))}
                </option>
                {locationOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

        {/* Validation Error Banner if user tries to submit without required fields */}
        {validationError && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-amber-800 text-xs font-medium animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit Action Bar */}
        <div className="mt-5 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {lang === 'hi' 
                ? 'सरकारी रजिस्ट्री ऑफिस व अंचलों में भौतिक रूप से सत्यापित' 
                : '100% physically verified at Sub-Registry Offices & Revenue Blocks'}
            </span>
          </div>

          <button
            type="submit"
            id="search-submit-btn"
            className="w-full sm:w-auto min-w-[200px] h-12 px-6 bg-[#082B63] hover:bg-[#0B3D91] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'विशेषज्ञ खोजें' : 'FIND PROFESSIONAL'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
