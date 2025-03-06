
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi' | 'fr' | 'es';

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Common translations used throughout the application
export const translations: Translations = {
  // Footer translations
  platformTitle: {
    en: 'Platform',
    vi: 'Nền tảng',
    fr: 'Plateforme',
    es: 'Plataforma',
  },
  forums: {
    en: 'Forums',
    vi: 'Diễn đàn',
    fr: 'Forums',
    es: 'Foros',
  },
  courses: {
    en: 'Courses',
    vi: 'Khóa học',
    fr: 'Cours',
    es: 'Cursos',
  },
  teachers: {
    en: 'Teachers',
    vi: 'Giáo viên',
    fr: 'Enseignants',
    es: 'Profesores',
  },
  resources: {
    en: 'Resources',
    vi: 'Tài nguyên',
    fr: 'Ressources',
    es: 'Recursos',
  },
  supportTitle: {
    en: 'Support',
    vi: 'Hỗ trợ',
    fr: 'Support',
    es: 'Soporte',
  },
  helpCenter: {
    en: 'Help Center',
    vi: 'Trung tâm trợ giúp',
    fr: 'Centre d\'aide',
    es: 'Centro de ayuda',
  },
  faq: {
    en: 'FAQ',
    vi: 'Câu hỏi thường gặp',
    fr: 'FAQ',
    es: 'Preguntas frecuentes',
  },
  contactUs: {
    en: 'Contact Us',
    vi: 'Liên hệ',
    fr: 'Contactez-nous',
    es: 'Contáctenos',
  },
  feedback: {
    en: 'Feedback',
    vi: 'Phản hồi',
    fr: 'Commentaires',
    es: 'Comentarios',
  },
  legalTitle: {
    en: 'Legal',
    vi: 'Pháp lý',
    fr: 'Mentions légales',
    es: 'Legal',
  },
  termsOfService: {
    en: 'Terms of Service',
    vi: 'Điều khoản dịch vụ',
    fr: 'Conditions d\'utilisation',
    es: 'Términos de servicio',
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    vi: 'Chính sách bảo mật',
    fr: 'Politique de confidentialité',
    es: 'Política de privacidad',
  },
  cookiePolicy: {
    en: 'Cookie Policy',
    vi: 'Chính sách cookie',
    fr: 'Politique des cookies',
    es: 'Política de cookies',
  },
  allRightsReserved: {
    en: 'All rights reserved',
    vi: 'Tất cả các quyền được bảo lưu',
    fr: 'Tous droits réservés',
    es: 'Todos los derechos reservados',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    if (translations[key]?.[language]) {
      return translations[key][language];
    }
    return key; // Fallback to key if translation is not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
