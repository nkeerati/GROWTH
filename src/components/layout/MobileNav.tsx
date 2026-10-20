import React from 'react';
import { useApp, TabType } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  FolderGit2,
  Award,
  Briefcase,
  User,
} from 'lucide-react';

interface MobileItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ITEMS: MobileItem[] = [
  { id: 'home', label: 'หน้าแรก', icon: LayoutDashboard },
  { id: 'skills', label: 'ค้นหา', icon: Compass },
  { id: 'projects', label: 'โปรเจกต์', icon: FolderGit2 },
  { id: 'passport', label: 'พาสปอร์ต', icon: Award },
  { id: 'opportunities', label: 'โอกาส', icon: Briefcase },
  { id: 'profile', label: 'โปรไฟล์', icon: User },
];

export const MobileNav: React.FC = () => {
  const { currentTab, setCurrentTab, skills } = useApp();
  const verifiedCount = skills.filter((s) => s.status === 'verified').length;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EFECE6] px-2 py-1 shadow-lg">
      <div className="grid grid-cols-6 items-center">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-0.5 transition-colors relative ${
                isActive ? 'text-[#2D6A4F]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.id === 'passport' && verifiedCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#D8F3DC] text-[#1B4332] text-[9px] font-mono flex items-center justify-center font-black border border-white">
                    {verifiedCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 truncate max-w-full ${isActive ? 'font-bold' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
