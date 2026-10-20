import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  Award,
  UploadCloud,
  FileCheck,
  Send,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const {
    selectedProjectIdForDetail,
    setSelectedProjectIdForDetail,
    projects,
    appliedProjectIds,
    applyToProject,
    submitProjectDeliverable,
    submissions,
    setCurrentTab,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'details' | 'submit'>('details');

  // Submit form state
  const [deliverableTitle, setDeliverableTitle] = useState('');
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Application note state
  const [appNote, setAppNote] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  if (!selectedProjectIdForDetail) return null;

  const project = projects.find((p) => p.id === selectedProjectIdForDetail);
  if (!project) return null;

  const isApplied = appliedProjectIds.includes(project.id);
  const projectSubmissions = submissions.filter((s) => s.projectId === project.id);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      applyToProject(project.id, appNote);
      setIsApplying(false);
      setActiveTab('submit');
    }, 400);
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliverableTitle.trim() || !deliverableUrl.trim() || !reflectionText.trim()) {
      setSubmitError('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่องเพื่อเป็นหลักฐานที่สมบูรณ์นะคะ');
      return;
    }

    setSubmitError('');
    submitProjectDeliverable({
      projectId: project.id,
      deliverableTitle: deliverableTitle.trim(),
      deliverableUrl: deliverableUrl.trim(),
      reflectionText: reflectionText.trim(),
      skillsDemonstrated: project.skillsGained,
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setSelectedProjectIdForDetail(null);
      setCurrentTab('passport');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EFECE6] overflow-hidden my-8">
        {/* Cover Header */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-800">
          <img
            src={project.coverImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setSelectedProjectIdForDetail(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Org & Title in Hero */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs text-[#D8F3DC] font-bold mb-1">
              <span>{project.orgType}</span>
              <span aria-hidden="true">·</span>
              <span>{project.orgName}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Tab switch (Cute Pastel Minimalist) */}
        <div className="flex border-b border-[#EFECE6] bg-[#FAF9F6] px-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-[#1B4332] text-[#1B4332]'
                : 'border-transparent text-slate-400 hover:text-slate-800'
            }`}
          >
            รายละเอียดโปรเจกต์ 💡
          </button>
          <button
            onClick={() => setActiveTab('submit')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'submit'
                ? 'border-[#1B4332] text-[#1B4332]'
                : 'border-transparent text-slate-400 hover:text-slate-800'
            }`}
          >
            ส่งผลงานและหลักฐาน ({projectSubmissions.length}) 💌
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 max-h-[60vh] overflow-y-auto space-y-6">
          {activeTab === 'details' ? (
            <>
              {/* Meta metrics bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs">
                <div>
                  <div className="text-slate-400 font-medium">ระดับความยาก</div>
                  <div className="font-bold text-slate-800 mt-0.5">{project.difficulty}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">ระยะเวลา</div>
                  <div className="font-bold text-slate-800 mt-0.5 font-mono tabular-nums">
                    {project.durationWeeks} สัปดาห์
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">ปิดรับสมัคร</div>
                  <div className="font-bold text-slate-800 mt-0.5 font-mono tabular-nums">
                    {project.deadline}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 font-medium">รับจำนวน</div>
                  <div className="font-bold text-slate-800 mt-0.5 font-mono tabular-nums">
                    {project.availableSlots} คน
                  </div>
                </div>
              </div>

              {/* Problem & Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>โจทย์และความท้าทายจริง (Problem Statement)</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#FAF9F6] p-4 rounded-2xl border border-[#EFECE6]">
                  {project.problemStatement}
                </p>
              </div>

              {/* Required Deliverables */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>📦</span>
                  <span>ชิ้นงานที่ต้องส่งเพื่อขอรับการประเมิน (Deliverables)</span>
                </h4>
                <ul className="space-y-2">
                  {project.deliverablesRequired.map((del, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 bg-white border border-[#EFECE6] p-3 rounded-xl shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                      <span className="font-medium">{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills gained */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>🌱</span>
                  <span>ทักษะที่คุณจะได้พัฒนาและนำไปบันทึกใน Passport</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.skillsGained.map((sk, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D8F3DC] border border-[#B7E4C7] rounded-xl text-xs font-bold text-[#1B4332]"
                    >
                      <Award className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>{sk}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Evaluation Criteria */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>⭐</span>
                  <span>เกณฑ์การให้คะแนนรูบริกจากผู้ประเมิน (Rubric Criteria)</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600 bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#EFECE6]">
                  {project.evaluationCriteria.map((crit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organization Contact */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#EFECE6] text-xs shadow-2xs">
                <span className="text-slate-400 font-medium">ผู้ประสานงานโครงการ: </span>
                <span className="font-bold text-slate-800">{project.contactPerson}</span>
                <span className="text-slate-500"> ({project.contactRole})</span>
              </div>
            </>
          ) : (
            /* Submit Deliverable View */
            <div className="space-y-5">
              {!isApplied ? (
                <div className="p-5 bg-[#FEF9C3]/80 border border-[#FDE047] rounded-3xl text-xs text-[#854D0E] space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span>💡</span>
                    <span>คุณยังไม่ได้กดลงทะเบียนเข้าร่วมโปรเจกต์นี้</span>
                  </div>
                  <p className="leading-relaxed">
                    กรอกข้อมูลแสดงความสนใจสั้น ๆ ด้านล่างเพื่อลงทะเบียนเข้าร่วม
                    จากนั้นคุณสามารถส่งผลงานได้ทันทีค่ะ
                  </p>
                  <textarea
                    rows={2}
                    value={appNote}
                    onChange={(e) => setAppNote(e.target.value)}
                    placeholder="ระบุความสนใจหรือเป้าหมายที่อยากพัฒนาจากโปรเจกต์นี้..."
                    className="w-full p-3 bg-white border border-[#FDE047] rounded-2xl text-xs text-slate-800 focus:outline-none"
                  />
                  <button
                    onClick={handleApply}
                    disabled={isApplying}
                    className="px-5 py-2.5 bg-[#1B4332] text-white rounded-2xl font-bold text-xs hover:bg-[#2D6A4F] transition-all shadow-2xs"
                  >
                    {isApplying ? 'กำลังลงทะเบียน...' : 'ยืนยันการลงทะเบียนเข้าร่วมโปรเจกต์ ✨'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitWork} className="space-y-4">
                  {submitSuccess && (
                    <div className="p-3.5 bg-[#D8F3DC] border border-[#B7E4C7] rounded-2xl text-xs text-[#1B4332] font-bold flex items-center gap-2 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                      <span>บันทึกผลงานลงใน Future Passport เรียบร้อยแล้ว! กำลังนำคุณไปยังหน้าพาสปอร์ต... ✨</span>
                    </div>
                  )}

                  {submitError && (
                    <div className="p-3 bg-[#FFE5D9] border border-[#FFCAD4] rounded-2xl text-xs text-[#9A3412]">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ชิ้นงานที่ส่ง (Deliverable Title) *
                    </label>
                    <input
                      type="text"
                      value={deliverableTitle}
                      onChange={(e) => setDeliverableTitle(e.target.value)}
                      placeholder="เช่น รายงานการวิเคราะห์ชุดข้อมูลยอดขาย และกราฟิกแดชบอร์ด 3 ประเด็น"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ลิงก์หลักฐานชิ้นงาน (Google Drive, Figma, Canva, GitHub หรือเว็บไซต์) *
                    </label>
                    <input
                      type="url"
                      value={deliverableUrl}
                      onChange={(e) => setDeliverableUrl(e.target.value)}
                      placeholder="https://drive.google.com/... หรือ https://figma.com/..."
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      บันทึกการสะท้อนคิดและการเรียนรู้ (Reflection & Learning Notes) *
                    </label>
                    <p className="text-[11px] text-slate-400 mb-1.5 font-normal">
                      อธิบายกระบวนการแก้ปัญหา สิ่งที่คุณได้เรียนรู้จากการลงมือทำจริง และอุปสรรคที่คุณก้าวข้าม (ส่วนนี้สำคัญมากในการตรวจประเมินทักษะ)
                    </p>
                    <textarea
                      rows={4}
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="เล่าสิ่งที่คุณได้ลงมือทำ ปัญหาที่เจอในการทำงาน และทักษะที่คุณรู้สึกว่าเติบโตขึ้น..."
                      className="w-full p-3.5 text-xs bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                    />
                  </div>

                  <div className="p-3.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-[11px] text-slate-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                    <span>
                      เมื่อกดส่ง ผลงานจะถูกส่งต่อไปยังผู้ทรงคุณวุฒิเพื่อตรวจประเมินรูบริก
                      และเมื่อผ่านการประเมิน ทักษะจะได้รับการยืนยันอย่างเป็นทางการใน Future Passport ✨
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <UploadCloud className="w-4 h-4 text-[#D8F3DC]" />
                    <span>ส่งผลงานเข้าสู่กระบวนการตรวจประเมิน ✨</span>
                  </button>
                </form>
              )}

              {/* History of submissions for this project */}
              {projectSubmissions.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800 mb-2">
                    ประวัติการส่งผลงานในโปรเจกต์นี้
                  </div>
                  <div className="space-y-2">
                    {projectSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{sub.deliverableTitle}</span>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              sub.status === 'approved'
                                ? 'bg-[#D8F3DC] text-[#1B4332]'
                                : sub.status === 'pending_review'
                                ? 'bg-[#FEF3C7] text-amber-900'
                                : 'bg-[#FFE5D9] text-red-900'
                            }`}
                          >
                            {sub.status === 'approved'
                              ? '✓ ผ่านการตรวจแล้ว'
                              : sub.status === 'pending_review'
                              ? 'รอผู้ทรงคุณวุฒิตรวจ'
                              : 'ส่งกลับเพื่อปรับปรุง'}
                          </span>
                        </div>
                        {sub.assessorFeedback && (
                          <p className="mt-2 text-[11px] text-slate-600 italic">
                            "{sub.assessorFeedback}" — {sub.assessorName}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF9F6] border-t border-[#EFECE6]">
          <button
            onClick={() => setSelectedProjectIdForDetail(null)}
            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            ปิด
          </button>
          {activeTab === 'details' && !isApplied && (
            <button
              onClick={() => setActiveTab('submit')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#1B4332] hover:bg-[#2D6A4F] rounded-2xl transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span>สมัครเข้าร่วมโปรเจกต์นี้</span>
              <ArrowRight className="w-4 h-4 text-[#D8F3DC]" />
            </button>
          )}
          {activeTab === 'details' && isApplied && (
            <button
              onClick={() => setActiveTab('submit')}
              className="px-5 py-2.5 text-xs font-bold text-[#1B4332] bg-[#D8F3DC] hover:bg-[#c2ebd1] rounded-2xl transition-all flex items-center gap-1.5 border border-[#B7E4C7]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
              <span>คุณเข้าร่วมแล้ว · ส่งผลงาน 💌</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
