import React from 'react';
import { useApp, TabType } from '../../context/AppContext';
import {
  Compass,
  FolderGit2,
  Award,
  Briefcase,
  User,
  LayoutDashboard,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  LogOut,
  Heart,
} from 'lucide-react';

interface NavItem {
  id: TabType;
  label: string;
  subLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'หน้าแรก', subLabel: 'ภาพรวมทักษะ', icon: LayoutDashboard, accentColor: 'text-[#2D6A4F]' },
  { id: 'skills', label: 'ค้นหาทักษะ', subLabel: 'แบบสำรวจความถนัด', icon: Compass, accentColor: 'text-[#4F75FF]' },
  { id: 'projects', label: 'โปรเจกต์', subLabel: 'ลงมือทำจริง', icon: FolderGit2, accentColor: 'text-[#E07A5F]' },
  { id: 'passport', label: 'พาสปอร์ตของฉัน', subLabel: 'หลักฐานทักษะ', icon: Award, accentColor: 'text-[#2D6A4F]' },
  { id: 'opportunities', label: 'โอกาส', subLabel: 'งาน & การแข่งขัน', icon: Briefcase, accentColor: 'text-[#8B5CF6]' },
  { id: 'profile', label: 'โปรไฟล์', subLabel: 'ข้อมูลส่วนตัว', icon: User, accentColor: 'text-[#D97706]' },
];

export const Sidebar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    isReviewerMode,
    setIsReviewerMode,
    resetDemoData,
    skills,
    submissions,
    logout,
  } = useApp();

  const verifiedSkillsCount = skills.filter((s) => s.status === 'verified').length;
  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'pending_review').length;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#FCFBF9] text-slate-700 border-r border-[#EFECE6] shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#EFECE6]/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D8F3DC] via-[#E8F5E9] to-[#FFE5D9] flex items-center justify-center text-[#1B4332] font-black text-lg shadow-xs border border-[#C8E6C9]/40">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-black tracking-wider text-[#1B4332] leading-none">
                GROWTH
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#FFE5D9] text-[#D9534F] font-bold rounded-full">
                Beta
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-normal">
              เปลี่ยนทักษะเป็นโอกาส ✨
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          เมนูหลัก · navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm text-left transition-all ${
                isActive
                  ? 'bg-white text-[#1B4332] font-semibold shadow-xs border border-[#E2E8F0]'
                  : 'text-slate-600 hover:bg-[#F3F1EC] hover:text-slate-900'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? 'bg-[#D8F3DC]/80' : 'bg-slate-100/80 group-hover:bg-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? item.accentColor : 'text-slate-400'
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="truncate">{item.label}</div>
              </div>

              {item.id === 'passport' && verifiedSkillsCount > 0 && (
                <span className="text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-full bg-[#D8F3DC] text-[#1B4332] font-bold">
                  {verifiedSkillsCount}
                </span>
              )}
              {item.id === 'projects' && (
                <span className="text-[10px] text-slate-400 font-mono px-1.5 py-0.5 rounded-md bg-slate-100">
                  6 งาน
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Evaluator Demo Mode Control (Pastel Style) */}
      <div className="p-3.5 mx-3 my-2 bg-gradient-to-br from-[#F0F4FF] to-[#FAF5FF] border border-[#D9E2FF] rounded-2xl shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">🎯</span>
            <span className="text-xs font-bold text-slate-800">โหมดกรรมการประเมิน</span>
          </div>
          <button
            onClick={() => setIsReviewerMode(!isReviewerMode)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isReviewerMode ? 'bg-[#4F75FF]' : 'bg-slate-300'
            }`}
            aria-label="สลับโหมดผู้ประเมิน"
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                isReviewerMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
          {isReviewerMode
            ? '✨ เปิดโหมดตรวจผลงาน: ตรวจรูบริกและอนุมัติทักษะได้'
            : '🌱 มุมมองผู้เรียน: สลับเพื่อทดลองตรวจผลงาน'}
        </p>
        {pendingSubmissionsCount > 0 && (
          <div className="mt-2 text-[11px] text-[#4F75FF] font-medium flex items-center gap-1.5 bg-white/70 px-2 py-1 rounded-lg border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F75FF] animate-pulse" />
            <span>มีผลงานรอตรวจ {pendingSubmissionsCount} รายการ</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[#EAE6DF] space-y-2">
        <button
          onClick={logout}
          title="ไปยังหน้าแรก: ลงทะเบียนเข้าใช้งานใหม่ / เข้าสู่ระบบ"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#FAF8F5] hover:bg-[#FFE8DF] text-slate-700 hover:text-[#9A3412] text-xs font-bold rounded-xl border border-[#EAE6DF] transition-all shadow-2xs"
        >
          <span>🌱</span>
          <span>หน้าลงทะเบียน / สลับบัญชี</span>
        </button>

        <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
          <span className="text-[10px]">GROWTH Prototype</span>
          <button
            onClick={resetDemoData}
            title="รีเซ็ตข้อมูลตัวอย่างกลับเป็นค่าเริ่มต้นสำหรับการนำเสนอ"
            className="flex items-center gap-1 hover:text-slate-700 transition-colors text-[10px] font-medium"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span>รีเซ็ตเดโม</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
