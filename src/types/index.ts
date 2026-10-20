export type SkillStatus = 'in_progress' | 'pending_review' | 'verified';

export interface Skill {
  id: string;
  name: string;
  category: 'business' | 'marketing' | 'tech' | 'design' | 'data' | 'entrepreneurship' | 'social' | 'engineering' | 'medical';
  categoryLabel: string;
  progressPercent: number; // 0 - 100
  status: SkillStatus;
  level: 'เริ่มต้น (Beginner)' | 'ระดับกลาง (Intermediate)' | 'ระดับสูง (Advanced)';
  evidenceTitle?: string;
  evidenceUrl?: string;
  assessorName?: string;
  assessorRole?: string;
  assessorOrg?: string;
  assessedDate?: string;
  feedback?: string;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  projectTitle: string;
  orgName: string;
  submittedAt: string;
  deliverableTitle: string;
  deliverableUrl: string;
  reflectionText: string;
  skillsDemonstrated: string[];
  status: 'pending_review' | 'approved' | 'revision_requested';
  assessorFeedback?: string;
  assessorName?: string;
  rubricScores?: {
    practicalExecution: number; // 1-5
    problemSolving: number; // 1-5
    reflectionQuality: number; // 1-5
  };
  assessedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  orgName: string;
  orgType: 'ร้านค้าชุมชน' | 'วิสาหกิจเพื่อสังคม' | 'โรงเรียน/สถาบัน' | 'บริษัทเอกชน' | 'องค์กรไม่แสวงหากำไร';
  orgLogoText: string;
  coverImage: string;
  description: string;
  problemStatement: string;
  deliverablesRequired: string[];
  skillsGained: string[];
  difficulty: 'เริ่มต้น' | 'ปานกลาง' | 'ท้าทาย';
  durationWeeks: number;
  deadline: string;
  availableSlots: number;
  category: 'marketing' | 'data' | 'social' | 'design' | 'tech' | 'business' | 'engineering' | 'medical';
  evaluationCriteria: string[];
  contactPerson: string;
  contactRole: string;
}

export type OpportunityType = 'ฝึกงาน (Internship)' | 'การแข่งขัน (Competition)' | 'โปรเจกต์บริษัท (Company Project)' | 'โครงการพี่เลี้ยง (Mentorship)' | 'อาสาสมัคร (Volunteer)';

export type ApplicationStatus = 'saved' | 'applied' | 'in_review' | 'shortlisted' | 'not_selected';

export interface Opportunity {
  id: string;
  title: string;
  orgName: string;
  type: OpportunityType;
  coverImage?: string;
  location: string;
  format: 'ออนไลน์ (Remote)' | 'ออนไซต์ (On-site)' | 'ไฮบริด (Hybrid)';
  deadline: string;
  stipend?: string;
  qualifications: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  responsibilities: string[];
  benefits: string[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  nickname: string;
  age: number;
  isUnder18: boolean;
  educationLevel: string;
  institution: string;
  faculty: string;
  bio: string;
  careerInterests: string[];
  avatarUrl: string;
  contactEmail: string;
  contactPhone: string;
  portfolioSlug: string;
  privacySettings: {
    hideContactInfoPublicly: boolean;
    requireGuardianConsent: boolean;
    allowCompanyHeadhunt: boolean;
    publicPortfolioEnabled: boolean;
  };
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  category: 'business' | 'marketing' | 'tech' | 'design' | 'data' | 'entrepreneurship' | 'social';
  options: {
    text: string;
    score: Record<string, number>; // maps to skill/category scores
  }[];
}

export interface AssessmentResult {
  completed: boolean;
  completedAt?: string;
  scores: {
    marketing: number;
    data: number;
    design: number;
    tech: number;
    business: number;
    social: number;
  };
  topCategories: string[];
  recommendedCareers: string[];
  recommendedProjectIds: string[];
}
