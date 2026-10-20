import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { MobileNav } from './components/layout/MobileNav';
import { HomeView } from './components/home/HomeView';
import { SkillDiscoveryView } from './components/skills/SkillDiscoveryView';
import { ProjectsView } from './components/projects/ProjectsView';
import { PassportView } from './components/passport/PassportView';
import { OpportunitiesView } from './components/opportunities/OpportunitiesView';
import { ProfileView } from './components/profile/ProfileView';
import { AuthView } from './components/auth/AuthView';
import { ProjectDetailModal } from './components/common/ProjectDetailModal';
import { AssessorModal } from './components/common/AssessorModal';
import { SharePortfolioModal } from './components/common/SharePortfolioModal';
const AppContent: React.FC = () => {
  const { currentTab, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <AuthView />;
  }

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] text-slate-800 antialiased font-sans">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <TopHeader />

        {/* Tab Page Views */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {currentTab === 'home' && <HomeView />}
          {currentTab === 'skills' && <SkillDiscoveryView />}
          {currentTab === 'projects' && <ProjectsView />}
          {currentTab === 'passport' && <PassportView />}
          {currentTab === 'opportunities' && <OpportunitiesView />}
          {currentTab === 'profile' && <ProfileView />}
        </main>

        {/* Global Modals */}
        <ProjectDetailModal />
        <AssessorModal />
        <SharePortfolioModal />

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
