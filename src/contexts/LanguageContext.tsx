
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi' | 'fr' | 'es';

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Common translations used throughout the application
export const translations: Translations = {
  // Navbar translations
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
  dashboard: {
    en: 'Dashboard',
    vi: 'Bảng điều khiển',
    fr: 'Tableau de bord',
    es: 'Panel de control',
  },
  login: {
    en: 'Login',
    vi: 'Đăng nhập',
    fr: 'Connexion',
    es: 'Iniciar sesión',
  },
  register: {
    en: 'Register',
    vi: 'Đăng ký',
    fr: 'S\'inscrire',
    es: 'Registrarse',
  },
  searchPlaceholder: {
    en: 'Search forums, courses...',
    vi: 'Tìm kiếm diễn đàn, khóa học...',
    fr: 'Rechercher des forums, des cours...',
    es: 'Buscar foros, cursos...',
  },
  
  // Footer translations
  platformTitle: {
    en: 'Platform',
    vi: 'Nền tảng',
    fr: 'Plateforme',
    es: 'Plataforma',
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
  
  // Homepage translations
  welcomeTag: {
    en: 'Welcome to EduForum Connect',
    vi: 'Chào mừng đến với EduForum Connect',
    fr: 'Bienvenue sur EduForum Connect',
    es: 'Bienvenido a EduForum Connect',
  },
  heroTitle1: {
    en: 'Learn, Share, and Grow',
    vi: 'Học hỏi, Chia sẻ và Phát triển',
    fr: 'Apprendre, Partager et Évoluer',
    es: 'Aprende, Comparte y Crece',
  },
  heroTitle2: {
    en: 'Together',
    vi: 'Cùng nhau',
    fr: 'Ensemble',
    es: 'Juntos',
  },
  heroSubtitle: {
    en: 'An interactive platform for students and teachers to collaborate, share knowledge, and enhance the learning experience.',
    vi: 'Một nền tảng tương tác cho học sinh và giáo viên để cộng tác, chia sẻ kiến thức và nâng cao trải nghiệm học tập.',
    fr: 'Une plateforme interactive permettant aux étudiants et aux enseignants de collaborer, de partager des connaissances et d\'améliorer l\'expérience d\'apprentissage.',
    es: 'Una plataforma interactiva para que estudiantes y profesores colaboren, compartan conocimientos y mejoren la experiencia de aprendizaje.',
  },
  getStarted: {
    en: 'Get Started',
    vi: 'Bắt đầu',
    fr: 'Commencer',
    es: 'Comenzar',
  },
  exploreCourses: {
    en: 'Explore Courses',
    vi: 'Khám phá khóa học',
    fr: 'Explorer les cours',
    es: 'Explorar cursos',
  },
  activeUsers: {
    en: 'Active Users',
    vi: 'Người dùng hoạt động',
    fr: 'Utilisateurs actifs',
    es: 'Usuarios activos',
  },
  forumPosts: {
    en: 'Forum Posts',
    vi: 'Bài đăng diễn đàn',
    fr: 'Messages du forum',
    es: 'Publicaciones en el foro',
  },
  satisfaction: {
    en: 'Satisfaction',
    vi: 'Sự hài lòng',
    fr: 'Satisfaction',
    es: 'Satisfacción',
  },
  whyChoose: {
    en: 'Why Choose EduForum Connect',
    vi: 'Tại sao chọn EduForum Connect',
    fr: 'Pourquoi choisir EduForum Connect',
    es: '¿Por qué elegir EduForum Connect?',
  },
  whyChooseSubtitle: {
    en: 'A comprehensive platform designed to enhance your educational journey through collaboration, structured learning, and real-time interaction.',
    vi: 'Một nền tảng toàn diện được thiết kế để nâng cao hành trình giáo dục của bạn thông qua hợp tác, học tập có cấu trúc và tương tác thời gian thực.',
    fr: 'Une plateforme complète conçue pour améliorer votre parcours éducatif grâce à la collaboration, à l\'apprentissage structuré et à l\'interaction en temps réel.',
    es: 'Una plataforma integral diseñada para mejorar tu viaje educativo a través de la colaboración, el aprendizaje estructurado y la interacción en tiempo real.',
  },
  interactiveForums: {
    en: 'Interactive Forums',
    vi: 'Diễn đàn tương tác',
    fr: 'Forums interactifs',
    es: 'Foros interactivos',
  },
  interactiveForumsDesc: {
    en: 'Engage in discussions, ask questions, and share knowledge with peers and instructors in a structured environment.',
    vi: 'Tham gia thảo luận, đặt câu hỏi và chia sẻ kiến thức với bạn bè và giáo viên trong môi trường có cấu trúc.',
    fr: 'Participez à des discussions, posez des questions et partagez des connaissances avec vos pairs et vos instructeurs dans un environnement structuré.',
    es: 'Participa en discusiones, haz preguntas y comparte conocimientos con compañeros e instructores en un entorno estructurado.',
  },
  structuredCourses: {
    en: 'Structured Courses',
    vi: 'Khóa học có cấu trúc',
    fr: 'Cours structurés',
    es: 'Cursos estructurados',
  },
  structuredCoursesDesc: {
    en: 'Access comprehensive courses with lessons, exercises, and assessments to track your learning progress.',
    vi: 'Truy cập các khóa học toàn diện với bài học, bài tập và đánh giá để theo dõi tiến trình học tập của bạn.',
    fr: 'Accédez à des cours complets avec des leçons, des exercices et des évaluations pour suivre votre progression d\'apprentissage.',
    es: 'Accede a cursos completos con lecciones, ejercicios y evaluaciones para seguir tu progreso de aprendizaje.',
  },
  teacherSupport: {
    en: 'Teacher Support',
    vi: 'Hỗ trợ giáo viên',
    fr: 'Soutien des enseignants',
    es: 'Apoyo del profesor',
  },
  teacherSupportDesc: {
    en: 'Get direct assistance and guidance from qualified teachers who can monitor your progress and provide feedback.',
    vi: 'Nhận hỗ trợ và hướng dẫn trực tiếp từ các giáo viên có trình độ có thể theo dõi tiến trình của bạn và cung cấp phản hồi.',
    fr: 'Obtenez une assistance et des conseils directs de la part d\'enseignants qualifiés qui peuvent suivre vos progrès et vous fournir des commentaires.',
    es: 'Obtén asistencia directa y orientación de profesores calificados que pueden monitorear tu progreso y proporcionar retroalimentación.',
  },
  popularForums: {
    en: 'Popular Forums',
    vi: 'Diễn đàn phổ biến',
    fr: 'Forums populaires',
    es: 'Foros populares',
  },
  viewAll: {
    en: 'View All',
    vi: 'Xem tất cả',
    fr: 'Voir tout',
    es: 'Ver todo',
  },
  featuredCourses: {
    en: 'Featured Courses',
    vi: 'Khóa học nổi bật',
    fr: 'Cours en vedette',
    es: 'Cursos destacados',
  },
  readyToStart: {
    en: 'Ready to Start Learning?',
    vi: 'Sẵn sàng bắt đầu học?',
    fr: 'Prêt à commencer à apprendre?',
    es: '¿Listo para empezar a aprender?',
  },
  readyToStartSubtitle: {
    en: 'Join our community of learners and teachers to enhance your educational journey today.',
    vi: 'Tham gia cộng đồng người học và giáo viên để nâng cao hành trình giáo dục của bạn ngay hôm nay.',
    fr: 'Rejoignez notre communauté d\'apprenants et d\'enseignants pour améliorer votre parcours éducatif dès aujourd\'hui.',
    es: 'Únete a nuestra comunidad de estudiantes y profesores para mejorar tu viaje educativo hoy.',
  },
  createAccount: {
    en: 'Create Account',
    vi: 'Tạo tài khoản',
    fr: 'Créer un compte',
    es: 'Crear cuenta',
  },
  
  // Login page
  welcomeBack: {
    en: 'Welcome Back',
    vi: 'Chào mừng trở lại',
    fr: 'Bienvenue à nouveau',
    es: 'Bienvenido de nuevo',
  },
  signInToYourAccount: {
    en: 'Sign in to your account to continue',
    vi: 'Đăng nhập vào tài khoản của bạn để tiếp tục',
    fr: 'Connectez-vous à votre compte pour continuer',
    es: 'Inicia sesión en tu cuenta para continuar',
  },
  email: {
    en: 'Email',
    vi: 'Email',
    fr: 'Email',
    es: 'Correo electrónico',
  },
  password: {
    en: 'Password',
    vi: 'Mật khẩu',
    fr: 'Mot de passe',
    es: 'Contraseña',
  },
  enterYourEmail: {
    en: 'Enter your email',
    vi: 'Nhập email của bạn',
    fr: 'Entrez votre email',
    es: 'Ingresa tu correo electrónico',
  },
  enterYourPassword: {
    en: 'Enter your password',
    vi: 'Nhập mật khẩu của bạn',
    fr: 'Entrez votre mot de passe',
    es: 'Ingresa tu contraseña',
  },
  forgotPassword: {
    en: 'Forgot password?',
    vi: 'Quên mật khẩu?',
    fr: 'Mot de passe oublié?',
    es: '¿Olvidaste tu contraseña?',
  },
  rememberMe: {
    en: 'Remember me for 30 days',
    vi: 'Ghi nhớ tôi trong 30 ngày',
    fr: 'Se souvenir de moi pendant 30 jours',
    es: 'Recuérdame durante 30 días',
  },
  signIn: {
    en: 'Sign In',
    vi: 'Đăng nhập',
    fr: 'Se connecter',
    es: 'Iniciar sesión',
  },
  dontHaveAccount: {
    en: 'Don\'t have an account?',
    vi: 'Chưa có tài khoản?',
    fr: 'Vous n\'avez pas de compte?',
    es: '¿No tienes una cuenta?',
  },
  signUp: {
    en: 'Sign up',
    vi: 'Đăng ký',
    fr: 'S\'inscrire',
    es: 'Registrarse',
  },
  
  // Forgot password page
  resetPassword: {
    en: 'Reset Password',
    vi: 'Đặt lại mật khẩu',
    fr: 'Réinitialiser le mot de passe',
    es: 'Restablecer contraseña',
  },
  resetPasswordInstructions: {
    en: 'Enter your email to receive a password reset link',
    vi: 'Nhập email của bạn để nhận liên kết đặt lại mật khẩu',
    fr: 'Entrez votre email pour recevoir un lien de réinitialisation de mot de passe',
    es: 'Ingresa tu correo electrónico para recibir un enlace de restablecimiento de contraseña',
  },
  checkEmailForInstructions: {
    en: 'Check your email for reset instructions',
    vi: 'Kiểm tra email của bạn để biết hướng dẫn đặt lại',
    fr: 'Vérifiez votre email pour les instructions de réinitialisation',
    es: 'Revisa tu correo electrónico para obtener instrucciones de restablecimiento',
  },
  sendResetLink: {
    en: 'Send Reset Link',
    vi: 'Gửi liên kết đặt lại',
    fr: 'Envoyer le lien de réinitialisation',
    es: 'Enviar enlace de restablecimiento',
  },
  sending: {
    en: 'Sending...',
    vi: 'Đang gửi...',
    fr: 'Envoi en cours...',
    es: 'Enviando...',
  },
  backToLogin: {
    en: 'Back to login',
    vi: 'Quay lại đăng nhập',
    fr: 'Retour à la connexion',
    es: 'Volver al inicio de sesión',
  },
  resetLinkSent: {
    en: 'Reset link sent',
    vi: 'Đã gửi liên kết đặt lại',
    fr: 'Lien de réinitialisation envoyé',
    es: 'Enlace de restablecimiento enviado',
  },
  resetEmailSentDesc: {
    en: 'Please check your email for password reset instructions.',
    vi: 'Vui lòng kiểm tra email của bạn để biết hướng dẫn đặt lại mật khẩu.',
    fr: 'Veuillez vérifier votre email pour les instructions de réinitialisation du mot de passe.',
    es: 'Por favor, revisa tu correo electrónico para obtener instrucciones de restablecimiento de contraseña.',
  },
  ifAccountExists: {
    en: 'If an account exists with',
    vi: 'Nếu tài khoản tồn tại với',
    fr: 'Si un compte existe avec',
    es: 'Si existe una cuenta con',
  },
  youWillReceive: {
    en: 'you will receive a password reset link shortly.',
    vi: 'bạn sẽ sớm nhận được liên kết đặt lại mật khẩu.',
    fr: 'vous recevrez bientôt un lien de réinitialisation de mot de passe.',
    es: 'recibirás un enlace de restablecimiento de contraseña en breve.',
  },
  didntReceiveEmail: {
    en: 'Didn\'t receive an email? Check your spam folder or try again.',
    vi: 'Không nhận được email? Kiểm tra thư mục spam hoặc thử lại.',
    fr: 'Vous n\'avez pas reçu d\'email? Vérifiez votre dossier spam ou réessayez.',
    es: '¿No recibiste un correo electrónico? Revisa tu carpeta de spam o inténtalo de nuevo.',
  },
  tryAgain: {
    en: 'Try Again',
    vi: 'Thử lại',
    fr: 'Réessayer',
    es: 'Intentar de nuevo',
  },
  
  // 404 page
  pageNotFound: {
    en: 'Page Not Found',
    vi: 'Không tìm thấy trang',
    fr: 'Page non trouvée',
    es: 'Página no encontrada',
  },
  pageNotFoundDesc: {
    en: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    vi: 'Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.',
    fr: 'La page que vous recherchez a peut-être été supprimée, son nom a été modifié ou elle est temporairement indisponible.',
    es: 'Es posible que la página que estás buscando se haya eliminado, se haya cambiado de nombre o no esté disponible temporalmente.',
  },
  backToHome: {
    en: 'Back to Home',
    vi: 'Trở về trang chủ',
    fr: 'Retour à l\'accueil',
    es: 'Volver al inicio',
  },
  browseCourses: {
    en: 'Browse Courses',
    vi: 'Duyệt khóa học',
    fr: 'Parcourir les cours',
    es: 'Explorar cursos',
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
