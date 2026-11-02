export type Language = 'en' | 'fr' | 'hi';

export interface ProjectMission {
  id: string;
  title: string;
  tagline: string;
  category: 'cloud' | 'security' | 'infrastructure' | 'fullstack';
  badge: string;
  timeline: string;
  location: string;
  brief: string;
  roleHighlights: string[];
  techStack: string[];
  architectureBreakdown: {
    threatOrProblem: string;
    defenseOrSolution: string;
    impactResult: string;
  };
  honours?: string;
  links?: {
    demo?: string;
    repo?: string;
    docs?: string;
  };
}

export interface SkillCategory {
  id: string;
  sectorName: string;
  sectorCode: string;
  color: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Specialized", "Proficient"
    tags: string[];
    description: string;
  }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  verificationBadge: string;
  skillsValidated: string[];
  attachmentUrl?: string;
  attachmentImage?: string;
  verificationUrl?: string;
  grade?: string;
}

export interface WorkHistory {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  highlights: string[];
  technologies: string[];
}

