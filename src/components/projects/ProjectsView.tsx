import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  ArrowUpDown,
  FolderGit2,
  Calendar,
  Clock,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const {
    projects,
    appliedProjectIds,
    setSelectedProjectIdForDetail,
    submissions,
  } = useApp();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'duration' | 'slots'>('newest');

  const categories = [
    { id: 'all', label: 'ทั้งหมด', icon: '✨' },
    { id: 'marketing', label: 'การตลาดและสื่อ', icon: '💡' },
    { id: 'data', label: 'ข้อมูลและสถิติ', icon: '📊' },
    { id: 'social', label: 'พัฒนาสังคม', icon: '🌱' },
    { id: 'design', label: 'การออกแบบ', icon: '🎨' },
    { id: 'tech', label: 'เทคโนโลยี', icon: '⚡' },
  ];

  const difficulties = [
    { id: 'all', label: 'ทุกระดับ' },
    { id: 'เริ่มต้น', label: 'เริ่มต้น 🌱' },
    { id: 'ปานกลาง', label: 'ปานกลาง 🌿' },
    { id: 'ท้าทาย', label: 'ท้าทาย 🚀' },
  ];

  const filteredProjects = projects
    .filter((proj) => {
      const matchSearch =
        proj.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        proj.orgName.toLowerCase().includes(searchKeyword.toLowerCase());

      const matchCat = selectedCategory === 'all' || proj.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || proj.difficulty === selectedDifficulty;

      return matchSearch && matchCat && matchDiff;
    })
    .sort((a, b) => {
      if (sortBy === 'duration') return a.durationWeeks - b.durationWeeks;
      if (sortBy === 'slots') return b.availableSlots - a.availableSlots;
      return 0;
    });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFECE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              ตลาดโปรเจกต์ลงมือทำจริง (Project Marketplace)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ร่วมแก้ปัญหาจริงให้ร้านค้าชุมชน โรงเรียน และองค์กร เพื่อสะสมหลักฐานทักษะในพาสปอร์ต ✨
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono tabular-nums self-start sm:self-auto bg-white px-3 py-1.5 rounded-full border border-[#EFECE6] shadow-2xs font-semibold">
          มีโปรเจกต์เปิดรับ {projects.length} งาน
        </div>
      </div>

      {/* Demo Notice (Pastel Yellow) */}
      <div className="p-3.5 bg-[#FEF9C3]/70 border border-[#FDE047]/60 rounded-2xl flex items-center gap-2.5 text-xs text-[#854D0E]">
        <span className="text-sm">💡</span>
        <span>
          <strong>ข้อความชี้แจง:</strong>{' '}
          ชื่อองค์กรและโจทย์ในส่วนนี้เป็นข้อมูลตัวอย่างสำหรับการสาธิต (Case Demonstration Prototype)
          ไม่ได้เป็นโครงการจริงที่ได้รับการอนุมัติอย่างเป็นทางการจากองค์กรนั้น
        </span>
      </div>

      {/* Filter & Search Bar (Cute Minimalist) */}
      <div className="bg-white border border-[#EFECE6] rounded-3xl p-5 shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="ค้นหาชื่อโปรเจกต์ ทักษะ หรือองค์กรชุมชน..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#2D6A4F] transition-all"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>เรียง:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 bg-[#FAF9F6] border border-[#EFECE6] rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white font-medium"
            >
              <option value="newest">โปรเจกต์แนะนำ ✨</option>
              <option value="duration">ระยะเวลาสั้นสุด ⏳</option>
              <option value="slots">จำนวนที่รับมากสุด 👥</option>
            </select>
          </div>
        </div>

        {/* Category Filter Buttons (Pastel Pills) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-slate-400 mr-1 font-medium">หมวด:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#1B4332] text-white shadow-2xs'
                  : 'bg-[#FAF9F6] text-slate-600 hover:bg-[#F3F1EC] border border-[#EFECE6]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}

          <span className="text-slate-200 mx-2 hidden sm:inline">|</span>

          {/* Difficulty Filter */}
          <span className="text-xs text-slate-400 mr-1 font-medium">ระดับ:</span>
          {difficulties.map((diff) => (
            <button
              key={diff.id}
              onClick={() => setSelectedDifficulty(diff.id)}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                selectedDifficulty === diff.id
                  ? 'bg-[#4F75FF] text-white shadow-2xs'
                  : 'bg-[#FAF9F6] text-slate-600 hover:bg-[#F3F1EC] border border-[#EFECE6]'
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-12 text-center space-y-2">
          <span className="text-3xl block">🔍</span>
          <p className="text-sm font-bold text-slate-700">ไม่พบโปรเจกต์ที่ตรงกับเงื่อนไขการค้นหา</p>
          <p className="text-xs text-slate-400">ลองล้างตัวกรองหรือเปลี่ยนคำค้นหาดูนะคะ</p>
          <button
            onClick={() => {
              setSearchKeyword('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="mt-3 px-4 py-2 bg-[#FAF9F6] hover:bg-[#F3F1EC] text-xs font-bold text-slate-700 rounded-xl transition-colors border border-[#EFECE6]"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isApplied = appliedProjectIds.includes(project.id);
            const projectSubs = submissions.filter((s) => s.projectId === project.id);
            const isApproved = projectSubs.some((s) => s.status === 'approved');
            const isPending = projectSubs.some((s) => s.status === 'pending_review');

            return (
              <div
                key={project.id}
                className="group bg-white border border-[#EFECE6] rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Cover */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] rounded-xl font-bold shadow-2xs border border-white/60">
                      {project.orgType}
                    </div>
                    {isApplied && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#D8F3DC] text-[#1B4332] text-[11px] rounded-xl font-bold flex items-center gap-1 shadow-2xs border border-[#B7E4C7]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        <span>สมัครแล้ว</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="text-[11px] text-slate-400 font-medium truncate">
                      {project.orgName}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Metadata strip */}
                    <div className="pt-2 flex items-center gap-2.5 text-xs text-slate-400 border-t border-slate-100">
                      <span>ระดับ: <strong className="text-slate-700">{project.difficulty}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{project.durationWeeks} สัปดาห์</span>
                      <span aria-hidden="true">·</span>
                      <span>รับ {project.availableSlots} คน</span>
                    </div>

                    {/* Skills acquired */}
                    <div className="pt-1 text-xs text-slate-600">
                      <span className="text-slate-400 block mb-1 font-medium">ทักษะที่จะได้รับ:</span>
                      <div className="text-[11px] text-[#2D6A4F] font-bold leading-relaxed">
                        {project.skillsGained.slice(0, 2).join(' · ')}
                      </div>
                    </div>

                    {/* Submission status banner if any */}
                    {isApproved && (
                      <div className="p-2.5 bg-[#D8F3DC]/80 border border-[#B7E4C7] rounded-xl text-[11px] text-[#1B4332] font-bold flex items-center gap-1.5">
                        <span>✨</span>
                        <span>ผลงานได้รับการอนุมัติและบันทึกทักษะแล้ว</span>
                      </div>
                    )}
                    {isPending && !isApproved && (
                      <div className="p-2.5 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl text-[11px] text-amber-900 font-bold flex items-center gap-1.5">
                        <span>⏳</span>
                        <span>รอผู้ทรงคุณวุฒิตรวจสอบหลักฐาน</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400 font-medium">
                    ปิดรับ: <span className="font-mono tabular-nums">{project.deadline}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProjectIdForDetail(project.id)}
                    className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>{isApplied ? 'ดูงาน / ส่งผลงาน' : 'ดูรายละเอียด'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D8F3DC]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
