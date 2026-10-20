import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Copy,
  Check,
  Globe,
  Lock,
  ShieldCheck,
  Award,
  ExternalLink,
  Eye,
  Sparkles,
} from 'lucide-react';

export const SharePortfolioModal: React.FC = () => {
  const {
    isShareModalOpen,
    setIsShareModalOpen,
    userProfile,
    skills,
    submissions,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(true);

  if (!isShareModalOpen) return null;

  const publicUrl = `https://growth.app/p/${userProfile.portfolioSlug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const displayedSkills = showVerifiedOnly
    ? skills.filter((s) => s.status === 'verified')
    : skills;

  const approvedSubmissions = submissions.filter((s) => s.status === 'approved');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EFECE6] overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#173C32] text-white">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🌐</span>
            <div>
              <h3 className="text-sm font-bold">แชร์ GROWTH Passport Portfolio สู่สาธารณะ</h3>
              <p className="text-[11px] text-[#D8F3DC]">
                ลิงก์สำหรับยื่นสมัครฝึกงาน การแข่งขัน หรือแสดงต่อสถาบันการศึกษา ✨
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="p-1 text-[#D8F3DC] hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Share Link Strip */}
          <div className="bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl p-4">
            <div className="text-xs font-bold text-slate-800 mb-1.5">
              ลิงก์สาธารณะสำหรับเข้าชม (Public URL) ✨
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="flex-1 px-3.5 py-2.5 bg-white border border-[#EFECE6] rounded-xl text-xs font-mono text-slate-700 select-all"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shadow-2xs ${
                  copied
                    ? 'bg-[#D8F3DC] text-[#1B4332] border border-[#B7E4C7]'
                    : 'bg-[#1B4332] text-white hover:bg-[#2D6A4F]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#2D6A4F]" />
                    <span>คัดลอกแล้ว! ✨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>คัดลอกลิงก์</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-1">
                <span className="text-sm">🛡️</span>
                <span>ซ่อนเบอร์โทรศัพท์และที่อยู่อัตโนมัติเพื่อความปลอดภัยของเยาวชน</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={showVerifiedOnly}
                  onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                  className="rounded text-[#2D6A4F] focus:ring-0"
                />
                <span>แสดงเฉพาะทักษะที่ผ่านการรับรอง</span>
              </label>
            </div>
          </div>

          {/* Prototype disclaimer notice */}
          <div className="px-3.5 py-2.5 bg-[#FEF9C3]/70 border border-[#FDE047] rounded-2xl text-[11px] text-[#854D0E] leading-relaxed">
            <strong>หมายเหตุการสาธิต (Case Prototype):</strong>{' '}
            ลิงก์นี้เป็นตัวอย่างสำหรับการนำเสนอผลงาน ในเวอร์ชันพัฒนาจริงจะเชื่อมต่อกับโดเมนสาธารณะพร้อมระบบเข้ารหัสลายเซ็นดิจิทัล
          </div>

          {/* Live Preview Card */}
          <div className="border border-[#EFECE6] rounded-3xl overflow-hidden shadow-2xs">
            <div className="px-4 py-2.5 bg-[#FAF9F6] border-b border-[#EFECE6] flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold">ตัวอย่างหน้าเว็บจริง (Live Preview)</span>
              </div>
              <span className="font-mono text-[11px] text-emerald-800 font-bold bg-[#D8F3DC] px-2 py-0.5 rounded-full">
                ● ACTIVE
              </span>
            </div>

            <div className="p-6 bg-[#FAF9F6]">
              {/* Header profile inside preview */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.fullName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#B7E4C7]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900">{userProfile.fullName}</h4>
                    <span className="text-[11px] font-bold text-[#1B4332] bg-[#D8F3DC] px-2.5 py-0.5 rounded-full border border-[#B7E4C7]">
                      Verified ✨
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {userProfile.educationLevel} · {userProfile.institution}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl line-clamp-2">
                    {userProfile.bio}
                  </p>
                </div>
              </div>

              {/* Skills Section inside preview */}
              <div className="py-5 border-b border-slate-200">
                <div className="text-xs font-bold text-slate-800 mb-3 flex items-center justify-between">
                  <span>ทักษะที่มีหลักฐานการันตี ({displayedSkills.length} ทักษะ) 🌸</span>
                  <span className="text-[11px] text-slate-400 font-medium">ตรวจรับรองแล้ว</span>
                </div>
                {displayedSkills.length === 0 ? (
                  <div className="text-xs text-slate-400 italic">
                    ยังไม่มีทักษะที่ผ่านการรับรอง (สามารถเปิดโหมดผู้ประเมินเพื่ออนุมัติทักษะได้ค่ะ)
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {displayedSkills.map((sk) => (
                      <div
                        key={sk.id}
                        className="p-3.5 bg-white border border-[#EFECE6] rounded-2xl text-xs shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{sk.name}</span>
                          <span className="text-[11px] text-emerald-800 font-bold bg-[#D8F3DC] px-2 py-0.2 rounded-full">
                            {sk.status === 'verified' ? '✓ ผ่านตรวจ' : 'รอตรวจ'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {sk.evidenceTitle || 'มีหลักฐานชิ้นงานแนบ'}
                        </div>
                        {sk.assessorName && (
                          <div className="text-[10px] text-slate-400 mt-1">
                            ผู้รับรอง: {sk.assessorName}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Verified Works */}
              <div className="pt-5">
                <div className="text-xs font-bold text-slate-800 mb-3">
                  ผลงานจริงในแฟ้มสะสม (Demonstrated Works) 💼
                </div>
                <div className="space-y-2">
                  {approvedSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3.5 bg-white border border-[#EFECE6] rounded-2xl text-xs shadow-2xs"
                    >
                      <div className="font-bold text-slate-800">{sub.deliverableTitle}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        โปรเจกต์: {sub.projectTitle} · {sub.orgName}
                      </div>
                      {sub.assessorFeedback && (
                        <div className="mt-2 text-[11px] text-slate-600 bg-[#FAF9F6] p-2.5 rounded-xl border border-slate-100">
                          <strong>ข้อเสนอแนะจากผู้ประเมิน:</strong> {sub.assessorFeedback}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 bg-[#FAF9F6] border-t border-[#EFECE6]">
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
