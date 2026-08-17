import { Professional, Booking, UserAccount, ContactUnlock, WhatsAppMessage, Lead } from '../types';

/**
 * [DEMO DATA - FOR PROTOTYPE PURPOSES ONLY]
 * These demo profiles and records are provided to test and demonstrate Phase 1 features.
 * In production, all records will be retrieved from the central LegalCure database.
 */

export const mockUsers: UserAccount[] = [
  {
    id: 'LCU-001248',
    name: 'Vivek Ranjan',
    mobile: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'vivek.ranjan@example.com',
    role: 'customer',
    district: 'Patna',
    location: 'Patna Sadar',
    joinedDate: '2026-06-15'
  },
  {
    id: 'LCP-000492',
    name: 'Rajesh Kumar Singh',
    mobile: '+91 94312 88410',
    whatsapp: '+91 94312 88410',
    email: 'rajesh.katib@legalcure.demo',
    role: 'professional',
    category: 'Deed Writer',
    district: 'Bhagalpur',
    location: 'Bhagalpur Sadar Registry Office',
    verificationStatus: 'Verified',
    licenseNumber: 'BGP/DW/2009/482',
    experienceYears: 16,
    avatarUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&auto=format&fit=crop&q=80',
    joinedDate: '2026-05-10'
  },
  {
    id: 'LCA-000001',
    name: 'LegalCure Admin Team',
    mobile: '+91 99999 00001',
    whatsapp: '+91 99999 00001',
    email: 'admin@legalcure.in',
    role: 'admin',
    joinedDate: '2026-01-01'
  }
];

