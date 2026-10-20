import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Search,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  X,
  Share2,
  Sparkles,
  LogOut,
} from 'lucide-react';

export const TopHeader: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    userProfile,
    notifications,
    markNotificationAsRead,
    isReviewerMode,
    setIsReviewerMode,
    setIsShareModalOpen,
    setSelectedProjectIdForDetail,
    projects,
    logout,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: string; title: string; category: string }[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const pageTitles: Record<string, { title: string; sub: string; emoji: string }> = {
    home: { title: 'ภาพรวมของฉัน', sub: 'แดชบอร์ดความก้าวหน้าและโปรเจกต์แนะนำ', emoji: '✨' },
    skills: { title: 'ค้นหาทักษะและศักยภาพ', sub: 'แบบประเมินความสนใจและแผนที่เส้นทางอาชีพ', emoji: '🧭' },
    projects: { title: 'ตลาดงานและโปรเจกต์จริง', sub: 'ลงมือทำกับร้านค้าชุมชน โรงเรียน และองค์กรพันธมิตร', emoji: '🎨' },
    passport: { title: 'GROWTH Passport', sub: 'แฟ้มสะสมทักษะที่มีหลักฐานการประเมินยืนยัน', emoji: '🌱' },
    opportunities: { title: 'โอกาสและงานที่เหมาะสม', sub: 'จับคู่ทักษะกับตำแหน่งฝึกงานและการแข่งขัน', emoji: '🚀' },
    profile: { title: 'โปรไฟล์และการตั้งค่า', sub: 'การจัดการข้อมูลส่วนบุคคลและความเป็นส่วนตัวของเยาวชน', emoji: '🧸' },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = projects
      .filter((p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 4)
      .map((p) => ({ id: p.id, title: p.title, category: p.category }));
    setSearchResults(filtered);
  };

  const currentPage = pageTitles[currentTab] || { title: 'GROWTH', sub: '', emoji: '✨' };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-8 py-3.5 bg-white/90 backdrop-blur-md border-b border-[#EFECE6]">
      {/* Zone 1: Breadcrumb & Title with cute emoji */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="lg:hidden flex items-center gap-2 mr-1">
          <div className="w-9 h-9 rounded-2xl bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center font-bold text-sm shadow-2xs">
            🌱
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-lg">{currentPage.emoji}</span>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-tight truncate">
              {currentPage.title}
            </h2>
          </div>
          <p className="hidden md:block text-[11px] text-slate-400 truncate mt-0.5">
            {currentPage.sub}
          </p>
        </div>
      </div>

      {/* Zone 2: Global Search (Cute Minimalist) */}
      <div ref={searchRef} className="relative hidden md:block max-w-xs w-full">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาโปรเจกต์ หรือทักษะน่าสนใจ..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7FAF8] border border-[#E2EBE5] rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] focus:bg-white transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#EFECE6] rounded-2xl shadow-xl overflow-hidden z-50">
            <div className="px-3.5 py-2 text-[10px] font-bold text-slate-400 bg-[#FAF9F6] border-b border-slate-100 uppercase">
              ผลการค้นหาโปรเจกต์
            </div>
            {searchResults.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedProjectIdForDetail(item.id);
                  setSearchQuery('');
                  setSearchResults([]);
                  setCurrentTab('projects');
                }}
                className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-[#F7FAF8] flex items-center justify-between transition-colors"
              >
                <span className="text-slate-800 font-medium truncate">{item.title}</span>
                <span className="text-[11px] text-[#4F75FF] shrink-0 ml-2 font-medium">ดูงาน →</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zone 3: Actions & User Mini Pill */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Evaluator Switch Tag for Quick Demos (Pastel Blue) */}
        <button
          onClick={() => setIsReviewerMode(!isReviewerMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isReviewerMode
              ? 'bg-[#E0E7FF] text-[#4338CA] border border-[#C7D2FE] shadow-2xs'
              : 'bg-[#F1F5F9] text-slate-600 hover:bg-[#E2E8F0]'
          }`}
          title="สลับโหมดผู้ประเมินสำหรับการสาธิตในห้องแข่งขัน"
        >
          <span className="text-xs">🎯</span>
          <span className="hidden sm:inline">
            {isReviewerMode ? 'โหมดตรวจงาน (เปิดอยู่)' : 'ทดลองโหมดผู้ประเมิน'}
          </span>
          <span className="sm:hidden">ตรวจงาน</span>
        </button>

        {/* Share Passport CTA (Pastel Mint) */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D8F3DC] hover:bg-[#c2ebd1] text-[#1B4332] text-xs font-bold rounded-xl transition-all shadow-2xs whitespace-nowrap border border-[#B7E4C7]/60"
        >
          <Share2 className="w-3.5 h-3.5 text-[#2D6A4F]" />
          <span className="hidden sm:inline">แชร์พอร์ตโฟลิโอ</span>
          <span className="sm:hidden">แชร์</span>
        </button>

        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-[#F3F1EC] rounded-xl transition-colors"
            aria-label="การแจ้งเตือน"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF70A6] rounded-full ring-2 ring-white" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-[#EFECE6] rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[#FAF9F6] border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">การแจ้งเตือน ✨</span>
                <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                  {unreadCount} ข้อความใหม่
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">ไม่มีการแจ้งเตือน</div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-3.5 hover:bg-[#FAF9F6] transition-colors cursor-pointer text-xs ${
                        !notif.read ? 'bg-[#F0FDF4]' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-900">{notif.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Mini Profile with cute pastel ring */}
        <button
          onClick={() => setCurrentTab('profile')}
          className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#F3F1EC] transition-colors"
          title="ดูโปรไฟล์และการตั้งค่า"
        >
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.fullName}
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full object-cover ring-2 ring-[#FFE8DF]"
          />
          <span className="hidden md:inline text-xs font-semibold text-slate-700">
            {userProfile.nickname}
          </span>
        </button>

        {/* Quick Link to Registration / Auth Screen */}
        <button
          onClick={logout}
          className="hidden sm:flex items-center gap-1 p-1.5 text-slate-400 hover:text-[#9A3412] hover:bg-[#FFE8DF] rounded-xl transition-all text-xs"
          title="ไปยังหน้าแรก: ลงทะเบียนเข้าใช้งานใหม่ / เข้าสู่ระบบ"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium hidden lg:inline">ลงทะเบียน/สลับบัญชี</span>
        </button>
      </div>
    </header>
  );
};
