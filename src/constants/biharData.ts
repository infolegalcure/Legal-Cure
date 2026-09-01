import { DistrictInfo } from '../types';

export interface ProfessionalTypeOption {
  id: string;
  name: string;
  nameHi: string;
  category: 'Amin / Land Surveyor' | 'Deed Writer' | 'Lawyer' | 'Notary';
  active: boolean;
  locationLabelEn: string;
  locationLabelHi: string;
  locationPlaceholderEn: string;
  locationPlaceholderHi: string;
  descriptionEn: string;
  descriptionHi: string;
}

/**
 * Phase 1 Active Professional Categories in STRICT Alphabetical Order:
 * 1. Amin / Land Surveyor (active: true)
 * 2. Deed Writer (active: true)
 * 
 * Inactive/Future categories:
 * - Lawyer (active: false)
 * - Notary (active: false)
 */
export const PROFESSIONAL_TYPES: ProfessionalTypeOption[] = [
  {
    id: 'amin',
    name: 'Amin / Land Surveyor',
    nameHi: 'अमीन / भूमि सर्वेयर',
    category: 'Amin / Land Surveyor',
    active: true,
    locationLabelEn: 'Select Block',
    locationLabelHi: 'प्रखंड चुनें',
    locationPlaceholderEn: 'Choose revenue block for land survey...',
    locationPlaceholderHi: 'जमीन नापी के लिए प्रखंड चुनें...',
    descriptionEn: 'Plot measurement in Katha/Dhur/Decimal, GPS boundary demarcation, and revenue map matching.',
    descriptionHi: 'कट्ठा/धूर/डिसमिल में सही जमीन नापी, सीमांकन एवं राजस्व नक्शा मिलान।'
  },
  {
    id: 'deed-writer',
    name: 'Deed Writer',
    nameHi: 'दस्तावेज लेखक (कातिब)',
    category: 'Deed Writer',
    active: true,
    locationLabelEn: 'Select Sub-Registry Office',
    locationLabelHi: 'उप-पंजीकरण कार्यालय चुनें',
    locationPlaceholderEn: 'Choose registry office for deed drafting...',
    locationPlaceholderHi: 'केवाला व रजिस्ट्री के लिए निबंधन कार्यालय चुनें...',
    descriptionEn: 'Drafting Sale Deed (Kewala), Gift Deed (Hibanama), Batwarinama, and registry token filing.',
    descriptionHi: 'केवाला (बिक्री पत्र), दान पत्र, बंटवारानामा मसौदा और टोकन निबंधन।'
  },
  {
    id: 'lawyer',
    name: 'Lawyer',
    nameHi: 'जमीन व संपत्ति वकील',
    category: 'Lawyer',
    active: false,
    locationLabelEn: 'Select Court / Legal Location',
    locationLabelHi: 'न्यायालय / कानूनी स्थान चुनें',
    locationPlaceholderEn: 'Choose court or legal forum...',
    locationPlaceholderHi: 'व्यवहार न्यायालय या फोरम चुनें...',
    descriptionEn: '30-Year Title Search, Dakhil Kharij disputes, DCLR appeals, partition suits, and legal notices.',
    descriptionHi: '30 वर्षीय टाइटल जांच, दाखिल-खारिज विवाद, डीसीएलआर अपील और कोर्ट प्रतिनिधित्व।'
  },
  {
    id: 'notary',
    name: 'Notary',
    nameHi: 'नोटरी पब्लिक',
    category: 'Notary',
    active: false,
    locationLabelEn: 'Select Notary Zone / Chamber',
    locationLabelHi: 'नोटरी क्षेत्र / चेंबर चुनें',
    locationPlaceholderEn: 'Choose notary chamber or zone...',
    locationPlaceholderHi: 'नोटरी चेंबर अथवा क्षेत्र चुनें...',
    descriptionEn: 'Affidavits, agreement verification, Power of Attorney attestation, and sworn declarations.',
    descriptionHi: 'शपथ पत्र (Affidavit), एग्रीमेंट प्रमाणीकरण, मुख्तारनामा (POA) सत्यापन।'
  }
];

/**
 * Phase 1 Active Categories ONLY (Amin / Land Surveyor & Deed Writer)
 * Strictly sorted alphabetically A → Z.
 */
export const PHASE_1_PROFESSIONAL_TYPES = PROFESSIONAL_TYPES.filter(p => p.active);

export function getActiveProfessionalTypes(): ProfessionalTypeOption[] {
  return [...PHASE_1_PROFESSIONAL_TYPES].sort((a, b) => 
    a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
  );
}

/**
 * Helper to get strictly district-bound Sub-Registry Offices, sorted A → Z
 */
export function getSubRegistryOfficesForDistrict(districtName: string): string[] {
  if (!districtName || districtName === 'All') return [];
  const found = BIHAR_DISTRICTS.find(d => d.name.toLowerCase() === districtName.toLowerCase());
  if (!found || !found.registryOffices) return [];
  return [...found.registryOffices].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
}

/**
 * Helper to get strictly district-bound Blocks, sorted A → Z
 */
