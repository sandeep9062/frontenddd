// app/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from 'i18next-browser-languagedetector';


export const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        greeting: "hello,welcome",
        nav: {
          language: "Language",
          home: "Home",
          consult: "Consult",
          dentalClinics: "Dental Clinics",
          dentalScans: "Dental Scans",
          bloodTest: "Blood Test",
          fixMyTeeth: "Fix My Teeth",
          blogs: "Blogs",
          support: "Support",
          login: "Login",
          register: "Register",
          logout: "Logout",
          profile: "Profile"
        },
        common: {
          phoneSupport: "Phone Support",
          liveChat: "Live Chat",
          emailSupport: "Email Support",
          emergencyCare: "Emergency Care",
          speakDirectly: "Speak directly with our support team",
          getInstantHelp: "Get instant help from our team",
          sendQuestions: "Send us your questions",
          emergencySupport: "24/7 dental emergency support",
          startChat: "Start Chat",
          emergencyLine: "Emergency Line"
        },
        hero: {
          title: "Smile Confidently with India's Top Dental Tourism Clinics",
          subtitle: "Affordable, world-class dental care with personalized travel assistance. Trusted by thousands of international patients.",
          exploreClinics: "Explore Dental Clinics",
          bookConsultation: "Book Online Video Consultation"
        },
        features: {
          instantConsultation: "Instant Video Consultation",
          instantConsultationDesc: "Consult dentist online from anywhere.",
          trustedClinics: "Trusted Dental Clinic Near You",
          trustedClinicsDesc: "Book appointments with leading dental clinics.",
          dentalScans: "3D Dental Scan Near You",
          dentalScansDesc: "Locate CBCT & OPG dental scan centers.",
          bloodTest: "Blood Test Near You",
          bloodTestDesc: "Book a blood test at a lab close to you."
        },
        whyIndia: {
          title: "Why India is the Global Hub for Dental Tourism?",
          affordableTreatments: "Affordable Treatments",
          affordableTreatmentsDesc: "Save up to 70% on world-class dental treatments.",
          expertDentists: "Expert Dentists You can Trust",
          expertDentistsDesc: "Precision, passion and a perfect smile — lead by experts.",
          tourismDental: "Tourism + Dental Treatment",
          tourismDentalDesc: "Recover your smile & joy while exploring India's beauty.",
          topClinics: "Top Dental Clinics Across India",
          topClinicsDesc: "Top rated dental clinics across India for expert care & trusted smile."
        },
        testimonials: {
          title: "What Clients Say"
        },
        footer: {
          forPatients: "For Patients",
          forDentist: "For Dentist",
          forCBCT: "For CBCT & OPG Centre",
          forBloodTest: "For Blood Test Lab",
          forDentalEssentials: "For Dental Essentials",
          more: "More",
          searchDentist: "Search Dentist",
          searchClinics: "Search Dental Clinics",
          consultNow: "Consult Now",
          refundPolicy: "Refund Policy",
          profile: "Profile",
          helpCenter: "Help & Center",
          privacyPolicy: "Privacy Policy",
          cookiePolicy: "Cookie Policy",
          terms: "T&C",
          contactUs: "Contact Us",
          blogs: "Blogs"
        },
        consult: {
          title: "Skip the trip! Book an online Dental Consultation",
          subtitle: "Private Consultation + Audio calls + Video calls",
          price: "Starts at just Rs 399/- / USD $ 4.80/-",
          loading: "Loading...",
          getStarted: "Get Started",
          bookNow: "Book Now"
        },
        contact: {
          title: "Contact Us",
          getInTouch: "Get in Touch",
          name: "Name",
          email: "Email",
          message: "Message",
          submit: "Submit",
          thankYou: "Thank you! Your message has been sent.",
          phone: "Phone",
          address: "Address",
          workingHours: "Working Hours"
        },
        forms: {
          patientName: "Patient name",
          phoneNumber: "Phone number",
          enterPhoneNumber: "Enter phone number",
          haveCouponCode: "Have a coupon code?",
          disclaimer: "Disclaimer:",
          disclaimerText: "I hereby declare that all the information provided is true and accurate. I understand that this is not for emergency use and agree to the terms and conditions of the consultation service.",
          finalFee: "Final Fee",
          startNow: "Start Now",
          hideForm: "Hide Form",
          treatmentPlan: "Treatment Plan & Quote in 24 Hours",
          treatmentPlanDesc: "For just ₹149/-, select your dental problems and get a detailed plan."
        },
        medicalDisclaimer: {
          generalTitle: "Medical Information Disclaimer",
          generalContent: "The information provided on this platform is for educational and informational purposes only and is not intended as medical advice. This content should not be used to diagnose, treat, cure, or prevent any medical condition. Always consult with a qualified healthcare provider before making any medical decisions or treatment plans.",
          generalWarning: "FOR INFORMATIONAL PURPOSES ONLY - NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE",
          consultationTitle: "Consultation Service Disclaimer",
          consultationContent: "Our consultation service connects you with dental professionals but does not replace in-person medical examination. The advice provided through our platform should be considered as preliminary guidance only. Final diagnosis and treatment decisions must always be made by qualified healthcare providers in appropriate clinical settings.",
          consultationWarning: "NOT FOR MEDICAL EMERGENCIES - SEEK IMMEDIATE MEDICAL ATTENTION FOR URGENT CONDITIONS",
          treatmentTitle: "Treatment Information Disclaimer",
          treatmentContent: "Treatment information, costs, and success rates presented on this platform are general estimates and may vary significantly based on individual medical conditions, chosen healthcare providers, and geographic locations. Actual treatment outcomes depend on numerous factors that can only be assessed through proper medical examination.",
          treatmentWarning: "TREATMENT OUTCOMES MAY VARY - INDIVIDUAL RESULTS NOT GUARANTEED"
        }
      },
    },
    hi: {
      translation: {
        greeting: "नमस्ते, स्वागत है",
        nav: {
          language: "भाषा",
          home: "होम",
          consult: "परामर्श",
          dentalClinics: "दंत क्लिनिक",
          dentalScans: "दंत स्कैन",
          bloodTest: "रक्त परीक्षण",
          fixMyTeeth: "मेरे दांत ठीक करें",
          blogs: "ब्लॉग",
          support: "सहायता",
          login: "लॉगिन",
          register: "रजिस्टर",
          logout: "लॉगआउट",
          profile: "प्रोफाइल"
        },
        common: {
          phoneSupport: "फोन सहायता",
          liveChat: "लाइव चैट",
          emailSupport: "ईमेल सहायता",
          emergencyCare: "आपातकालीन देखभाल",
          speakDirectly: "हमारी सहायता टीम से सीधे बात करें",
          getInstantHelp: "हमारी टीम से तुरंत मदद पाएं",
          sendQuestions: "हमें अपने सवाल भेजें",
          emergencySupport: "24/7 दंत आपातकालीन सहायता",
          startChat: "चैट शुरू करें",
          emergencyLine: "आपातकालीन लाइन"
        },
        hero: {
          title: "भारत के शीर्ष दंत पर्यटन क्लिनिक के साथ आत्मविश्वास से मुस्कुराएं",
          subtitle: "व्यक्तिगत यात्रा सहायता के साथ किफायती, विश्व स्तरीय दंत देखभाल। हजारों अंतर्राष्ट्रीय रोगियों द्वारा भरोसेमंद।",
          exploreClinics: "दंत क्लिनिक खोजें",
          bookConsultation: "ऑनलाइन वीडियो परामर्श बुक करें"
        },
        features: {
          instantConsultation: "तत्काल वीडियो परामर्श",
          instantConsultationDesc: "कहीं से भी दंत चिकित्सक से ऑनलाइन परामर्श लें।",
          trustedClinics: "आपके पास भरोसेमंद दंत क्लिनिक",
          trustedClinicsDesc: "अग्रणी दंत क्लिनिक के साथ अपॉइंटमेंट बुक करें।",
          dentalScans: "आपके पास 3D दंत स्कैन",
          dentalScansDesc: "CBCT और OPG दंत स्कैन केंद्र खोजें।",
          bloodTest: "आपके पास रक्त परीक्षण",
          bloodTestDesc: "आपके पास के लैब में रक्त परीक्षण बुक करें।"
        },
        whyIndia: {
          title: "भारत दंत पर्यटन के लिए वैश्विक केंद्र क्यों है?",
          affordableTreatments: "किफायती उपचार",
          affordableTreatmentsDesc: "विश्व स्तरीय दंत उपचार पर 70% तक बचाएं।",
          expertDentists: "विशेषज्ञ दंत चिकित्सक जिन पर आप भरोसा कर सकते हैं",
          expertDentistsDesc: "सटीकता, जुनून और एक सही मुस्कान — विशेषज्ञों द्वारा नेतृत्व।",
          tourismDental: "पर्यटन + दंत उपचार",
          tourismDentalDesc: "भारत की सुंदरता का पता लगाते हुए अपनी मुस्कान और खुशी को पुनर्प्राप्त करें।",
          topClinics: "भारत भर में शीर्ष दंत क्लिनिक",
          topClinicsDesc: "विशेषज्ञ देखभाल और भरोसेमंद मुस्कान के लिए भारत भर में शीर्ष रेटेड दंत क्लिनिक।"
        },
        testimonials: {
          title: "ग्राहक क्या कहते हैं"
        },
        footer: {
          forPatients: "रोगियों के लिए",
          forDentist: "दंत चिकित्सक के लिए",
          forCBCT: "CBCT और OPG केंद्र के लिए",
          forBloodTest: "रक्त परीक्षण लैब के लिए",
          forDentalEssentials: "दंत आवश्यकताओं के लिए",
          more: "अधिक",
          searchDentist: "दंत चिकित्सक खोजें",
          searchClinics: "दंत क्लिनिक खोजें",
          consultNow: "अभी परामर्श करें",
          refundPolicy: "रिफंड नीति",
          profile: "प्रोफाइल",
          helpCenter: "सहायता केंद्र",
          privacyPolicy: "गोपनीयता नीति",
          cookiePolicy: "कुकी नीति",
          terms: "नियम और शर्तें",
          contactUs: "हमसे संपर्क करें",
          blogs: "ब्लॉग"
        },
        consult: {
          title: "यात्रा छोड़ें! ऑनलाइन दंत परामर्श लें",
          subtitle: "निजी परामर्श + ऑडियो कॉल + वीडियो कॉल",
          price: "केवल ₹399/- / USD $ 4.80/- से शुरू",
          loading: "लोड हो रहा है...",
          getStarted: "शुरू करें",
          bookNow: "अभी बुक करें"
        },
        contact: {
          title: "हमसे संपर्क करें",
          getInTouch: "संपर्क में रहें",
          name: "नाम",
          email: "ईमेल",
          message: "संदेश",
          submit: "जमा करें",
          thankYou: "धन्यवाद! आपका संदेश भेज दिया गया है।",
          phone: "फोन",
          address: "पता",
          workingHours: "कार्य समय"
        },
        forms: {
          patientName: "रोगी का नाम",
          phoneNumber: "फोन नंबर",
          enterPhoneNumber: "फोन नंबर दर्ज करें",
          haveCouponCode: "कूपन कोड है?",
          disclaimer: "अस्वीकरण:",
          disclaimerText: "मैं यहां घोषणा करता हूं कि प्रदान की गई सभी जानकारी सत्य और सटीक है। मैं समझता हूं कि यह आपातकालीन उपयोग के लिए नहीं है और परामर्श सेवा की शर्तों और नियमों से सहमत हूं।",
          finalFee: "अंतिम शुल्क",
          startNow: "अभी शुरू करें",
          hideForm: "फॉर्म छुपाएं",
          treatmentPlan: "24 घंटे में उपचार योजना और कोटेशन",
          treatmentPlanDesc: "केवल ₹149/- में, अपनी दंत समस्याओं का चयन करें और विस्तृत योजना प्राप्त करें।"
        },
        medicalDisclaimer: {
          generalTitle: "चिकित्सा जानकारी अस्वीकरण",
          generalContent: "इस प्लेटफॉर्म पर प्रदान की गई जानकारी केवल शैक्षिक और सूचनात्मक उद्देश्यों के लिए है और चिकित्सा सलाह के रूप में अभिप्रेत नहीं है। इस सामग्री का उपयोग किसी भी चिकित्सा स्थिति का निदान, उपचार, इलाज या रोकथाम के लिए नहीं किया जाना चाहिए। कोई भी चिकित्सा निर्णय या उपचार योजना बनाने से पहले हमेशा एक योग्य स्वास्थ्य सेवा प्रदाता से परामर्श करें।",
          generalWarning: "केवल सूचनात्मक उद्देश्यों के लिए - पेशेवर चिकित्सा सलाह का विकल्प नहीं",
          consultationTitle: "परामर्श सेवा अस्वीकरण",
          consultationContent: "हमारी परामर्श सेवा आपको दंत पेशेवरों से जोड़ती है लेकिन व्यक्तिगत चिकित्सा परीक्षा का स्थान नहीं लेती। हमारे प्लेटफॉर्म के माध्यम से प्रदान की गई सलाह को केवल प्रारंभिक मार्गदर्शन माना जाना चाहिए। अंतिम निदान और उपचार निर्णय हमेशा उपयुक्त नैदानिक सेटिंग्स में योग्य स्वास्थ्य सेवा प्रदाताओं द्वारा किए जाने चाहिए।",
          consultationWarning: "चिकित्सा आपात स्थितियों के लिए नहीं - तत्काल चिकित्सा ध्यान दें",
          treatmentTitle: "उपचार जानकारी अस्वीकरण",
          treatmentContent: "इस प्लेटफॉर्म पर प्रस्तुत उपचार जानकारी, लागत और सफलता दर सामान्य अनुमान हैं और व्यक्तिगत चिकित्सा स्थितियों, चुने गए स्वास्थ्य सेवा प्रदाताओं और भौगोलिक स्थानों के आधार पर काफी भिन्न हो सकते हैं। वास्तविक उपचार परिणाम कई कारकों पर निर्भर करते हैं जिनका मूल्यांकन केवल उचित चिकित्सा परीक्षा के माध्यम से किया जा सकता है।",
          treatmentWarning: "उपचार परिणाम भिन्न हो सकते हैं - व्यक्तिगत परिणाम गारंटी नहीं"
        }
      },
    },
    fr: {
      translation: {
        greeting: "bonjour,bienvenue",
        nav: {
          language: "Langue",
          home: "Accueil",
          consult: "Consultation",
          dentalClinics: "Cliniques Dentaires",
          dentalScans: "Scans Dentaires",
          bloodTest: "Test Sanguin",
          fixMyTeeth: "Réparer Mes Dents",
          blogs: "Blogs",
          support: "Support",
          login: "Connexion",
          register: "S'inscrire",
          logout: "Déconnexion",
          profile: "Profil"
        },
        common: {
          phoneSupport: "Support Téléphonique",
          liveChat: "Chat en Direct",
          emailSupport: "Support Email",
          emergencyCare: "Soins d'Urgence",
          speakDirectly: "Parlez directement avec notre équipe de support",
          getInstantHelp: "Obtenez une aide instantanée de notre équipe",
          sendQuestions: "Envoyez-nous vos questions",
          emergencySupport: "Support dentaire d'urgence 24/7",
          startChat: "Commencer le Chat",
          emergencyLine: "Ligne d'Urgence"
        },
        hero: {
          title: "Souriez avec confiance avec les meilleures cliniques de tourisme dentaire d'Inde",
          subtitle: "Soins dentaires de classe mondiale abordables avec assistance voyage personnalisée. Fait confiance par des milliers de patients internationaux.",
          exploreClinics: "Explorer les Cliniques Dentaires",
          bookConsultation: "Réserver une Consultation Vidéo en Ligne"
        },
        features: {
          instantConsultation: "Consultation Vidéo Instantanée",
          instantConsultationDesc: "Consultez un dentiste en ligne depuis n'importe où.",
          trustedClinics: "Clinique Dentaire de Confiance Près de Vous",
          trustedClinicsDesc: "Réservez des rendez-vous avec les meilleures cliniques dentaires.",
          dentalScans: "Scan Dentaire 3D Près de Vous",
          dentalScansDesc: "Localisez les centres de scan dentaire CBCT et OPG.",
          bloodTest: "Test Sanguin Près de Vous",
          bloodTestDesc: "Réservez un test sanguin dans un laboratoire près de vous."
        },
        whyIndia: {
          title: "Pourquoi l'Inde est le centre mondial du tourisme dentaire ?",
          affordableTreatments: "Traitements Abordables",
          affordableTreatmentsDesc: "Économisez jusqu'à 70% sur les traitements dentaires de classe mondiale.",
          expertDentists: "Dentistes Experts en Qui Vous Pouvez Avoir Confiance",
          expertDentistsDesc: "Précision, passion et un sourire parfait — dirigés par des experts.",
          tourismDental: "Tourisme + Traitement Dentaire",
          tourismDentalDesc: "Récupérez votre sourire et votre joie tout en explorant la beauté de l'Inde.",
          topClinics: "Meilleures Cliniques Dentaires à Travers l'Inde",
          topClinicsDesc: "Cliniques dentaires les mieux notées à travers l'Inde pour des soins experts et un sourire de confiance."
        },
        testimonials: {
          title: "Ce Que Disent les Clients"
        },
        footer: {
          forPatients: "Pour les Patients",
          forDentist: "Pour le Dentiste",
          forCBCT: "Pour le Centre CBCT et OPG",
          forBloodTest: "Pour le Laboratoire de Tests Sanguins",
          forDentalEssentials: "Pour les Essentiels Dentaires",
          more: "Plus",
          searchDentist: "Rechercher un Dentiste",
          searchClinics: "Rechercher des Cliniques Dentaires",
          consultNow: "Consulter Maintenant",
          refundPolicy: "Politique de Remboursement",
          profile: "Profil",
          helpCenter: "Centre d'Aide",
          privacyPolicy: "Politique de Confidentialité",
          cookiePolicy: "Politique des Cookies",
          terms: "Conditions",
          contactUs: "Nous Contacter",
          blogs: "Blogs"
        },
        consult: {
          title: "Évitez le voyage ! Prenez une consultation dentaire en ligne",
          subtitle: "Consultation privée + appels audio + appels vidéo",
          price: "À partir de seulement ₹399/- / USD $ 4.80/-",
          loading: "Chargement...",
          getStarted: "Commencer",
          bookNow: "Réserver maintenant"
        },
        contact: {
          title: "Nous Contacter",
          getInTouch: "Entrer en Contact",
          name: "Nom",
          email: "Email",
          message: "Message",
          submit: "Soumettre",
          thankYou: "Merci ! Votre message a été envoyé.",
          phone: "Téléphone",
          address: "Adresse",
          workingHours: "Heures de Travail"
        },
        forms: {
          patientName: "Nom du patient",
          phoneNumber: "Numéro de téléphone",
          enterPhoneNumber: "Entrez le numéro de téléphone",
          haveCouponCode: "Avez-vous un code coupon ?",
          disclaimer: "Avertissement :",
          disclaimerText: "Je déclare par les présentes que toutes les informations fournies sont vraies et exactes. Je comprends que ceci n'est pas pour un usage d'urgence et j'accepte les termes et conditions du service de consultation.",
          finalFee: "Frais finaux",
          startNow: "Commencer maintenant",
          hideForm: "Masquer le formulaire",
          treatmentPlan: "Plan de traitement et devis en 24 heures",
          treatmentPlanDesc: "Pour seulement ₹149/-, sélectionnez vos problèmes dentaires et obtenez un plan détaillé."
        },
        medicalDisclaimer: {
          generalTitle: "Avertissement sur les Informations Médicales",
          generalContent: "Les informations fournies sur cette plateforme sont uniquement à des fins éducatives et informatives et ne sont pas destinées à servir de conseil médical. Ce contenu ne doit pas être utilisé pour diagnostiquer, traiter, guérir ou prévenir une condition médicale. Consultez toujours un professionnel de la santé qualifié avant de prendre des décisions médicales ou des plans de traitement.",
          generalWarning: "À DES FINS INFORMATIVES UNIQUEMENT - PAS UN SUBSTITUT POUR UN CONSEIL MÉDICAL PROFESSIONNEL",
          consultationTitle: "Avertissement sur le Service de Consultation",
          consultationContent: "Notre service de consultation vous connecte avec des professionnels dentaires mais ne remplace pas l'examen médical en personne. Les conseils fournis par notre plateforme doivent être considérés comme des conseils préliminaires uniquement. Le diagnostic final et les décisions de traitement doivent toujours être pris par des professionnels de la santé qualifiés dans des environnements cliniques appropriés.",
          consultationWarning: "PAS POUR LES URGENCES MÉDICALES - CHERCHEZ UNE ATTENTION MÉDICALE IMMÉDIATE POUR LES CONDITIONS URGENTES",
          treatmentTitle: "Avertissement sur les Informations de Traitement",
          treatmentContent: "Les informations de traitement, les coûts et les taux de succès présentés sur cette plateforme sont des estimations générales et peuvent varier considérablement selon les conditions médicales individuelles, les prestataires de soins de santé choisis et les emplacements géographiques. Les résultats de traitement réels dépendent de nombreux facteurs qui ne peuvent être évalués que par un examen médical approprié.",
          treatmentWarning: "LES RÉSULTATS DE TRAITEMENT PEUVENT VARIER - RÉSULTATS INDIVIDUELS NON GARANTIS"
        }
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
