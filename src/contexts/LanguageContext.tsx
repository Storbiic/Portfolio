import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    "nav.about": "About Me",
    "nav.experience": "Experience",
    "nav.features": "What I Do",
    "nav.projects": "Projects",
    "nav.organization": "Beyond the code",
    "nav.skills": "Skill Set",
    "nav.contact": "Get In Touch",
    
    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.role": "Data Scientist & AI Engineer",
    "hero.description": "Transforming data into intelligent solutions with Machine Learning, Deep Learning, and cutting-edge AI technologies",
    
    // About
    "about.title": "About Me",
    "about.intro": "Hello! I'm Saad Najar, a passionate Data Scientist and AI Engineer based in Morocco. I specialize in building intelligent systems that solve real-world problems through the power of artificial intelligence and machine learning.",
    "about.passion": "My journey in tech has been driven by curiosity and a deep fascination with how machines can learn and adapt. From developing sophisticated AI chatbots to engineering robust data pipelines, I thrive on creating solutions that make a difference.",
    "about.ml": "Machine Learning",
    "about.mlDesc": "Building predictive models and intelligent systems",
    "about.ds": "Data Science",
    "about.dsDesc": "Extracting insights from complex datasets",
    "about.dl": "Deep Learning",
    "about.dlDesc": "Neural networks and advanced AI architectures",
    "about.ai": "AI Engineering",
    "about.aiDesc": "Deploying production-ready AI solutions",
    
    // Experience
    "experience.title": "Professional Journey",
    "experience.subtitle": "Building the future, one project at a time",
    "experience.project": "Project",
    "experience.description": "Description",
    "experience.techStack": "Tech Stack",
    
    // Features
    "features.title": "What I Do",
    "features.subtitle": "Specialized skills that drive innovation",
    
    // Projects
    "projects.title": "Featured Projects",
    "projects.subtitle": "Showcasing innovation through code",
    "projects.viewGithub": "View on GitHub",
    
    // Skills
    "skills.title": "Technical Arsenal",
    "skills.subtitle": "Tools and technologies I work with",
    
    // Organization Works
    "organization.title": "Beyond the Code",
    "organization.subtitle": "Contributing to the tech community",
    
    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Have a project in mind or just want to say hello? Drop me a message",
    "contact.contactInfo": "Contact Info",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.buildTogether": "Let's build something amazing together",
    "contact.sendMessage": "Send Message",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "Your email",
    "contact.messagePlaceholder": "Your message",
    "contact.sendButton": "Send Message",
    "contact.sending": "Sending...",
    "contact.successTitle": "Message Sent!",
    "contact.successMessage": "Thank you for reaching out. I'll get back to you soon.",
    "contact.error": "Error",
    "contact.errorMessage": "Failed to send message. Please try again or email me directly.",
    "contact.fillFields": "Please fill in all fields",
    "contact.nameLabel": "Name",
    "contact.emailLabel": "Email",
    "contact.messageLabel": "Message",
    "contact.nameRequired": "Please enter your name",
    "contact.emailRequired": "Please enter your email",
    "contact.messageRequired": "Please write a message",
    "contact.emailInvalid": "That email doesn't look right. Check for typos",

    // Footer
    "footer.rights": "All rights reserved",
    "footer.builtWith": "Built with",
  },
  fr: {
    // Navbar
    "nav.about": "À Propos",
    "nav.experience": "Expérience",
    "nav.features": "Ce que je fais",
    "nav.projects": "Projets",
    "nav.organization": "Au-delà du Code",
    "nav.skills": "Compétences",
    "nav.contact": "Contact",
    
    // Hero
    "hero.greeting": "Salut, je suis",
    "hero.role": "Data Scientist & Ingénieur IA",
    "hero.description": "Transformer les données en solutions intelligentes avec le Machine Learning, le Deep Learning et les technologies IA de pointe",
    
    // About
    "about.title": "À Propos de Moi",
    "about.intro": "Bonjour ! Je suis Saad Najar, un Data Scientist et Ingénieur IA passionné basé au Maroc. Je me spécialise dans la création de systèmes intelligents qui résolvent des problèmes concrets grâce à l'intelligence artificielle et au machine learning.",
    "about.passion": "Mon parcours dans la tech a été guidé par la curiosité et une fascination profonde pour la façon dont les machines peuvent apprendre et s'adapter. Du développement de chatbots IA sophistiqués à l'ingénierie de pipelines de données robustes, je m'épanouis en créant des solutions qui font la différence.",
    "about.ml": "Machine Learning",
    "about.mlDesc": "Construction de modèles prédictifs et systèmes intelligents",
    "about.ds": "Data Science",
    "about.dsDesc": "Extraction d'insights à partir de données complexes",
    "about.dl": "Deep Learning",
    "about.dlDesc": "Réseaux de neurones et architectures IA avancées",
    "about.ai": "Ingénierie IA",
    "about.aiDesc": "Déploiement de solutions IA en production",
    
    // Experience
    "experience.title": "Parcours Professionnel",
    "experience.subtitle": "Construire l'avenir, un projet à la fois",
    "experience.project": "Projet",
    "experience.description": "Description",
    "experience.techStack": "Stack Technique",
    
    // Features
    "features.title": "Ce que je fais",
    "features.subtitle": "Compétences spécialisées qui stimulent l'innovation",
    
    // Projects
    "projects.title": "Projets en Vedette",
    "projects.subtitle": "Présentation de l'innovation par le code",
    "projects.viewGithub": "Voir sur GitHub",
    
    // Skills
    "skills.title": "Arsenal Technique",
    "skills.subtitle": "Outils et technologies avec lesquels je travaille",
    
    // Organization Works
    "organization.title": "Au-delà du Code",
    "organization.subtitle": "Contribuer à la communauté tech",
    
    // Contact
    "contact.title": "Contactez-Moi",
    "contact.subtitle": "Vous avez un projet en tête ou voulez simplement dire bonjour ? Envoyez-moi un message",
    "contact.contactInfo": "Informations de Contact",
    "contact.email": "Email",
    "contact.phone": "Téléphone",
    "contact.location": "Localisation",
    "contact.buildTogether": "Construisons quelque chose d'incroyable ensemble",
    "contact.sendMessage": "Envoyer un Message",
    "contact.namePlaceholder": "Votre nom",
    "contact.emailPlaceholder": "Votre email",
    "contact.messagePlaceholder": "Votre message",
    "contact.sendButton": "Envoyer le Message",
    "contact.sending": "Envoi en cours...",
    "contact.successTitle": "Message Envoyé !",
    "contact.successMessage": "Merci de m'avoir contacté. Je vous répondrai bientôt.",
    "contact.error": "Erreur",
    "contact.errorMessage": "Échec de l'envoi du message. Veuillez réessayer ou m'envoyer un email directement.",
    "contact.fillFields": "Veuillez remplir tous les champs",
    "contact.nameLabel": "Nom",
    "contact.emailLabel": "Email",
    "contact.messageLabel": "Message",
    "contact.nameRequired": "Veuillez indiquer votre nom",
    "contact.emailRequired": "Veuillez indiquer votre email",
    "contact.messageRequired": "Veuillez écrire un message",
    "contact.emailInvalid": "Cet email semble incorrect. Vérifiez qu'il n'y a pas de faute",

    // Footer
    "footer.rights": "Tous droits réservés",
    "footer.builtWith": "Construit avec",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
