import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Share2,
  Edit3,
  FileText,
  MessageSquare,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Eye,
  Heart,
  Star,
} from 'lucide-react';

export const PassportView: React.FC = () => {
  const {
    userProfile,
    skills,
    submissions,
    setCurrentTab,
    setIsShareModalOpen,
    setSelectedSubmissionForReview,
    isReviewerMode,
    setIsReviewerMode,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending_review' | 'in_progress'>('all');

  const verifiedSkills = skills.filter((s) => s.status === 'verified');
  const pendingSkills = skills.filter((s) => s.status === 'pending_review');
  const inProgressSkills = skills.filter((s) => s.status === 'in_progress');

  const filteredSkills = skills.filter((s) => {
    if (filterStatus === 'all') return true;
    return s.status === filterStatus;
  });

  const approvedSubmissions = submissions.filter((s) => s.status === 'approved');
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending_review');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Passport Hero Header Profile (Pastel Passport Booklet Look) */}
      <div className="bg-gradient-to-r from-[#E8F5E9] via-[#FAF9F6] to-[#FFEFEA] border border-[#D5EAD8] text-slate-800 rounded-3xl p-6 sm:p-9 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.fullName}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-white shadow-md border border-[#E0EEDF]"
              />
              <div
                className="absolute -bottom-2 -right-2 p-1.5 rounded-2xl bg-[#E2F5E9] text-[#173C32] shadow-xs border border-white"
                title="GROWTH Digital Verified Ledger"
              >
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#173C32]">
                  {userProfile.fullName}
                </h1>
                <span className="text-xs font-bold text-[#20593B] bg-white px-3 py-1 rounded-full shadow-2xs border border-[#C5ECD2]">
                  🌱 GROWTH Verified
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {userProfile.educationLevel} · {userProfile.institution}
              </div>

              <p className="text-xs text-slate-600 mt-2 max-w-xl leading-relaxed">
                {userProfile.bio}
              </p>

              {/* Career interests with cute pastel dots */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-bold text-[#1B4332]">ความสนใจ:</span>
                <span>{userProfile.careerInterests.join(' · ')}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-row md:flex-col gap-2.5 shrink-0 self-stretch sm:self-auto">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#D8F3DC]" />
              <span>แชร์พาสปอร์ต ✨</span>
            </button>
            <button
              onClick={() => setCurrentTab('profile')}
              className="px-4 py-2.5 bg-white hover:bg-[#FAF9F6] text-slate-700 text-xs font-bold rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 shadow-2xs"
            >
              <Edit3 className="w-4 h-4 text-slate-400" />
              <span>แก้ไขโปรไฟล์</span>
            </button>
          </div>
        </div>

        {/* Decorative Cute Stamp Watermark */}
        <div className="absolute right-4 bottom-1 text-slate-200/40 font-mono text-7xl font-black select-none pointer-events-none">
          PASSPORT
        </div>
      </div>

      {/* 2. Achievement & Evidence Metrics Strip (Pastel Tiles) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EFECE6] rounded-2xl p-4 shadow-2xs hover:border-emerald-200 transition-colors">
          <div className="text-xs text-slate-500 font-medium">ทักษะที่ผ่านการตรวจ (Verified)</div>
          <div className="text-2xl font-black font-mono text-[#2D6A4F] mt-1.5 tabular-nums">
            {verifiedSkills.length} <span className="text-xs font-sans text-slate-400 font-normal">ทักษะ</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-medium">✓ มีผู้ทรงคุณวุฒิรับรอง</div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-2xl p-4 shadow-2xs hover:border-amber-200 transition-colors">
          <div className="text-xs text-slate-500 font-medium">รอการประเมิน (Pending)</div>
          <div className="text-2xl font-black font-mono text-amber-600 mt-1.5 tabular-nums">
            {pendingSkills.length} <span className="text-xs font-sans text-slate-400 font-normal">ทักษะ</span>
          </div>
          <div className="text-[11px] text-amber-700 mt-1 font-medium">⏳ ส่งหลักฐานแล้ว รอตรวจ</div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-2xl p-4 shadow-2xs hover:border-blue-200 transition-colors">
          <div className="text-xs text-slate-500 font-medium">โปรเจกต์ที่สำเร็จจริง</div>
          <div className="text-2xl font-black font-mono text-slate-800 mt-1.5 tabular-nums">
            {approvedSubmissions.length} <span className="text-xs font-sans text-slate-400 font-normal">งาน</span>
          </div>
          <div className="text-[11px] text-sky-700 mt-1 font-medium">💼 ร้านค้าชุมชนและองค์กร</div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-2xl p-4 shadow-2xs hover:border-purple-200 transition-colors">
          <div className="text-xs text-slate-500 font-medium">คำแนะนำที่ได้รับ (Feedback)</div>
          <div className="text-2xl font-black font-mono text-[#4F75FF] mt-1.5 tabular-nums">
            {submissions.filter((s) => s.assessorFeedback).length} <span className="text-xs font-sans text-slate-400 font-normal">ข้อความ</span>
          </div>
          <div className="text-[11px] text-purple-700 mt-1 font-medium">💬 ข้อคิดเห็นพัฒนาตนเอง</div>
        </div>
      </div>

      {/* 3. Assessor Simulation Callout (Cute Pastel Card) */}
      {pendingSubmissions.length > 0 && (
        <div className="bg-gradient-to-r from-[#FEF9C3]/80 via-[#FFFBEB] to-[#FFE5D9]/60 border border-[#FDE047] rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 text-base shadow-2xs">
              🎯
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-950">
                คุณมีผลงานที่รอการตรวจประเมิน ({pendingSubmissions.length} รายการ)
              </h3>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed font-normal">
                ในฐานะกรรมการหรือผู้ประเมิน คุณสามารถกดทดลองตรวจผลงาน ให้คะแนนรูบริก
                และอนุมัติเพื่อเปลี่ยนสถานะทักษะเป็น "ผ่านการประเมิน (Verified)" ได้ทันที ✨
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedSubmissionForReview(pendingSubmissions[0])}
            className="px-4 py-2.5 bg-[#854D0E] hover:bg-[#713F12] text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#FEF9C3]" />
            <span>ตรวจผลงานและให้คะแนนรูบริก</span>
          </button>
        </div>
      )}

      {/* 4. Skills Section */}
      <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-9 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">📜</span>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                ทักษะในพาสปอร์ตของคุณ (Passport Skills Ledger)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              แยกสถานะชัดเจนระหว่างทักษะที่กำลังฝึกฝน และทักษะที่มีหลักฐานยืนยันแล้ว
            </p>
          </div>

          {/* Status Filter Tabs (Pastel Minimalist) */}
          <div className="flex items-center gap-1 bg-[#FAF9F6] p-1 rounded-2xl border border-[#EFECE6] self-start sm:self-auto">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                filterStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ทั้งหมด ({skills.length})
            </button>
            <button
              onClick={() => setFilterStatus('verified')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                filterStatus === 'verified'
                  ? 'bg-[#D8F3DC] text-[#1B4332] shadow-2xs border border-[#B7E4C7]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ผ่านการตรวจ ({verifiedSkills.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending_review')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                filterStatus === 'pending_review'
                  ? 'bg-[#FEF3C7] text-amber-900 shadow-2xs border border-[#FDE68A]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              รอการตรวจ ({pendingSkills.length})
            </button>
            <button
              onClick={() => setFilterStatus('in_progress')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                filterStatus === 'in_progress'
                  ? 'bg-[#E0F2FE] text-sky-900 shadow-2xs border border-[#BAE6FD]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              กำลังพัฒนา ({inProgressSkills.length})
            </button>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => {
            const isVerified = skill.status === 'verified';
            const isPending = skill.status === 'pending_review';

            return (
              <div
                key={skill.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isVerified
                    ? 'bg-[#F4FAF6] border-[#D5EAD8]'
                    : isPending
                    ? 'bg-[#FFFDF5] border-[#FDE68A]'
                    : 'bg-white border-[#EFECE6]'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {skill.categoryLabel}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{skill.name}</h3>
                  </div>

                  {/* Status Indicator */}
                  <div>
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B4332] bg-[#D8F3DC] px-2.5 py-0.5 rounded-full border border-[#B7E4C7]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        <span>ผ่านการประเมิน</span>
                      </span>
                    ) : isPending ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>รอตรวจ</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        <span>กำลังพัฒนา</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Level and progress */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>ระดับ: <strong className="text-slate-700">{skill.level}</strong></span>
                  <span className="font-mono tabular-nums font-bold">
                    ความสมบูรณ์ {skill.progressPercent}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isVerified ? 'bg-[#2D6A4F]' : isPending ? 'bg-[#F4A261]' : 'bg-[#4F75FF]'
                    }`}
                    style={{ width: `${skill.progressPercent}%` }}
                  />
                </div>

                {/* Evidence & Assessor Info */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  {skill.evidenceTitle && (
                    <div className="text-slate-600">
                      <span className="text-slate-400 font-medium">หลักฐานสนับสนุน: </span>
                      <span className="font-bold text-slate-800">{skill.evidenceTitle}</span>
                    </div>
                  )}

                  {isVerified && skill.assessorName && (
                    <div className="p-3 bg-white rounded-2xl border border-emerald-100 text-[11px] text-slate-600 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between font-bold text-[#1B4332]">
                        <span>ผู้รับรอง: {skill.assessorName} 🌸</span>
                        <span className="text-slate-400 font-mono text-[10px]">{skill.assessedDate}</span>
                      </div>
                      {skill.feedback && (
                        <p className="text-slate-500 italic">"{skill.feedback}"</p>
                      )}
                    </div>
                  )}

                  {!isVerified && !isPending && (
                    <p className="text-[11px] text-slate-400 italic">
                      ยังไม่มีหลักฐานการตรวจ · สามารถเลือกทำโปรเจกต์เพื่อส่งผลงานได้ค่ะ
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Audit Transparency rule */}
        <div className="p-4 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs text-slate-500 leading-relaxed">
          <strong>มาตรฐานความโปร่งใสของ Future Passport:</strong>{' '}
          ระบบไม่อนุญาตให้แสดงสถานะทักษะ "ผ่านการประเมิน" โดยพลการหากไม่มีหลักฐานชิ้นงานและผู้ประเมินตรวจสอบจริง
          ทักษะทุกรายการสามารถตรวจสอบย้อนกลับ (Audit Trail) ไปยังชิ้นงานและผู้ตรวจได้เสมอ ✨
        </div>
      </div>

      {/* 5. Demonstrated Works (Portfolio Artifacts) */}
      <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-9 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">💼</span>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                แฟ้มสะสมผลงานชิ้นจริง (Demonstrated Works & Artifacts)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              ผลงานที่ส่งมอบให้องค์กร พร้อมเกณฑ์การตรวจและข้อเสนอแนะเพื่อการเติบโต
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('projects')}
            className="text-xs font-bold text-[#2D6A4F] hover:underline"
          >
            + ส่งผลงานโปรเจกต์ใหม่
          </button>
        </div>

        <div className="space-y-4">
          {submissions.map((sub) => {
            const isApproved = sub.status === 'approved';
            return (
              <div
                key={sub.id}
                className="p-5 border border-[#EFECE6] rounded-3xl hover:border-slate-300 transition-colors space-y-3 bg-white shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      โปรเจกต์: {sub.projectTitle} · {sub.orgName}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      {sub.deliverableTitle}
                    </h3>
                  </div>
                  <div>
                    {isApproved ? (
                      <span className="text-xs font-bold text-[#1B4332] bg-[#D8F3DC] px-3 py-1 rounded-full flex items-center gap-1 border border-[#B7E4C7]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        <span>ผ่านการตรวจประเมิน</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedSubmissionForReview(sub)}
                        className="text-xs font-bold text-amber-900 bg-[#FEF3C7] hover:bg-[#FDE68A] px-3 py-1 rounded-full transition-colors flex items-center gap-1 border border-[#FDE68A]"
                      >
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>รอตรวจประเมิน (คลิกเพื่อตรวจ)</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Reflection Notes */}
                <div className="p-3.5 bg-[#FAF9F6] rounded-2xl text-xs text-slate-700 leading-relaxed italic border border-[#EFECE6]">
                  <span className="font-bold text-slate-800 not-italic block mb-0.5">
                    บันทึกการสะท้อนคิดของผู้เรียน:
                  </span>
                  "{sub.reflectionText}"
                </div>

                {/* Assessor Feedback if evaluated */}
                {sub.assessorFeedback && (
                  <div className="p-3.5 bg-[#F4FAF6] rounded-2xl text-xs text-slate-700 leading-relaxed border border-[#D5EAD8]">
                    <span className="font-bold text-[#1B4332] block mb-0.5">
                      ข้อเสนอแนะจากผู้ประเมิน ({sub.assessorName}):
                    </span>
                    <p className="text-slate-600">"{sub.assessorFeedback}"</p>
                    {sub.rubricScores && (
                      <div className="mt-2.5 pt-2 border-t border-emerald-200/60 flex flex-wrap gap-4 text-[11px] text-slate-500 font-mono">
                        <span>การปฏิบัติจริง: {sub.rubricScores.practicalExecution}/5 ⭐</span>
                        <span>การแก้ปัญหา: {sub.rubricScores.problemSolving}/5 ⭐</span>
                        <span>การสะท้อนคิด: {sub.rubricScores.reflectionQuality}/5 ⭐</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Skills demonstrated & link */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">ทักษะที่เกี่ยวข้อง:</span>
                    <span className="text-[#2D6A4F] font-bold">
                      {sub.skillsDemonstrated.join(' · ')}
                    </span>
                  </div>

                  <a
                    href={sub.deliverableUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#4F75FF] hover:underline font-bold"
                  >
                    <span>ดูเอกสารหรือหลักฐานชิ้นงาน</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
