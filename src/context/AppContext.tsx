import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Skill,
  Project,
  ProjectSubmission,
  Opportunity,
  ApplicationStatus,
  AssessmentResult,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_SKILLS,
  INITIAL_PROJECTS,
  INITIAL_SUBMISSIONS,
  INITIAL_OPPORTUNITIES,
} from '../data/initialData';

export type TabType = 'home' | 'skills' | 'projects' | 'passport' | 'opportunities' | 'profile';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'success' | 'info' | 'review';
}

interface AppContextType {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  skills: Skill[];
  projects: Project[];
  submissions: ProjectSubmission[];
  appliedProjectIds: string[];
  opportunities: Opportunity[];
  savedOpportunityIds: string[];
  opportunityApplications: Record<string, { status: ApplicationStatus; appliedDate: string; notes?: string }>;
  assessmentResult: AssessmentResult;
  isReviewerMode: boolean;
  setIsReviewerMode: (val: boolean) => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  applyToProject: (projectId: string, note?: string) => void;
  submitProjectDeliverable: (data: {
    projectId: string;
    deliverableTitle: string;
    deliverableUrl: string;
    reflectionText: string;
    skillsDemonstrated: string[];
  }) => void;
  evaluateSubmission: (
    submissionId: string,
    decision: 'approved' | 'revision_requested',
    feedback: string,
    rubricScores: { practicalExecution: number; problemSolving: number; reflectionQuality: number },
    assessorName?: string
  ) => void;
  saveOpportunity: (oppId: string) => void;
  unsaveOpportunity: (oppId: string) => void;
  applyToOpportunity: (oppId: string) => void;
  completeAssessment: (categoryScores: Record<string, number>) => void;
  resetDemoData: () => void;
  selectedProjectIdForDetail: string | null;
  setSelectedProjectIdForDetail: (id: string | null) => void;
  selectedSubmissionForReview: ProjectSubmission | null;
  setSelectedSubmissionForReview: (sub: ProjectSubmission | null) => void;
  isAuthenticated: boolean;
  loginAsDemo: () => void;
  loginUser: (email: string) => void;
  registerUser: (data: {
    fullName: string;
    nickname: string;
    age: number;
    educationLevel: string;
    institution: string;
    faculty: string;
    email: string;
    careerInterests: string[];
  }) => void;
  logout: () => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fp_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('fp_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(() => {
    const saved = localStorage.getItem('fp_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [appliedProjectIds, setAppliedProjectIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('fp_applied_projects');
    return saved ? JSON.parse(saved) : ['proj-1'];
  });

  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('fp_saved_opps');
    return saved ? JSON.parse(saved) : ['opp-1', 'opp-3'];
  });

  const [opportunityApplications, setOpportunityApplications] = useState<
    Record<string, { status: ApplicationStatus; appliedDate: string; notes?: string }>
  >(() => {
    const saved = localStorage.getItem('fp_opp_apps');
    return saved
      ? JSON.parse(saved)
      : {
          'opp-1': { status: 'in_review', appliedDate: '2026-10-19', notes: 'แนบหลักฐานผลงานการตลาดร้านค้าชุมชน' },
        };
  });

  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult>(() => {
    const saved = localStorage.getItem('fp_assessment');
    return saved
      ? JSON.parse(saved)
      : {
          completed: true,
          completedAt: '2026-10-15',
          scores: {
            marketing: 8,
            data: 6,
            design: 5,
            tech: 4,
            business: 7,
            social: 7,
          },
          topCategories: ['การตลาดและสื่อสาร (Marketing)', 'การพัฒนาสังคม (Social Impact)', 'นวัตกรรมธุรกิจ (Business Strategy)'],
          recommendedCareers: [
            'Digital Marketing & Content Strategist',
            'Social Innovation Project Manager',
            'Community Business Consultant',
          ],
          recommendedProjectIds: ['proj-1', 'proj-3', 'proj-2'],
        };
  });

  const [isReviewerMode, setIsReviewerMode] = useState<boolean>(false);
  const [selectedProjectIdForDetail, setSelectedProjectIdForDetail] = useState<string | null>(null);
  const [selectedSubmissionForReview, setSelectedSubmissionForReview] = useState<ProjectSubmission | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('fp_auth');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('fp_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'ผลงานได้รับการประเมินแล้ว!',
      message: 'อาจารย์ ดร.วรัญญา ได้ประเมินผลงานโปรเจกต์ "วางแผนการตลาดออนไลน์ให้ร้านค้าชุมชน" ของคุณแล้ว',
      timestamp: '2 ชม. ที่แล้ว',
      read: false,
      type: 'success',
    },
    {
      id: 'notif-2',
      title: 'แนะนำโอกาสใหม่ที่ตรงกับทักษะของคุณ',
      message: 'มีตำแหน่งนักศึกษาฝึกงาน Digital Marketing & Content Creator ที่ตรงกับหลักฐานทักษะของคุณ 100%',
      timestamp: '1 วันที่แล้ว',
      read: false,
      type: 'info',
    },
  ]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('fp_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('fp_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('fp_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('fp_applied_projects', JSON.stringify(appliedProjectIds));
  }, [appliedProjectIds]);

  useEffect(() => {
    localStorage.setItem('fp_saved_opps', JSON.stringify(savedOpportunityIds));
  }, [savedOpportunityIds]);

  useEffect(() => {
    localStorage.setItem('fp_opp_apps', JSON.stringify(opportunityApplications));
  }, [opportunityApplications]);

  useEffect(() => {
    localStorage.setItem('fp_assessment', JSON.stringify(assessmentResult));
  }, [assessmentResult]);

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const applyToProject = (projectId: string) => {
    if (!appliedProjectIds.includes(projectId)) {
      setAppliedProjectIds((prev) => [...prev, projectId]);
      const project = INITIAL_PROJECTS.find((p) => p.id === projectId);
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: 'สมัครเข้าร่วมโปรเจกต์สำเร็จ',
          message: `คุณได้ลงทะเบียนเข้าร่วมโปรเจกต์ "${project?.title || ''}" เรียบร้อยแล้ว สามารถเริ่มทำและส่งผลงานได้ทันที`,
          timestamp: 'เมื่อสักครู่',
          read: false,
          type: 'info',
        },
        ...prev,
      ]);
    }
  };

  const submitProjectDeliverable = (data: {
    projectId: string;
    deliverableTitle: string;
    deliverableUrl: string;
    reflectionText: string;
    skillsDemonstrated: string[];
  }) => {
    const project = INITIAL_PROJECTS.find((p) => p.id === data.projectId);
    const newSubmission: ProjectSubmission = {
      id: `sub-${Date.now()}`,
      projectId: data.projectId,
      projectTitle: project?.title || 'โปรเจกต์การพัฒนาทักษะ',
      orgName: project?.orgName || 'องค์กรพันธมิตร',
      submittedAt: new Date().toISOString().split('T')[0],
      deliverableTitle: data.deliverableTitle,
      deliverableUrl: data.deliverableUrl,
      reflectionText: data.reflectionText,
      skillsDemonstrated: data.skillsDemonstrated,
      status: 'pending_review',
    };

    setSubmissions((prev) => [newSubmission, ...prev]);

    // Update demonstrated skills status to pending_review
    setSkills((prevSkills) => {
      return prevSkills.map((s) => {
        if (data.skillsDemonstrated.some((sd) => sd.toLowerCase().includes(s.name.slice(0, 6).toLowerCase()))) {
          return {
            ...s,
            status: s.status === 'verified' ? 'verified' : 'pending_review',
            evidenceTitle: data.deliverableTitle,
            evidenceUrl: data.deliverableUrl,
          };
        }
        return s;
      });
    });

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'ส่งผลงานตัวอย่างเข้าพาสปอร์ตแล้ว',
        message: `ผลงาน "${data.deliverableTitle}" อยู่ในสถานะ [รอการประเมิน] โดยผู้ทรงคุณวุฒิ`,
        timestamp: 'เมื่อสักครู่',
        read: false,
        type: 'info',
      },
      ...prev,
    ]);
  };

  const evaluateSubmission = (
    submissionId: string,
    decision: 'approved' | 'revision_requested',
    feedback: string,
    rubricScores: { practicalExecution: number; problemSolving: number; reflectionQuality: number },
    assessorName = 'ดร.วรัญญา สิงหราช (ที่ปรึกษาอาวุโส)'
  ) => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            status: decision,
            assessorFeedback: feedback,
            assessorName,
            rubricScores,
            assessedAt: new Date().toISOString().split('T')[0],
          };
        }
        return sub;
      })
    );

    const submission = submissions.find((s) => s.id === submissionId);
    if (!submission) return;

    if (decision === 'approved') {
      // Elevate corresponding skills to verified!
      setSkills((prevSkills) => {
        return prevSkills.map((s) => {
          const isRelated = submission.skillsDemonstrated.some((sd) =>
            sd.toLowerCase().includes(s.name.slice(0, 6).toLowerCase())
          );
          if (isRelated) {
            return {
              ...s,
              status: 'verified',
              progressPercent: Math.min(100, Math.max(s.progressPercent + 20, 85)),
              assessorName,
              assessorRole: 'ผู้เชี่ยวชาญตรวจสอบหลักฐานทักษะ',
              assessorOrg: submission.orgName,
              assessedDate: new Date().toISOString().split('T')[0],
              feedback,
              evidenceTitle: submission.deliverableTitle,
              evidenceUrl: submission.deliverableUrl,
            };
          }
          return s;
        });
      });

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: '🎉 ทักษะของคุณผ่านการตรวจสอบและยืนยันแล้ว!',
          message: `ผู้ประเมินได้อนุมัติหลักฐานทักษะในโปรเจกต์ "${submission.projectTitle}" พร้อมบันทึกใน GROWTH Passport อย่างเป็นทางการ`,
          timestamp: 'เมื่อสักครู่',
          read: false,
          type: 'success',
        },
        ...prev,
      ]);
    } else {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: 'มีข้อเสนอแนะเพิ่มเติมสำหรับผลงาน',
          message: `ผู้ประเมินได้ให้คำแนะนำสำหรับการปรับปรุงผลงาน "${submission.deliverableTitle}" เพื่อยกระดับหลักฐานทักษะ`,
          timestamp: 'เมื่อสักครู่',
          read: false,
          type: 'review',
        },
        ...prev,
      ]);
    }
  };

  const saveOpportunity = (oppId: string) => {
    if (!savedOpportunityIds.includes(oppId)) {
      setSavedOpportunityIds((prev) => [...prev, oppId]);
    }
  };

  const unsaveOpportunity = (oppId: string) => {
    setSavedOpportunityIds((prev) => prev.filter((id) => id !== oppId));
  };

  const applyToOpportunity = (oppId: string) => {
    setOpportunityApplications((prev) => ({
      ...prev,
      [oppId]: {
        status: 'applied',
        appliedDate: new Date().toISOString().split('T')[0],
        notes: 'ส่งใบสมัครพร้อมแนบ GROWTH Passport ที่มีหลักฐานการประเมินทักษะแล้ว',
      },
    }));

    const opp = INITIAL_OPPORTUNITIES.find((o) => o.id === oppId);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'ยื่นใบสมัครโอกาสสำเร็จ (จำลองการส่งข้อมูล)',
        message: `คุณได้ส่งข้อมูลและหลักฐานในพาสปอร์ตไปยัง "${opp?.title || ''}" เรียบร้อยแล้ว`,
        timestamp: 'เมื่อสักครู่',
        read: false,
        type: 'success',
      },
      ...prev,
    ]);
  };

  const completeAssessment = (categoryScores: Record<string, number>) => {
    const formattedScores = {
      marketing: categoryScores.marketing || 0,
      data: categoryScores.data || 0,
      design: categoryScores.design || 0,
      tech: categoryScores.tech || 0,
      business: categoryScores.business || 0,
      social: categoryScores.social || 0,
    };

    // determine top 3 categories
    const sortedCategories = Object.entries(formattedScores)
      .sort((a, b) => b[1] - a[1])
      .map(([key]) => {
        switch (key) {
          case 'marketing':
            return 'การตลาดและสื่อสารดิจิทัล (Marketing)';
          case 'data':
            return 'การวิเคราะห์ข้อมูลและสถิติ (Data Analytics)';
          case 'social':
            return 'การพัฒนาเพื่อสังคมและความยั่งยืน (Social Impact)';
          case 'design':
            return 'การออกแบบประสบการณ์และความคิดสร้างสรรค์ (Design & UX)';
          case 'business':
            return 'นวัตกรรมธุรกิจและการเป็นผู้ประกอบการ (Business Strategy)';
          case 'tech':
            return 'เทคโนโลยีและการพัฒนาระบบ (Technology)';
          default:
            return key;
        }
      });

    const topCategories = sortedCategories.slice(0, 3);
    const recommendedCareers = [
      'Digital Marketing & Content Strategist',
      'Social Innovation Project Coordinator',
      'Junior Business & Data Analyst',
    ];

    setAssessmentResult({
      completed: true,
      completedAt: new Date().toISOString().split('T')[0],
      scores: formattedScores,
      topCategories,
      recommendedCareers,
      recommendedProjectIds: ['proj-1', 'proj-3', 'proj-2'],
    });

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'วิเคราะห์ความถนัดเสร็จสิ้น!',
        message: 'ระบบได้สรุปผลประเมินความสนใจ พร้อมแนะนำโปรเจกต์ที่ตรงกับศักยภาพของคุณเรียบร้อยแล้ว',
        timestamp: 'เมื่อสักครู่',
        read: false,
        type: 'info',
      },
      ...prev,
    ]);
  };

  const loginAsDemo = () => {
    setUserProfile(INITIAL_USER);
    setIsAuthenticated(true);
    setCurrentTab('home');
  };

  const loginUser = (email: string) => {
    setIsAuthenticated(true);
    setCurrentTab('home');
  };

  const registerUser = (data: {
    fullName: string;
    nickname: string;
    age: number;
    educationLevel: string;
    institution: string;
    faculty: string;
    email: string;
    careerInterests: string[];
  }) => {
    const newProfile: UserProfile = {
      ...INITIAL_USER,
      id: `usr-${Date.now().toString().slice(-4)}`,
      fullName: data.fullName,
      nickname: data.nickname || data.fullName.split(' ')[0],
      age: data.age,
      isUnder18: data.age < 18,
      educationLevel: data.educationLevel,
      institution: data.institution,
      faculty: data.faculty,
      contactEmail: data.email,
      careerInterests: data.careerInterests.length > 0 ? data.careerInterests : ['Digital Marketing', 'Data Analytics'],
      portfolioSlug: (data.nickname || 'user') + '-' + Math.floor(100 + Math.random() * 900),
    };
    setUserProfile(newProfile);
    setIsAuthenticated(true);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `ยินดีต้อนรับสู่ GROWTH, ${data.nickname || data.fullName}! 🌱✨`,
        message: 'บัญชีของคุณพร้อมใช้งานแล้ว เริ่มต้นด้วยการสำรวจความถนัดในหน้าค้นหาทักษะ',
        timestamp: 'เมื่อสักครู่',
        read: false,
        type: 'success',
      },
      ...prev,
    ]);
    setCurrentTab('skills');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const resetDemoData = () => {
    localStorage.removeItem('fp_user');
    localStorage.removeItem('fp_skills');
    localStorage.removeItem('fp_submissions');
    localStorage.removeItem('fp_applied_projects');
    localStorage.removeItem('fp_saved_opps');
    localStorage.removeItem('fp_opp_apps');
    localStorage.removeItem('fp_assessment');
    localStorage.removeItem('fp_auth');

    setUserProfile(INITIAL_USER);
    setSkills(INITIAL_SKILLS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setAppliedProjectIds(['proj-1']);
    setSavedOpportunityIds(['opp-1', 'opp-3']);
    setOpportunityApplications({
      'opp-1': { status: 'in_review', appliedDate: '2026-10-19', notes: 'แนบหลักฐานผลงานการตลาดร้านค้าชุมชน' },
    });
    setAssessmentResult({
      completed: true,
      completedAt: '2026-10-15',
      scores: {
        marketing: 8,
        data: 6,
        design: 5,
        tech: 4,
        business: 7,
        social: 7,
      },
      topCategories: ['การตลาดและสื่อสาร (Marketing)', 'การพัฒนาสังคม (Social Impact)', 'นวัตกรรมธุรกิจ (Business Strategy)'],
      recommendedCareers: [
        'Digital Marketing & Content Strategist',
        'Social Innovation Project Manager',
        'Community Business Consultant',
      ],
      recommendedProjectIds: ['proj-1', 'proj-3', 'proj-2'],
    });
    setIsReviewerMode(false);
    setSelectedProjectIdForDetail(null);
    setSelectedSubmissionForReview(null);
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        userProfile,
        updateUserProfile,
        skills,
        projects: INITIAL_PROJECTS,
        submissions,
        appliedProjectIds,
        opportunities: INITIAL_OPPORTUNITIES,
        savedOpportunityIds,
        opportunityApplications,
        assessmentResult,
        isReviewerMode,
        setIsReviewerMode,
        notifications,
        markNotificationAsRead,
        applyToProject,
        submitProjectDeliverable,
        evaluateSubmission,
        saveOpportunity,
        unsaveOpportunity,
        applyToOpportunity,
        completeAssessment,
        resetDemoData,
        selectedProjectIdForDetail,
        setSelectedProjectIdForDetail,
        selectedSubmissionForReview,
        setSelectedSubmissionForReview,
        isAuthenticated,
        loginAsDemo,
        loginUser,
        registerUser,
        logout,
        isShareModalOpen,
        setIsShareModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