export const mockProfessionals: Professional[] = [
  {
    id: 'LCP-000492',
    name: 'Rajesh Kumar Singh',
    nameHi: 'राजेश कुमार सिंह',
    category: 'Deed Writer',
    categoryHi: 'दस्तावेज लेखक (कातिब)',
    isPhase1Active: true,
    rating: 4.9,
    reviewCount: 148,
    experience: 16,
    district: 'Bhagalpur',
    districtHi: 'भागलपुर',
    block: 'Jagdishpur',
    office: 'Bhagalpur Sadar Registry Office',
    officeHi: 'भागलपुर सदर रजिस्ट्री ऑफिस',
    officeType: 'Registry Office',
    chamberAddress: 'Shed No. 14, Near Sub-Registrar Gate, Registry Office Campus, Bhagalpur',
    verificationStatus: 'Verified',
    verified: true,
    licenseNumber: 'BGP/DW/2009/482',
    licenseAuthority: 'District Registration Department, Bihar',
    fee: 2000,
    tokenFee: 100,
    services: [
      'Sale Deed (Kewala / रजिस्ट्री)',
      'Gift Deed (Hibanama / दान पत्र)',
      'Partition Deed (Batwarinama / बंटवारा)',
      'Agreement to Sale Drafting',
      'Registry Token Clearance'
    ],
    servicesHi: [
      'केवाला (बिक्री पत्र)',
      'दान पत्र (हिबानामा)',
      'बंटवारानामा विलेख',
      'बिक्री इकरारनामा मसौदा',
      'रजिस्ट्री टोकन निकासी'
    ],
    languages: ['Hindi', 'Angika', 'English'],
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&auto=format&fit=crop&q=80',
    about: 'Senior Licensed Deed Writer (Katib) with 16+ years of specialized experience in Bhagalpur district. Expert in drafting error-free Kewala deeds, boundary verification (Chauhaddi), MVR circle rate valuation, and swift online registry token booking.',
    aboutHi: 'भागलपुर जिले में 16+ वर्षों के अनुभव के साथ वरिष्ठ लाइसेंस प्राप्त कातिब। त्रुटिरहित केवाला लेखन, चौहद्दी मिलान, एमवीआर सर्किल रेट गणना और त्वरित निबंधन में महारत।',
    phone: '+91 94312 88410',
    whatsapp: '+91 94312 88410',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'],
    totalCasesCompleted: 1420,
    isDemoData: true,
    reviews: [
      {
        id: 'r1',
        userName: 'Manoj Choudhary (Demo User)',
        userLocation: 'Sabour, Bhagalpur',
        rating: 5,
        date: '12 Aug 2026',
        comment: 'Rajesh ji drafted our commercial land kewala in just 3 hours. Handled the circle rate calculation and token without any hassle. Highly recommended!',
        verifiedBooking: true,
        isDemoData: true
      },
      {
        id: 'r2',
        userName: 'Sunita Devi (Demo User)',
        userLocation: 'Nathnagar, Bhagalpur',
        rating: 5,
        date: '28 Jul 2026',
        comment: 'Very honest Katib. Transparent regarding official stamp duty. No hidden fees.',
        verifiedBooking: true,
        isDemoData: true
      }
    ]
  },
  {
    id: 'LCP-000987',
    name: 'Amin Ramashish Yadav',
    nameHi: 'अमीन रामाशीष यादव',
    category: 'Amin / Land Surveyor',
    categoryHi: 'सरकारी प्रशिक्षित अमीन (भूमि सर्वेयर)',
    isPhase1Active: true,
    rating: 4.8,
    reviewCount: 112,
    experience: 19,
    district: 'Patna',
    districtHi: 'पटना',
    block: 'Danapur',
    office: 'Danapur',
    officeHi: 'दानापुर अंचल कार्यालय',
    officeType: 'Block Office',
    chamberAddress: 'Near Danapur Block Circle Office, Khagaul Road, Danapur',
    verificationStatus: 'Verified',
    verified: true,
    licenseNumber: 'BHR/AMIN/PAT/9871',
    licenseAuthority: 'Revenue & Land Reforms Dept, Bihar',
    fee: 2200,
    tokenFee: 100,
    services: [
      'Land Measurement in Katha/Dhur/Decimal',
      'Electronic Total Station (ETS) Survey',
      'Boundary Demarcation (Hadbandi & Pillars)',
      'Revisional & Cadastral Naksha Matching',
      'Plot Sub-division Panchnama'
    ],
    servicesHi: [
      'कट्ठा/धूर/डिसमिल जमीन नापी',
      'ईटीएस इलेक्ट्रॉनिक पैमाइश',
      'हदबंदी एवं सीमा पिलर स्थापन',
      'राजस्व नक्शा मिलान',
      'प्लॉट बंटवारा पंचनामा'
    ],
    languages: ['Hindi', 'Bhojpuri', 'Magahi'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    about: 'Govt-certified Senior Amin with Gunter Chain, Total Station & GPS mapping expertise. Has surveyed over 4,000 plots in Patna, Danapur, Bihta, and Naubatpur revenue circles with undisputed boundary reports.',
    aboutHi: 'सरकारी प्रमाणित वरिष्ठ अमीन। जरीब, टोटल स्टेशन एवं जीपीएस द्वारा सटीक पैमाइश। दानापुर, बिहटा और पटना अंचल में 4000+ खेतों और प्लॉटों का सफल सीमांकन।',
    phone: '+91 94702 11984',
    whatsapp: '+91 94702 11984',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'],
    timeSlots: ['07:30 AM', '09:00 AM', '11:00 AM', '03:00 PM'],
    totalCasesCompleted: 2150,
    isDemoData: true,
    reviews: [
      {
        id: 'r3',
        userName: 'Surendra Prasad (Demo User)',
        userLocation: 'Naubatpur, Patna',
        rating: 5,
        date: '02 Aug 2026',
        comment: 'Ramashish ji resolved a 5-year old boundary confusion with our neighbor in 2 hours using the official cadastral sheet.',
        verifiedBooking: true,
        isDemoData: true
      }
    ]
  },
  {
    id: 'LCP-000219',
    name: 'Birendra Kumar Jha',
    nameHi: 'बीरेन्द्र कुमार झा',
    category: 'Deed Writer',
    categoryHi: 'वरिष्ठ दस्तावेज लेखक (कातिब)',
    isPhase1Active: true,
    rating: 4.8,
    reviewCount: 88,
    experience: 22,
    district: 'Muzaffarpur',
    districtHi: 'मुजफ्फरपुर',
    block: 'Musahari',
    office: 'Muzaffarpur Registry Office',
    officeHi: 'मुजफ्फरपुर रजिस्ट्री कार्यालय',
    officeType: 'Registry Office',
    chamberAddress: 'Shed No. 7, Main Registry Campus, Club Road, Muzaffarpur',
    verificationStatus: 'Verified',
    verified: true,
    licenseNumber: 'MZP/KATIB/2004/219',
    licenseAuthority: 'District Registration Office, Muzaffarpur',
    fee: 1800,
    tokenFee: 100,
    services: [
      'Sale Deed (Kewala)',
      'Exchange Deed (Badlainama)',
      'Gift Deed (Hibanama)',
      'Lease Deed Drafting',
      'Chauhaddi Verification'
    ],
    servicesHi: [
      'केवाला (बिक्री पत्र)',
      'बदलैननामा (जमीन अदला-बदली)',
      'हिबानामा',
      'लीज पट्टा विलेख',
      'चौहद्दी सत्यापन'
    ],
    languages: ['Hindi', 'Maithili', 'English'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    about: '22+ years seasoned Katib in Muzaffarpur district. Expert in drafting Kewala deeds for urban residential plots, MVR calculation, and token filing at Muzaffarpur Registry Office.',
    aboutHi: 'मुजफ्फरपुर जिले में 22+ वर्षों के अनुभवी कातिब। आवासीय एवं व्यावसायिक प्लॉटों का केवाला लेखन और त्वरित टोकन निबंधन।',
    phone: '+91 94318 66201',
    whatsapp: '+91 94318 66201',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlots: ['10:00 AM', '12:00 PM', '02:30 PM', '04:30 PM'],
    totalCasesCompleted: 2840,
    isDemoData: true,
    reviews: [
      {
        id: 'r4',
        userName: 'Abhishek Mishra (Demo User)',
        userLocation: 'Kanti, Muzaffarpur',
        rating: 5,
        date: '04 Aug 2026',
        comment: 'Very thorough with Khatiyan entries and legal clauses. No clerical error on the final stamp.',
        verifiedBooking: true,
        isDemoData: true
      }
    ]
  },
  {
    id: 'LCP-000552',
    name: 'Amin Kameshwar Sahni',
    nameHi: 'अमीन कामेश्वर सहनी',
    category: 'Amin / Land Surveyor',
    categoryHi: 'राजस्व अमीन (भूमि सर्वेयर)',
    isPhase1Active: true,
    rating: 4.9,
    reviewCount: 68,
    experience: 15,
    district: 'Muzaffarpur',
    districtHi: 'मुजफ्फरपुर',
    block: 'Kanti',
    office: 'Kanti',
    officeHi: 'कांटी अंचल कार्यालय',
    officeType: 'Block Office',
    chamberAddress: 'Near Kanti Block Circle Office, Muzaffarpur',
    verificationStatus: 'Verified',
    verified: true,
    licenseNumber: 'BHR/AMIN/MZP/5521',
    licenseAuthority: 'Revenue Department, Bihar',
    fee: 2000,
    tokenFee: 100,
    services: [
      'Land Measurement in Katha/Dhur',
      'Boundary Demarcation (Hadbandi)',
      'Revisional Map Naksha Matching',
      'Agricultural Partition Demarcation'
    ],
    servicesHi: [
      'कट्ठा/धूर/डिसमिल जमीन नापी',
      'हदबंदी एवं सीमा पिलर',
      'राजस्व नक्शा मिलान',
      'कृषि भूमि बंटवारा पैमाइश'
    ],
    languages: ['Hindi', 'Bajjika'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    about: 'Experienced revenue amin specializing in Kanti, Kurhani, and Musahari blocks of Muzaffarpur. Reliable physical plot measurement using Gunter chain and GPS coordinates.',
    aboutHi: 'कांटी और मुसहरी प्रखंड में विश्वसनीय अमीन पैमाइश। जरीब एवं जीपीएस द्वारा सटीक सीमांकन।',
    phone: '+91 97714 33290',
    whatsapp: '+91 97714 33290',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlots: ['08:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
    totalCasesCompleted: 1100,
    isDemoData: true,
    reviews: [
      {
        id: 'r5',
        userName: 'Deepak Kumar (Demo User)',
        userLocation: 'Kanti, Muzaffarpur',
        rating: 5,
        date: '08 Aug 2026',
        comment: 'Accurate boundary marking and fast report. Very satisfied with the survey.',
        verifiedBooking: true,
        isDemoData: true
      }
    ]
  },
  {
    id: 'LCP-000391',
    name: 'Mohammad Tariq Anwar',
    nameHi: 'मोहम्मद तारिक अनवर',
    category: 'Deed Writer',
    categoryHi: 'दस्तावेज लेखक (कातिब)',
    isPhase1Active: true,
    rating: 4.8,
    reviewCount: 76,
    experience: 15,
    district: 'Gaya',
    districtHi: 'गया',
    block: 'Gaya Town',
    office: 'Gaya Sadar Registry Office',
    officeHi: 'गया सदर रजिस्ट्री कार्यालय',
    officeType: 'Registry Office',
    chamberAddress: 'Near Gaya Collectorate, Registry Campus, Gaya',
    verificationStatus: 'Verified',
    verified: true,
    licenseNumber: 'GAY/DW/2011/391',
    licenseAuthority: 'Registration Department, Gaya',
    fee: 1900,
    tokenFee: 100,
    services: [
      'Sale Deed (Kewala)',
      'Hibanama (Gift Deed)',
      'Waqf & Trust Drafting',
      'Mortgage Deed Drafting'
    ],
    servicesHi: [
      'केवाला (बिक्री पत्र)',
      'हिबानामा (दान पत्र)',
      'वक्फ एवं ट्रस्ट विलेख',
      'बंधक पत्र मसौदा'
    ],
    languages: ['Hindi', 'Urdu', 'Magahi', 'English'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    about: 'Licensed Deed Writer in Gaya district with in-depth knowledge of urban Gaya, Bodhgaya circle rates, and agricultural land transfers.',
    aboutHi: 'गया जिले में लाइसेंस प्राप्त कातिब। गया शहर, बोधगया और ग्रामीण अंचलों की भूमि रजिस्ट्री के दक्ष लेखक।',
    phone: '+91 94314 55102',
    whatsapp: '+91 94314 55102',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlots: ['10:30 AM', '12:30 PM', '02:30 PM', '04:30 PM'],
    totalCasesCompleted: 1670,
    isDemoData: true,
    reviews: [
      {
        id: 'r6',
        userName: 'Md. Rizwan (Demo User)',
        userLocation: 'Bodhgaya, Gaya',
        rating: 5,
        date: '01 Aug 2026',
        comment: 'Very polite and highly knowledgeable regarding gift deed exemptions in Bihar.',
        verifiedBooking: true,
        isDemoData: true
      }
    ]
  },
  {
    id: 'LCP-000410',
    name: 'Amin Ganeshwar Sharma',
    nameHi: 'अमीन गणेश्वर शर्मा',
    category: 'Amin / Land Surveyor',
    categoryHi: 'वरिष्ठ अमीन (राजस्व पैमाइश)',
    isPhase1Active: true,
    rating: 4.8,
    reviewCount: 94,
    experience: 24,
    district: 'Bhagalpur',
    districtHi: 'भागलपुर',
    block: 'Kahalgaon',
    office: 'Kahalgaon',
    officeHi: 'कहलगांव अंचल कार्यालय',
    officeType: 'Block Office',
    chamberAddress: 'Near Kahalgaon Anchal Adhikari Office, Bhagalpur',
    verificationStatus: 'Verified',
    verified: true,
    licenseNumber: 'BHR/AMIN/BGP/4102',
    licenseAuthority: 'Revenue Dept, Bhagalpur',
    fee: 2000,
    tokenFee: 100,
    services: [
      'Land Measurement in Dhur/Katha',
      'Boundary Pillar Fixing (Seemankan)',
      'Cadastral & Revisional Naksha Match',
      'Agricultural Field Division'
    ],
    servicesHi: [
      'धूर/कट्ठा/डिसमिल पैमाइश',
      'हदबंदी पिलर स्थापन',
      'कैडस्ट्रल व रिविजनल नक्शा मिलान',
      'कृषि भूमि बंटवारा नापी'
    ],
    languages: ['Hindi', 'Angika'],
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    about: '24 years of experience as Anchal Amin in Kahalgaon and Pirpainti. Unmatched precision in resolving historic village boundary conflicts.',
    aboutHi: 'कहलगांव और पीरपैंती में 24 वर्षों का अमीन कार्य। पुराने से पुराने नक्शे और जरीब पैमाइश में शत-प्रतिशत सटीकता।',
    phone: '+91 94300 22918',
    whatsapp: '+91 94300 22918',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timeSlots: ['07:00 AM', '09:00 AM', '11:00 AM', '02:30 PM'],
    totalCasesCompleted: 3400,
    isDemoData: true,
    reviews: [
      {
        id: 'r7',
        userName: 'Tribhuvan Singh (Demo User)',
        userLocation: 'Kahalgaon, Bhagalpur',
        rating: 5,
        date: '25 Jul 2026',
        comment: 'Ganeshwar Amin measured our 4 bigha mango orchard with utmost honesty and village consensus.',
        verifiedBooking: true,
        isDemoData: true
      }
    ]
  },
  {
    id: 'LCP-000089',
    name: 'Sanjeev Kumar Sinha',
    nameHi: 'संजीव कुमार सिन्हा',
    category: 'Deed Writer',
    categoryHi: 'दस्तावेज लेखक (कातिब)',
    isPhase1Active: true,
    rating: 4.9,
    reviewCount: 105,
    experience: 18,
    district: 'Patna',
    districtHi: 'पटना',
    block: 'Patna Sadar',
    office: 'Patna Sadar Registry Office',
    officeHi: 'पटना सदर रजिस्ट्री कार्यालय',
    officeType: 'Registry Office',
    chamberAddress: 'Shed #3, Sadar Registry Campus, Collectorate Ghat Road, Patna',
    verificationStatus: 'Verified',
    verified: true,
    licenseNumber: 'PAT/DW/2006/89',
    licenseAuthority: 'District Registration Office, Patna',
    fee: 2500,
    tokenFee: 100,
    services: [
      'Sale Deed (Kewala)',
      'Flat Registry (Apartment Deed)',
      'Gift Deed (Hibanama)',
      'Commercial Land Registry',
      'Registry Token & e-Challan'
    ],
    servicesHi: [
      'केवाला (बिक्री पत्र)',
      'अपार्टमेंट / फ्लैट रजिस्ट्री',
      'हिबानामा',
      'व्यावसायिक भूमि विलेख',
      'रजिस्ट्री टोकन एवं ई-चालान'
    ],
    languages: ['Hindi', 'English', 'Bhojpuri'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    about: 'Senior Patna Sadar Katib with extensive expertise in commercial and high-value residential deed preparation across Patna city.',
    aboutHi: 'पटना सदर में 18 वर्षों के अनुभवी कातिब। फ्लैट व जमीन रजिस्ट्री के आधिकारिक कागजात में विशेषज्ञता।',
    phone: '+91 94310 99823',
    whatsapp: '+91 94310 99823',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlots: ['10:30 AM', '12:30 PM', '02:30 PM', '04:30 PM'],
    totalCasesCompleted: 3900,
    isDemoData: true,
    reviews: [
      {
        id: 'r8',
        userName: 'Rajan Gupta (Demo User)',
        userLocation: 'Boring Road, Patna',
        rating: 5,
        date: '14 Aug 2026',
        comment: 'Handled our 3BHK flat registry at Sadar Registry office seamlessly. Zero delays.',
        verifiedBooking: true,
        isDemoData: true
      }
    ]
  },
  {
    id: 'LCP-000784',
    name: 'Amin Binod Kumar Paswan',
    nameHi: 'अमीन बिनोद कुमार पासवान',
    category: 'Amin / Land Surveyor',
    categoryHi: 'अमीन / भू-सर्वेयर',
    isPhase1Active: true,
    rating: 4.7,
    reviewCount: 42,
    experience: 12,
    district: 'Gaya',
    districtHi: 'गया',
    block: 'Bodhgaya',
    office: 'Bodhgaya',
    officeHi: 'बोधगया अंचल कार्यालय',
    officeType: 'Block Office',
    chamberAddress: 'Near Bodhgaya Block Office, Gaya',
    verificationStatus: 'Verified',
    verified: true,
    licenseNumber: 'BHR/AMIN/GAY/7841',
    licenseAuthority: 'District Revenue Office, Gaya',
    fee: 1800,
    tokenFee: 100,
    services: [
      'Plot Demarcation & Survey',
      'Boundary Pillar Fixing',
      'Katha & Decimal Conversion',
      'Revenue Naksha Verification'
    ],
    servicesHi: [
      'प्लॉट सीमांकन व पैमाइश',
      'सीमा पिलर स्थापन',
      'कट्ठा व डिसमिल रूपांतरण',
      'राजस्व नक्शा मिलान'
    ],
    languages: ['Hindi', 'Magahi'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    about: 'Specialized land surveyor serving Bodhgaya, Gaya Town, and Sherghati. Accurate GPS mapping and panchnama preparation.',
    aboutHi: 'बोधगया और गया क्षेत्र के दक्ष भू-सर्वेयर। जीपीएस द्वारा सटीक सीमांकन।',
    phone: '+91 93345 88120',
    whatsapp: '+91 93345 88120',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlots: ['08:00 AM', '10:00 AM', '02:00 PM', '04:30 PM'],
    totalCasesCompleted: 980,
    isDemoData: true,
    reviews: [
      {
        id: 'r9',
        userName: 'Pankaj Kumar (Demo User)',
        userLocation: 'Bodhgaya',
        rating: 5,
        date: '10 Aug 2026',
        comment: 'Punctual and very detailed measurement with clear maps.',
        verifiedBooking: true,
        isDemoData: true
      }
    ]
  }
];

export const initialBookings: Booking[] = [
  {
    id: 'b-101',
    bookingNumber: 'LC-BHR-2026-8842',
    userId: 'LCU-001248',
    clientName: 'Vivek Ranjan',
    clientPhone: '+91 98765 43210',
    clientWhatsapp: '+91 98765 43210',
    clientEmail: 'vivek.ranjan@example.com',
    professionalId: 'LCP-000492',
    professionalName: 'Rajesh Kumar Singh',
    professionalCategory: 'Deed Writer (Katib)',
    professionalPhone: '+91 94312 88410',
    professionalOffice: 'Bhagalpur Sadar Registry Office',
    district: 'Bhagalpur',
    location: 'Bhagalpur Sadar Registry Office',
    serviceSelected: 'Sale Deed (Kewala / रजिस्ट्री)',
    appointmentDate: '2026-08-20',
    appointmentTime: '11:30 AM',
    plotDetails: {
      khataNumber: '44',
      khesraNumber: '112/A',
      mauza: 'Sabour',
      thanaNumber: '184',
      areaSize: '3.5 Katha'
    },
    requirementNote: 'Drafting sale deed for ancestral agricultural plot transfer with seller chauhaddi verification.',
    professionalFee: 2000,
    tokenFee: 100,
    tokenPaid: 100,
    remainingAtOffice: 1900,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    transactionId: 'UPI/2026/8931124401',
    createdAt: '2026-08-16T14:30:00Z',
    isDemoData: true
  },
  {
    id: 'b-102',
    bookingNumber: 'LC-BHR-2026-9104',
    userId: 'LCU-001248',
    clientName: 'Vivek Ranjan',
    clientPhone: '+91 98765 43210',
    clientWhatsapp: '+91 98765 43210',
    clientEmail: 'vivek.ranjan@example.com',
    professionalId: 'LCP-000987',
    professionalName: 'Amin Ramashish Yadav',
    professionalCategory: 'Amin / Land Surveyor',
    professionalPhone: '+91 94702 11984',
    professionalOffice: 'Danapur Block Office',
    district: 'Patna',
    location: 'Danapur',
    serviceSelected: 'Land Measurement in Katha/Dhur/Decimal',
    appointmentDate: '2026-08-22',
    appointmentTime: '09:00 AM',
    plotDetails: {
      khataNumber: '108',
      khesraNumber: '405',
      mauza: 'Khagaul',
      thanaNumber: '210',
      areaSize: '6 Katha'
    },
    requirementNote: 'Demarcating boundary pillars before residential construction.',
    professionalFee: 2200,
    tokenFee: 100,
    tokenPaid: 100,
    remainingAtOffice: 2100,
    status: 'PENDING_PROFESSIONAL',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    transactionId: 'UPI/2026/8931129944',
    createdAt: '2026-08-17T07:15:00Z',
    isDemoData: true
  },
  {
    id: 'b-103',
    bookingNumber: 'LC-BHR-2026-7731',
    userId: 'LCU-001248',
    clientName: 'Vivek Ranjan',
    clientPhone: '+91 98765 43210',
    clientWhatsapp: '+91 98765 43210',
    professionalId: 'LCP-000219',
    professionalName: 'Birendra Kumar Jha',
    professionalCategory: 'Deed Writer',
    professionalPhone: '+91 94318 66201',
    professionalOffice: 'Muzaffarpur Registry Office',
    district: 'Muzaffarpur',
    location: 'Muzaffarpur Registry Office',
    serviceSelected: 'Gift Deed (Hibanama / दान पत्र)',
    appointmentDate: '2026-08-24',
    appointmentTime: '10:00 AM',
    proposedAlternativeDate: '2026-08-25',
    proposedAlternativeTime: '02:30 PM',
    proposedAlternativeNote: 'Registry token slots are booked in morning. 2:30 PM on 25th is ideal.',
    plotDetails: {
      khataNumber: '29',
      khesraNumber: '88',
      mauza: 'Musahari',
      thanaNumber: '142',
      areaSize: '2 Katha'
    },
    requirementNote: 'Transferring plot to daughter under blood relation gift deed.',
    professionalFee: 1800,
    tokenFee: 100,
    tokenPaid: 100,
    remainingAtOffice: 1700,
    status: 'TIME_CHANGE_REQUESTED',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    transactionId: 'UPI/2026/8931121102',
    createdAt: '2026-08-16T18:00:00Z',
    isDemoData: true
  }
];

export const mockContactUnlocks: ContactUnlock[] = [
  {
    id: 'cu-01',
    userId: 'LCU-001248',
    professionalId: 'LCP-000492',
    professionalName: 'Rajesh Kumar Singh',
    professionalCategory: 'Deed Writer',
    amount: 100,
    paymentStatus: 'PAID',
    unlockedPhone: '+91 94312 88410',
    unlockedWhatsapp: '+91 94312 88410',
    chamberAddress: 'Shed No. 14, Near Sub-Registrar Gate, Registry Office Campus, Bhagalpur',
    unlockedAt: '2026-08-16T14:25:00Z',
    transactionId: 'UPI/LCU/2026/0014'
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'ld-1',
    clientName: 'Sanjay Kumar Poddar',
    clientPhone: '+91 98350 XXXXX',
    district: 'Bhagalpur',
    location: 'Bhagalpur Sadar',
    service: 'Sale Deed Drafting (Kewala)',
    date: '2026-08-17',
    status: 'New'
  },
  {
    id: 'ld-2',
    clientName: 'Rameshwar Roy',
    clientPhone: '+91 94310 XXXXX',
    district: 'Bhagalpur',
    location: 'Kahalgaon',
    service: 'Batwarinama (Family Partition)',
    date: '2026-08-16',
    status: 'Contacted'
  }
];

export const mockWhatsAppMessages: WhatsAppMessage[] = [
  {
    id: 'wa-msg-1',
    toPhone: '+91 94312 88410',
    recipientName: 'Rajesh Kumar Singh',
    recipientRole: 'professional',
    templateName: 'booking_request_pro_alert',
    title: '🟢 NEW LEGALCURE BOOKING REQUEST',
    body: `*NEW LEGALCURE BOOKING REQUEST*\n\n*Client:* Vivek Ranjan\n*Service:* Sale Deed (Kewala / रजिस्ट्री)\n*District:* Bhagalpur\n*Location:* Bhagalpur Sadar Registry Office\n*Date:* 20 Aug 2026 | *Time:* 11:30 AM\n*Plot:* Khata 44, Khesra 112/A (Sabour)\n*Token Paid:* ₹100\n\nPlease respond within 2 hours:`,
    timestamp: '2026-08-16T14:31:00Z',
    status: 'delivered',
    actions: [
      { label: '✅ Accept Booking', actionKey: 'accept', type: 'primary' },
      { label: '⏰ Suggest Time', actionKey: 'suggest_time', type: 'secondary' },
      { label: '❌ Reject', actionKey: 'reject', type: 'danger' }
    ]
  },
  {
    id: 'wa-msg-2',
    toPhone: '+91 98765 43210',
    recipientName: 'Vivek Ranjan',
    recipientRole: 'customer',
    templateName: 'booking_confirmed_user',
    title: '✅ BOOKING CONFIRMED - LEGALCURE',
    body: `*BOOKING CONFIRMED - LEGALCURE*\n\n*Booking ID:* LC-BHR-2026-8842\n*Professional:* Rajesh Kumar Singh (Deed Writer)\n*Date:* 20 Aug 2026 at 11:30 AM\n*Chamber:* Shed No. 14, Near Sub-Registrar Gate, Bhagalpur Registry Office\n\nRemaining ₹1,900 to be settled at office after deed inspection.`,
    timestamp: '2026-08-16T14:35:00Z',
    status: 'read'
  }
];
