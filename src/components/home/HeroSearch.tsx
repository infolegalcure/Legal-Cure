import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Building, UserCheck, HelpCircle, ArrowRight, Shield, RotateCcw, AlertCircle, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { BIHAR_DISTRICTS, PHASE1_ACTIVE_PROFESSIONAL_TYPES } from '../../constants/biharData';
import { getLocations, getLocationConfig } from '../../services/locationService';
import { sortAlphabetically } from '../../utils/sorting';
import { SearchQueryObject } from '../../types';

export const HeroSearch: React.FC = () => {
  const { lang, executeSearchQuery, setIsHelpMeChooseOpen, t } = useApp();

  // 3-Level Search State
  const [selectedProfessional, setSelectedProfessional] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  // Location Loading & Error State
  const [locations, setLocations] = useState<string[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Validation Error Banner
  const [validationError, setValidationError] = useState<string | null>(null);

  // Phase 1 Active Categories in STRICT Alphabetical Order:
  // 1. Amin / Land Surveyor
  // 2. Deed Writer
  const sortedProfessionals = sortAlphabetically(
    PHASE1_ACTIVE_PROFESSIONAL_TYPES,
    p => p.name
  );

  // Sorted Districts (Alphabetical A-Z for all 38 Bihar Districts)
  const sortedDistricts = sortAlphabetically(
    BIHAR_DISTRICTS,
    d => d.name
  );

  // Dynamic Location configuration based on selected professional
  const locationConfig = getLocationConfig(selectedProfessional);

  // Fetch third-level locations whenever Professional or District changes
  useEffect(() => {
    setValidationError(null);
    setSelectedLocation('');
    setLocations([]);
    setLocationError(null);

    if (!selectedProfessional || !selectedDistrict) {
      return;
    }

    let isMounted = true;
    setIsLoadingLocations(true);

    getLocations(selectedProfessional, selectedDistrict)
      .then(fetchedLocations => {
        if (isMounted) {
          setLocations(fetchedLocations);
          setIsLoadingLocations(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.error('Failed to load locations', err);
          setLocationError(
            lang === 'hi'
              ? 'स्थान लोड नहीं हो सके। कृपया पुनः प्रयास करें।'
              : 'Unable to load locations for this district. Please retry.'
          );
          setIsLoadingLocations(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedProfessional, selectedDistrict, lang]);

  const handleProfessionalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfessional(e.target.value);
    setValidationError(null);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setValidationError(null);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
    setValidationError(null);
  };

  const handleRetryLocations = () => {
    if (!selectedProfessional || !selectedDistrict) return;
    setIsLoadingLocations(true);
    setLocationError(null);
    getLocations(selectedProfessional, selectedDistrict)
      .then(fetched => {
        setLocations(fetched);
        setIsLoadingLocations(false);
      })
      .catch(() => {
        setLocationError(
          lang === 'hi'
            ? 'स्थान लोड नहीं हो सके। कृपया पुनः प्रयास करें।'
            : 'Unable to load locations. Please retry.'
        );
        setIsLoadingLocations(false);
      });
  };

  const handleResetSearch = () => {
    setSelectedProfessional('');
    setSelectedDistrict('');
    setSelectedLocation('');
    setLocations([]);
    setLocationError(null);
    setValidationError(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Strict 3-level validation
    if (!selectedProfessional) {
      setValidationError(
        lang === 'hi'
          ? 'कृपया पेशेवर श्रेणी (Deed Writer या Amin) चुनें।'
          : 'Please select a professional type (Deed Writer or Amin / Land Surveyor).'
      );
      return;
    }

    if (!selectedDistrict) {
      setValidationError(
        lang === 'hi'
          ? 'कृपया बिहार का जिला चुनें।'
          : 'Please select a Bihar district.'
      );
      return;
    }

    if (!selectedLocation) {
      setValidationError(
        lang === 'hi'
          ? `कृपया ${locationConfig.labelHi} चुनें।`
          : `Please select your target ${locationConfig.labelEn.toLowerCase()}.`
      );
      return;
    }

    const queryObject: SearchQueryObject = {
      professionalType: selectedProfessional,
      district: selectedDistrict,
      location: selectedLocation,
      timestamp: Date.now()
    };

    executeSearchQuery(queryObject);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick preset helper
  const handleQuickTag = (pro: string, dist: string, loc: string) => {
    setSelectedProfessional(pro);
    setSelectedDistrict(dist);
    setSelectedLocation(loc);
    executeSearchQuery({
      professionalType: pro,
      district: dist,
      location: loc,
      timestamp: Date.now()
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLocationDisabled = !selectedProfessional || !selectedDistrict || isLoadingLocations;

  return (
    <section className="bg-[#082B63] pt-14 pb-24 px-4 sm:px-8 relative overflow-hidden shrink-0" id="hero-search-section">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-100 mb-6 backdrop-blur-md shadow-xs">
          <Shield className="w-3.5 h-3.5 text-[#10B981]" />
          <span>
            {lang === 'hi'
              ? 'बिहार के 38 जिलों के निबंधन एवं राजस्व अंचलों में 100% सत्यापित प्रोफेशनल्स'
              : '100% Verified Deed Writers & Amins in All 38 Bihar Districts'}
          </span>
        </div>

        {/* Master Hero Primary Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight max-w-4xl mx-auto font-sans">
          {lang === 'hi'
            ? 'बिहार में सही भूमि सेवा विशेषज्ञ खोजें'
            : 'Find the Right Land Service Professional in Bihar'}
        </h1>

        <p className="text-blue-100 text-sm sm:text-base mb-10 max-w-3xl mx-auto opacity-90 font-normal leading-relaxed">
          {lang === 'hi'
            ? 'केवाला (रजिस्ट्री) मसौदा के लिए सब-रजिस्ट्री ऑफिस कातिब एवं जमीन नापी/सीमांकन के लिए अंचल अमीन से सीधा संपर्क।'
            : 'Connect directly with licensed Deed Writers for registry drafting and government-certified Amins for precision plot measurements.'}
        </p>

        {/* 3-Level Conditional Search Card */}
        <div className="max-w-5xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white p-3 md:p-3.5 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 md:gap-1 text-slate-800 border border-blue-100/50"
            id="hero-3level-search-form"
          >
            {/* Field 1: Professional Type (Alphabetical A-Z: Amin / Land Surveyor, Deed Writer) */}
            <div className="w-full md:flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200/80 flex flex-col text-left group">
              <label 
                htmlFor="search-professional-select"
                className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#0B3D91]" />
                <span>{lang === 'hi' ? '1. पेशेवर चुनें' : '1. Select Professional'}</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                id="search-professional-select"
                value={selectedProfessional}
                onChange={handleProfessionalChange}
                className="w-full text-sm font-semibold text-[#082B63] bg-transparent outline-none cursor-pointer hover:text-blue-700 transition-colors py-0.5"
              >
                <option value="" disabled>
                  {lang === 'hi' ? '-- पेशेवर चुनें --' : '-- Select Professional --'}
                </option>
                {sortedProfessionals.map(pro => (
                  <option key={pro.id} value={pro.name} className="text-gray-900">
                    {lang === 'hi' ? pro.nameHi : pro.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: District (All 38 Bihar Districts Alphabetical A-Z) */}
            <div className="w-full md:flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200/80 flex flex-col text-left group">
              <label 
                htmlFor="search-district-select"
                className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#0B3D91]" />
                <span>{lang === 'hi' ? '2. जिला चुनें (बिहार)' : '2. Select District'}</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                id="search-district-select"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full text-sm font-semibold text-[#082B63] bg-transparent outline-none cursor-pointer hover:text-blue-700 transition-colors py-0.5"
              >
                <option value="" disabled>
                  {lang === 'hi' ? '-- बिहार का जिला चुनें --' : '-- Select Bihar District --'}
                </option>
                {sortedDistricts.map(dist => (
                  <option key={dist.name} value={dist.name} className="text-gray-900">
                    {dist.name} {lang === 'hi' ? `(${dist.nameHi})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 3: Conditional Location (Sub-Registry Office for Katib OR Block for Amin) */}
            <div className="w-full md:flex-1 px-4 py-2 flex flex-col text-left group relative">
              <label 
                htmlFor="search-location-select"
                className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#0B3D91]" />
                  <span>
                    {selectedProfessional 
                      ? (lang === 'hi' ? `3. ${locationConfig.labelHi}` : `3. ${locationConfig.labelEn}`) 
                      : (lang === 'hi' ? '3. स्थान चुनें' : '3. Select Location')}
                  </span>
                  <span className="text-red-500">*</span>
                </span>
                
                {isLoadingLocations && (
                  <span className="text-[10px] text-blue-600 flex items-center gap-1 font-semibold animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Loading...</span>
                  </span>
                )}
              </label>

              <select
                id="search-location-select"
                value={selectedLocation}
                onChange={handleLocationChange}
                disabled={isLocationDisabled}
                className={`w-full text-sm font-semibold py-0.5 bg-transparent outline-none transition-colors ${
                  isLocationDisabled 
                    ? 'text-gray-400 cursor-not-allowed italic' 
                    : 'text-[#082B63] cursor-pointer hover:text-blue-700'
                }`}
              >
                {!selectedProfessional ? (
                  <option value="" disabled>
                    {lang === 'hi' ? '← पहले पेशेवर चुनें' : '← Select professional first'}
                  </option>
                ) : !selectedDistrict ? (
                  <option value="" disabled>
                    {lang === 'hi' ? '← पहले जिला चुनें' : '← Select district first'}
                  </option>
                ) : isLoadingLocations ? (
                  <option value="" disabled>
                    {lang === 'hi' ? 'स्थान लोड हो रहे हैं...' : 'Loading official locations...'}
                  </option>
                ) : locations.length === 0 ? (
                  <option value="" disabled>
                    {lang === 'hi' ? 'कोई स्थान उपलब्ध नहीं' : 'No locations available'}
                  </option>
                ) : (
                  <>
                    <option value="" disabled>
                      {lang === 'hi' ? `-- ${locationConfig.labelHi} --` : `-- ${locationConfig.labelEn} --`}
                    </option>
                    {locations.map((loc, idx) => (
                      <option key={`${loc}-${idx}`} value={loc} className="text-gray-900">
                        {loc}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            {/* Search Submit CTA */}
            <div className="w-full md:w-auto p-1 flex items-center gap-1.5">
              <button
                type="submit"
                id="hero-search-submit-btn"
                className="w-full md:w-auto bg-[#082B63] hover:bg-[#0B3D91] text-white px-8 py-3.5 rounded-xl md:rounded-full font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{lang === 'hi' ? 'खोजें' : 'Search'}</span>
              </button>

              {(selectedProfessional || selectedDistrict || selectedLocation) && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  title="Reset Search Fields"
                  className="p-3 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Validation or Error Message */}
          {validationError && (
            <div className="mt-3 bg-red-500/90 text-white text-xs font-semibold py-2 px-4 rounded-xl inline-flex items-center gap-2 shadow-md animate-in fade-in-50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {locationError && (
            <div className="mt-3 bg-amber-500/90 text-white text-xs font-semibold py-2 px-4 rounded-xl inline-flex items-center gap-3 shadow-md animate-in fade-in-50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{locationError}</span>
              <button 
                onClick={handleRetryLocations}
                className="underline hover:no-underline font-bold"
              >
                Retry
              </button>
            </div>
          )}

          {/* Dynamic Helper Caption explaining Phase 1 Location Dependency */}
          {selectedProfessional && (
            <div className="mt-3 text-xs text-blue-200/90 font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>
                {selectedProfessional.includes('Deed')
                  ? (lang === 'hi' 
                      ? 'दस्तावेज लेखक (कातिब) के लिए निबंधन कार्यालय (Sub-Registry Office) अनुसार चयन होता है।' 
                      : 'Deed Writers (Katib) are mapped directly to Sub-Registry Offices.')
                  : (lang === 'hi' 
                      ? 'अमीन (भू-सर्वेयर) के लिए राजस्व प्रखंड (Block) अनुसार चयन होता है।' 
                      : 'Amins / Land Surveyors are mapped directly to Revenue Blocks.')}
              </span>
            </div>
          )}

          {/* Quick Popular Presets */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-blue-100">
            <span className="font-semibold text-blue-300 mr-1">
              {lang === 'hi' ? 'त्वरित खोज:' : 'Popular Searches:'}
            </span>
            <button
              onClick={() => handleQuickTag('Deed Writer', 'Patna', 'Patna Sadar Registry Office')}
              className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs transition-colors border border-white/10 text-slate-100"
            >
              Patna Sadar Katib
            </button>
            <button
              onClick={() => handleQuickTag('Amin / Land Surveyor', 'Patna', 'Danapur')}
              className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs transition-colors border border-white/10 text-slate-100"
            >
              Danapur Amin
            </button>
            <button
              onClick={() => handleQuickTag('Deed Writer', 'Bhagalpur', 'Bhagalpur Sadar Registry Office')}
              className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs transition-colors border border-white/10 text-slate-100"
            >
              Bhagalpur Sadar Katib
            </button>
            <button
              onClick={() => handleQuickTag('Amin / Land Surveyor', 'Muzaffarpur', 'Kanti')}
              className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs transition-colors border border-white/10 text-slate-100"
            >
              Muzaffarpur Amin
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
