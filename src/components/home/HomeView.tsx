import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  TrendingUp,
  FolderGit2,
  Award,
  Briefcase,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Heart,
  Star,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    userProfile,
    skills,
    projects,
    opportunities,
    appliedProjectIds,
    submissions,
    setCurrentTab,
    setSelectedProjectIdForDetail,
  } = useApp();

  const featuredProjects = projects.slice(0, 3);
  const featuredOpportunity = opportunities[0];

  const approvedCount = submissions.filter((s) => s.status === 'approved').length;
  const inProgressProjectsCount = appliedProjectIds.length;

  const pastelGradients = [
    'from-[#D8F3DC] to-[#E8F5E9]',
    'from-[#FFE5D9] to-[#FFF0EB]',
    'from-[#E0F2FE] to-[#EFF6FF]',
  ];

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* 1. Welcome Hero Section (Cute Pastel & Fresh) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-[#F4FAF6] to-[#FFEFEA] border border-[#D5EAD8] rounded-3xl p-6 sm:p-9 shadow-xs">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 text-[#20593B] text-xs font-bold mb-3 shadow-2xs border border-[#C5ECD2]">
            <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>GROWTH · แพลตฟอร์มทักษะและการเติบโตของเยาวชน 🌱</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1B4332]">
            สวัสดี {userProfile.nickname} 👋✨
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
            พร้อมพัฒนาทักษะและเปิดรับโอกาสใหม่ ๆ แล้วหรือยัง?
            ลงมือทำโปรเจกต์จริง สะสมหลักฐานที่ผ่านการตรวจ และก้าวสู่ตำแหน่งฝึกงานในฝัน 🌿
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => setCurrentTab('projects')}
              className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs transition-all flex items-center gap-2"
            >
              <span>ค้นหาโปรเจกต์ลงมือทำ</span>
              <ArrowRight className="w-4 h-4 text-[#D8F3DC]" />
            </button>
            <button
              onClick={() => setCurrentTab('skills')}
              className="px-4 py-2.5 bg-white hover:bg-[#FAF9F6] text-slate-700 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-200 transition-all shadow-2xs"
            >
              🧭 สำรวจความถนัดของคุณ
            </button>
          </div>
        </div>

        {/* Decorative Cute Blobs */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#FFE5D9]/60 blur-xl pointer-events-none" />
        <div className="absolute right-32 top-4 w-32 h-32 rounded-full bg-[#D8F3DC]/70 blur-lg pointer-events-none" />
      </div>

      {/* 2. Top Stats & Weekly Progress Bar (Pastel Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-2xs hover:border-emerald-200 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>กิจกรรมที่สำเร็จแล้ว</span>
            <div className="w-7 h-7 rounded-xl bg-[#D8F3DC] flex items-center justify-center text-xs">
              ✅
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 mt-2 tabular-nums">
            {approvedCount + 2} <span className="text-sm font-sans font-normal text-slate-500">กิจกรรม</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">✓ ประเมินผ่านและมีหลักฐานครบ</div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-2xs hover:border-blue-200 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>โปรเจกต์ที่กำลังดำเนินการ</span>
            <div className="w-7 h-7 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-xs">
              💼
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 mt-2 tabular-nums">
            {inProgressProjectsCount} <span className="text-sm font-sans font-normal text-slate-500">โปรเจกต์</span>
          </div>
          <div className="text-[11px] text-sky-700 font-medium mt-1">วิศวกรรม การแพทย์ และชุมชน</div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-2xs hover:border-purple-200 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>ทักษะที่พร้อมยืนยัน</span>
            <div className="w-7 h-7 rounded-xl bg-[#FFE5D9] flex items-center justify-center text-xs">
              🌱
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 mt-2 tabular-nums">
            {skills.filter((s) => s.status === 'verified').length} <span className="text-sm font-sans font-normal text-slate-500">ทักษะ</span>
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">มีผู้ตรวจรับรองในพาสปอร์ต</div>
        </div>
      </div>

      {/* 3. Skill Progress Section */}
      <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">📊</span>
              <h2 className="text-base font-bold text-slate-800">ความก้าวหน้าด้านทักษะของคุณ</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              ความคืบหน้าจากการฝึกฝนและทำกิจกรรมจริงในระบบ
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('passport')}
            className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>ดูพาสปอร์ตทั้งหมด</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-5 mt-5">
          {skills.slice(0, 3).map((skill, index) => {
            const barColors = ['bg-[#52B788]', 'bg-[#4F75FF]', 'bg-[#F4A261]'];
            return (
              <div key={skill.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{skill.name}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">{skill.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono tabular-nums text-slate-700 font-bold">
                      {skill.progressPercent}%
                    </span>
                    {skill.status === 'verified' && (
                      <span className="text-[10px] text-emerald-800 bg-[#D8F3DC] px-2 py-0.5 rounded-full font-bold">
                        ✓ รับรองแล้ว
                      </span>
                    )}
                  </div>
                </div>
                {/* Pastel Progress track */}
                <div className="w-full h-2.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      skill.status === 'verified' ? 'bg-[#2D6A4F]' : barColors[index % barColors.length]
                    }`}
                    style={{ width: `${skill.progressPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Disclaimer Box */}
        <div className="mt-6 p-4 bg-[#FAF9F6] rounded-2xl border border-[#EFECE6] flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>คำชี้แจงความโปร่งใส:</strong>{' '}
            ตัวเลขเปอร์เซ็นต์ดังกล่าวเป็นตัวอย่างความก้าวหน้าจากการสะสมกิจกรรมในระบบ
            ไม่ใช่คะแนนความสามารถที่ผ่านการรับรองทางวิทยาศาสตร์ และการรับรองทักษะจะเกิดขึ้นเมื่อผ่านการตรวจหลักฐานชิ้นงานโดยผู้ทรงคุณวุฒิเท่านั้น
          </span>
        </div>
      </div>

      {/* 4. Recommended Projects Grid (Minimalist & Clean) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">💡</span>
              <h2 className="text-base font-bold text-slate-800">โปรเจกต์แนะนำสำหรับคุณ</h2>
            </div>
            <p className="text-xs text-slate-400">
              โจทย์จริงจากร้านค้าชุมชน โรงเรียน และองค์กรพันธมิตร
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('projects')}
            className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center gap-1"
          >
            <span>ดูทั้งหมด ({projects.length} งาน)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-[#EFECE6] rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
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
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-slate-400 font-medium truncate">{project.orgName}</div>
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Skills tags */}
                  <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                    <span className="font-semibold text-slate-600">ทักษะที่ได้: </span>
                    <span className="text-[#2D6A4F] font-medium">
                      {project.skillsGained.slice(0, 2).join(' · ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono tabular-nums">
                  ⏳ {project.durationWeeks} สัปดาห์
                </span>
                <button
                  onClick={() => setSelectedProjectIdForDetail(project.id)}
                  className="px-3.5 py-1.5 bg-[#D8F3DC] hover:bg-[#c2ebd1] text-[#1B4332] rounded-xl text-xs font-bold transition-colors flex items-center gap-1 border border-[#B7E4C7]/60"
                >
                  <span>ดูรายละเอียด</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Matched Opportunity Spotlight (Pastel Lavender Card) */}
      {featuredOpportunity && (
        <div className="bg-gradient-to-br from-[#F0F4FF] via-[#FAF5FF] to-[#FFF0F5] border border-[#D9E2FF] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-blue-100/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#4338CA] bg-white px-2.5 py-0.5 rounded-full shadow-2xs border border-blue-100">
                  {featuredOpportunity.type}
                </span>
                <span className="text-xs text-slate-500 font-medium">✨ ตรงกับหลักฐานทักษะในพาสปอร์ต</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                {featuredOpportunity.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {featuredOpportunity.orgName} · {featuredOpportunity.location} ({featuredOpportunity.format})
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('opportunities')}
              className="px-4 py-2.5 bg-[#4F75FF] hover:bg-[#3D63EF] text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <span>ตรวจสอบความพร้อมและสมัคร</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-2xs">
              <span className="text-slate-400 block mb-1 font-medium">ทักษะที่ต้องการ:</span>
              <div className="font-bold text-slate-800">
                {featuredOpportunity.requiredSkills.join(' · ')}
              </div>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-2xs">
              <span className="text-slate-400 block mb-1 font-medium">ค่าตอบแทน/เบี้ยเลี้ยง:</span>
              <div className="font-bold text-emerald-800">
                {featuredOpportunity.stipend || 'มีหนังสือรับรอง'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