export function getBlocksForDistrict(districtName: string): string[] {
  if (!districtName || districtName === 'All') return [];
  const found = BIHAR_DISTRICTS.find(d => d.name.toLowerCase() === districtName.toLowerCase());
  if (!found || !found.blocks) return [];
  return [...found.blocks].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
}

/**
 * Complete Bihar 38 Districts Database
 * Structured with official Sub-Registry Offices, Revenue Blocks, Civil Courts, and Notary Zones.
 */
export const BIHAR_DISTRICTS: DistrictInfo[] = [
  {
    name: 'Araria',
    nameHi: 'अररिया',
    division: 'Purnia',
    registryOffices: ['Araria Sadar Registry Office', 'Forbesganj Sub-Registry'],
    blocks: ['Araria', 'Bhargama', 'Forbesganj', 'Jokihat', 'Kursakanta', 'Narpatganj', 'Palasi', 'Raniganj', 'Sikti'],
    courts: ['Araria District & Sessions Court', 'Forbesganj Sub-Divisional Court'],
    notaryZones: ['Araria Collectorate Notary Desk', 'Forbesganj Court Chamber']
  },
  {
    name: 'Arwal',
    nameHi: 'अरवल',
    division: 'Magadh',
    registryOffices: ['Arwal Sadar Registry Office'],
    blocks: ['Arwal', 'Kaler', 'Karpi', 'Kurtha', 'Sonbhadra Banshi Suryapur'],
    courts: ['Arwal Civil Court & District Judgeship'],
    notaryZones: ['Arwal Collectorate Campus Notary Desk']
  },
  {
    name: 'Aurangabad',
    nameHi: 'औरंगाबाद',
    division: 'Magadh',
    registryOffices: ['Aurangabad Sadar Registry Office', 'Daudnagar Sub-Registry', 'Nabinagar Sub-Registry'],
    blocks: ['Aurangabad', 'Barun', 'Daudnagar', 'Deo', 'Goh', 'Haspura', 'Kutumba', 'Madanpur', 'Nabinagar', 'Obra', 'Rafiganj'],
    courts: ['Aurangabad District Court', 'Daudnagar Sub-Divisional Court'],
    notaryZones: ['Aurangabad Bar Association Notary Desk', 'Daudnagar Court Notary Zone']
  },
  {
    name: 'Banka',
    nameHi: 'बांका',
    division: 'Bhagalpur',
    registryOffices: ['Banka Sadar Registry Office', 'Amarpur Sub-Registry'],
    blocks: ['Amarpur', 'Banka', 'Barahat', 'Bausi', 'Belhar', 'Chandan', 'Dhuraiya', 'Fullidumar', 'Katoria', 'Rajaun', 'Shambhuganj'],
    courts: ['Banka District & Sessions Court'],
    notaryZones: ['Banka Registry Campus Notary Desk', 'Banka Bar Chamber']
  },
  {
    name: 'Begusarai',
    nameHi: 'बेगूसराय',
    division: 'Munger',
    registryOffices: ['Begusarai Sadar Registry Office', 'Bakhri Sub-Registry', 'Balia Sub-Registry', 'Manjhaul Sub-Registry', 'Teghra Sub-Registry'],
    blocks: ['Bachhwara', 'Bakhri', 'Balia', 'Barauni', 'Begusarai', 'Birpur', 'Cheria Bariarpur', 'Chhorahi', 'Dandari', 'Garhpura', 'Khodawandpur', 'Mansurchak', 'Matihani', 'Naokothi', 'Sahebpur Kamal', 'Shamho Akha Kurha', 'Teghra'],
    courts: ['Begusarai District & Sessions Court', 'Bakhri Court', 'Balia Court', 'Manjhaul Court', 'Teghra Sub-Divisional Court'],
    notaryZones: ['Begusarai Registry Campus Notary Desk', 'Barauni Industrial Area Notary Desk', 'Teghra Sub-Division Notary Zone']
  },
  {
    name: 'Bhagalpur',
    nameHi: 'भागलपुर',
    division: 'Bhagalpur',
    registryOffices: ['Bhagalpur Sadar Registry Office', 'Bihpur Sub-Registry', 'Kahalgaon Sub-Registry', 'Naugachia Sub-Registry'],
    blocks: ['Bihpur', 'Gopalpur', 'Goradih', 'Ismailpur', 'Jagdishpur', 'Kahalgaon', 'Kharik', 'Narayanpur', 'Nathnagar', 'Naugachia', 'Pirpainti', 'Rangra Chowk', 'Sabour', 'Sanokhar', 'Shahkund', 'Sultanganj'],
    courts: ['Bhagalpur District & Sessions Court', 'Kahalgaon Sub-Divisional Court', 'Naugachia Sub-Divisional Court'],
    notaryZones: ['Bhagalpur Registry Office Notary Complex', 'Civil Court Advocates Chamber', 'Naugachia Bar Notary Desk']
  },
  {
    name: 'Bhojpur',
    nameHi: 'भोजपुर',
    division: 'Patna',
    registryOffices: ['Ara Sadar Registry Office', 'Jagdishpur Sub-Registry', 'Piro Sub-Registry'],
    blocks: ['Agiaon', 'Ara Sadar', 'Barhara', 'Behea', 'Charpokhari', 'Garhani', 'Jagdishpur', 'Koilwar', 'Piro', 'Sahar', 'Sandesh', 'Shahpur', 'Tarari', 'Udwantnagar'],
    courts: ['Ara District & Civil Court', 'Jagdishpur Sub-Divisional Court', 'Piro Sub-Divisional Court'],
    notaryZones: ['Ara Registry Campus Notary Section', 'District Bar Association Ara', 'Piro Court Notary Zone']
  },
  {
    name: 'Buxar',
    nameHi: 'बक्सर',
    division: 'Patna',
    registryOffices: ['Buxar Sadar Registry Office', 'Dumraon Sub-Registry'],
    blocks: ['Brahampur', 'Buxar', 'Chakki', 'Chaugain', 'Chausa', 'Dumraon', 'Itarhi', 'Kesath', 'Nawanagar', 'Rajpur', 'Simri'],
    courts: ['Buxar District & Sessions Court', 'Dumraon Sub-Divisional Court'],
    notaryZones: ['Buxar Collectorate Notary Desk', 'Dumraon Registry Area Notary Zone']
  },
  {
    name: 'Darbhanga',
    nameHi: 'दरभंगा',
    division: 'Darbhanga',
    registryOffices: ['Darbhanga Sadar Registry Office', 'Benipur Sub-Registry', 'Biraul Sub-Registry'],
    blocks: ['Alinagar', 'Bahadurpur', 'Baheri', 'Benipur', 'Biraul', 'Darbhanga Sadar', 'Ghanshyampur', 'Hanumannagar', 'Hayaghat', 'Jale', 'Kalyanpur', 'Keoti', 'Kiratpur', 'Kusheshwar Asthan', 'Kusheshwar Asthan East', 'Manigachhi', 'Singhwara', 'Tardih'],
    courts: ['Darbhanga District & Sessions Court', 'Benipur Sub-Divisional Court', 'Biraul Sub-Divisional Court'],
    notaryZones: ['Darbhanga Registry Office Complex', 'Laheriasarai District Court Bar Notary Desk', 'Benipur Court Chamber']
  },
  {
    name: 'East Champaran',
    nameHi: 'पूर्वी चंपारण (मोतिहारी)',
    division: 'Tirhut',
    registryOffices: ['Motihari Registry Office', 'Areraj Sub-Registry', 'Chakia Sub-Registry', 'Dhaka Sub-Registry', 'Pakridayal Sub-Registry', 'Raxaul Sub-Registry'],
    blocks: ['Adapur', 'Areraj', 'Banjaria', 'Bankatwa', 'Chakia', 'Chiraiya', 'Dhaka', 'Ghorasahan', 'Harsidhi', 'Kalyanpur', 'Kesaria', 'Kotwa', 'Madhuban', 'Motihari', 'Paharpur', 'Pakridayal', 'Patahi', 'Phenhara', 'Piprakothi', 'Ramgarhwa', 'Raxaul', 'Sangrampur', 'Sugauli', 'Tetaria', 'Turkaulia'],
    courts: ['Motihari District & Sessions Court', 'Areraj Sub-Divisional Court', 'Chakia Court', 'Dhaka Court', 'Pakridayal Court', 'Raxaul Sub-Divisional Court'],
    notaryZones: ['Motihari Registry Campus Notary Desk', 'Motihari Bar Association', 'Raxaul Border Registry Notary Desk']
  },
  {
    name: 'Gaya',
    nameHi: 'गया',
    division: 'Magadh',
    registryOffices: ['Gaya Sadar Registry Office', 'Neemchak Bathani Sub-Registry', 'Sherghati Sub-Registry', 'Tekari Sub-Registry'],
    blocks: ['Amas', 'Atri', 'Bankey Bazar', 'Barachatti', 'Belaganj', 'Bodhgaya', 'Dobhi', 'Dumaria', 'Fatehpur', 'Gaya Town', 'Guraru', 'Gurua', 'Imamganj', 'Khizirsarai', 'Konch', 'Manpur', 'Mohanpur', 'Muhra', 'Neemchak Bathani', 'Paraiya', 'Sherghati', 'Tankuppa', 'Tekari', 'Wazirganj'],
    courts: ['Gaya District & Sessions Court', 'Sherghati Sub-Divisional Court', 'Tekari Sub-Divisional Court'],
    notaryZones: ['Gaya Collectorate Notary Desk', 'Gaya Registry Office Campus', 'Sherghati Court Notary Section']
  },
  {
    name: 'Gopalganj',
    nameHi: 'गोपालगंज',
    division: 'Saran',
    registryOffices: ['Gopalganj Sadar Registry Office', 'Hathua Sub-Registry'],
    blocks: ['Baikunthpur', 'Barauli', 'Bhorey', 'Bijaipur', 'Gopalganj', 'Hathua', 'Katiya', 'Kuchaikote', 'Manjha', 'Pachdeorhi', 'Phulwaria', 'Sidhwalia', 'Thawe', 'Uchkagaon'],
    courts: ['Gopalganj District Court', 'Hathua Sub-Divisional Court'],
    notaryZones: ['Gopalganj Registry Complex Notary Desk', 'Hathua Bar Chamber']
  },
  {
    name: 'Jamui',
    nameHi: 'जमुई',
    division: 'Munger',
    registryOffices: ['Jamui Sadar Registry Office'],
    blocks: ['Barhat', 'Chakai', 'Gidhaur', 'Islamnagar Aliganj', 'Jamui', 'Jhajha', 'Khaira', 'Laxmipur', 'Sikandra', 'Sono'],
    courts: ['Jamui District & Sessions Court'],
    notaryZones: ['Jamui Registry Campus Notary Desk', 'Jamui District Bar Association']
  },
  {
    name: 'Jehanabad',
    nameHi: 'जहानाबाद',
    division: 'Magadh',
    registryOffices: ['Jehanabad Sadar Registry Office', 'Makhdumpur Sub-Registry'],
    blocks: ['Ghoshi', 'Hulashganj', 'Jehanabad', 'Kako', 'Makhdumpur', 'Modanganj', 'Ratni Faridpur'],
    courts: ['Jehanabad District & Sessions Court'],
    notaryZones: ['Jehanabad Collectorate Notary Section', 'District Bar Association Desk']
  },
  {
    name: 'Kaimur',
    nameHi: 'कैमूर (भभुआ)',
    division: 'Patna',
    registryOffices: ['Bhabua Sadar Registry Office', 'Mohania Sub-Registry'],
    blocks: ['Adhaura', 'Bhagwanpur', 'Bhabua', 'Chainpur', 'Chand', 'Durgawati', 'Kudra', 'Mohania', 'Nuon', 'Ramgarh', 'Rampur'],
    courts: ['Bhabua District Court', 'Mohania Sub-Divisional Court'],
    notaryZones: ['Bhabua Registry Office Notary Desk', 'Mohania Court Area Notary Zone']
  },
  {
    name: 'Katihar',
    nameHi: 'कटिहार',
    division: 'Purnia',
    registryOffices: ['Katihar Sadar Registry Office', 'Barsoi Sub-Registry', 'Manihari Sub-Registry'],
    blocks: ['Amdabad', 'Azamnagar', 'Balrampur', 'Barari', 'Barsoi', 'Dandkhora', 'Falka', 'Hasanganj', 'Kadwa', 'Katihar', 'Korha', 'Kursela', 'Manihari', 'Mansahi', 'Pranpur', 'Sameli'],
    courts: ['Katihar District & Sessions Court', 'Barsoi Sub-Divisional Court', 'Manihari Court'],
    notaryZones: ['Katihar Registry Campus Notary Desk', 'Barsoi Sub-Division Notary Zone']
  },
  {
    name: 'Khagaria',
    nameHi: 'खगड़िया',
    division: 'Munger',
    registryOffices: ['Khagaria Sadar Registry Office', 'Gogri Sub-Registry'],
    blocks: ['Alauli', 'Beldaur', 'Chautham', 'Gogri', 'Khagaria', 'Mansi', 'Parbatta'],
    courts: ['Khagaria District & Sessions Court', 'Gogri Sub-Divisional Court'],
    notaryZones: ['Khagaria Registry Campus Notary Desk', 'Gogri Court Bar Chamber']
  },
  {
    name: 'Kishanganj',
    nameHi: 'किशनगंज',
    division: 'Purnia',
    registryOffices: ['Kishanganj Sadar Registry Office', 'Bahadurganj Sub-Registry'],
    blocks: ['Bahadurganj', 'Dighalbank', 'Kishanganj', 'Kochadhaman', 'Pothia', 'Terhagachh', 'Thakurganj'],
    courts: ['Kishanganj District Court'],
    notaryZones: ['Kishanganj Registry Campus Notary Desk', 'District Bar Association Kishanganj']
  },
  {
    name: 'Lakhisarai',
    nameHi: 'लखीसराय',
    division: 'Munger',
    registryOffices: ['Lakhisarai Sadar Registry Office', 'Barahiya Sub-Registry'],
    blocks: ['Barahiya', 'Chanan', 'Halsi', 'Lakhisarai', 'Pipariya', 'Ramgarh Chowk', 'Surajgarha'],
    courts: ['Lakhisarai District & Sessions Court'],
    notaryZones: ['Lakhisarai Registry Campus Notary Desk', 'Bar Association Lakhisarai']
  },
  {
    name: 'Madhepura',
    nameHi: 'मधेपुरा',
    division: 'Kosi',
    registryOffices: ['Madhepura Sadar Registry Office', 'Uda Kishanganj Sub-Registry'],
    blocks: ['Alamnagar', 'Bihariganj', 'Chausa', 'Gamharia', 'Ghelarh', 'Gwalpara', 'Kishunganj', 'Kumarkhand', 'Madhepura', 'Murliganj', 'Puraini', 'Shankarpur', 'Singheshwar'],
    courts: ['Madhepura District Court', 'Uda Kishanganj Sub-Divisional Court'],
    notaryZones: ['Madhepura Registry Office Desk', 'Uda Kishanganj Court Zone']
  },
  {
    name: 'Madhubani',
    nameHi: 'मधुबनी',
    division: 'Darbhanga',
    registryOffices: ['Madhubani Sadar Registry Office', 'Benipatti Sub-Registry', 'Jaynagar Sub-Registry', 'Jhanjharpur Sub-Registry', 'Phulparas Sub-Registry'],
    blocks: ['Andhratharhi', 'Babubarhi', 'Basopatti', 'Benipatti', 'Bisfi', 'Ghoghardiha', 'Harlakhi', 'Jaynagar', 'Jhanjharpur', 'Kaluahi', 'Khajauli', 'Ladania', 'Lakhnaur', 'Laukaha', 'Laukahi', 'Madhepur', 'Madhubani', 'Madhwapur', 'Pandaul', 'Phulparas', 'Rajnagar', 'Sakri'],
    courts: ['Madhubani District Court', 'Benipatti Court', 'Jaynagar Court', 'Jhanjharpur Sub-Divisional Court', 'Phulparas Court'],
    notaryZones: ['Madhubani Registry Campus Notary Complex', 'Jhanjharpur Sub-Divisional Notary Desk', 'Benipatti Bar Chamber']
  },
  {
    name: 'Munger',
    nameHi: 'मुंगेर',
    division: 'Munger',
    registryOffices: ['Munger Sadar Registry Office', 'Haveli Kharagpur Sub-Registry', 'Tarapur Sub-Registry'],
    blocks: ['Asarganj', 'Bariarpur', 'Dharhara', 'Haveli Kharagpur', 'Jamalpur', 'Munger Sadar', 'Sangrampur', 'Tarapur', 'Tetiabambar'],
    courts: ['Munger District & Sessions Court', 'Kharagpur Court', 'Tarapur Court'],
    notaryZones: ['Munger Registry Campus Notary Desk', 'Jamalpur Rail Area Notary Desk', 'Tarapur Court Zone']
  },
  {
    name: 'Muzaffarpur',
    nameHi: 'मुजफ्फरपुर',
    division: 'Tirhut',
    registryOffices: ['Muzaffarpur Registry Office', 'Kanti Sub-Registry', 'Motipur Sub-Registry', 'Paroo Sub-Registry', 'Sakra Sub-Registry'],
    blocks: ['Aurai', 'Bandra', 'Bochahan', 'Dholi (Moraul)', 'Gaighat', 'Kanti', 'Katra', 'Kurhani', 'Marwan', 'Minapur', 'Motipur', 'Musahari', 'Paroo', 'Sahebganj', 'Sakra', 'Saraiya'],
    courts: ['Muzaffarpur District & Sessions Court', 'Muzaffarpur Civil Court', 'Paroo Sub-Divisional Court', 'West Sub-Divisional Court'],
    notaryZones: ['Muzaffarpur Registry Office Notary Complex', 'Civil Court Advocates Association Muzaffarpur', 'Motipur Notary Desk']
  },
  {
    name: 'Nalanda',
    nameHi: 'नालंदा (बिहारशरीफ)',
    division: 'Patna',
    registryOffices: ['Bihar Sharif Registry Office', 'Hilsa Sub-Registry', 'Islampur Sub-Registry', 'Rajgir Sub-Registry'],
    blocks: ['Asthawan', 'Ben', 'Bihar Sharif', 'Bind', 'Chandi', 'Ekangarsarai', 'Giriak', 'Harnaut', 'Hilsa', 'Islampur', 'Karai Parsurai', 'Katrisarai', 'Nagar Nausa', 'Noorsarai', 'Rahui', 'Rajgir', 'Rajnagar', 'Sarmera', 'Silao', 'Tharthari'],
    courts: ['Bihar Sharif District & Sessions Court', 'Hilsa Sub-Divisional Court', 'Rajgir Sub-Divisional Court'],
    notaryZones: ['Bihar Sharif Registry Campus Notary Desk', 'Rajgir Tourism & Sub-Division Notary Zone', 'Hilsa Court Bar Desk']
  },
  {
    name: 'Nawada',
    nameHi: 'नवादा',
    division: 'Magadh',
    registryOffices: ['Nawada Sadar Registry Office', 'Rajauli Sub-Registry'],
    blocks: ['Akbarpur', 'Govindpur', 'Hisua', 'Kashichak', 'Kowakole', 'Meskaur', 'Nardiganj', 'Narhat', 'Nawada', 'Pakribarwan', 'Rajauli', 'Roh', 'Sirdala', 'Warisaliganj'],
    courts: ['Nawada District & Sessions Court', 'Rajauli Sub-Divisional Court'],
    notaryZones: ['Nawada Registry Office Notary Desk', 'Rajauli Court Notary Zone']
  },
  {
    name: 'Patna',
    nameHi: 'पटना',
    division: 'Patna',
    registryOffices: ['Patna Sadar Registry Office', 'Barh Sub-Registry', 'Bikram Sub-Registry', 'Danapur Sub-Registry', 'Masaurhi Sub-Registry', 'Paliganj Sub-Registry', 'Patna City Sub-Registry'],
    blocks: ['Athmalgola', 'Bakhtiarpur', 'Barh', 'Belchhi', 'Bihta', 'Bikram', 'Danapur', 'Daniawan', 'Dhanarua', 'Dulhin Bazar', 'Fatwah', 'Ghoswari', 'Khusrupur', 'Maner', 'Masaurhi', 'Mokama', 'Naubatpur', 'Paliganj', 'Pandarak', 'Patna Sadar', 'Phulwari Sharif', 'Punpun', 'Sampatchak'],
    courts: ['Patna High Court', 'Patna Civil Court (Collectorate Campus)', 'Danapur Sub-Divisional Court', 'Patna City Civil Court', 'Barh Sub-Divisional Court', 'Masaurhi Sub-Divisional Court', 'Paliganj Sub-Divisional Court'],
    notaryZones: ['Patna Sadar Registry Office Notary Hub', 'Patna High Court Notary Association', 'Danapur Sub-Registry Notary Desk', 'Patna City Registry Notary Wing', 'Bihta-Naubatpur Notary Zone']
  },
  {
    name: 'Purnia',
    nameHi: 'पूर्णिया',
    division: 'Purnia',
    registryOffices: ['Purnia Sadar Registry Office', 'Baisi Sub-Registry', 'Banmankhi Sub-Registry', 'Dhamdaha Sub-Registry'],
    blocks: ['Amour', 'Baisa', 'Baisi', 'Banmankhi', 'Barhara Kothi', 'Bhawanipur', 'Dagarua', 'Dhamdaha', 'Jalalgarh', 'Kasba', 'Krinayanand Nagar (K. Nagar)', 'Purnia East', 'Rupauli', 'Srinagar'],
    courts: ['Purnia District & Sessions Court', 'Baisi Court', 'Banmankhi Court', 'Dhamdaha Sub-Divisional Court'],
    notaryZones: ['Purnia Registry Campus Notary Desk', 'District Bar Association Purnia', 'Dhamdaha Sub-Division Notary Zone']
  },
  {
    name: 'Rohtas',
    nameHi: 'रोहतास (सासाराम)',
    division: 'Patna',
    registryOffices: ['Sasaram Registry Office', 'Bikramganj Sub-Registry', 'Dehri Sub-Registry'],
    blocks: ['Akhorigola', 'Bikramganj', 'Chenari', 'Chhattarpur', 'Dawath', 'Dehri', 'Dinara', 'Karakat', 'Kargahar', 'Kochas', 'Nauhatta', 'Nokha', 'Rajpur', 'Rohtas', 'Sanjhauli', 'Sasaram', 'Sheosagar', 'Suryapura', 'Tilouthu'],
    courts: ['Sasaram District & Sessions Court', 'Bikramganj Sub-Divisional Court', 'Dehri-on-Sone Court'],
    notaryZones: ['Sasaram Registry Campus Notary Desk', 'Dehri Sub-Division Notary Desk', 'Bikramganj Bar Chamber']
  },
  {
    name: 'Saharsa',
    nameHi: 'सहरसा',
    division: 'Kosi',
    registryOffices: ['Saharsa Sadar Registry Office', 'Simri Bakhtiarpur Sub-Registry'],
    blocks: ['Banma Itahari', 'Kahara', 'Mahishi', 'Nauhatta', 'Patarghat', 'Salkhua', 'Sattar Kattaiya', 'Saur Bazar', 'Simri Bakhtiarpur', 'Sonbarsa'],
    courts: ['Saharsa District & Sessions Court', 'Simri Bakhtiarpur Sub-Divisional Court'],
    notaryZones: ['Saharsa Registry Office Notary Desk', 'Simri Bakhtiarpur Court Notary Wing']
  },
  {
    name: 'Samastipur',
    nameHi: 'समस्तीपुर',
    division: 'Darbhanga',
    registryOffices: ['Samastipur Sadar Registry Office', 'Dalsinghsarai Sub-Registry', 'Patori Sub-Registry', 'Rosera Sub-Registry'],
    blocks: ['Bibhutipur', 'Bithan', 'Dalsinghsarai', 'Hasanpur', 'Kalyanpur', 'Khanpur', 'Mohanpur', 'Mohiuddin Nagar', 'Morwa', 'Patori', 'Pusa', 'Rosera', 'Samastipur', 'Sarairanjan', 'Shivaji Nagar', 'Singhia', 'Tajpur', 'Ujiarpur', 'Vidyapatinagar', 'Warisnagar'],
    courts: ['Samastipur District Court', 'Dalsinghsarai Sub-Divisional Court', 'Patori Sub-Divisional Court', 'Rosera Sub-Divisional Court'],
    notaryZones: ['Samastipur Registry Campus Notary Desk', 'Dalsinghsarai Bar Association Notary Wing', 'Rosera Court Notary Zone']
  },
  {
    name: 'Saran',
    nameHi: 'सारण (छपरा)',
    division: 'Saran',
    registryOffices: ['Chhapra Sadar Registry Office', 'Ekma Sub-Registry', 'Marhaura Sub-Registry', 'Sonpur Sub-Registry'],
    blocks: ['Amnour', 'Baniapur', 'Chhapra', 'Dariapur', 'Dighwara', 'Ekma', 'Garkha', 'Ishupur', 'Jalalpur', 'Lahladpur', 'Maker', 'Manjhi', 'Marhaura', 'Mashrakh', 'Nagra', 'Panapur', 'Parsa', 'Revelganj', 'Sonpur', 'Taraiya'],
    courts: ['Chhapra District & Sessions Court', 'Marhaura Sub-Divisional Court', 'Sonpur Sub-Divisional Court'],
    notaryZones: ['Chhapra Registry Office Notary Desk', 'District Bar Association Chhapra', 'Sonpur Court Notary Section']
  },
  {
    name: 'Sheikhpura',
    nameHi: 'शेखपुरा',
    division: 'Munger',
    registryOffices: ['Sheikhpura Sadar Registry Office', 'Barbigha Sub-Registry'],
    blocks: ['Ariari', 'Barbigha', 'Chewara', 'Ghatkusumbha', 'Sheikhpura', 'Shekhopur Sarai'],
    courts: ['Sheikhpura District & Sessions Court'],
    notaryZones: ['Sheikhpura Registry Campus Notary Desk', 'Barbigha Court Area Notary Zone']
  },
  {
    name: 'Sheohar',
    nameHi: 'शिवहर',
    division: 'Tirhut',
    registryOffices: ['Sheohar Sadar Registry Office'],
    blocks: ['Dumri Katsari', 'Piprarhi', 'Purnahiya', 'Sheohar', 'Tariyani Chowk'],
    courts: ['Sheohar District Court'],
    notaryZones: ['Sheohar Registry Office Notary Desk']
  },
  {
    name: 'Sitamarhi',
    nameHi: 'सीतामढ़ी',
    division: 'Tirhut',
    registryOffices: ['Sitamarhi Sadar Registry Office', 'Bairgania Sub-Registry', 'Pupri Sub-Registry'],
    blocks: ['Bairgania', 'Bajpatti', 'Bathnaha', 'Belsand', 'Bokhra', 'Charaut', 'Dumra', 'Nanpur', 'Parihar', 'Parsauni', 'Pupri', 'Riga', 'Runnisaidpur', 'Sursand', 'Sonbarsa', 'Suppi'],
    courts: ['Sitamarhi District & Sessions Court', 'Belsand Sub-Divisional Court', 'Pupri Sub-Divisional Court'],
    notaryZones: ['Dumra Registry Complex Notary Desk', 'Sitamarhi District Bar Notary Section', 'Pupri Court Chamber']
  },
  {
    name: 'Siwan',
    nameHi: 'सीवान',
    division: 'Saran',
    registryOffices: ['Siwan Registry Office', 'Maharajganj Sub-Registry', 'Mairwa Sub-Registry'],
    blocks: ['Andar', 'Barharia', 'Basantpur', 'Bhagwanpur Hat', 'Darauli', 'Daraundha', 'Goreakothi', 'Guthani', 'Hasanpura', 'Hussainganj', 'Lakri Nabiganj', 'Maharajganj', 'Mairwa', 'Nautan', 'Pachrukhi', 'Raghunathpur', 'Siswan', 'Siwan Sadar', 'Ziradei'],
    courts: ['Siwan District & Sessions Court', 'Maharajganj Sub-Divisional Court'],
    notaryZones: ['Siwan Registry Campus Notary Hub', 'District Bar Association Siwan', 'Maharajganj Bar Chamber']
  },
  {
    name: 'Supaul',
    nameHi: 'सुपौल',
    division: 'Kosi',
    registryOffices: ['Supaul Sadar Registry Office', 'Birpur Sub-Registry', 'Nirmali Sub-Registry', 'Triveniganj Sub-Registry'],
    blocks: ['Basantpur', 'Chhatapur', 'Kishanpur', 'Marauna', 'Nirmali', 'Pipra', 'Pratapganj', 'Raghopur', 'Saraigarh Bhaptiyahi', 'Supaul', 'Triveniganj'],
    courts: ['Supaul District Court', 'Birpur Court', 'Nirmali Court', 'Triveniganj Court'],
    notaryZones: ['Supaul Registry Campus Notary Desk', 'Birpur Sub-Division Notary Zone']
  },
  {
    name: 'Vaishali',
    nameHi: 'वैशाली (हाजीपुर)',
    division: 'Tirhut',
    registryOffices: ['Hajipur Registry Office', 'Lalganj Sub-Registry', 'Mahnar Sub-Registry', 'Mahua Sub-Registry'],
    blocks: ['Bhagwanpur', 'Bidupur', 'Chehrakala', 'Desri', 'Goraul', 'Hajipur', 'Jandaha', 'Lalganj', 'Mahnar', 'Mahua', 'Patedhi Belsar', 'Patepur', 'Raghopur', 'Rajapakar', 'Sahdei Buzurg', 'Vaishali'],
    courts: ['Hajipur District & Sessions Court', 'Mahnar Sub-Divisional Court', 'Mahua Sub-Divisional Court'],
    notaryZones: ['Hajipur Registry Campus Notary Desk', 'Hajipur District Bar Association', 'Mahua Sub-Division Notary Zone']
  },
  {
    name: 'West Champaran',
    nameHi: 'पश्चिम चंपारण (बेतिया)',
    division: 'Tirhut',
    registryOffices: ['Bettiah Sadar Registry Office', 'Bagaha Sub-Registry', 'Narkatiaganj Sub-Registry'],
    blocks: ['Bagaha-I', 'Bagaha-II', 'Bairia', 'Bettiah', 'Bhitaha', 'Chanpatia', 'Gaunaha', 'Jogapatti', 'Lauriya', 'Madhuban', 'Mainatand', 'Majhoulia', 'Narkatiaganj', 'Nautan', 'Piprasi', 'Ramnagar', 'Sikta', 'Thakrahan'],
    courts: ['Bettiah District & Sessions Court', 'Bagaha Sub-Divisional Court', 'Narkatiaganj Sub-Divisional Court'],
    notaryZones: ['Bettiah Registry Office Notary Desk', 'Bagaha Court Bar Chamber', 'Narkatiaganj Bar Notary Desk']
  }
];

