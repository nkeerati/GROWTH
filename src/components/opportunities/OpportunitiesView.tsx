import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  MapPin,
  Calendar,
  Sparkles,
  Info,
  ExternalLink,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Opportunity, ApplicationStatus } from '../../types';

export const OpportunitiesView: React.FC = () => {
  const {
    opportunities,
    skills,
    savedOpportunityIds,
    saveOpportunity,
    unsaveOpportunity,
    opportunityApplications,
    applyToOpportunity,
    setCurrentTab,
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const [selectedOppForDetail, setSelectedOppForDetail] = useState<Opportunity | null>(null);

  // Set of user skills that are verified or in progress
  const verifiedSkillNames = skills.filter((s) => s.status === 'verified').map((s) => s.name);
  const allUserSkillNames = skills.map((s) => s.name);

  const calculateSkillMatch = (opp: Opportunity) => {
    const required = opp.requiredSkills;
    const matched = required.filter((req) =>
      allUserSkillNames.some((sk) => sk.toLowerCase().includes(req.slice(0, 6).toLowerCase()))
    );
    const verifiedMatched = required.filter((req) =>
      verifiedSkillNames.some((sk) => sk.toLowerCase().includes(req.slice(0, 6).toLowerCase()))
    );
    const missing = required.filter(
      (req) => !allUserSkillNames.some((sk) => sk.toLowerCase().includes(req.slice(0, 6).toLowerCase()))
    );

    const matchPercent = Math.round((matched.length / required.length) * 100);

    return {
      matchPercent,
      matched,
      verifiedMatched,
      missing,
    };
  };

  const filteredOpps = opportunities.filter((opp) => {
    if (filterType === 'all') return true;
    if (filterType === 'saved') return savedOpportunityIds.includes(opp.id);
    if (filterType === 'applied') return !!opportunityApplications[opp.id];
    return opp.type.includes(filterType);
  });

  const getStatusBadge = (status?: ApplicationStatus) => {
    switch (status) {
      case 'saved':
        return { text: 'บันทึกไว้ 📌', style: 'bg-[#FAF9F6] text-slate-700 border border-slate-200' };
      case 'applied':
        return { text: 'ยื่นใบสมัครแล้ว 💌', style: 'bg-[#E0F2FE] text-sky-800 border border-sky-200 font-bold' };
      case 'in_review':
        return { text: 'อยู่ระหว่างพิจารณา ⏳', style: 'bg-[#FEF3C7] text-amber-900 border border-amber-200 font-bold' };
      case 'shortlisted':
        return { text: 'ผ่านรอบแรกแล้ว 🎉', style: 'bg-[#D8F3DC] text-[#1B4332] font-black border border-[#B7E4C7]' };
      case 'not_selected':
        return { text: 'ไม่ได้รับคัดเลือก', style: 'bg-slate-100 text-slate-500' };
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFECE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              ศูนย์รวมโอกาสและงานที่เหมาะสม (Opportunity Matching)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            เชื่อมโยงทักษะที่คุณพิสูจน์ได้ สู่โอกาสฝึกงาน การแข่งขัน และโครงการพี่เลี้ยง ✨
          </p>
        </div>
      </div>

      {/* Matching Transparency Banner (Pastel Blue) */}
      <div className="p-4 bg-[#F0F4FF] border border-[#D9E2FF] rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 leading-relaxed shadow-2xs">
        <div className="flex items-start gap-2.5">
          <span className="text-base">💡</span>
          <span>
            <strong>หลักการคำนวณการจับคู่ทักษะ (Skill Match Algorithm):</strong>{' '}
            ระบบเปรียบเทียบทักษะที่นายจ้างกำหนดกับหลักฐานจริงใน Future Passport ของคุณ
            โดยให้ความสำคัญสูงสุดกับทักษะที่ผ่านการตรวจโดยผู้ทรงคุณวุฒิแล้ว
            ไม่ใช่การสุ่มตัวเลขความน่าจะเป็น
          </span>
        </div>
      </div>

      {/* Filters (Pastel Buttons) */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
            filterType === 'all'
              ? 'bg-[#1B4332] text-white shadow-2xs'
              : 'bg-white border border-[#EFECE6] text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          ทั้งหมด ({opportunities.length})
        </button>
        <button
          onClick={() => setFilterType('ฝึกงาน')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
            filterType === 'ฝึกงาน'
              ? 'bg-[#1B4332] text-white shadow-2xs'
              : 'bg-white border border-[#EFECE6] text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          💼 การฝึกงาน
        </button>
        <button
          onClick={() => setFilterType('การแข่งขัน')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
            filterType === 'การแข่งขัน'
              ? 'bg-[#1B4332] text-white shadow-2xs'
              : 'bg-white border border-[#EFECE6] text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          🏆 การแข่งขัน
        </button>
        <button
          onClick={() => setFilterType('พี่เลี้ยง')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
            filterType === 'พี่เลี้ยง'
              ? 'bg-[#1B4332] text-white shadow-2xs'
              : 'bg-white border border-[#EFECE6] text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          🤝 โครงการพี่เลี้ยง
        </button>
        <button
          onClick={() => setFilterType('saved')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
            filterType === 'saved'
              ? 'bg-[#4F75FF] text-white shadow-2xs'
              : 'bg-white border border-[#EFECE6] text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          📌 บันทึกไว้ ({savedOpportunityIds.length})
        </button>
        <button
          onClick={() => setFilterType('applied')}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
            filterType === 'applied'
              ? 'bg-[#4F75FF] text-white shadow-2xs'
              : 'bg-white border border-[#EFECE6] text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          💌 ติดตามใบสมัคร ({Object.keys(opportunityApplications).length})
        </button>
      </div>

      {/* Opportunities List with Integrated Match Matrix */}
      <div className="space-y-4">
        {filteredOpps.map((opp) => {
          const isSaved = savedOpportunityIds.includes(opp.id);
          const appRecord = opportunityApplications[opp.id];
          const match = calculateSkillMatch(opp);
          const badge = getStatusBadge(appRecord?.status);

          return (
            <div
              key={opp.id}
              className="bg-white border border-[#EFECE6] rounded-3xl p-6 shadow-2xs hover:border-slate-300 transition-all space-y-4"
            >
              {/* Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-[#1B4332]">{opp.orgName}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 font-medium">{opp.type}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-400 font-mono tabular-nums">{opp.format}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {opp.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.location}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>ปิดรับ: {opp.deadline}</span>
                    </span>
                    {opp.stipend && (
                      <span className="font-bold text-[#1B4332] bg-[#D8F3DC] px-2.5 py-0.5 rounded-full text-[11px] border border-[#B7E4C7]/60">
                        {opp.stipend}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status or Bookmark */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {badge && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge.style}`}>
                      {badge.text}
                    </span>
                  )}
                  <button
                    onClick={() =>
                      isSaved ? unsaveOpportunity(opp.id) : saveOpportunity(opp.id)
                    }
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-[#FAF9F6] rounded-xl transition-colors"
                    title={isSaved ? 'ยกเลิกการบันทึก' : 'บันทึกโอกาสนี้'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-5 h-5 text-[#4F75FF]" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Skill Matching Engine Strip (Pastel Container) */}
              <div className="p-4 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">การจับคู่ทักษะกับพาสปอร์ต:</span>
                    <span
                      className={`font-mono font-black tabular-nums px-2.5 py-0.5 rounded-full text-xs ${
                        match.matchPercent >= 80
                          ? 'bg-[#D8F3DC] text-[#1B4332] border border-[#B7E4C7]'
                          : match.matchPercent >= 50
                          ? 'bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]'
                          : 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                      }`}
                    >
                      ตรงกัน {match.matchPercent}% ✨
                    </span>
                  </div>

                  <span className="text-slate-400 text-[11px] font-medium">
                    ตรงกัน {match.matched.length} จาก {opp.requiredSkills.length} ทักษะที่ต้องการ
                  </span>
                </div>

                {/* Match details breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Matched skills */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>ทักษะที่คุณมีหลักฐานรองรับ:</span>
                    </div>
                    {match.matched.length > 0 ? (
                      <div className="text-slate-700 leading-relaxed text-[11px] font-medium">
                        {match.matched.join(' · ')}
                        {match.verifiedMatched.length > 0 && (
                          <span className="text-emerald-700 font-bold ml-1">
                            (รับรองแล้ว {match.verifiedMatched.length} ทักษะ 🌸)
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-slate-400 italic text-[11px]">ยังไม่มีหลักฐานทักษะในระบบ</div>
                    )}
                  </div>

                  {/* Missing skills / Next steps */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>ทักษะที่ควรพัฒนาเพิ่มเติม:</span>
                    </div>
                    {match.missing.length > 0 ? (
                      <div className="text-slate-600 text-[11px]">
                        {match.missing.join(' · ')}
                        <span className="text-[#4F75FF] font-bold ml-1.5 cursor-pointer hover:underline" onClick={() => setCurrentTab('projects')}>
                          (ดูโปรเจกต์ฝึกทักษะนี้ →)
                        </span>
                      </div>
                    ) : (
                      <div className="text-emerald-700 text-[11px] font-bold">
                        ✓ คุณมีทักษะครบตามที่กำหนด สามารถยื่นหลักฐานได้ทันที
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <button
                  onClick={() => setSelectedOppForDetail(opp)}
                  className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>ดูรายละเอียดงานและคุณสมบัติฉบับเต็ม</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  {appRecord ? (
                    <div className="text-xs text-slate-400 font-mono font-medium">
                      ยื่นหลักฐานเมื่อ: {appRecord.appliedDate}
                    </div>
                  ) : (
                    <button
                      onClick={() => applyToOpportunity(opp.id)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Sparkles className="w-4 h-4 text-[#D8F3DC]" />
                      <span>ยื่นใบสมัครพร้อม Future Passport</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Opportunity Detail Modal */}
      {selectedOppForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EFECE6] overflow-hidden my-8">
            <div className="p-6 bg-[#1B4332] text-white flex justify-between items-start">
              <div>
                <span className="text-xs text-[#D8F3DC] font-bold">
                  {selectedOppForDetail.type} · {selectedOppForDetail.orgName}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedOppForDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOppForDetail(null)}
                className="text-[#D8F3DC] hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">ภาพรวมและเป้าหมาย 🌿</h4>
                <p className="leading-relaxed text-slate-600">{selectedOppForDetail.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">คุณสมบัติผู้สมัคร</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  {selectedOppForDetail.qualifications.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">หน้าที่และความรับผิดชอบ</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  {selectedOppForDetail.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">สิทธิประโยชน์และการสนับสนุน</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  {selectedOppForDetail.benefits.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#E2F5E9]/80 border border-[#C5ECD2] rounded-2xl text-xs text-[#173C32] flex items-center gap-2.5">
                <span className="text-base">✨</span>
                <span>
                  <strong>การส่งใบสมัคร:</strong>{' '}
                  ระบบจะแนบหลักฐานทักษะและผลการตรวจรูบริกจาก GROWTH Passport ของคุณส่งตรงไปยังทีมงานขององค์กรเพื่อพิจารณาคุณสมบัติ
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center px-6 py-4 bg-[#FAF9F6] border-t border-slate-100">
              <button
                onClick={() => setSelectedOppForDetail(null)}
                className="text-xs text-slate-500 font-bold hover:text-slate-800"
              >
                ปิด
              </button>
              {!opportunityApplications[selectedOppForDetail.id] && (
                <button
                  onClick={() => {
                    applyToOpportunity(selectedOppForDetail.id);
                    setSelectedOppForDetail(null);
                  }}
                  className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-2xl shadow-2xs"
                >
                  ส่งใบสมัครพร้อมแนบ Passport ✨
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
