export interface NavItem {
  id: string;
  labelEn: string;
  labelHi: string;
  view: 'home' | 'professionals' | 'how_it_works' | 'for_professionals' | 'knowledge_center' | 'support';
  path: string;
  badge?: string;
}

export const PRIMARY_NAVIGATION: NavItem[] = [
  {
    id: 'nav-home',
    labelEn: 'Home',
    labelHi: 'होम',
    view: 'home',
    path: '/'
  },
  {
    id: 'nav-find-pros',
    labelEn: 'Find Professional',
    labelHi: 'विशेषज्ञ खोजें',
    view: 'professionals',
    path: '/find-professional/'
  },
  {
    id: 'nav-how-it-works',
    labelEn: 'How It Works',
    labelHi: 'प्रक्रिया',
    view: 'how_it_works',
    path: '/how-it-works/'
  },
  {
    id: 'nav-for-pros',
    labelEn: 'For Professionals',
    labelHi: 'प्रोफेशनल्स के लिए',
    view: 'for_professionals',
    path: '/for-professionals/'
  },
  {
    id: 'nav-knowledge',
    labelEn: 'Knowledge Center',
    labelHi: 'ज्ञान केंद्र',
    view: 'knowledge_center',
    path: '/knowledge-center/'
  },
  {
    id: 'nav-support',
    labelEn: 'Support',
    labelHi: 'सहायता',
    view: 'support',
    path: '/support/'
  }
];

export const AUTH_NAVIGATION = {
  login: {
    labelEn: 'Login',
    labelHi: 'लॉगिन',
    path: '/login/'
  },
  proRegister: {
    labelEn: 'Register as Professional',
    labelHi: 'प्रोफेशनल रजिस्ट्रेशन',
    path: '/for-professionals/'
  }
};