export const BIHAR_SERVICES = [
  {
    id: 'sale_deed',
    title: 'Sale Deed (Kewala / रजिस्ट्री)',
    category: 'Deed Writer',
    typicalDays: '1-2 Days',
    approxMarketFee: '₹1,500 - ₹3,500',
    description: 'Complete drafting of land sale deed with schedule of property, boundary (Chauhaddi), seller/buyer clauses and token submission.'
  },
  {
    id: 'gift_deed',
    title: 'Gift Deed (Hibanama / बख्शीशनामा)',
    category: 'Deed Writer',
    typicalDays: '1 Day',
    approxMarketFee: '₹1,200 - ₹2,500',
    description: 'Transferring agricultural or residential land to blood relations without sale consideration with official exemption drafting.'
  },
  {
    id: 'title_search',
    title: '30-Year Title Search & Non-Encumbrance',
    category: 'Lawyer',
    typicalDays: '2-4 Days',
    approxMarketFee: '₹2,500 - ₹6,000',
    description: 'Deep physical check at Bihar Registration office volume records (Index II) to verify undisputed ownership chain.'
  },
  {
    id: 'mutation_dakhil',
    title: 'Dakhil Kharij (Mutation) Legal Representation',
    category: 'Lawyer',
    typicalDays: '3-7 Days',
    approxMarketFee: '₹2,000 - ₹5,000',
    description: 'Handling CO (Circle Officer) objections, DCLR appeals, and Jamabandi correction procedures.'
  },
  {
    id: 'plot_measurement',
    title: 'Amin Plot Measurement (Katha/Dhur/Decimal)',
    category: 'Amin / Land Surveyor',
    typicalDays: '1 Day (Site Visit)',
    approxMarketFee: '₹1,500 - ₹3,500',
    description: 'Physical surveying using Gunter chain and electronic total station. Setting boundary pillars and providing certified Map/Naksha.'
  },
  {
    id: 'boundary_demarcation',
    title: 'Boundary Demarcation & Dispute Resolution',
    category: 'Amin / Land Surveyor',
    typicalDays: '1 Day',
    approxMarketFee: '₹2,000 - ₹4,500',
    description: 'Re-fixing coordinates against revenue village map (Sheet Cadastral / Revisional Map) with panchnama report.'
  },
  {
    id: 'notary_affidavit',
    title: 'Land Sale Agreement / Power of Attorney Notarization',
    category: 'Notary',
    typicalDays: 'Immediate (1-2 Hours)',
    approxMarketFee: '₹500 - ₹1,500',
    description: 'Official notarization, seal, register entry, and verification of stamp paper agreements.'
  },
  {
    id: 'khatian_check',
    title: 'Khatian & Jamabandi Verification Service',
    category: 'Document Checker',
    typicalDays: '1 Day',
    approxMarketFee: '₹500 - ₹1,200',
    description: 'Online & offline verification of CS/RS Khatian, Register-II, Lagan receipts, and LPC status.'
  }
];

export const BIHAR_LAND_UNITS = [
  { name: '1 Bigha (Standard Bihar)', equalTo: '20 Katha (= ~27,200 sq.ft / 62.5 Decimal)' },
  { name: '1 Katha (Standard)', equalTo: '20 Dhur (= ~1,361 sq.ft / 3.125 Decimal)' },
  { name: '1 Decimal', equalTo: '435.6 sq.ft (= ~0.32 Katha)' },
  { name: '1 Dhur', equalTo: '68.06 sq.ft (= 20 Dhurki)' }
];
