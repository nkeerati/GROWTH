import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  Lock,
  Eye,
  CheckCircle2,
  Save,
  AlertCircle,
  HelpCircle,
  Sparkles,
  LogOut,
  Heart,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { userProfile, updateUserProfile, logout } = useApp();

  const [formData, setFormData] = useState({
    fullName: userProfile.fullName,
    nickname: userProfile.nickname,
    age: userProfile.age,
    isUnder18: userProfile.isUnder18,
    educationLevel: userProfile.educationLevel,
    institution: userProfile.institution,
    faculty: userProfile.faculty,
    bio: userProfile.bio,
    contactEmail: userProfile.contactEmail,
    contactPhone: userProfile.contactPhone,
    portfolioSlug: userProfile.portfolioSlug,
    privacySettings: { ...userProfile.privacySettings },
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFECE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧸</span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              โปรไฟล์และการตั้งค่าความปลอดภัย (Profile & Safety)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            จัดการข้อมูลส่วนตัว ประวัติการศึกษา และการตั้งค่าความเป็นส่วนตัวตามมาตรฐานเยาวชน ✨
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-[#D8F3DC] border border-[#B7E4C7] rounded-3xl text-xs text-[#1B4332] font-bold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
          <span>บันทึกการเปลี่ยนแปลงข้อมูลและนโยบายความเป็นส่วนตัวเรียบร้อยแล้วค่ะ ✨</span>
        </div>
      )}

      {/* Safety Badge Notice (Cute Pastel Mint) */}
      <div className="p-5 bg-gradient-to-r from-[#E8F5E9] via-[#FAF9F6] to-[#FFEFEA] border border-[#D5EAD8] rounded-3xl flex items-start gap-3.5 shadow-2xs">
        <span className="text-2xl">🛡️</span>
        <div className="text-xs text-slate-700 leading-relaxed space-y-1">
          <div className="font-bold text-[#1B4332] text-sm">
            มาตรฐานการคุ้มครองข้อมูลเยาวชน (Youth Protection Policy)
          </div>
          <p className="text-slate-600">
            GROWTH ปกป้องข้อมูลติดต่อ เบอร์โทรศัพท์ และที่อยู่ของเยาวชนโดยอัตโนมัติ
            บุคคลภายนอกจะสามารถเห็นเฉพาะหลักฐานทักษะและผลงานที่ผ่านการยืนยันเท่านั้น
            โดยไม่แสดงข้อมูลละเอียดอ่อนสู่สาธารณะ 🌿
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
            <span>👤</span>
            <span>ข้อมูลพื้นฐานของผู้เรียน</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อ - นามสกุล *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อเล่น *</label>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">อายุ (ปี) *</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => {
                  const ageVal = parseInt(e.target.value) || 0;
                  setFormData({
                    ...formData,
                    age: ageVal,
                    isUnder18: ageVal < 18,
                  });
                }}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                required
              />
              {formData.age < 18 && (
                <span className="text-[11px] text-amber-700 font-bold mt-1 block">
                  🌸 ผู้ใช้อายุต่ำกว่า 18 ปี เปิดใช้งานระบบความปลอดภัยขั้นสูงสุดโดยอัตโนมัติ
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio Custom URL</label>
              <div className="flex items-center text-xs">
                <span className="px-3 py-2.5 bg-[#FAF9F6] border border-r-0 border-[#EFECE6] rounded-l-2xl text-slate-400 font-mono">
                  futurepassport.app/p/
                </span>
                <input
                  type="text"
                  value={formData.portfolioSlug}
                  onChange={(e) => setFormData({ ...formData, portfolioSlug: e.target.value })}
                  className="flex-1 px-3 py-2.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-r-2xl text-xs text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ข้อมูลแนะนำตัวสั้น ๆ (Bio)</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
            />
          </div>
        </div>

        {/* Education Details */}
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
            <span>🎓</span>
            <span>ประวัติการศึกษา (Education History)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ระดับการศึกษา *</label>
              <input
                type="text"
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">สถาบันการศึกษา *</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">คณะ / สาขาวิชา / สายการเรียน</label>
              <input
                type="text"
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>
          </div>
        </div>

        {/* Youth Privacy & Safety Controls */}
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
            <span>🔒</span>
            <span>การตั้งค่าความเป็นส่วนตัวของเยาวชน (Privacy Controls)</span>
          </h2>

          <div className="space-y-3 pt-1">
            {/* Setting 1: Hide Contact Info */}
            <div className="flex items-start justify-between gap-4 p-4 bg-[#FAF9F6] rounded-2xl border border-[#EFECE6]">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  ซ่อนข้อมูลติดต่อ (อีเมลและเบอร์โทร) ต่อสาธารณะ
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  เมื่อเปิดใช้งาน ผู้เข้าชมพอร์ตโฟลิโอจะไม่เห็นเบอร์โทรหรืออีเมลจริง
                  นายจ้างจะสามารถติดต่อได้ผ่านกล่องข้อความระบบเท่านั้น (แนะนำสำหรับเยาวชน)
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.privacySettings.hideContactInfoPublicly}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    privacySettings: {
                      ...formData.privacySettings,
                      hideContactInfoPublicly: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 rounded text-[#2D6A4F] focus:ring-0 mt-1 cursor-pointer"
              />
            </div>

            {/* Setting 2: Public Portfolio Toggle */}
            <div className="flex items-start justify-between gap-4 p-4 bg-[#FAF9F6] rounded-2xl border border-[#EFECE6]">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  เปิดให้เข้าชมหน้า Public GROWTH Passport ผ่านลิงก์
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  หากปิด ทุกคนที่เข้าชมลิงก์จะต้องได้รับการอนุญาตหรือมีรหัสเข้าชมส่วนตัว
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.privacySettings.publicPortfolioEnabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    privacySettings: {
                      ...formData.privacySettings,
                      publicPortfolioEnabled: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 rounded text-[#2D6A4F] focus:ring-0 mt-1 cursor-pointer"
              />
            </div>

            {/* Setting 3: Company Headhunt */}
            <div className="flex items-start justify-between gap-4 p-4 bg-[#FAF9F6] rounded-2xl border border-[#EFECE6]">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  อนุญาตให้องค์กรพันธมิตรค้นหาทักษะของคุณเพื่อเสนองานฝึกงาน (Headhunting)
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  เฉพาะองค์กรที่ผ่านการตรวจสอบ (Verified Partners)
                  เท่านั้นที่สามารถส่งคำชวนร่วมโปรเจกต์มายังกล่องข้อความของคุณได้
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.privacySettings.allowCompanyHeadhunt}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    privacySettings: {
                      ...formData.privacySettings,
                      allowCompanyHeadhunt: e.target.checked,
                    },
                  })
                }
                className="h-4 w-4 rounded text-[#2D6A4F] focus:ring-0 mt-1 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2.5 border border-[#EFECE6] bg-white hover:bg-[#FAF9F6] text-slate-600 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shadow-2xs"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>ออกจากระบบ / สลับบัญชี</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#D8F3DC]" />
            <span>บันทึกการตั้งค่าทั้งหมด ✨</span>
          </button>
        </div>
      </form>
    </div>
  );
};
